import { ReactNode, createContext, useState, useEffect } from 'react';
import axios from 'axios';

type AuthProviderProps = {
  children: ReactNode;
};

// prettier-ignore
const AuthContext = createContext<{isUserLoggedIn: boolean | string; accessToken: string; login: (code: string) => Promise<void> } | undefined>(undefined);

// prettier-ignore
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [accessToken, setAccessToken] = useState(sessionStorage.getItem('accessToken') || '');

  const [refreshToken, setRefreshToken] = useState(sessionStorage.getItem('refreshToken') || '');

  const [expiresIn, setExpiresIn] = useState<number | undefined>(
    parseInt(sessionStorage.getItem('expiresIn') || '0') || undefined,
  );

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(sessionStorage.getItem('isUserLoggedIn') || false)

  const REFRESH_BUFFER_IN_MINUTES = 10;

  const minutesToSeconds= (minutes: number) => {
    return minutes * 60;
  }

  const getRefreshIntervalBuffer = (refreshBufferInSeconds: number, expiresIn: number | undefined) => {
    const expiresInNum = Number(expiresIn);
    return Math.abs(expiresInNum - refreshBufferInSeconds)
  }

  const REFRESH_BUFFER_IN_SECONDS = minutesToSeconds(REFRESH_BUFFER_IN_MINUTES);
  const REFRESH_INTERVAL_BUFFER_TIME = getRefreshIntervalBuffer(REFRESH_BUFFER_IN_SECONDS, expiresIn);

  const login = (code: string) => {
    return axios
      .post('http://localhost:3000/login', { code })
      .then(res => {
       
        sessionStorage.setItem('accessToken', res.data.accessToken);
        sessionStorage.setItem('refreshToken', res.data.refreshToken);
        sessionStorage.setItem('expiresIn', res.data.expiresIn.toString());
     

        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);
      

        sessionStorage.setItem('lastRefreshTime', Date.now().toString());

        setIsUserLoggedIn("true");
        sessionStorage.setItem('isUserLoggedIn', true.toString());

        // window.location.href = '/party-mode';
      })
      .catch(err => {
        console.error('Failed to login:', err);
        throw err;
      });
  };


  const refreshAccessToken = () => {
    const refreshToken = sessionStorage.getItem('refreshToken');

    axios
      .post('http://localhost:3000/refresh', { refreshToken })
      .then(response => {
       
        const newAccessToken = response.data.accessToken;
        const newExpiresIn = response.data.expiresIn;

        setAccessToken(newAccessToken);
        setExpiresIn(newExpiresIn);
        sessionStorage.setItem('accessToken', newAccessToken);
        sessionStorage.setItem('expiresIn', newExpiresIn.toString());

        sessionStorage.setItem('lastRefreshTime', Date.now().toString());
      })
      .catch(err => {
        console.error('Failed to refresh token:', err);
       
      });
  };

  useEffect(() => {
  
    if (!refreshToken || !expiresIn) return;

    const lastRefreshTime = parseInt(sessionStorage.getItem('lastRefreshTime') || '0', 10);
    const tokenExpiresIn = parseInt(sessionStorage.getItem('expiresIn') || '0', 10) * 1000;
    const currentTime = Date.now();
    const timeElapsed = currentTime - lastRefreshTime;


    const remainingTime = tokenExpiresIn - timeElapsed;
    
    let initialIntervalTime = remainingTime ; 

    if (initialIntervalTime <= 0) {
      initialIntervalTime = 0;
    }

    let secondInterval: number;

    // refresh the access token based on initialIntervalTime. This allows the access token to be refreshed accurately even after page refreshes
    const interval = setInterval(() => {
      refreshAccessToken();

      clearInterval(interval);
      

      // after the initial token refresh instead refresh the token after 50 minutes
      
      secondInterval = setInterval(refreshAccessToken,REFRESH_INTERVAL_BUFFER_TIME  * 1000); 
    }, initialIntervalTime);


    return () => {
      clearInterval(interval); 
      if (secondInterval) clearInterval(secondInterval);
    };
  }, [refreshToken, expiresIn]);

  return <AuthContext.Provider value={{ accessToken, login, isUserLoggedIn }}>{children}</AuthContext.Provider>;
};

export { AuthContext };
// export const useAuth = () => React.useContext(AuthContext);
