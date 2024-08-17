import { CurrentUserPlaylistImage } from '../types/playlists/currentUserPlaylist';

type UserPlaylistProps = {
  name: string;
  owner: string;
  type: string;
  images: CurrentUserPlaylistImage[] | null;
};

export const UserPlaylist = ({ name, images, owner, type }: UserPlaylistProps) => {
  let image: string;

  if (images) {
    image = images[0].url;
  } else {
    image = 'wasdw';
  }

  return (
    <div className="flex w-full cursor-pointer items-center gap-2 py-2 hover:bg-blue-50">
      <img className="h-20 w-20" src={image} />
      <div className="flex flex-col">
        <p>{name}</p>
        <p>
          {type} + {owner}
        </p>
      </div>
    </div>
  );
};
