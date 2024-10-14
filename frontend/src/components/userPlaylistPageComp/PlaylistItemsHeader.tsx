type PlaylistItemsHeaderProps = {
  playlistName: string | undefined;
  playlistOwnerName: string | undefined;
  playlistLength: number | undefined;
  playlistTotalTime: string | undefined;
};

export const PlaylistItemsHeader = ({
  playlistName,
  playlistOwnerName,
  playlistLength,
  playlistTotalTime,
}: PlaylistItemsHeaderProps) => {
  return (
    <>
      <h1 className="text-5xl font-semibold text-textPrimary">{playlistName}</h1>
      <p className="text-textAccent">
        By: <span className="text-textPrimary">{playlistOwnerName}</span>{' '}
        <span className="text-textPrimary">&#8226;</span> {playlistLength} songs
        <span className="text-textPrimary"> &#8226;</span> {playlistTotalTime}
      </p>
    </>
  );
};
