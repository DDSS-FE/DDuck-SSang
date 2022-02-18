import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition, IconLookup } from '@fortawesome/fontawesome-svg-core';

import styles from 'components/IconButton/IconButton.module.scss';

export interface CustomIconConstruct extends IconDefinition, IconLookup {}

const IconButton = ({
  icon,
  onClick,
}: {
  icon: CustomIconConstruct;
  onClick: () => void;
}): JSX.Element => {
  return (
    <button className={styles.el_iconBtn} onClick={onClick}>
      <FontAwesomeIcon className={styles.el_Icon} icon={icon} />
    </button>
  );
};

export default IconButton;
