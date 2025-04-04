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
import { splitAlbumUri } from '../../functions/splitAlbumUri';

type QueueDisplayProps = {
  queueSegment: SpotifyApi.PlaylistTrackObject[] | SpotifyApi.SingleAlbumResponse;
  //prettier-ignore
  setIsQueueSegmentOpen: React.Dispatch<React.SetStateAction<boolean>>
};

export const QueueDisplay = ({ queueSegment, setIsQueueSegmentOpen }: QueueDisplayProps) => {
  const { priorityQueue, playlistQueue } = useQueueContext();
  const { playerState, playlistName, playlistId } = usePlaybackContext();

  const { dynamicImageBgColorDark, dynamicImageBgColorMuted } = useDynamicImageBgColorContext();

  const queueDisplayRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={queueDisplayRef}
      className="absolute bottom-[190px] right-3 h-[500px] w-[500px] overflow-y-scroll rounded-2xl border-2 lg:bottom-[102px] lg:right-6"
      style={{
        backgroundColor: `${dynamicImageBgColorDark}`,
        borderColor: `${dynamicImageBgColorMuted}`,
      }}
    >
      {/* this just checks to see if there are any tacks that are queued up or are currently playing. If not then it displays the empty Queue message */}
      {!playerState?.track_window.current_track &&
        (!playlistQueue ||
          !isPlaylistTrackObjectArray(playlistQueue) ||
          playlistQueue.length === 0) &&
        (!playlistQueue ||
          !isSingleAlbumResponse(playlistQueue) ||
          playlistQueue.tracks.items.length === 0) && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <p className="text-center text-xl text-aqua">Queue’s a ghost town, drop some heat</p>
          </div>
        )}

      <div className="w-full px-2">
        {playerState?.track_window.current_track && (
          <>
            <div className="flex items-center justify-between">
              <h2 className="py-2 text-xl text-textPrimary"> Currently Playing:</h2>
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
                albumId={splitAlbumUri(playerState.track_window.current_track.album.uri)}
                currentlyPlaying={true}
              />
            </div>
          </>
        )}

        {priorityQueue && priorityQueue?.length > 0 && (
          <>
            <h2 className="pb-2 text-xl text-textPrimary">Next in Queue:</h2>
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
                      albumId={item.album.id}
                    />
                  );
                } else {
                  return (
                    <AlbumTrackQueueItem
                      key={`${item.id}-${index}`}
                      queueDisplayRef={queueDisplayRef}
                      isPriorityQueueItem={true}
                      name={item.name}
                      images={item.images}
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
                <Link className="hover:text-aqua hover:underline" to={`/playlists/${playlistId}`}>
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
                    albumId={item.track?.album.id}
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
                <Link className="hover:text-aqua hover:underline" to={`/album/${playlistId}`}>
                  {playlistName}
                </Link>
              </h2>

              <div className="py-2">
                {queueSegment.tracks.items.map((item, index) => (
                  <AlbumTrackQueueItem
                    key={`${item.id}-${index}`}
                    queueDisplayRef={queueDisplayRef}
                    name={item.name}
                    images={(item as AlbumTrackWithImage).images}
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
