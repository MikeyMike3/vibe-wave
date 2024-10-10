import { capitalizeFirstLetterOfEachWord } from '../../functions/capitalizeFirstLetterOfEachWord';

type PlaylistItemsGenresProps = {
  artistInfo:
    | {
        artistData: {
          [artistId: string]: {
            images: SpotifyApi.ImageObject[];
            genres: string[];
          };
        };
        genres: string[];
      }
    | undefined;
};

export const PlaylistItemsGenres = ({ artistInfo }: PlaylistItemsGenresProps) => {
  return (
    <>
      {artistInfo?.genres.slice(0, 3).map(item => (
        <p
          key={item}
          className="rounded-3xl border-2 border-textPrimary px-4 py-2 text-textPrimary"
        >
          {capitalizeFirstLetterOfEachWord(item)}
        </p>
      ))}
    </>
  );
};
