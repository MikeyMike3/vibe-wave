import { useQueueContext } from '../../hooks/context/useQueueContext';

type RemoveFromQueueButtonProps = {
  name: string | undefined;
};

export const RemoveFromQueueButton = ({ name }: RemoveFromQueueButtonProps) => {
  const { setPlaylistQueue, playlistQueue } = useQueueContext();

  const handleClick = () => {
    const indexToRemove = playlistQueue.findIndex(item => item.track?.name === name);
    setPlaylistQueue(prevQueue => {
      const tempQueue = prevQueue.filter((_, index) => index !== indexToRemove);
      return tempQueue;
    });
  };

  return <button onClick={handleClick}>RemoveFromQueue</button>;
};
