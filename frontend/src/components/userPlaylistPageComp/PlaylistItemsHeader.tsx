import { Link } from 'react-router-dom';

type PlaylistItemsHeaderProps = {
  playlistName: string | undefined;
  playlistOwnerName: string | undefined;
  playlistLength: number | undefined;
  playlistTotalTime: string | undefined;
  artistId?: string;
};

export const PlaylistItemsHeader = ({
  playlistName,
  playlistOwnerName,
  playlistLength,
  playlistTotalTime,
  artistId,
}: PlaylistItemsHeaderProps) => {
  return (
    <>
      <h1 className="text-5xl font-semibold text-textPrimary">{playlistName}</h1>
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
