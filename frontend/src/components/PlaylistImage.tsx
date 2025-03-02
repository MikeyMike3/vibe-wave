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
  responsiveImage?: boolean;
  alt: string | undefined;
};

export const PlaylistImage = ({ images, alt, responsiveImage }: PlaylistImageProps) => {
  const image = getImageUrl(images);

  return (
    <img
      className={`${responsiveImage ? 'h-48 w-48 sm:mx-0 md:h-80 md:w-80' : 'w-full object-cover'}`}
      src={image}
      alt={`${alt} album cover image.`}
    />
  );
};
