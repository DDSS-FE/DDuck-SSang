import styles from 'components/Header/Header.module.scss';

import Logo from 'components/Logo';

const Header = ({ children }: { children?: React.ReactNode }): JSX.Element => {
  return (
    <header className={styles.ly_header}>
      <div className={styles.ly_header_inner}>
        <Logo />
        <div className={styles.ly_btnWrapper}>{children}</div>
      </div>
    </header>
  );
};

export default Header;
