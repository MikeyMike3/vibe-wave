import { Link } from 'react-router-dom';
import { findAlbumReleaseDate } from '../../functions/findAlbumReleaseDate';

type PlaylistItemsHeaderProps = {
  playlistName: string | undefined;
  playlistOwnerName: string | undefined;
  playlistLength: number | undefined;
  playlistTotalTime: string | undefined;
  artistId?: string;
  albumReleaseDate?: string;
};

export const PlaylistItemsHeader = ({
  playlistName,
  playlistOwnerName,
  playlistLength,
  playlistTotalTime,
  artistId,
  albumReleaseDate,
}: PlaylistItemsHeaderProps) => {
  return (
    <>
      <h1 className="text-3xl font-semibold text-aqua lg:text-5xl">
        {playlistName}
        {albumReleaseDate && ` • ${findAlbumReleaseDate(albumReleaseDate)}`}
      </h1>
      <p className="text-textAccent">
        By:{' '}
        <span className="text-textPrimary">
          {artistId ? (
            <Link className="hover:underline" to={`/artist/${artistId}`}>
              {playlistOwnerName}
            </Link>
          ) : (
            playlistOwnerName
          )}
        </span>{' '}
        <span className="text-textPrimary">&#8226;</span> {playlistLength} songs
        <span className="text-textPrimary"> &#8226;</span> {playlistTotalTime}
      </p>
    </>
  );
};
