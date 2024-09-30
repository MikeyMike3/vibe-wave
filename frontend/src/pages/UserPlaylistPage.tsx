import { useParams } from 'react-router-dom';

export const UserPlaylistPage = () => {
  const { id } = useParams();
  return <div className="text-white">{id}</div>;
};
