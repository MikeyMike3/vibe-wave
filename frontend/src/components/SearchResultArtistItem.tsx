import { Link } from 'react-router-dom';
import { getImageUrl } from '../functions/getImageUrl';

type SearchResultArtistItemProps = {
  artist: SpotifyApi.ArtistObjectFull;
};

export const SearchResultArtistItem = ({ artist }: SearchResultArtistItemProps) => {
  const image = getImageUrl(artist.images);

  return (
    <Link
      to={'/artist'}
      className="w-64 flex-shrink-0 rounded-xl py-4 duration-150 hover:bg-bgAccent"
    >
      <img className="mx-auto h-64 w-full rounded-full px-2" src={image} />
      <p className="pt-3 text-center text-textPrimary">{artist.name}</p>
    </Link>
  );
};
