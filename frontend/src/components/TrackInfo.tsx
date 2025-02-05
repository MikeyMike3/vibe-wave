import { Link } from 'react-router-dom';
import { getImageUrl } from '../functions/getImageUrl';

type TrackInfoProps = {
  images: SpotifyApi.ImageObject[] | Spotify.Image[] | undefined;
  name: string | undefined;
  artists: SpotifyApi.ArtistObjectSimplified[] | Spotify.Entity[] | undefined;

  shouldAddPadding?: boolean;
  albumId: string | undefined;
};

function isArtistObjectSimplified(
  item: SpotifyApi.ArtistObjectSimplified | Spotify.Entity,
): item is SpotifyApi.ArtistObjectSimplified {
  return (item as SpotifyApi.ArtistObjectSimplified).id !== undefined;
}

export const TrackInfo = ({
  images,
  name,
  artists,
  shouldAddPadding = false,
  albumId,
}: TrackInfoProps) => {
  const image = getImageUrl(images);

  return (
    <>
      <div className={`${shouldAddPadding && 'py-2'} flex items-center gap-2`}>
        <img loading="lazy" className="h-20 w-20 rounded-md object-cover" src={image} />
        <div className="flex flex-col">
          <Link
            to={`/album/${albumId}`}
            className="text-smTitle text-textPrimary hover:underline group-hover:text-aqua"
          >
            {name}
          </Link>

          <span className="text-textAccent">
            {artists?.map((item, index) => {
              let artistId;

              if (isArtistObjectSimplified(item)) {
                artistId = item.id;
              } else {
                const arraySplit = item.uri.split(':');
                artistId = arraySplit[2];
              }

              return (
                <span key={artistId}>
                  <Link
                    className="text-textAccent hover:text-textPrimary hover:underline group-hover:text-[#00CCCC]"
                    to={`/artist/${artistId}`}
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
    </>
  );
};
