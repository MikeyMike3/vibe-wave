import { TrackInfo } from '../TrackInfo';
type QueueItemProps = {
  name: string | undefined;
  images: SpotifyApi.ImageObject[] | Spotify.Image[] | undefined;
  artists: SpotifyApi.ArtistObjectSimplified[] | Spotify.Entity[] | undefined;
};

export const QueueItem = ({ name, images, artists }: QueueItemProps) => {
  return (
    <>
      {/* Implement queue buttons within this QueueItems component */}
      <TrackInfo name={name} images={images} artists={artists} />
    </>
  );
};
