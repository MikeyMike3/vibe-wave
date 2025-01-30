import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { formatTime } from '../../functions/formatTime';
import { SearchedTrackKebabMenu } from '../kebabMenu/SearchedTrackKebabMenu';
import { TrackInfo } from '../TrackInfo';

type ArtistTracksTR = {
  position: number;
  trackName: string | undefined;
  artists: SpotifyApi.ArtistObjectSimplified[];
  trackLength: number | undefined;
  track: SpotifyApi.TrackObjectFull;
  trackId: string | undefined;
  images?: SpotifyApi.ImageObject[] | Spotify.Image[] | undefined;
  album: SpotifyApi.AlbumObjectSimplified | undefined;
};

export const ArtistTracksTR = ({
  position,
  trackName,
  artists,
  trackLength,
  track,
  trackId,
  images,
  album,
}: ArtistTracksTR) => {
  return (
    <tr key={trackId} className="group">
      <td className="p-2 group-hover:text-textPrimary">
        <span className="w-4 group-hover:hidden">{position}</span>

        <button className="hidden w-4 group-hover:block">
          <FontAwesomeIcon icon={faPlay} className="text-xl text-magenta" />
        </button>
      </td>
      <td className="p-2">
        <TrackInfo images={images} name={trackName} artists={artists} albumId={album?.id} />
      </td>
      <td className="p-2 group-hover:text-aqua">
        <Link className="hover:underline" to={`/album/${album?.id}`}>
          {album?.name}
        </Link>
      </td>
      <td className="p-2 group-hover:text-aqua">{formatTime(trackLength)}</td>
      <td className="opacity-0 group-hover:opacity-100">
        <SearchedTrackKebabMenu track={track} />
      </td>
    </tr>
  );
};
