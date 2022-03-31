import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition, IconLookup } from '@fortawesome/fontawesome-svg-core';

import styles from 'components/IconButton/IconButton.module.scss';

export interface CustomIconConstruct extends IconDefinition, IconLookup {}

const IconButton = ({
  icon,
  onClick,
  color,
  bgc,
}: {
  icon: CustomIconConstruct;
  onClick: () => void;
  color?: string;
  bgc?: string;
}): JSX.Element => {
  return (
    <button
      className={styles.el_iconBtn}
      onClick={onClick}
      style={{ backgroundColor: bgc }}
    >
      <FontAwesomeIcon
        className={styles.el_Icon}
        icon={icon}
        style={{ color: color }}
      />
    </button>
  );
};

export default IconButton;
