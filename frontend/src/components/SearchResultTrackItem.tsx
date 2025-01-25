import { usePlaySkip } from '../hooks/spotifyPlayer/usePlaySkip';

import { SearchedTrackKebabMenu } from './kebabMenu/SearchedTrackKebabMenu';

import { TrackInfo } from './TrackInfo';

type SearchResultTrackItemProps = {
  track: SpotifyApi.TrackObjectFull;
  albumId: string;
};

export const SearchResultTrackItem = ({ track, albumId }: SearchResultTrackItemProps) => {
  const playSkip = usePlaySkip();

  const handleClick = () => {
    playSkip(track.name, { shouldPlaySong: true }, track);
  };

  return (
    <div className="flex w-full items-center justify-between py-2 pl-2 hover:bg-bgAccent">
      <div>
        <button className="text-white" onClick={handleClick}>
          Play
        </button>
        <TrackInfo
          images={track.album.images}
          name={track.name}
          artists={track.artists}
          albumId={albumId}
        />
      </div>
      <div className="flex gap-3 text-white">
        <SearchedTrackKebabMenu track={track} />
      </div>
    </div>
  );
};
