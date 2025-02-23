import { Link } from 'react-router-dom';
import { getImageUrl } from '../functions/getImageUrl';
import { findAlbumReleaseDate } from '../functions/findAlbumReleaseDate';
import { useEffect, useState } from 'react';
import { useGetBackgroundImageColor } from '../hooks/useGetBackgroundImageColor';
import { modifyDynamicBgColor } from '../functions/modifyDynamicBgColor';
import { AlbumPlayButton } from './spotifyPlayer/AlbumPlayButton';

type SearchResultAlbumItemProps = {
  album: SpotifyApi.AlbumObjectSimplified;
};

export const SearchResultAlbumItem = ({ album }: SearchResultAlbumItemProps) => {
  const image = getImageUrl(album?.images);
  const albumReleaseDate = findAlbumReleaseDate(album.release_date);
  const getBackgroundImageColor = useGetBackgroundImageColor();
  const [backgroundColor, setBackgroundColor] = useState<string>('');

  useEffect(() => {
    if (image) {
      (async () => {
        const color = await getBackgroundImageColor(image);
        setBackgroundColor(modifyDynamicBgColor(color, 0.7, 1));
      })();
    }
  }, [image, getBackgroundImageColor, setBackgroundColor]);

  return (
    <Link
      to={`/album/${album.id}`}
      className="group relative z-50 inline-block flex-shrink-0 rounded-xl p-4 duration-150 hover:bg-bgAccent"
    >
      <div
        className="absolute left-[12%] top-2 -z-[1] mx-auto h-4 w-3/4 rounded-md"
        style={{ backgroundColor: `${backgroundColor}` }}
      />

      <div className="relative">
        <img className="w-64 rounded-xl object-cover" src={image} />
        <AlbumPlayButton albumId={album.id} name={album.name} />
      </div>

      <p className="my-2 line-clamp-1 text-textPrimary group-hover:text-aqua">{album?.name}</p>
      <p className="line-clamp-1 text-textAccent group-hover:text-[#00CCCC]">
        {albumReleaseDate} &#8226; {album.artists[0].name}
      </p>
    </Link>
  );
};
