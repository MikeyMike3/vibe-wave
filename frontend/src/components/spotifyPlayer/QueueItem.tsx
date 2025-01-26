import { PlaylistQueueKebabMenu } from '../kebabMenu/PlaylistQueueKebabMenu';
import { PriorityQueueKebabMenu } from '../kebabMenu/PriorityQueueKebabMenu';
import { TrackInfo } from '../TrackInfo';

type QueueItemProps = {
  name: string | undefined;
  images: SpotifyApi.ImageObject[] | Spotify.Image[] | undefined;
  artists: SpotifyApi.ArtistObjectSimplified[] | Spotify.Entity[] | undefined;
  //prettier-ignore
  queueDisplayRef: React.RefObject<HTMLDivElement>;
  isPriorityQueueItem?: boolean;
  track?: SpotifyApi.TrackObjectFull | SpotifyApi.PlaylistTrackObject | undefined;
  currentlyPlaying?: boolean;
  albumId: string | undefined;
};

export const QueueItem = ({
  name,
  images,
  artists,
  track,
  currentlyPlaying,
  queueDisplayRef,
  isPriorityQueueItem,
  albumId,
}: QueueItemProps) => {
  return (
    <div className="flex w-full items-center justify-between py-2 pl-2 hover:bg-bgAccent">
      <TrackInfo name={name} images={images} artists={artists} albumId={albumId} />
      <div className="flex items-center gap-3">
        {!currentlyPlaying && (
          <>
            {isPriorityQueueItem && track ? (
              <PriorityQueueKebabMenu queueDisplayRef={queueDisplayRef} track={track} />
            ) : (
              track &&
              'track' in track && (
                <PlaylistQueueKebabMenu queueDisplayRef={queueDisplayRef} track={track} />
              )
            )}
          </>
        )}
      </div>
    </div>
  );
};
