import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

type MobileLinkProps = {
  activeIcon: IconDefinition;
  notActiveIcon: IconDefinition;
  linkName: string;
  linkTo: string;
};

export const MobileLink = ({ activeIcon, notActiveIcon, linkName, linkTo }: MobileLinkProps) => {
  return (
    <NavLink
      to={linkTo}
      className={({ isActive }) =>
        `${
          isActive
            ? 'flex flex-col items-center gap-1 p-1 text-sm text-magenta'
            : 'flex flex-col items-center gap-1 p-1 text-sm text-textPrimary duration-150 hover:text-magentaLight'
        }`
      }
    >
      {({ isActive }) => (
        <>
          <FontAwesomeIcon className="h-7 w-7" icon={isActive ? activeIcon : notActiveIcon} />
          {linkName}
        </>
      )}
    </NavLink>
  );
};
