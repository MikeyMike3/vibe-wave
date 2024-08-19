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
    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;

    document.body.appendChild(script);

    if (accessToken) {
      window.onSpotifyWebPlaybackSDKReady = () => {
        const spotifyPlayer = new window.Spotify.Player({
          name: 'VibeWave Player',
          getOAuthToken: cb => {
            cb(accessToken);
          },
          volume: 0.5,
        });

        setPlayer(spotifyPlayer);

        player?.addListener('ready', ({ device_id }) => {
          console.log('Ready with Device ID', device_id);
        });

        player?.addListener('not_ready', ({ device_id }) => {
          console.log('Device ID has gone offline', device_id);
        });

        player?.connect();
      };
    }
  }, [accessToken, player]);

  return <SpotifyPlayerContext.Provider value={player}>{children}</SpotifyPlayerContext.Provider>;
};
