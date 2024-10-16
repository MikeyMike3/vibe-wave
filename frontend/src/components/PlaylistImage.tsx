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

export const PlaylistImage = ({ images, alt, imageUrl }: PlaylistImageProps) => {
  let image;
  if (images) {
    image = getImageUrl(images);
  } else {
    image = imageUrl;
  }

  return <img className="h-80 object-cover pb-5" src={image} alt={`${alt} album cover image.`} />;
};
