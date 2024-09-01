import { getImageUrl } from '../functions/getImageUrl';

type TrackInfoProps = {
  images: SpotifyApi.ImageObject[];
  name: string;
  artists: SpotifyApi.ArtistObjectSimplified[];
};

export const TrackInfo = ({ images, name, artists }: TrackInfoProps) => {
  const image = getImageUrl(images);

  return (
    <div>
      <div className="flex items-center gap-2">
        <img className="h-20 w-20" src={image} />
        <div className="flex flex-col">
          <p>{name}</p>
          <p>{artists.map(item => item.name).join(', ')}</p>
        </div>
      </div>
    </div>
  );
};
