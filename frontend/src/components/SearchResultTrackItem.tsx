import { getImageUrl } from '../functions/getImageUrl';

type SearchResultTrackItemProps = {
  item: string;
  images: SpotifyApi.ImageObject[];
};

export const SearchResultTrackItem = ({ item, images }: SearchResultTrackItemProps) => {
  const image = getImageUrl(images);

  return (
    <div className="flex gap-3">
      <img className="w-" src={image} />
      <p>{item}</p>
    </div>
  );
};
