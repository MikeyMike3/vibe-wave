import { getImageUrl } from '../../functions/getImageUrl';
type QueueItemProps = {
  name: string | undefined;
  images: SpotifyApi.ImageObject[] | Spotify.Image[] | undefined;
  artists: SpotifyApi.ArtistObjectSimplified[] | Spotify.Entity[] | undefined;
};

export const QueueItem = ({ name, images, artists }: QueueItemProps) => {
  const image = getImageUrl(images);
  return (
    <div className="flex gap-7 py-2">
      <img src={image} className="h-20 w-20" />
      <div className="flex flex-col justify-center">
        <p className="">{name}</p>
        <p>{artists?.map(item => item.name).join(', ')}</p>
      </div>
    </div>
  );
};
