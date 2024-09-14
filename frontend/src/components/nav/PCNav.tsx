import { NavLink, Link } from 'react-router-dom';
import { PCLink } from './PCLink';
import { faHouse as faHouseLight } from '@awesome.me/kit-71c07605c0/icons/sharp/light';
import { faHouse as faHouseSolid } from '@awesome.me/kit-71c07605c0/icons/sharp/solid';
import { faUserMusic as faUserMusicLight } from '@awesome.me/kit-71c07605c0/icons/sharp/light';
import { faUserMusic as faUserMusicSolid } from '@awesome.me/kit-71c07605c0/icons/sharp/solid';
import { faSquareHeart as faSquareHeartLight } from '@awesome.me/kit-71c07605c0/icons/sharp/light';
import { faSquareHeart as faSquareHeartSolid } from '@awesome.me/kit-71c07605c0/icons/sharp/solid';
import { faAlbum as faAlbumLight } from '@awesome.me/kit-71c07605c0/icons/sharp/light';
import { faAlbum as faAlbumSolid } from '@awesome.me/kit-71c07605c0/icons/sharp/solid';

export const PCNav = () => {
  return (
    <>
      <div className="w-full py-[26px] text-center">
        <Link className="text-2xl font-semibold" to={'/'}>
          <span className="text-aqua">Vibe</span>
          <span className="text-magenta">Wave</span>
        </Link>
      </div>
      <div className="flex flex-col gap-5">
        <PCLink activeIcon={faHouseSolid} notActiveIcon={faHouseLight} linkName="Home" linkTo="/" />
        <PCLink
          activeIcon={faUserMusicSolid}
          notActiveIcon={faUserMusicLight}
          linkName="Playlists"
          linkTo="/playlists"
        />
        <PCLink
          activeIcon={faSquareHeartSolid}
          notActiveIcon={faSquareHeartLight}
          linkName="Liked Songs"
          linkTo="/liked-songs"
        />
        <PCLink
          activeIcon={faAlbumSolid}
          notActiveIcon={faAlbumLight}
          linkName="Followed Artists"
          linkTo="followed-artists"
        />
        <NavLink className="text-white" to={'/party-mode'}>
          Party Mode
        </NavLink>
        <p className="text-white">Saved Albums</p>
      </div>
    </>
  );
};
