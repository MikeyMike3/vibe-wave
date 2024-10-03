import { usePlaySong } from '../hooks/spotifyPlayer/usePlaySong';

type PlaySongButtonProps = {
  uri: string;
};

const PlaySongButton = ({ uri }: PlaySongButtonProps) => {
  const playSongMutation = usePlaySong();
  return (
    <button
      onClick={() =>
        playSongMutation({ uri: uri, options: { shouldUnpause: true, shouldClearQueue: true } })
      }
    >
      Play
    </button>
  );
};

export default PlaySongButton;
