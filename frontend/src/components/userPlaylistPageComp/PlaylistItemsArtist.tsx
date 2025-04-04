import { Link } from 'react-router-dom';
import { getImageUrl } from '../../functions/getImageUrl';

type PlaylistItemsArtist = {
  id: string | undefined;
  images: SpotifyApi.ImageObject[] | undefined;
  name: string | undefined;
};

export const PlaylistItemsArtist = ({ id, images, name }: PlaylistItemsArtist) => {
  const image = getImageUrl(images);
  return (
    <Link to={`/artist/${id}`} key={id} className="group flex items-center gap-3">
      <img className="h-12 w-12 rounded-full lg:h-16 lg:w-16" src={image} alt={name} />

      <p className="group-hover:text-aqua group-hover:underline">{name}</p>
    </Link>
  );
};
