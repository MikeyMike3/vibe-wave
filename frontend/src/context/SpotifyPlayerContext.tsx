import { createContext, ReactNode, useEffect, useMemo, useState } from 'react';

declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady: () => void;
  }
}

type SpotifyProviderProps = {
  children: ReactNode;
};

type SpotifyContext = {
  nextTrack: () => void;
};

const SpotifyPlayerContext = createContext<SpotifyContext | undefined>(undefined);

export const SpotifyPlayerProvider = ({ children }: SpotifyProviderProps) => {
  const [player, setPlayer] = useState<Spotify.Player>();
  const accessToken = useMemo(() => {
    return sessionStorage.getItem('accessToken');
  }, []);

  useEffect(() => {
    if (accessToken) {
      window.onSpotifyWebPlaybackSDKReady = () => {
        if (!player) {
          const spotifyPlayer = new window.Spotify.Player({
            name: 'VibeWave Player',
            getOAuthToken: cb => cb(accessToken),
            volume: 0.5,
          });

          spotifyPlayer.addListener('ready', ({ device_id }) => {
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
        }
      };
    }
  }, [accessToken, player]);

  return <SpotifyPlayerContext.Provider value={player}>{children}</SpotifyPlayerContext.Provider>;
};
