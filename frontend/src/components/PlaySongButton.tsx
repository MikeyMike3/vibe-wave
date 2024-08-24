import { playSong } from '../apis/spotifyPlayer/playSong';
import { useSpotifyPlayerContext } from '../hooks/context/useSpotifyPlayerContext';

type PlaySongButtonProps = {
  uri: string;
};

const PlaySongButton = ({ uri }: PlaySongButtonProps) => {
  const { player, deviceId } = useSpotifyPlayerContext();
  return <button onClick={() => playSong(player, deviceId, uri)}>Play</button>;
};

export default PlaySongButton;
