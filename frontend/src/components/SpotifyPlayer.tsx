import { togglePlay } from '../apis/spotifyPlayer/togglePlay';
import { getImageUrl } from '../functions/getImageUrl';
import { useSpotifyPlayerContext } from '../hooks/context/useSpotifyPlayerContext';

export const SpotifyPlayer = () => {
  const { player, playerState } = useSpotifyPlayerContext();

  const image = getImageUrl(playerState?.track_window?.current_track?.album?.images);

  return (
    <footer className="mt-auto grid grid-cols-[25%_50%_25%] bg-black p-3 text-white">
      <div className="flex gap-2">
        <img className="h-20 w-20" src={image}></img>
        <div className="flex flex-col justify-center gap-1">
          <p>{playerState?.track_window.current_track.name}</p>
          <p>{playerState?.track_window.current_track.artists.map(item => item.name).join(', ')}</p>
        </div>
      </div>
      <div className="mx-auto flex gap-10">
        <p>Previous</p>
        {playerState?.paused ? (
          <button onClick={() => togglePlay(player)}>Play</button>
        ) : (
          <button onClick={() => togglePlay(player)}>Pause</button>
        )}
        <p>next</p>
      </div>
      <div className="ml-auto">Volume</div>
    </footer>
  );
};
