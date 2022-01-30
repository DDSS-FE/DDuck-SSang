import Link from 'next/link';

import styles from './MoreList.module.scss';

import GoogleButton from '../GoogleButton';

const MoreList = (): JSX.Element => {
  return (
    <ul className={styles.bl_vertMoreList}>
      <li className={styles.bl_vertMoreList_item}>
        <GoogleButton />
      </li>
      <li className={styles.bl_vertMoreList_item}>
        <Link href="#">
          <a className={styles.bl_vertMoreList_link}>닉네임 변경</a>
        </Link>
      </li>
      <li className={styles.bl_vertMoreList_item}>
        <Link href="#">
          <a className={styles.bl_vertMoreList_link}>설정</a>
        </Link>
      </li>
    </ul>
  );
};

export default MoreList;
