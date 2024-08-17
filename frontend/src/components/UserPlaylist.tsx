import { CurrentUserPlaylistImage } from '../types/playlists/currentUserPlaylist';

type UserPlaylistProps = {
  name: string;
  images: CurrentUserPlaylistImage[] | null;
};

export const UserPlaylist = ({ name, images }: UserPlaylistProps) => {
  let image: string;

  if (images) {
    image = images[0].url;
  } else {
    image = 'wasdw';
  }
  return (
    <div>
      <img src={image} />
      <p>{name}</p>
    </div>
  );
};
