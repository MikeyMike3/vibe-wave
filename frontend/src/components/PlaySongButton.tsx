import { usePlaySong } from '../hooks/spotifyPlayer/usePlaySong';

type PlaySongButtonProps = {
  uri: string;
};

const PlaySongButton = ({ uri }: PlaySongButtonProps) => {
  const playSong = usePlaySong();
  return <button onClick={() => playSong(uri, { shouldUnpause: true })}>Play</button>;
};

export default PlaySongButton;
