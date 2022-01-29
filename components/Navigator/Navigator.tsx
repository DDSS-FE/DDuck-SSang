import {
  faBars,
  faStar,
  faChartLine,
  faNewspaper,
} from '@fortawesome/free-solid-svg-icons';
import MenuItem from './MenuItem';
import styles from './Navigator.module.scss';

const Navigator = (): JSX.Element => (
  <ul className={styles.bl_menuList}>
    <MenuItem content="시장" icon={faChartLine} />
    <MenuItem content="뉴스" icon={faNewspaper} />
    <MenuItem content="관심목록" icon={faStar} />
    <MenuItem content="더보기" icon={faBars} />
  </ul>
);

export default Navigator;
