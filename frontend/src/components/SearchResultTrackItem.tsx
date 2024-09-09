import { getImageUrl } from '../functions/getImageUrl';
import { AddToFrontOfPriorityQueueButton } from './AddToFrontOfPriorityQueueButton';
import { AddToQueueButton } from './AddToQueueButton';
import PlaySongButton from './PlaySongButton';

type SearchResultTrackItemProps = {
  track: SpotifyApi.TrackObjectFull;
};

export const SearchResultTrackItem = ({ track }: SearchResultTrackItemProps) => {
  const image = getImageUrl(track.album.images);

  return (
    <div className="flex w-full items-center justify-between py-2 hover:bg-blue-50">
      <div className="flex items-center gap-2">
        <img className="h-20 w-20" src={image} />
        <div className="flex flex-col">
          <p>{track.name}</p>
          <p>{track.artists.map(item => item.name).join(', ')}</p>
        </div>
      </div>
      <div className="flex gap-3">
        <AddToQueueButton track={track} />
        <AddToFrontOfPriorityQueueButton track={track} />
        <PlaySongButton uri={track.uri} />
      </div>
    </div>
  );
};
