import { getImageUrl } from '../functions/getImageUrl';

type TrackInfoProps = {
  images: SpotifyApi.ImageObject[] | Spotify.Image[] | undefined;
  name: string | undefined;
  artists: SpotifyApi.ArtistObjectSimplified[] | Spotify.Entity[] | undefined;
  shouldAddPadding?: boolean;
};

export const TrackInfo = ({ images, name, artists, shouldAddPadding = false }: TrackInfoProps) => {
  const image = getImageUrl(images);

  return (
    <div>
      <div className={`${shouldAddPadding && 'py-2'} flex items-center gap-2`}>
        <img className="h-20 w-20" src={image} />
        <div className="flex flex-col">
          <p className="text-smTitle text-textPrimary">{name}</p>
          <p className="text-textAccent text-base">{artists?.map(item => item.name).join(', ')}</p>
        </div>
      </div>
    </div>
  );
};
