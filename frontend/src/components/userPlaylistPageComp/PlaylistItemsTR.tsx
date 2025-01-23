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
      repeatRef.current = 1;
    }

    setPlaylistQueue(currentQueue => {
      if (currentQueue && isPlaylistTrackObjectArray(currentQueue) && currentQueue.length > 0) {
        indexPlaylistQueue(position - 1, 'set');
        unShuffledQueueRef.current = currentQueue;
        if (shuffleTracksRef.current) {
          shuffleTracks({ prevQueue: [...currentQueue] });
        }

        playSongMutation({
          uri: currentQueue[position - 1].track?.uri,
          options: { tempQueue: currentQueue },
        });
      } else {
        console.warn('Incorrect Data Type');
      }

      return currentQueue;
    });
  };

  return (
    <tr key={trackId} className="group">
      <td className="p-2 group-hover:text-textPrimary">
        {position}
        <button onClick={onClick}>Play</button>
      </td>
      <td className="p-2">
        <TrackInfo images={images} name={trackName} artists={artists} />
      </td>
      <td className="p-2 group-hover:text-textPrimary">
        <Link className="hover:text-textPrimary hover:underline" to={`/album/${albumId}`}>
          {albumName}
        </Link>
      </td>
      <td className="p-2 group-hover:text-textPrimary">{formatTime(trackLength)}</td>
      <td className="opacity-0 group-hover:opacity-100">
        {'added_by' in track ? (
          <PlaylistItemKebabMenu track={track} />
        ) : (
          <SearchedTrackKebabMenu track={track.track} />
        )}
      </td>
    </tr>
  );
};
