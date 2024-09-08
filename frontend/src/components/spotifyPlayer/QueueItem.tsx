import { AddToQueueButton } from '../AddToQueueButton';
import { TrackInfo } from '../TrackInfo';
import { PlaySkipButton } from './PlaySkipButton';
import { RemoveFromQueueButton } from './RemoveFromQueueButton';
type QueueItemProps = {
  name: string | undefined;
  images: SpotifyApi.ImageObject[] | Spotify.Image[] | undefined;
  artists: SpotifyApi.ArtistObjectSimplified[] | Spotify.Entity[] | undefined;
  track?: SpotifyApi.TrackObjectFull | SpotifyApi.PlaylistTrackObject | undefined;
  currentlyPlaying?: boolean;
  priorityQueue?: boolean;
};

export const QueueItem = ({
  name,
  images,
  artists,
  track,
  currentlyPlaying,
  priorityQueue,
}: QueueItemProps) => {
  return (
    <div className="flex justify-between">
      {/* Implement queue buttons within this QueueItems component */}
      <TrackInfo name={name} images={images} artists={artists} shouldAddPadding={true} />
      <div className="flex items-center gap-3">
        {!currentlyPlaying && (
          <>
            <PlaySkipButton name={name} priorityQueue={priorityQueue} />
            <RemoveFromQueueButton name={name} priorityQueue={priorityQueue} />
            {track && 'track' in track && <AddToQueueButton track={track} />}
          </>
        )}
      </div>
    </div>
  );
};
