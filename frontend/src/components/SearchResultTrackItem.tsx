import { AddToFrontOfPriorityQueueButton } from './AddToFrontOfPriorityQueueButton';
import { AddToQueueButton } from './AddToQueueButton';
import PlaySongButton from './PlaySongButton';
import { TrackInfo } from './TrackInfo';

type SearchResultTrackItemProps = {
  track: SpotifyApi.TrackObjectFull;
};

export const SearchResultTrackItem = ({ track }: SearchResultTrackItemProps) => {
  return (
    <div className="flex w-full items-center justify-between py-2 pl-2 hover:bg-bgAccent">
      <TrackInfo images={track.album.images} name={track.name} artists={track.artists} />
      <div className="flex gap-3 text-white">
        <AddToQueueButton track={track} />
        <AddToFrontOfPriorityQueueButton track={track} />
        <PlaySongButton uri={track.uri} />
      </div>
    </div>
  );
};
