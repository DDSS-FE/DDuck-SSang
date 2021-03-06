import Link from 'next/link';
import { useRouter } from 'next/router';

import styles from 'components/DetailNav/DetailNav.module.scss';

export interface NavItem {
  name: string;
  href: string;
}

interface DetailNavProps {
  navItems: NavItem[];
}

const DetailNav = ({ navItems }: DetailNavProps): JSX.Element => {
  const router = useRouter();

  return (
    <nav className={styles.ly_header_nav} data-testid="DetailNav-component">
      {navItems.map(({ name, href }: NavItem, index: number) => (
        <Link href={href} key={index}>
          <a className={styles.ly_header_nav_cat}>
            <span className={router.asPath === href ? styles.active : ''}>
              {name}
            </span>
          </a>
        </Link>
      ))}
    </nav>
  );
};

export default DetailNav;
