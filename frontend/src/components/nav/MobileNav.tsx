import { MobileLink } from './MobileLink';
import { faUserMusic as faUserMusicRegular } from '@awesome.me/kit-71c07605c0/icons/sharp/regular';
import { faUserMusic as faUserMusicSolid } from '@awesome.me/kit-71c07605c0/icons/sharp/solid';
import { faSquareHeart as faSquareHeartRegular } from '@awesome.me/kit-71c07605c0/icons/sharp/regular';
import { faSquareHeart as faSquareHeartSolid } from '@awesome.me/kit-71c07605c0/icons/sharp/solid';
import { faAlbum as faAlbumRegular } from '@awesome.me/kit-71c07605c0/icons/sharp/regular';
import { faAlbum as faAlbumSolid } from '@awesome.me/kit-71c07605c0/icons/sharp/solid';
import { faMusic as faMusicRegular } from '@awesome.me/kit-71c07605c0/icons/sharp/regular';
import { faMusic as faMusicSolid } from '@awesome.me/kit-71c07605c0/icons/sharp/solid';

export const MobileNav = () => {
  return (
    <div className="flex justify-evenly lg:hidden">
      <div className="flex gap-3">
        <MobileLink
          activeIcon={faMusicSolid}
          notActiveIcon={faMusicRegular}
          linkName="Playlists"
          linkTo="/playlists"
        />
        <MobileLink
          activeIcon={faSquareHeartSolid}
          notActiveIcon={faSquareHeartRegular}
          linkName="Songs"
          linkTo="/liked-songs"
        />
        <MobileLink
          activeIcon={faAlbumSolid}
          notActiveIcon={faAlbumRegular}
          linkName="Albums"
          linkTo="saved-albums"
        />
        <MobileLink
          activeIcon={faUserMusicSolid}
          notActiveIcon={faUserMusicRegular}
          linkName="Artists"
          linkTo="followed-artists"
        />
      </div>
    </div>
  );
};
