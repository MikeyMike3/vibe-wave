import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

type PCLinkProps = {
  icon: IconDefinition;
  linkName: string;
  linkTo: string;
};

export const PCLink = ({ icon, linkName, linkTo }: PCLinkProps) => {
  return (
    <NavLink to={linkTo} className="text-white">
      <FontAwesomeIcon icon={icon} /> {linkName}
    </NavLink>
  );
};
