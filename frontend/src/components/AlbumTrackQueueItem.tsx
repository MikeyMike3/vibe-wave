import { getImageUrl } from '../functions/getImageUrl';
import { AlbumTrackWithImage } from '../types/AlbumTrackWithImage';
import { AlbumTrackInfo } from './albumPageComponents/AlbumTrackInfo';
import { PlaylistQueueKebabMenu } from './kebabMenu/PlaylistQueueKebabMenu';

import { PriorityQueueKebabMenu } from './kebabMenu/PriorityQueueKebabMenu';

type AlbumTrackQueueItemProps = {
  name: string | undefined;
  images: Spotify.Image[];
  artists: SpotifyApi.ArtistObjectSimplified[];
  //prettier-ignore
  queueDisplayRef: React.RefObject<HTMLDivElement>;
  isPriorityQueueItem?: boolean;
  track: AlbumTrackWithImage;
  currentlyPlaying?: boolean;
};

export const AlbumTrackQueueItem = ({
  name,
  images,
  artists,
  track,
  currentlyPlaying,
  queueDisplayRef,
  isPriorityQueueItem,
}: AlbumTrackQueueItemProps) => {
  const image = getImageUrl(images);
  return (
    <div className="group flex w-full items-center justify-between py-2 pl-2">
      <AlbumTrackInfo albumId={track.albumId} name={name} image={image} artists={artists} />
      <div className="flex items-center gap-3">
        {!currentlyPlaying && isPriorityQueueItem && (
          <PriorityQueueKebabMenu queueDisplayRef={queueDisplayRef} track={track} />
        )}
        {!currentlyPlaying && !isPriorityQueueItem && (
          <PlaylistQueueKebabMenu queueDisplayRef={queueDisplayRef} track={track} />
        )}
      </div>
    </div>
  );
};
