import { KebabMenu } from '../kebabMenu/KebabMenu';
import { TrackInfo } from '../TrackInfo';

type QueueItemProps = {
  name: string | undefined;
  images: SpotifyApi.ImageObject[] | Spotify.Image[] | undefined;
  artists: SpotifyApi.ArtistObjectSimplified[] | Spotify.Entity[] | undefined;
  track?: SpotifyApi.TrackObjectFull | SpotifyApi.PlaylistTrackObject | undefined;
  currentlyPlaying?: boolean;
  priorityQueue?: boolean;
  shouldIncludeRemoveQueueButton?: boolean | undefined;
  shouldIncludeAddToQueueButton?: boolean | undefined;
  shouldIncludeAddToFrontOfPriorityQueueButton?: boolean | undefined;
};

export const QueueItem = ({
  name,
  images,
  artists,
  track,
  currentlyPlaying,
  priorityQueue,
  shouldIncludeRemoveQueueButton,
  shouldIncludeAddToQueueButton,
  shouldIncludeAddToFrontOfPriorityQueueButton,
}: QueueItemProps) => {
  return (
    <div className="flex justify-between">
      {/* Implement queue buttons within this QueueItems component */}
      <TrackInfo name={name} images={images} artists={artists} shouldAddPadding={true} />
      <div className="flex items-center gap-3">
        {!currentlyPlaying && (
          <>
            <KebabMenu
              track={track}
              name={name}
              priorityQueue={priorityQueue}
              shouldIncludeAddToQueueButton={shouldIncludeAddToQueueButton}
              shouldIncludeAddToFrontOfPriorityQueueButton={
                shouldIncludeAddToFrontOfPriorityQueueButton
              }
              shouldIncludeRemoveQueueButton={shouldIncludeRemoveQueueButton}
            />
          </>
        )}
      </div>
    </div>
  );
};
