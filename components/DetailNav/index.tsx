import Link from 'next/link';
// import { useRouter } from 'next/router';

import styles from 'components/DetailNav/DetailNav.module.scss';

import { NavItem } from 'components/MarketDetail';

interface DetailNavProps {
  items: NavItem[];
}

const DetailNav = ({ items }: DetailNavProps): JSX.Element => {
  // const router = useRouter();

  return (
    <nav className={styles.ly_header_nav} data-testid="DetailNav-component">
      {items.map(({ name, href }: NavItem, index: number) => (
        <Link href={href} key={index}>
          <a className={styles.ly_header_nav_cat}>
            <span
            // ! : TODO. NavBar와 함께 next/router 학습 후 테스트 작성
            // className={
            // router.pathname === name && styles.active
            // }
            >
              {name}
            </span>
          </a>
        </Link>
      ))}
    </nav>
  );
};

export default DetailNav;
