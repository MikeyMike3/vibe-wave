import { Link } from 'react-router-dom';

type AlbumTrackInfoProps = {
  name: string | undefined;
  artists: SpotifyApi.ArtistObjectSimplified[];
  image?: string | undefined;
};

export const AlbumTrackInfo = ({ name, artists, image }: AlbumTrackInfoProps) => {
  return (
    <div className="flex items-center gap-2">
      {image && <img loading="lazy" className="h-20 w-20 rounded-md object-cover" src={image} />}

      <div className="flex flex-col">
        <p className="text-smTitle text-textPrimary group-hover:text-aqua">{name}</p>

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
