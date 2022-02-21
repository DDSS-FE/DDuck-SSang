import Image from 'next/image';
import Link from 'next/link';

import styles from 'components/Logo/Logo.module.scss';

export const Logo = (): JSX.Element => {
  return (
    <Link href="/">
      <a className={styles.el_logo}>
        <Image src="/logo.png" alt="logo" width={36} height={36} />
      </a>
      {/* TODO : footer나 다른 섹션에 배치 필요 */}
      {/* <a href="https://www.flaticon.com/free-icons/growth" title="growth icons">
        Growth icons created by Freepik - Flaticon
      </a> */}
    </Link>
  );
};

export default Logo;
