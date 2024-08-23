import { getImageUrl } from '../functions/getImageUrl';
import { useSpotifyPlayerContext } from '../hooks/context/useSpotifyPlayerContext';
import { playSong } from '../apis/spotifyPlayer/playSong';

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
  const { player, deviceId } = useSpotifyPlayerContext();

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
        <button>Add to Queue</button>
        <button onClick={() => playSong(player, deviceId, uri)}>Play</button>
      </div>
    </div>
  );
};
