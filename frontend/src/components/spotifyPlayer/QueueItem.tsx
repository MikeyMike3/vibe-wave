import { TrackInfo } from '../TrackInfo';
import { PlaySkipButton } from './PlaySkipButton';
import { RemoveFromQueueButton } from './RemoveFromQueueButton';
type QueueItemProps = {
  name: string | undefined;
  images: SpotifyApi.ImageObject[] | Spotify.Image[] | undefined;
  artists: SpotifyApi.ArtistObjectSimplified[] | Spotify.Entity[] | undefined;
};

export const QueueItem = ({ name, images, artists }: QueueItemProps) => {
  return (
    <div className="flex justify-between">
      {/* Implement queue buttons within this QueueItems component */}
      <TrackInfo name={name} images={images} artists={artists} shouldAddPadding={true} />
      <div className="flex items-center gap-3">
        <PlaySkipButton name={name} />
        <RemoveFromQueueButton name={name} />
      </div>
    </div>
  );
};
