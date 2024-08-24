import { useContext } from 'react';
import { QueueContext } from '../../context/QueueContext';

export const useQueueContext = () => {
  const queueContext = useContext(QueueContext);
  if (!queueContext) {
    throw new Error('QueueContext must be used within an QueueProvider.');
  }
  return queueContext;
};
