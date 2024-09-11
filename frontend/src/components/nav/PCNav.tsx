import { NavLink } from 'react-router-dom';

export const PCNav = () => {
  return (
    <>
      <div className="w-full text-center">
        <NavLink className="text-white" to={'/'}>
          VibeWave
        </NavLink>
      </div>
      <div className="flex flex-col gap-5">
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
