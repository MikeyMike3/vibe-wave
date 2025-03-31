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
    <div className="flex h-screen items-center justify-center">
      <div className="w-[98%] rounded-2xl border-2 border-solid border-magenta p-5 text-center md:w-[600px]">
        <h1 className="text-3xl">
          <span className="text-aqua">Vibe</span>
          <span className="text-magenta">Wave</span>
        </h1>
        <p className="pt-2 text-red-600">
          VibeWave is currently undergoing a mandatory review by Spotify to ensure compliance with
          their terms and conditions. If you are a prospective employer, please feel free to email
          me with your Spotify username and email address so I can manually grant you access. You
          can find my email at the top of my resume.
        </p>
        <a href={AUTH_URL}>
          <button className="mt-3 rounded-xl bg-aqua p-4 font-semibold text-black">
            Login With Spotify
          </button>
        </a>

        {isUserLoggedIn && !isUserPremiumMember && (
          <div className="text-center text-red-600">
            <p>Spotify Premium is required to use VibeWave.</p>
            <p>
              If you’re a Premium user and a potential future employer, feel free to email me your
              Spotify username and email address so I can manually whitelist you for access. You can
              find my email at the top of my resume.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
