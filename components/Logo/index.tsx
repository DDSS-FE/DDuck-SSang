import Image from 'next/image';
import Link from 'next/link';

import styles from './Logo.module.scss';

const Logo = (): JSX.Element => {
  return (
    <Link href="/">
      <a className={styles.el_logo}>
        <Image
          src="http://placeimg.com/100/36/any"
          alt="logo"
          width={140}
          height={45}
        />
      </a>
    </Link>
  );
};

export default Logo;
