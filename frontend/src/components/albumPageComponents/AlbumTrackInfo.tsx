import { Link } from 'react-router-dom';

type AlbumTrackInfoProps = {
  name: string | undefined;
  artists: SpotifyApi.ArtistObjectSimplified[];
};

export const AlbumTrackInfo = ({ name, artists }: AlbumTrackInfoProps) => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex flex-col">
        <p className="text-smTitle text-textPrimary">{name}</p>

        <span className="text-textAccent">
          {artists?.map((item, index) => {
            return (
              <span key={item.id}>
                <Link
                  className="text-textAccent hover:text-textPrimary hover:underline"
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
