import { useEffect, useState } from 'react';
import { playSong } from '../functions/spotifyPlayer/playSong';
import { togglePlay } from '../functions/spotifyPlayer/togglePlay';
import { getImageUrl } from '../functions/getImageUrl';
import { useSpotifyPlayerContext } from '../hooks/context/useSpotifyPlayerContext';
import { useQueueContext } from '../hooks/context/useQueueContext';
import { NextTrackButton } from './NextTrackButton';

export const SpotifyPlayer = () => {
  const { player } = useSpotifyPlayerContext();
  const { deviceId } = useSpotifyPlayerContext();
  const { priorityQueue, setPriorityQueue } = useQueueContext();

  const [playerState, setPlayerState] = useState<Spotify.PlaybackState>();

  useEffect(() => {
    const onPlayerStateChanged = (state: Spotify.PlaybackState) => {
      // remove priorityQueue index 0 if its currently playing
      if (state.track_window.current_track?.id === priorityQueue[0]?.id) {
        setPriorityQueue(prevQueue => {
          if (prevQueue.length > 0 && state.track_window.current_track?.id === prevQueue[0].id) {
            return prevQueue.slice(1);
          }
          return prevQueue;
        });
      }

      // play the next song in the queue if either queues have items in them
      if (state.track_window.current_track?.id === state.track_window.previous_tracks[0]?.id) {
        if (priorityQueue.length > 0) {
          playSong(player, deviceId, priorityQueue[0]?.uri);
        }
      }

      setPlayerState(state);
    };

    player?.addListener('player_state_changed', onPlayerStateChanged);

    return () => {
      player?.removeListener('player_state_changed', onPlayerStateChanged);
    };
  }, [deviceId, player, setPriorityQueue, priorityQueue]);

  const image = getImageUrl(playerState?.track_window?.current_track?.album?.images);

  return (
    <footer className="mt-auto grid grid-cols-[25%_50%_25%] items-center bg-black p-3 text-white">
      <div className="flex gap-2">
        <img className="h-20 w-20" src={image}></img>
        <div className="flex flex-col justify-center gap-1">
          <p>{playerState?.track_window?.current_track?.name}</p>
          <p>
            {playerState?.track_window?.current_track?.artists.map(item => item.name).join(', ')}
          </p>
        </div>
      </div>
      <div className="mx-auto flex gap-10">
        <p>Previous</p>
        {playerState?.paused ? (
          <button onClick={() => togglePlay(player)}>Play</button>
        ) : (
          <button onClick={() => togglePlay(player)}>Pause</button>
        )}
        <NextTrackButton />
      </div>
      <div className="ml-auto">Volume</div>
    </footer>
  );
};
