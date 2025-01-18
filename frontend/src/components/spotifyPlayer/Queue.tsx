import { useEffect, useState } from 'react';
import { useQueueContext } from '../../hooks/context/useQueueContext';
import { QueueDisplay } from './QueueDisplay';
import { usePlaybackContext } from '../../hooks/context/usePlaybackContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListMusic as faListMusicSolid } from '@awesome.me/kit-71c07605c0/icons/sharp/solid';
import { faListMusic as faListMusicRegular } from '@awesome.me/kit-71c07605c0/icons/sharp/regular';
import { isPlaylistTrackObjectArray } from '../../types/typeGuards/isPlaylistTrackObjectArray';
import { isSingleAlbumResponse } from '../../types/typeGuards/isSIngleAlbumResponse';
import { useDynamicImageBgColorContext } from '../../hooks/context/useDynamicImageBgColorContext';

export const Queue = () => {
  const { playlistQueue, playlistQueueIndex } = useQueueContext();
  const { repeatRef, repeat } = usePlaybackContext();
  const [queueSegment, setQueueSegment] = useState<
    SpotifyApi.PlaylistTrackObject[] | SpotifyApi.SingleAlbumResponse
  >([]);

  const { dynamicImageBgColorLighter } = useDynamicImageBgColorContext();

  const [isQueueSegmentOpen, setIsQueueSegmentOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!playlistQueue) {
      return;
    }
    if (isPlaylistTrackObjectArray(playlistQueue)) {
      const temp = playlistQueue.slice(playlistQueueIndex, playlistQueueIndex + 50);
      if (temp.length < 50 && repeatRef.current === 1) {
        const sliceAmount = 50 - temp.length;
        const tempSliceSegment = playlistQueue.slice(0, sliceAmount);
        const combinedArray = [...temp, ...tempSliceSegment];
        setQueueSegment(combinedArray);
      } else {
        setQueueSegment(temp);
      }
    } else if (isSingleAlbumResponse(playlistQueue)) {
      const temp = playlistQueue.tracks.items.slice(playlistQueueIndex, playlistQueueIndex + 50);
      if (temp.length < 50 && repeatRef.current === 1) {
        const sliceAmount = 50 - temp.length;
        const tempSliceSegment = playlistQueue.tracks.items.slice(0, sliceAmount);
        const combinedArray = {
          ...playlistQueue,
          tracks: {
            ...playlistQueue.tracks,
            items: [...temp, ...tempSliceSegment],
          },
        };
        setQueueSegment(combinedArray);
      } else {
        console.log(playlistQueue);
        setQueueSegment({
          ...playlistQueue,
          tracks: {
            ...playlistQueue.tracks,
            items: temp,
          },
        });
      }
    }
  }, [playlistQueueIndex, playlistQueue, repeatRef, repeat]);

  const handleClick = () => {
    setIsQueueSegmentOpen(prev => !prev);
  };

  return (
    <>
      {isQueueSegmentOpen && (
        <button onClick={handleClick}>
          <FontAwesomeIcon
            className="text-2xl"
            style={{ color: dynamicImageBgColorLighter }}
            icon={faListMusicSolid}
          />
        </button>
      )}

      {!isQueueSegmentOpen && (
        <button
          onClick={handleClick}
          className="text-textAccent duration-150 hover:text-textPrimary"
        >
          <FontAwesomeIcon className="text-2xl" icon={faListMusicRegular} />
        </button>
      )}

      {isQueueSegmentOpen && (
        <QueueDisplay queueSegment={queueSegment} setIsQueueSegmentOpen={setIsQueueSegmentOpen} />
      )}
    </>
  );
};
