import { formatTimeInHours } from '../../functions/formatTimeInHours';

type PlaylistDetails = {
  name: string;
  owner: {
    display_name: string;
  };
  images: {
    url: string;
    height: number | null;
    width: number | null;
  }[];
  description: string;
};

type PlaylistItemsHeaderProps = {
  playlistDetails: PlaylistDetails | undefined;
  playlistItems: SpotifyApi.PlaylistTrackResponse | undefined;
};

export const PlaylistItemsHeader = ({
  playlistDetails,
  playlistItems,
}: PlaylistItemsHeaderProps) => {
  return (
    <>
      <h1 className="text-5xl font-semibold text-textPrimary">{playlistDetails?.name}</h1>
      <p className="text-textAccent">
        By: <span className="text-textPrimary">{playlistDetails?.owner.display_name}</span>{' '}
        <span className="text-textPrimary">&#8226;</span> {playlistItems?.items.length} songs
        <span className="text-textPrimary"> &#8226;</span> {formatTimeInHours(playlistItems?.items)}
      </p>
    </>
  );
};
