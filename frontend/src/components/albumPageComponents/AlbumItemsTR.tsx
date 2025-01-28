import { formatTime } from '../../functions/formatTime';
import { AlbumTrackWithImage } from '../../types/AlbumTrackWithImage';
import { AlbumItemKebabMenu } from '../kebabMenu/AlbumItemKebabMenu';
import { AlbumTrackInfo } from './AlbumTrackInfo';

type AlbumItemsTR = {
  position: number;
  trackName: string | undefined;
  artists: SpotifyApi.ArtistObjectSimplified[];
  trackLength: number | undefined;
  track: SpotifyApi.TrackObjectSimplified;
  trackId: string | undefined;
  image: string;
};

export const AlbumItemsTR = ({
  position,
  trackName,
  artists,
  trackLength,
  track,
  trackId,
  image,
}: AlbumItemsTR) => {
  const albumTrackWithImage: AlbumTrackWithImage = {
    ...track, // Spread the original track properties
    image: image, // Add the image property
  };
  return (
    <tr key={trackId} className="group">
      <td className="p-2 group-hover:text-aqua">{position}</td>
      <td className="p-2">
        <AlbumTrackInfo name={trackName} artists={artists} />
      </td>
      <td className="p-2 group-hover:text-aqua">{formatTime(trackLength)}</td>
      <td className="opacity-0 group-hover:opacity-100">
        <AlbumItemKebabMenu track={albumTrackWithImage} />
      </td>
    </tr>
  );
};
