import styles from './Header.module.scss';

import Logo from '../Logo';

const index = (): JSX.Element => {
  return (
    <header className={styles.ly_header}>
      <div className={styles.ly_header_inner}>
        <Logo />

        <div className={styles.ly_btnWrapper}>
          <i className={(styles.el_btn, 'fas fa-search')} />
        </div>
        {/* /.ly_btnWrapper */}
      </div>
      {/* /.ly_header_inner */}
    </header>
  );
};

export default index;
