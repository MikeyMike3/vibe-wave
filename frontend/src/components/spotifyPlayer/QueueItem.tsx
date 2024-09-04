import { useQueueContext } from '../../hooks/context/useQueueContext';
import { useIndexPlaylistQueue } from '../../hooks/spotifyPlayer/useIndexPlaylistQueue';
import { usePlaySong } from '../../hooks/spotifyPlayer/usePlaySong';
import { TrackInfo } from '../TrackInfo';
type QueueItemProps = {
  name: string | undefined;
  images: SpotifyApi.ImageObject[] | Spotify.Image[] | undefined;
  artists: SpotifyApi.ArtistObjectSimplified[] | Spotify.Entity[] | undefined;
};

export const QueueItem = ({ name, images, artists }: QueueItemProps) => {
  const { playlistQueue, playlistQueueIndexRef } = useQueueContext();
  const indexPlaylistQueue = useIndexPlaylistQueue();
  const playSong = usePlaySong();

  const handleClick = () => {
    const index = playlistQueue.findIndex(item => item.track?.name === name);
    indexPlaylistQueue(index, 'set');
    playSong(playlistQueue[playlistQueueIndexRef.current].track?.uri);
  };

  return (
    <div className="flex justify-between">
      {/* Implement queue buttons within this QueueItems component */}
      <TrackInfo name={name} images={images} artists={artists} shouldAddPadding={true} />
      <button onClick={handleClick}>PlaySkip</button>
    </div>
  );
};
