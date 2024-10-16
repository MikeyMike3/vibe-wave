import { AlbumTrackWithImage } from '../types/AlbumTrackWithImage';
import { AlbumTrackInfo } from './albumPageComponents/AlbumTrackInfo';
import { PriorityQueueKebabMenu } from './kebabMenu/PriorityQueueKebabMenu';

type AlbumTrackQueueItemProps = {
  name: string | undefined;
  image: string;
  artists: SpotifyApi.ArtistObjectSimplified[];
  //prettier-ignore
  queueDisplayRef: React.RefObject<HTMLDivElement>;
  isPriorityQueueItem?: boolean;
  track: AlbumTrackWithImage;
  currentlyPlaying?: boolean;
};

export const AlbumTrackQueueItem = ({
  name,
  image,
  artists,
  track,
  currentlyPlaying,
  queueDisplayRef,
  isPriorityQueueItem,
}: AlbumTrackQueueItemProps) => {
  return (
    <div className="flex w-full items-center justify-between py-2 pl-2 hover:bg-bgAccent">
      <AlbumTrackInfo name={name} image={image} artists={artists} />
      <div className="flex items-center gap-3">
        {!currentlyPlaying && isPriorityQueueItem && (
          <PriorityQueueKebabMenu queueDisplayRef={queueDisplayRef} track={track} />
        )}
      </div>
    </div>
  );
};
