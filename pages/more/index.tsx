import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import Toggle from 'react-toggle';

import styles from 'pages/more/more.module.scss';
import 'react-toggle/style.css';
import useUser from 'store/modules/user/useUser';
import Form from 'components/Form';
import Header from 'components/Header';
import Button from 'components/Button';

export default function More() {
  const [isMounted, setIsMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const switchTheme = () => {
    if (isMounted) {
      setTheme(theme === 'light' ? 'dark' : 'light');
    }
  };
  const { isLoggedIn, logout, userData } = useUser();

  return (
    <section className={styles.ly_more}>
      <Header></Header>
      <ul className={styles.bl_list}>
        <li className={styles.bl_list_item}>
          <div className={styles.el_item}>
            <span>다크모드</span>
            <Toggle
              className={styles.el_darkModeToggle}
              checked={isMounted && theme === 'light'}
              onChange={switchTheme}
              icons={{ checked: '🌙', unchecked: '🔆' }}
              aria-label="Dark mode"
            />
          </div>
        </li>
        {isLoggedIn && (
          <>
            <li className={styles.bl_list_item}>
              <span
                className={styles.el_item}
              >{`${userData.username}님 반갑습니다`}</span>
            </li>
            <li className={styles.bl_list_item}>
              <Button eventHandler={logout}>로그아웃</Button>
            </li>
          </>
        )}
        {!isLoggedIn && (
          <>
            <li className={styles.bl_list_item}>
              <Form isSignIn={true} />
            </li>
            <li className={styles.bl_list_item}>
              <Form isSignIn={false} />
            </li>
          </>
        )}
      </ul>
    </section>
  );
}
