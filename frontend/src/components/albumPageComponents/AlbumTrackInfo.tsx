import { Link } from 'react-router-dom';

type AlbumTrackInfoProps = {
  name: string | undefined;
  artists: SpotifyApi.ArtistObjectSimplified[];
  albumId?: string;
  image?: string | undefined;
};

export const AlbumTrackInfo = ({ name, artists, image, albumId }: AlbumTrackInfoProps) => {
  return (
    <div className="flex items-center gap-2">
      {image && <img loading="lazy" className="h-20 w-20 rounded-md object-cover" src={image} />}

      <div className="flex flex-col">
        <Link
          to={`/album/${albumId}`}
          className="text-smTitle text-textPrimary hover:underline group-hover:text-aqua"
        >
          {name}
        </Link>

        <span className="text-textAccent">
          {artists?.map((item, index) => {
            return (
              <span key={item.id}>
                <Link
                  className="text-textAccent hover:text-textPrimary hover:underline group-hover:text-[#00CCCC]"
                  to={`/artist/${item.id}`}
                >
                  {item.name}
                </Link>

                {index < artists.length - 1 && <span>, </span>}
              </span>
            );
          })}
        </span>
      </div>
    </div>
  );
};
