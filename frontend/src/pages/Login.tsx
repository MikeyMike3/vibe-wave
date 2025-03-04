import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UseAuthContext } from '../hooks/context/useAuthContext';
const VITE_API_BASE_LOGIN_URL = import.meta.env.VITE_API_BASE_LOGIN_URL;

const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=7e8eea6f397341778fa5b6167d418e34&response_type=code&redirect_uri=${VITE_API_BASE_LOGIN_URL}/login&scope=streaming%20user-read-email%20user-read-private%20playlist-read-collaborative%20user-library-read%20playlist-read-private%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20user-follow-read%20user-top-read`;

export const Login = () => {
  const { login, isUserLoggedIn, isUserPremiumMember } = UseAuthContext();
  const navigate = useNavigate();
  const code = new URLSearchParams(window.location.search).get('code');

  if (!isUserLoggedIn && code) {
    login(code);
  }

  useEffect(() => {
    if (isUserLoggedIn && isUserPremiumMember) {
      navigate('/');
    }
  });

  return (
    <div>
      <a href={AUTH_URL}>
        <button className="rounded-xl bg-green-500 p-4 text-white">Login With Spotify</button>
      </a>

      {isUserLoggedIn && !isUserPremiumMember && <p>You must be a Spotify Premium member.</p>}
    </div>
  );
};
