import { Link } from 'react-router-dom';
import { TrackInfo } from '../TrackInfo';
import { formatTime } from '../../functions/formatTime';
import { PlaylistItemKebabMenu } from '../kebabMenu/PlaylistItemKebabMenu';

type PlaylistItemsTR = {
  position: number;
  images: SpotifyApi.ImageObject[] | Spotify.Image[] | undefined;
  trackName: string | undefined;
  artists: SpotifyApi.ArtistObjectSimplified[] | Spotify.Entity[] | undefined;
  albumId: string | undefined;
  albumName: string | undefined;
  trackLength: number | undefined;
  track: SpotifyApi.PlaylistTrackObject;
  trackId: string | undefined;
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
}: PlaylistItemsTR) => {
  return (
    <tr key={trackId} className="group">
      <td className="p-2 group-hover:text-textPrimary">{position}</td>
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
        <PlaylistItemKebabMenu track={track} />
      </td>
    </tr>
  );
};
