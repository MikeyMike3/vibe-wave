import { useQueueContext } from '../../hooks/context/useQueueContext';
import { QueueItem } from './QueueItem';
import { usePlaybackContext } from '../../hooks/context/usePlaybackContext';
import { faX } from '@awesome.me/kit-71c07605c0/icons/sharp/regular';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { AlbumTrackWithImage } from '../../types/AlbumTrackWithImage';
import { AlbumTrackQueueItem } from '../AlbumTrackQueueItem';
import { isPlaylistTrackObjectArray } from '../../types/typeGuards/isPlaylistTrackObjectArray';
import { isSingleAlbumResponse } from '../../types/typeGuards/isSIngleAlbumResponse';
import { useDynamicImageBgColorContext } from '../../hooks/context/useDynamicImageBgColorContext';

type QueueDisplayProps = {
  queueSegment: SpotifyApi.PlaylistTrackObject[] | SpotifyApi.SingleAlbumResponse;
  //prettier-ignore
  setIsQueueSegmentOpen: React.Dispatch<React.SetStateAction<boolean>>
};

export const QueueDisplay = ({ queueSegment, setIsQueueSegmentOpen }: QueueDisplayProps) => {
  const { priorityQueue, playlistQueue } = useQueueContext();
  const { playerState, playlistName, playlistId } = usePlaybackContext();

  const { dynamicImageBgColorDark } = useDynamicImageBgColorContext();

  const queueDisplayRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={queueDisplayRef}
      className="absolute bottom-[112px] right-6 h-[500px] w-[500px] overflow-y-scroll rounded-2xl border-2 border-bgAccentHover"
      style={{ backgroundColor: `${dynamicImageBgColorDark}` }}
    >
      <div className="w-full px-2">
        {playerState?.track_window.current_track && (
          <>
            <div className="flex items-center justify-between">
              <h2 className="py-2 text-xl text-textPrimary"> Currently Playing</h2>
              <button className="p-2 text-xl" onClick={() => setIsQueueSegmentOpen(false)}>
                <FontAwesomeIcon className="p-2 duration-150 hover:text-aqua" icon={faX} />
              </button>
            </div>
            <div className="pb-2">
              <QueueItem
                key={playerState.track_window.current_track.id}
                queueDisplayRef={queueDisplayRef}
                name={playerState.track_window.current_track.name}
                images={playerState.track_window.current_track.album.images}
                artists={playerState.track_window.current_track.artists}
                currentlyPlaying={true}
              />
            </div>
          </>
        )}

        {priorityQueue && priorityQueue?.length > 0 && (
          <>
            <h2 className="pb-2 text-xl text-textPrimary">Next in Queue</h2>
            <div className="py-2">
              {priorityQueue.map((item, index) => {
                const isTrackObjectFull = (
                  item: SpotifyApi.TrackObjectFull | AlbumTrackWithImage,
                ): item is SpotifyApi.TrackObjectFull => {
                  return 'album' in item;
                };

                if (isTrackObjectFull(item)) {
                  return (
                    <QueueItem
                      key={`${item.id}-${index}`}
                      queueDisplayRef={queueDisplayRef}
                      isPriorityQueueItem={true}
                      name={item.name}
                      images={item.album.images}
                      artists={item.artists}
                      track={item}
                    />
                  );
                } else {
                  return (
                    <AlbumTrackQueueItem
                      key={`${item.id}-${index}`}
                      queueDisplayRef={queueDisplayRef}
                      isPriorityQueueItem={true}
                      name={item.name}
                      image={item.image}
                      artists={item.artists}
                      track={item}
                    />
                  );
                }
              })}
            </div>
          </>
        )}
        {playlistQueue &&
          isPlaylistTrackObjectArray(playlistQueue) &&
          isPlaylistTrackObjectArray(queueSegment) &&
          playlistQueue.length > 0 && (
            <>
              <h2 className="pb-2 text-xl text-textPrimary">
                Next Up from: {''}
                <Link className="hover:underline" to={`/playlists/${playlistId}`}>
                  {playlistName}
                </Link>
              </h2>

              <div className="py-2">
                {queueSegment.map((item, index) => (
                  <QueueItem
                    key={`${item.track?.id}-${index}`}
                    queueDisplayRef={queueDisplayRef}
                    name={item.track?.name}
                    images={item.track?.album.images}
                    artists={item.track?.artists}
                    track={item}
                  />
                ))}
              </div>
            </>
          )}
        {playlistQueue &&
          isSingleAlbumResponse(playlistQueue) &&
          isSingleAlbumResponse(queueSegment) &&
          playlistQueue.tracks.items.length > 0 && (
            <>
              <h2 className="pb-2 text-xl text-textPrimary">
                Next Up from:{' '}
                <Link className="hover:underline" to={`/album/${playlistQueue.id}`}>
                  {playlistQueue.name}
                </Link>
              </h2>

              <div className="py-2">
                {queueSegment.tracks.items.map((item, index) => (
                  <AlbumTrackQueueItem
                    key={`${item.id}-${index}`}
                    queueDisplayRef={queueDisplayRef}
                    name={item.name}
                    image={queueSegment.images[0].url}
                    artists={item.artists}
                    track={item as AlbumTrackWithImage}
                  />
                ))}
              </div>
            </>
          )}
      </div>
    </div>
  );
};
