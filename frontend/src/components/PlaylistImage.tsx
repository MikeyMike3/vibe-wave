import { getImageUrl } from '../functions/getImageUrl';

type PlaylistImageProps = {
  images?:
    | {
        url: string;
        height: number | null;
        width: number | null;
      }[]
    | undefined;
  imageUrl?: string;
  alt: string | undefined;
};

export const PlaylistImage = ({ images, alt }: PlaylistImageProps) => {
  const image = getImageUrl(images);

  return <img className="w-full object-cover" src={image} alt={`${alt} album cover image.`} />;
};
