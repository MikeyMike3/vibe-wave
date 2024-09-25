import { PlaylistQueueKebabMenu } from '../kebabMenu/PlaylistQueueKebabMenu';
import { TrackInfo } from '../TrackInfo';

type QueueItemProps = {
  name: string | undefined;
  images: SpotifyApi.ImageObject[] | Spotify.Image[] | undefined;
  artists: SpotifyApi.ArtistObjectSimplified[] | Spotify.Entity[] | undefined;
  track?: SpotifyApi.TrackObjectFull | SpotifyApi.PlaylistTrackObject | undefined;
  currentlyPlaying?: boolean;
};

export const QueueItem = ({ name, images, artists, track, currentlyPlaying }: QueueItemProps) => {
  return (
    <div className="flex justify-between">
      <TrackInfo name={name} images={images} artists={artists} shouldAddPadding={true} />
      <div className="flex items-center gap-3">
        {!currentlyPlaying && (
          <>{track && 'track' in track ? <PlaylistQueueKebabMenu track={track} /> : <p>d</p>}</>
        )}
      </div>
    </div>
  );
};
