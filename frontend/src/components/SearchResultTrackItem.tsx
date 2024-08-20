import { getImageUrl } from '../functions/getImageUrl';

type SearchResultTrackItemProps = {
  name: string;
  images: SpotifyApi.ImageObject[];
  artists: SpotifyApi.ArtistObjectSimplified[];
  uri: string;
};

export const SearchResultTrackItem = ({
  name,
  images,
  artists,
  uri,
}: SearchResultTrackItemProps) => {
  const image = getImageUrl(images);
  return (
    <div className="flex w-full items-center gap-2 py-2 hover:bg-blue-50">
      <img className="h-20 w-20" src={image} />
      <div className="flex flex-col">
        <p>{name}</p>
        <p>{artists.map(item => item.name).join(', ')}</p>
        <p>{uri} </p>
      </div>
    </div>
  );
};
