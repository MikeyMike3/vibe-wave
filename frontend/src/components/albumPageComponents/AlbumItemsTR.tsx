import { formatTime } from '../../functions/formatTime';
import { AlbumTrackInfo } from './AlbumTrackInfo';

type AlbumItemsTR = {
  position: number;
  trackName: string | undefined;
  artists: SpotifyApi.ArtistObjectSimplified[];
  trackLength: number | undefined;
  track: SpotifyApi.TrackObjectSimplified;
  trackId: string | undefined;
};

export const AlbumItemsTR = ({
  position,
  trackName,
  artists,
  trackLength,
  track,
  trackId,
}: AlbumItemsTR) => {
  return (
    <tr key={trackId} className="group">
      <td className="p-2 group-hover:text-textPrimary">{position}</td>
      <td className="p-2">
        <AlbumTrackInfo name={trackName} artists={artists} />
      </td>
      <td className="p-2 group-hover:text-textPrimary">{formatTime(trackLength)}</td>
    </tr>
  );
};
