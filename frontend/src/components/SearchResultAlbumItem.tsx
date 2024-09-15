import { Link } from 'react-router-dom';
import { getImageUrl } from '../functions/getImageUrl';
import { findAlbumReleaseDate } from '../functions/FindAlbumReleaseDate';

type SearchResultAlbumItemProps = {
  album: SpotifyApi.AlbumObjectSimplified;
};

export const SearchResultAlbumItem = ({ album }: SearchResultAlbumItemProps) => {
  const image = getImageUrl(album?.images);
  const albumReleaseDate = findAlbumReleaseDate(album.release_date);

  return (
    <Link
      to={'/album'}
      className="relative z-50 w-64 flex-shrink-0 rounded-xl p-4 duration-150 hover:bg-bgAccent"
    >
      {/* Need to add dynamic coloring to the div be below so that the color matches the album cover*/}
      <div className="absolute left-[12%] top-2 -z-[1] mx-auto h-4 w-3/4 rounded-md bg-white" />
      <img className="w-64 rounded-xl object-cover" src={image} />
      <p className="py-3 text-textPrimary">{album?.name}</p>
      <p className="text-textAccent">
        {albumReleaseDate} &#8226; {album.artists[0].name}
      </p>
    </Link>
  );
};
