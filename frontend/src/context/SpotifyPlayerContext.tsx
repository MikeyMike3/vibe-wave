import { createContext, ReactNode, useEffect, useRef, useState } from 'react';
import { playSong } from '../apis/spotifyPlayer/playSong';
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
  playerState: Spotify.PlaybackState | undefined;
};

const SpotifyPlayerContext = createContext<SpotifyContext | undefined>(undefined);

export const SpotifyPlayerProvider = ({ children }: SpotifyProviderProps) => {
  const [player, setPlayer] = useState<Spotify.Player>();
  const [playerState, setPlayerState] = useState<Spotify.PlaybackState>();
  const [deviceId, setDeviceId] = useState('');

  const deviceIdRef = useRef<string>('');

  const { accessToken } = UseAuthContext();

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
            deviceIdRef.current = device_id;
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

            if (
              state.track_window.current_track?.id === state.track_window.previous_tracks[0]?.id
            ) {
              console.log('play next');
              playSong(spotifyPlayer, deviceIdRef.current, 'spotify:track:4XvcHTUfIlWfyJTRG0aqlo');
            }

            setPlayerState(state);
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
    <SpotifyPlayerContext.Provider value={{ player, deviceId, playerState }}>
      {children}
    </SpotifyPlayerContext.Provider>
  );
};
export { SpotifyPlayerContext };
