import { Link } from 'react-router-dom';
import { getImageUrl } from '../functions/getImageUrl';

type SearchResultArtistItemProps = {
  artist: SpotifyApi.ArtistObjectFull;
  setHeight64?: boolean;
};

export const SearchResultArtistItem = ({ artist, setHeight64 }: SearchResultArtistItemProps) => {
  const image = getImageUrl(artist.images);

  return (
    <Link
      to={`/artist/${artist.id}`}
      className="group inline-block flex-shrink-0 rounded-xl px-2 py-4 duration-150 hover:cursor-grab lg:hover:bg-bgAccent"
    >
      {setHeight64 ? (
        <img src={image} className="mx-auto h-32 w-full rounded-full lg:h-64" />
      ) : (
        <div
          className="relative w-full rounded-full bg-cover bg-center pt-[100%]"
          style={{
            backgroundImage: `url(${image})`,
          }}
        ></div>
      )}

      <p className="line-clamp-1 pt-3 text-center text-textPrimary lg:group-hover:text-aqua">
        {artist.name}
      </p>
    </Link>
  );
};
