import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './MenuItem.module.scss';

const MenuItem = (props: { icon: IconProp; content: string }): JSX.Element => (
  <li className={styles.bl_menuItem}>
    <FontAwesomeIcon icon={props.icon} size="lg" />
    <span>{props.content}</span>
  </li>
);

export default MenuItem;
