import { createContext, ReactNode, useEffect, useRef, useState } from 'react';
import { UseAuthContext } from '../hooks/context/useAuthContext';

declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady: () => void;
  }
}

type SpotifyProviderProps = {
  children: ReactNode;
};

type SpotifyContext = {
  player: Spotify.Player | undefined;
  deviceId: string;
  isPlayerReady: boolean;
};

const SpotifyPlayerContext = createContext<SpotifyContext | undefined>(undefined);

export const SpotifyPlayerProvider = ({ children }: SpotifyProviderProps) => {
  const [player, setPlayer] = useState<Spotify.Player>();
  const [deviceId, setDeviceId] = useState<string>('');
  const [isPlayerReady, setIsPlayerReady] = useState<boolean>(false);

  const deviceIdRef = useRef<string>('');

  const { accessToken } = UseAuthContext();

  useEffect(() => {
    if (accessToken) {
      if (!player) {
        window.onSpotifyWebPlaybackSDKReady = () => {
          const spotifyPlayer = new window.Spotify.Player({
            name: 'VibeWave',
            getOAuthToken: cb => cb(accessToken),
            volume: 0.1,
          });

          spotifyPlayer.addListener('ready', ({ device_id }) => {
            setDeviceId(device_id);
            deviceIdRef.current = device_id;
            setIsPlayerReady(true);
            console.log('Ready with Device ID', device_id);
          });

          spotifyPlayer.addListener('not_ready', ({ device_id }) => {
            console.log('Device ID has gone offline', device_id);
            setIsPlayerReady(false);
          });

          spotifyPlayer.addListener('initialization_error', ({ message }) =>
            console.error(message),
          );
          spotifyPlayer.addListener('authentication_error', ({ message }) =>
            console.error(message),
          );
          spotifyPlayer.addListener('account_error', ({ message }) => console.error(message));
          spotifyPlayer.addListener('playback_error', ({ message }) => console.error(message));

          spotifyPlayer.connect().then(success => {
            if (success) {
              console.log('The Web Playback SDK successfully connected to Spotify!');

              setPlayer(spotifyPlayer);
            } else {
              console.error('Failed to connect to Spotify');
            }
          });
        };
        const script = document.createElement('script');
        script.id = 'spotify-sdk';
        script.src = 'https://sdk.scdn.co/spotify-player.js';
        script.async = true;
        document.head.appendChild(script);
      } else {
        player._options.getOAuthToken = cb => cb(accessToken);
      }
    }
  }, [accessToken, player, deviceId]);

  return (
    <SpotifyPlayerContext.Provider value={{ player, deviceId, isPlayerReady }}>
      {children}
    </SpotifyPlayerContext.Provider>
  );
};
export { SpotifyPlayerContext };
