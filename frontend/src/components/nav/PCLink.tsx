import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

type PCLinkProps = {
  icon: IconDefinition;
  linkName: string;
};

export const PCLink = ({ icon, linkName }: PCLinkProps) => {
  return (
    <div>
      <FontAwesomeIcon icon={icon} /> {linkName}
    </div>
  );
};
