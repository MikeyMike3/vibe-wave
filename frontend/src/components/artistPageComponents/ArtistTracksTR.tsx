import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { formatTime } from '../../functions/formatTime';
import { SearchedTrackKebabMenu } from '../kebabMenu/SearchedTrackKebabMenu';
import { TrackInfo } from '../TrackInfo';
import { usePlaySkip } from '../../hooks/spotifyPlayer/usePlaySkip';

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
  const playSkip = usePlaySkip();

  return (
    <tr key={trackId} className="group">
      <td className="w-4 p-2 group-hover:text-textPrimary">
        <span className="w-4 group-hover:hidden">{position}</span>

        <button
          className="hidden w-4 group-hover:block"
          onClick={() => playSkip(trackName, { shouldPlaySong: true }, track)}
        >
          <FontAwesomeIcon icon={faPlay} className="text-xl text-magenta" />
        </button>
      </td>
      <td className="p-2">
        <TrackInfo images={images} name={trackName} artists={artists} albumId={album?.id} />
      </td>
      <td className="hidden p-2 group-hover:text-aqua xl:table-cell">
        <Link
          className="line-clamp-1 hidden hover:underline xl:inline-block"
          to={`/album/${album?.id}`}
        >
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
