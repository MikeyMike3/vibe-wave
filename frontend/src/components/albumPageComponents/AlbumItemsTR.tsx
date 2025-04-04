import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formatTime } from '../../functions/formatTime';
import { usePlaybackContext } from '../../hooks/context/usePlaybackContext';
import { useQueueContext } from '../../hooks/context/useQueueContext';
import { useIndexPlaylistQueue } from '../../hooks/spotifyPlayer/useIndexPlaylistQueue';
import { usePlaySong } from '../../hooks/spotifyPlayer/usePlaySong';
import { useShuffleTracks } from '../../hooks/spotifyPlayer/useShuffleTracks';
import { AlbumTrackWithImage } from '../../types/AlbumTrackWithImage';
import { isSingleAlbumResponse } from '../../types/typeGuards/isSIngleAlbumResponse';
import { AlbumItemKebabMenu } from '../kebabMenu/AlbumItemKebabMenu';
import { AlbumTrackInfo } from './AlbumTrackInfo';
import { faPlay } from '@awesome.me/kit-71c07605c0/icons/sharp/solid';
import { addToPlaylistQueueSessionStorage } from '../../functions/sessionStorage/playlistQueue/addToPlaylistQueueSessionStorage';
import { addUnShuffledQueueRefSessionStorage } from '../../functions/sessionStorage/playback/shuffle/addUnShuffledQueueRefSessionStorage';
import { addRepeatRefSessionStorage } from '../../functions/sessionStorage/playback/repeat/addRepeatRefToSessionStorage';
import { getImageUrl } from '../../functions/getImageUrl';

type AlbumItemsTR = {
  position: number;
  trackName: string | undefined;
  artists: SpotifyApi.ArtistObjectSimplified[];
  trackLength: number | undefined;
  track: AlbumTrackWithImage;
  trackId: string | undefined;
  images: Spotify.Image[];
  album: SpotifyApi.SingleAlbumResponse | undefined;
  filteredAlbumItemsArray: SpotifyApi.TrackObjectSimplified[] | undefined;
};

export const AlbumItemsTR = ({
  position,
  trackName,
  artists,
  trackLength,
  track,
  trackId,
  images,
  album,
  filteredAlbumItemsArray,
}: AlbumItemsTR) => {
  const { setPlaylistName, shuffleTracksRef, repeatRef, setRepeat, setPlaylistId } =
    usePlaybackContext();
  const { setPlaylistQueue, unShuffledQueueRef } = useQueueContext();
  const shuffleTracks = useShuffleTracks();
  const playSongMutation = usePlaySong();
  const indexPlaylistQueue = useIndexPlaylistQueue();

  const image = getImageUrl(images);

  const handleClick = () => {
    if (!album) {
      return;
    }

    setPlaylistQueue(album);
    setPlaylistName(album.name);

    setPlaylistId(album.id);

    if (repeatRef.current === 2) {
      setRepeat(1);
      addRepeatRefSessionStorage(1);
      repeatRef.current = 1;
    }

    setPlaylistQueue(currentQueue => {
      if (
        currentQueue &&
        isSingleAlbumResponse(currentQueue) &&
        currentQueue.tracks.items.length > 0
      ) {
        let indexValue = position - 1;
        // this finds the correct index of whichever track the user plays
        // when they search for a track within a playlist
        if (filteredAlbumItemsArray && filteredAlbumItemsArray?.length > 0) {
          const itemIndex = currentQueue.tracks.items.findIndex(
            item => item.id === filteredAlbumItemsArray[indexValue].id,
          );
          indexValue = itemIndex;
        }
        indexPlaylistQueue(indexValue, 'set');
        unShuffledQueueRef.current = currentQueue;
        addUnShuffledQueueRefSessionStorage(unShuffledQueueRef);
        if (shuffleTracksRef.current) {
          shuffleTracks({ prevQueue: currentQueue });
          return;
        }

        playSongMutation({
          uri: currentQueue.tracks.items[indexValue].uri,
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
    <tr key={trackId} className="group">
      <td className="hidden w-4 p-2 sm:table-cell lg:group-hover:text-aqua">
        <span className="w-4 group-hover:hidden">{position}</span>

        <button className="hidden w-4 group-hover:block" onClick={handleClick}>
          <FontAwesomeIcon icon={faPlay} className="text-xl text-magenta" />
        </button>
      </td>
      <td className="p-2">
        <AlbumTrackInfo name={trackName} artists={artists} image={image} />
      </td>
      <td className="p-2 lg:group-hover:text-aqua">{formatTime(trackLength)}</td>
      <td className="opacity-100 group-hover:opacity-100 lg:opacity-0">
        <AlbumItemKebabMenu track={track} />
      </td>
    </tr>
  );
};
