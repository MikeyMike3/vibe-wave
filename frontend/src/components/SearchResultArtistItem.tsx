import { Link } from 'react-router-dom';
import { getImageUrl } from '../functions/getImageUrl';

type SearchResultArtistItemProps = {
  artist: SpotifyApi.ArtistObjectFull;
  artistId: string;
};

export const SearchResultArtistItem = ({ artist, artistId }: SearchResultArtistItemProps) => {
  const image = getImageUrl(artist.images);

  return (
    <Link
      to={`${artistId}`}
      className="w-64 flex-shrink-0 rounded-xl py-4 duration-150 hover:bg-bgAccent"
    >
      <img className="mx-auto h-64 w-full rounded-full object-cover px-2" src={image} />
      <p className="pt-3 text-center text-textPrimary">{artist.name}</p>
    </Link>
  );
};
