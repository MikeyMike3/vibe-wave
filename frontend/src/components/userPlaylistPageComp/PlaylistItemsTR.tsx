import { Link } from 'react-router-dom';
import { TrackInfo } from '../TrackInfo';
import { formatTime } from '../../functions/formatTime';
import { PlaylistItemKebabMenu } from '../kebabMenu/PlaylistItemKebabMenu';
import { SearchedTrackKebabMenu } from '../kebabMenu/SearchedTrackKebabMenu';
import { useQueueContext } from '../../hooks/context/useQueueContext';
import { useIndexPlaylistQueue } from '../../hooks/spotifyPlayer/useIndexPlaylistQueue';
import { usePlaySong } from '../../hooks/spotifyPlayer/usePlaySong';
import { useShuffleTracks } from '../../hooks/spotifyPlayer/useShuffleTracks';
import { usePlaybackContext } from '../../hooks/context/usePlaybackContext';
import { isPlaylistTrackObjectArray } from '../../types/typeGuards/isPlaylistTrackObjectArray';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@awesome.me/kit-71c07605c0/icons/sharp/solid';
import { addToPlaylistQueueSessionStorage } from '../../functions/sessionStorage/playlistQueue/addToPlaylistQueueSessionStorage';
import { addRepeatRefSessionStorage } from '../../functions/sessionStorage/playback/repeat/addRepeatRefToSessionStorage';

type PlaylistItemsTR = {
  position: number;
  images?: SpotifyApi.ImageObject[] | Spotify.Image[] | undefined;
  trackName: string | undefined;
  artists: SpotifyApi.ArtistObjectSimplified[] | Spotify.Entity[] | undefined;
  albumId: string | undefined;
  albumName?: string | undefined;
  trackLength: number | undefined;
  track: SpotifyApi.PlaylistTrackObject | SpotifyApi.SavedTrackObject;
  trackId: string | undefined;
  playlistArray: SpotifyApi.PlaylistTrackObject[] | undefined;
  filteredPlaylist: SpotifyApi.PlaylistTrackObject[] | undefined;
  playlistName?: string;
  playlistId?: string;
};

export const PlaylistItemsTR = ({
  position,
  images,
  trackName,
  artists,
  albumId,
  albumName,
  trackLength,
  track,
  trackId,
  playlistArray,
  playlistName,
  playlistId,
  filteredPlaylist,
}: PlaylistItemsTR) => {
  const { setPlaylistName, shuffleTracksRef, repeatRef, setRepeat, setPlaylistId } =
    usePlaybackContext();
  const { setPlaylistQueue, unShuffledQueueRef } = useQueueContext();
  const shuffleTracks = useShuffleTracks();
  const playSongMutation = usePlaySong();
  const indexPlaylistQueue = useIndexPlaylistQueue();

  const onClick = () => {
    setPlaylistQueue(playlistArray);
    setPlaylistName(playlistName || 'Liked Songs');
    if (playlistId) {
      setPlaylistId(playlistId);
    }

    if (repeatRef.current === 2) {
      setRepeat(1);
      addRepeatRefSessionStorage(1);
      repeatRef.current = 1;
    }

    setPlaylistQueue(currentQueue => {
      if (currentQueue && isPlaylistTrackObjectArray(currentQueue) && currentQueue.length > 0) {
        let indexValue = position - 1;
        // this finds the correct index of whichever track the user plays
        // when they search for a track within a playlist
        if (filteredPlaylist && filteredPlaylist?.length > 0) {
          const itemIndex = currentQueue.findIndex(
            item => item.track?.id === filteredPlaylist[indexValue].track?.id,
          );
          indexValue = itemIndex;
        }
        indexPlaylistQueue(indexValue, 'set');
        unShuffledQueueRef.current = currentQueue;
        if (shuffleTracksRef.current) {
          shuffleTracks({ prevQueue: [...currentQueue], dontPlaySong: true });
        }

        playSongMutation({
          uri: currentQueue[indexValue].track?.uri,
          options: { tempQueue: currentQueue },
        });
      } else {
        console.warn('Incorrect Data Type');
      }
      addToPlaylistQueueSessionStorage(currentQueue);
      return currentQueue;
    });
  };

  return (
    <tr key={trackId} className="h-f group">
      <td className="hidden w-4 p-2 group-hover:text-textPrimary sm:table-cell">
        <span className="w-4 group-hover:hidden">{position}</span>

        <button className="hidden w-4 group-hover:block" onClick={onClick}>
          <FontAwesomeIcon icon={faPlay} className="text-xl text-magenta" />
        </button>
      </td>
      <td className="p-2">
        <TrackInfo images={images} name={trackName} artists={artists} albumId={albumId} />
      </td>
      <td className="hidden p-2 group-hover:text-aqua xl:table-cell">
        <Link
          className="line-clamp-1 hidden hover:underline xl:inline-block"
          to={`/album/${albumId}`}
        >
          {albumName}
        </Link>
      </td>
      <td className="p-2 group-hover:text-aqua">{formatTime(trackLength)}</td>
      <td className="opacity-100 group-hover:opacity-100 lg:opacity-0">
        {'added_by' in track ? (
          <PlaylistItemKebabMenu track={track} />
        ) : (
          <SearchedTrackKebabMenu track={track.track} />
        )}
      </td>
    </tr>
  );
};
