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

  const [deviceId, setDeviceId] = useState('');

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
            console.log('Ready with Device ID', device_id);
          });

          spotifyPlayer.addListener('not_ready', ({ device_id }) => {
            console.log('Device ID has gone offline', device_id);
          });

          spotifyPlayer.addListener('initialization_error', ({ message }) =>
            console.error(message),
          );
          spotifyPlayer.addListener('authentication_error', ({ message }) =>
            console.error(message),
          );
          spotifyPlayer.addListener('account_error', ({ message }) => console.error(message));
          spotifyPlayer.addListener('playback_error', ({ message }) => console.error(message));

          spotifyPlayer.addListener('player_state_changed', state => {
            console.log('Player state changed:', state);
            if (state) {
              // Handle state changes here, e.g., updating UI or local state
            }
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
    <SpotifyPlayerContext.Provider value={{ player, deviceId }}>
      {children}
    </SpotifyPlayerContext.Provider>
  );
};
export { SpotifyPlayerContext };
