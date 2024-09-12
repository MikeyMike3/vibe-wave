import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

type PCLinkProps = {
  activeIcon: IconDefinition;
  notActiveIcon: IconDefinition;
  linkName: string;
  linkTo: string;
};

export const PCLink = ({ activeIcon, notActiveIcon, linkName, linkTo }: PCLinkProps) => {
  return (
    <NavLink
      to={linkTo}
      className={({ isActive }) =>
        `${
          isActive
            ? 'rounded-custom-border-left text-magenta flex items-center gap-4 bg-bgPrimary p-2'
            : 'hover:text-magentaLight flex items-center gap-4 p-2 text-textPrimary duration-150'
        }`
      }
    >
      {({ isActive }) => (
        <>
          <FontAwesomeIcon className="h-9 w-9 pl-3" icon={isActive ? activeIcon : notActiveIcon} />
          {linkName}
        </>
      )}
    </NavLink>
  );
};
