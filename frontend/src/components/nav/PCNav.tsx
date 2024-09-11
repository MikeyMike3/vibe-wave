import { Link } from 'react-router-dom';

export const PCNav = () => {
  return (
    <>
      <div>
        <Link className="text-white" to={'/'}>
          VibeWave
        </Link>
      </div>
      <div className="flex gap-5">
        <Link className="text-white" to={'/'}>
          Home
        </Link>
        <Link className="text-white" to={'/playlists'}>
          Playlists
        </Link>
        <Link className="text-white" to={'/party-mode'}>
          Party Mode
        </Link>
      </div>
    </>
  );
};
