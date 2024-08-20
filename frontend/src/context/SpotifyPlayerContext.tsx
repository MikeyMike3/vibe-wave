import { createContext, ReactNode, useEffect, useState } from 'react';
import { UseAuth } from '../hooks/context/useAuth';

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
};

const SpotifyPlayerContext = createContext<SpotifyContext | undefined>(undefined);

export const SpotifyPlayerProvider = ({ children }: SpotifyProviderProps) => {
  const [player, setPlayer] = useState<Spotify.Player>();

  const [deviceId, setDeviceId] = useState(sessionStorage.getItem('deviceId') || '');

  const { accessToken } = UseAuth();

  useEffect(() => {
    if (accessToken) {
      if (!player) {
        window.onSpotifyWebPlaybackSDKReady = () => {
          const spotifyPlayer = new window.Spotify.Player({
            name: 'VibeWave Player',
            getOAuthToken: cb => cb(accessToken),
            volume: 0.5,
          });

          spotifyPlayer.addListener('ready', ({ device_id }) => {
            setDeviceId(device_id);
            sessionStorage.setItem('deviceId', deviceId);
            console.log('Ready with Device ID', device_id);
          });

          spotifyPlayer.addListener('not_ready', ({ device_id }) => {
            console.log('Device ID has gone offline', device_id);
          });

          spotifyPlayer.connect().then(success => {
            if (success) {
              console.log('The Web Playback SDK successfully connected to Spotify!');
              setPlayer(spotifyPlayer);
            } else {
              console.error('Failed to connect to Spotify');
            }
          });
        };
      } else {
        player._options.getOAuthToken = cb => cb(accessToken);
      }
    }
  }, [accessToken, player, deviceId]);

  return (
    <SpotifyPlayerContext.Provider value={{ player, deviceId }}>
      {children}
    </SpotifyPlayerContext.Provider>
  );
};
export { SpotifyPlayerContext };
