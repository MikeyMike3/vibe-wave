import { Link } from 'react-router-dom';
import { getImageUrl } from '../functions/getImageUrl';

type TrackInfoProps = {
  images: SpotifyApi.ImageObject[] | Spotify.Image[] | undefined;
  name: string | undefined;
  artists: SpotifyApi.ArtistObjectSimplified[] | Spotify.Entity[] | undefined;
  shouldAddPadding?: boolean;
};

function isArtistObjectSimplified(
  item: SpotifyApi.ArtistObjectSimplified | Spotify.Entity,
): item is SpotifyApi.ArtistObjectSimplified {
  return (item as SpotifyApi.ArtistObjectSimplified).id !== undefined;
}

export const TrackInfo = ({ images, name, artists, shouldAddPadding = false }: TrackInfoProps) => {
  const image = getImageUrl(images);

  return (
    <div>
      <div className={`${shouldAddPadding && 'py-2'} flex items-center gap-2`}>
        <img loading="lazy" className="h-20 w-20 rounded-md object-cover" src={image} />
        <div className="flex flex-col">
          <p className="text-smTitle text-textPrimary">{name}</p>

          <span className="text-textPrimary">
            {artists?.map((item, index) => (
              <div key={isArtistObjectSimplified(item) ? item.id : index}>
                <Link
                  className="text-textAccent hover:text-textPrimary hover:underline"
                  to={`/artist/${isArtistObjectSimplified(item) ? item.id : ''}`}
                >
                  {item.name}
                </Link>
                {index < artists.length - 1 && <span>, </span>}
              </div>
            ))}
          </span>
        </div>
      </div>
    </div>
  );
};
