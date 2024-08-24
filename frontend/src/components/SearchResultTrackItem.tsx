import { getImageUrl } from '../functions/getImageUrl';
import { AddToQueueButton } from './AddToQueueButton';
import PlaySongButton from './PlaySongButton';

type SearchResultTrackItemProps = {
  name: string;
  images: SpotifyApi.ImageObject[];
  artists: SpotifyApi.ArtistObjectSimplified[];
  uri: string;
};

export const SearchResultTrackItem = ({
  name,
  images,
  artists,
  uri,
}: SearchResultTrackItemProps) => {
  const image = getImageUrl(images);

  return (
    <div className="flex w-full items-center justify-between py-2 hover:bg-blue-50">
      <div className="flex items-center gap-2">
        <img className="h-20 w-20" src={image} />
        <div className="flex flex-col">
          <p>{name}</p>
          <p>{artists.map(item => item.name).join(', ')}</p>
        </div>
      </div>
      <div className="flex gap-3">
        <AddToQueueButton />
        <PlaySongButton uri={uri} />
      </div>
    </div>
  );
};
