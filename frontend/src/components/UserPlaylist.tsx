import { Link } from 'react-router-dom';

type UserPlaylistProps = {
  name: string;
  owner: string | undefined;
  type: string;
  images: SpotifyApi.ImageObject[];
};

export const UserPlaylist = ({ name, images, owner, type }: UserPlaylistProps) => {
  let image: string;

  if (images) {
    image = images[0].url;
  } else {
    image = 'wasdw';
  }

  return (
    <Link to={'/party-mode/search'}>
      <div className="flex w-full items-center gap-2 py-2 hover:bg-blue-50">
        <img className="h-20 w-20" src={image} />
        <div className="flex flex-col">
          <p>{name}</p>
          <p>
            {type} + {owner}
          </p>
        </div>
      </div>
    </Link>
  );
};
