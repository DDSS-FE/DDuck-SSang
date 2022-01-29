import Link from 'next/link';
import GoogleButton from '../GoogleButton';
import styles from './MoreList.module.scss';

const MoreList = (): JSX.Element => {
  return (
    <ul className={styles.bl_vertPosts}>
      <li className={styles.bl_vertPosts_item}>
        <GoogleButton />
      </li>
      <li className={styles.bl_vertPosts_item}>
        <Link href="#">
          <a className={styles.bl_vertPosts_link}>닉네임 변경</a>
        </Link>
      </li>
      <li className={styles.bl_vertPosts_item}>
        <Link href="#">
          <a className={styles.bl_vertPosts_link}>설정</a>
        </Link>
      </li>
    </ul>
  );
};

export default MoreList;
