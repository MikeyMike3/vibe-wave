import { Link } from 'react-router-dom';
import { PCLink } from './PCLink';
import { faHouse as faHouseRegular } from '@awesome.me/kit-71c07605c0/icons/sharp/regular';
import { faHouse as faHouseSolid } from '@awesome.me/kit-71c07605c0/icons/sharp/solid';
import { faUserMusic as faUserMusicRegular } from '@awesome.me/kit-71c07605c0/icons/sharp/regular';
import { faUserMusic as faUserMusicSolid } from '@awesome.me/kit-71c07605c0/icons/sharp/solid';
import { faSquareHeart as faSquareHeartRegular } from '@awesome.me/kit-71c07605c0/icons/sharp/regular';
import { faSquareHeart as faSquareHeartSolid } from '@awesome.me/kit-71c07605c0/icons/sharp/solid';
import { faAlbum as faAlbumRegular } from '@awesome.me/kit-71c07605c0/icons/sharp/regular';
import { faAlbum as faAlbumSolid } from '@awesome.me/kit-71c07605c0/icons/sharp/solid';
import { faMusic as faMusicRegular } from '@awesome.me/kit-71c07605c0/icons/sharp/regular';
import { faMusic as faMusicSolid } from '@awesome.me/kit-71c07605c0/icons/sharp/solid';

export const PCNav = () => {
  return (
    <div className="hidden lg:block">
      <div className="w-full py-[26px] text-center">
        <Link className="text-2xl font-semibold" to={'/'}>
          <span className="text-aqua">Vibe</span>
          <span className="text-magenta">Wave</span>
        </Link>
      </div>
      <div className="flex flex-col gap-5">
        <PCLink
          activeIcon={faHouseSolid}
          notActiveIcon={faHouseRegular}
          linkName="Home"
          linkTo="/"
        />
        <PCLink
          activeIcon={faMusicSolid}
          notActiveIcon={faMusicRegular}
          linkName="Playlists"
          linkTo="/playlists"
        />
        <PCLink
          activeIcon={faSquareHeartSolid}
          notActiveIcon={faSquareHeartRegular}
          linkName="Liked Songs"
          linkTo="/liked-songs"
        />
        <PCLink
          activeIcon={faAlbumSolid}
          notActiveIcon={faAlbumRegular}
          linkName="Saved Albums"
          linkTo="saved-albums"
        />
        <PCLink
          activeIcon={faUserMusicSolid}
          notActiveIcon={faUserMusicRegular}
          linkName="Followed Artists"
          linkTo="followed-artists"
        />
      </div>
    </div>
  );
};
