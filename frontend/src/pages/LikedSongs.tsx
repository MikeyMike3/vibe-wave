import { ErrorMessage } from '../components/ErrorMessage';
import { SearchedTrackKebabMenu } from '../components/kebabMenu/SearchedTrackKebabMenu';
import { MainLoading } from '../components/MainLoading';
import { PlayLikedTracksButton } from '../components/PlayLikedTracksButton';
import { TrackInfo } from '../components/TrackInfo';
import { getImageUrl } from '../functions/getImageUrl';
import { useFetchSavedTracks } from '../hooks/apis/useFetchSavedTracks';

export const LikedSongs = () => {
  const { savedTracks, isLoading, isError } = useFetchSavedTracks();

  if (isLoading) {
    return <MainLoading />;
  }

  if (isError) {
    return <ErrorMessage />;
  }

  const image = getImageUrl(savedTracks?.items[0].track.album.images);

  return (
    <div className="text-white">
      <div className="flex items-end gap-6 pb-4">
        <img className="h-72 w-72" src={image} />
        <div>
          <p className="text-textPrimary">Playlist</p>
          <h1 className="pb-6 text-8xl font-bold text-textPrimary">Liked Songs</h1>
          <p className="text-textAccent">{savedTracks?.items.length} Songs</p>
        </div>
      </div>
      <PlayLikedTracksButton likedTracks={savedTracks?.items} />
      {savedTracks?.items.map(item => (
        <div
          key={item.track?.id}
          className="flex w-full items-center justify-between py-2 pl-2 hover:bg-bgAccent"
        >
          <TrackInfo
            images={item.track.album.images}
            name={item.track.name}
            artists={item.track.artists}
          />
          <SearchedTrackKebabMenu track={item.track} />
        </div>
      ))}
    </div>
  );
};
