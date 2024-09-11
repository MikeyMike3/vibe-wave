import { NavLink, Link } from 'react-router-dom';
import { PCLink } from './PCLink';
import { faHouse } from '@awesome.me/kit-71c07605c0/icons/sharp/light';

export const PCNav = () => {
  return (
    <>
      <div className="w-full text-center">
        <Link className="text-white" to={'/'}>
          VibeWave
        </Link>
      </div>
      <div className="flex flex-col gap-5">
        <NavLink className="text-white" to={'/'}>
          <PCLink icon={faHouse} linkName="Home" />
        </NavLink>
        <NavLink className="text-white" to={'/playlists'}>
          Playlists
        </NavLink>
        <NavLink className="text-white" to={'/liked-songs'}>
          Liked Songs
        </NavLink>
        <NavLink className="text-white" to={'followed-artists'}>
          Followed Artists
        </NavLink>
        <NavLink className="text-white" to={'/party-mode'}>
          Party Mode
        </NavLink>
      </div>
    </>
  );
};
