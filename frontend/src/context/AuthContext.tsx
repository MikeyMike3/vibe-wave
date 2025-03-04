import { ReactNode, createContext, useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';
import { headers } from '../functions/headers';
const API_BASE_SERVER_URL = import.meta.env.VITE_API_BASE_SERVER_URL;

type AuthProviderProps = {
  children: ReactNode;
};

// prettier-ignore
type AuthContext = {
  isUserLoggedIn: boolean;
  isUserPremiumMember: boolean;
  accessToken: string;
  userId: string;
  login: (code: string) => Promise<void>
  userDisplayName: string;
};

const AuthContext = createContext<AuthContext | undefined>(undefined);

// prettier-ignore
export const AuthProvider  = ({ children }: AuthProviderProps) => {
  const [accessToken, setAccessToken] = useState(sessionStorage.getItem('accessToken') || '');
  const [refreshToken, setRefreshToken] = useState(sessionStorage.getItem('refreshToken') || '');
  const [expiresIn, setExpiresIn] = useState<number | undefined>(
    parseInt(sessionStorage.getItem('expiresIn') || '0') || undefined,
  );
  const [userId, setUserId] = useState(sessionStorage.getItem('userId') || "");
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(sessionStorage.getItem('isUserLoggedIn') === "true" || false)
  const [isUserPremiumMember, setIsUserPremiumMember] = useState(sessionStorage.getItem('isUserPremiumMember') === "true" || false)
  const [userDisplayName, setUserDisplayName] = useState<string>(sessionStorage.getItem("userDisplayName") ||"")

  const minutesToSeconds= (minutes: number):number => {
    return minutes * 60;
  }
  const getRefreshIntervalBuffer = (refreshBufferInSeconds: number, expiresIn: number | undefined):number => {
    const expiresInNum = Number(expiresIn);
    return Math.abs(expiresInNum - refreshBufferInSeconds)
  }

  const REFRESH_BUFFER_IN_MINUTES = 10;
  const REFRESH_BUFFER_IN_SECONDS = useMemo(() => {
    return minutesToSeconds(REFRESH_BUFFER_IN_MINUTES);
  },[])
 
  const REFRESH_INTERVAL_BUFFER_TIME = useMemo(() => {
    return getRefreshIntervalBuffer(REFRESH_BUFFER_IN_SECONDS, expiresIn);
  }, [REFRESH_BUFFER_IN_SECONDS, expiresIn]);


  const login = (code: string) => {
    return (
    axios
      .post(`${API_BASE_SERVER_URL}/login`, { code })
      .then(res => {
       
        sessionStorage.setItem('accessToken', res.data.accessToken);
        sessionStorage.setItem('refreshToken', res.data.refreshToken);
        sessionStorage.setItem('expiresIn', res.data.expiresIn.toString());

        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);
      
        sessionStorage.setItem('lastRefreshTime', Date.now().toString());

        setIsUserLoggedIn(true);
        sessionStorage.setItem('isUserLoggedIn', 'true');

        const apiHeaders = headers(sessionStorage.getItem('accessToken'))

        axios.get('https://api.spotify.com/v1/me',apiHeaders).then( res => {

          console.log(res)
          
          if(res.data.product === "premium"){
            setIsUserPremiumMember(true);
            sessionStorage.setItem('isUserPremiumMember', 'true')
          };

          setUserId(res.data.id);
          setUserDisplayName(res.data.display_name);
          sessionStorage.setItem("userDisplayName", res.data.display_name);
          sessionStorage.setItem("userId", res.data.id);
        
        });
      })
      .catch(err => {
        console.error('Failed to login:', err);
        throw err;
      })
    );
  };

  const refreshAccessToken = useCallback(async () => {
    const refreshToken = sessionStorage.getItem('refreshToken');
    const REFRESH_TOKEN_RETRY_DELAY_In_MILLISECONDS = 10000;
    const retryCount = Math.floor((REFRESH_BUFFER_IN_SECONDS * 1000) / REFRESH_TOKEN_RETRY_DELAY_In_MILLISECONDS);
  
    for (let i = 0; i < retryCount; i++) {
      try {
        const response = await axios.post(`${API_BASE_SERVER_URL}/refresh`, { refreshToken });
  
        if (response.status === 200) {

          const newAccessToken = response.data.accessToken;
          const newExpiresIn = response.data.expiresIn;
  
          setAccessToken(newAccessToken);
          setExpiresIn(newExpiresIn);
          sessionStorage.setItem('accessToken', newAccessToken);
          sessionStorage.setItem('expiresIn', newExpiresIn.toString());
          sessionStorage.setItem('lastRefreshTime', Date.now().toString());
  
          return; 
        } else {
          console.error(`Failed to refresh token, attempt ${i + 1}: status ${response.status}`);
        }
      } catch (err) {
        console.error(`Failed to refresh token, attempt ${i + 1}:`, err);
      }
  
      if (i < retryCount - 1) {
        await new Promise(res => setTimeout(res, REFRESH_TOKEN_RETRY_DELAY_In_MILLISECONDS));
      }
    }
  }, [REFRESH_BUFFER_IN_SECONDS, setAccessToken, setExpiresIn]);
  
  useEffect(() => {
  
    if (!refreshToken || !expiresIn) return;

    const lastRefreshTime = parseInt(sessionStorage.getItem('lastRefreshTime') || '0', 10);
    const tokenExpiresIn = parseInt(sessionStorage.getItem('expiresIn') || '0', 10) * 1000;
    const currentTime = Date.now();
    
    const timeElapsed = currentTime - lastRefreshTime;

    const remainingTime = tokenExpiresIn - timeElapsed;
    
    let initialIntervalTime = remainingTime - REFRESH_BUFFER_IN_SECONDS * 1000 ; 

    if (initialIntervalTime <= 0) {
      initialIntervalTime = 0;
    }

    let secondInterval: ReturnType<typeof setInterval>;


    // refresh the access token based on initialIntervalTime. This allows the access token to be refreshed accurately even after page refreshes
    const interval = setInterval(() => {
      refreshAccessToken();
      clearInterval(interval);
      
      // after the initial token refresh, instead refresh the token after REFRESH_INTERVAL_BUFFER_TIME
        secondInterval = setInterval(refreshAccessToken, REFRESH_INTERVAL_BUFFER_TIME * 1000);
       
    }, initialIntervalTime);

    return () => {
      clearInterval(interval); 
      if (secondInterval) clearInterval(secondInterval);
    };
  }, [refreshToken, expiresIn, REFRESH_INTERVAL_BUFFER_TIME, refreshAccessToken ,REFRESH_BUFFER_IN_SECONDS]);

  return <AuthContext.Provider value={{ accessToken, login, userId, isUserLoggedIn, isUserPremiumMember, userDisplayName }}>{children}</AuthContext.Provider>;
};

export { AuthContext };
