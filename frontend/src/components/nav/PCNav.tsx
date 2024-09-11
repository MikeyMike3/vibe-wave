import { NavLink, Link } from 'react-router-dom';
import { PCLink } from './PCLink';
import { faHouse } from '@awesome.me/kit-71c07605c0/icons/sharp/light';
import { faUserMusic } from '@awesome.me/kit-71c07605c0/icons/sharp/light';
import { faSquareHeart } from '@awesome.me/kit-71c07605c0/icons/sharp/light';
import { faAlbum } from '@awesome.me/kit-71c07605c0/icons/sharp/light';

export const PCNav = () => {
  return (
    <>
      <div className="w-full text-center">
        <Link className="text-white" to={'/'}>
          VibeWave
        </Link>
      </div>
      <div className="flex flex-col gap-5">
        <PCLink icon={faHouse} linkName="Home" linkTo="/" />

        <PCLink icon={faUserMusic} linkName="Playlists" linkTo="/playlists" />

        <PCLink icon={faSquareHeart} linkName="Liked Songs" linkTo="/liked-songs" />

        <PCLink icon={faAlbum} linkName="Followed Artists" linkTo="followed-artists" />

        <NavLink className="text-white" to={'/party-mode'}>
          Party Mode
        </NavLink>
      </div>
    </>
  );
};
