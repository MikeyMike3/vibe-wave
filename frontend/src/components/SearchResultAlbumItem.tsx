import { Link } from 'react-router-dom';
import { getImageUrl } from '../functions/getImageUrl';

type SearchResultAlbumItemProps = {
  album: SpotifyApi.AlbumObjectSimplified;
};

export const SearchResultAlbumItem = ({ album }: SearchResultAlbumItemProps) => {
  const image = getImageUrl(album?.images);

  return (
    <Link
      to={'/album'}
      className="relative z-50 w-full rounded-xl p-4 duration-150 hover:bg-bgAccent"
    >
      {/* Need to add dynamic coloring to the div be below so that the color matches the album cover*/}
      <div className="absolute left-[12%] top-2 -z-[1] mx-auto h-4 w-3/4 rounded-md bg-white" />
      <img className="rounded-xl" src={image} />
      <p className="pt-3 text-center text-textPrimary">{album?.name}</p>
    </Link>
  );
};
