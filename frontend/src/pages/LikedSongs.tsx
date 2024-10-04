import { ErrorMessage } from '../components/ErrorMessage';
import { SearchedTrackKebabMenu } from '../components/kebabMenu/SearchedTrackKebabMenu';
import { MainLoading } from '../components/MainLoading';
import { PlayLikedTracksButton } from '../components/PlayLikedTracksButton';
import { TrackInfo } from '../components/TrackInfo';
import { useFetchSavedTracks } from '../hooks/apis/useFetchSavedTracks';

export const LikedSongs = () => {
  const { savedTracks, isLoading, isError } = useFetchSavedTracks();

  if (isLoading) {
    return <MainLoading />;
  }

  if (isError) {
    return <ErrorMessage />;
  }

  return (
    <div className="text-white">
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
