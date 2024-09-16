import { KebabMenu } from '../KebabMenu';
import { TrackInfo } from '../TrackInfo';

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
            <KebabMenu
              track={track}
              name={name}
              priorityQueue={priorityQueue}
              shouldIncludeRemoveQueueButton={true}
            />
          </>
        )}
      </div>
    </div>
  );
};
