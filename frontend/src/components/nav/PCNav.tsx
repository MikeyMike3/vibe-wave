import { NavLink } from 'react-router-dom';

export const PCNav = () => {
  return (
    <>
      <div>
        <NavLink className="text-white" to={'/'}>
          VibeWave
        </NavLink>
      </div>
      <div className="flex gap-5">
        <NavLink className="text-white" to={'/'}>
          Home
        </NavLink>
        <NavLink className="text-white" to={'/playlists'}>
          Playlists
        </NavLink>
        <NavLink className="text-white" to={'/party-mode'}>
          Party Mode
        </NavLink>
      </div>
    </>
  );
};
