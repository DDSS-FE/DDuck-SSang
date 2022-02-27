import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useTheme } from 'next-themes';
import Toggle from 'react-toggle';

import styles from 'pages/more/more.module.scss';
import 'react-toggle/style.css';
import FormDialog from 'components/FormDialog';
import useUser from 'store/modules/user/useUser';

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

  const [open, setOpen] = useState(false);
  const [login, setLogin] = useState(false);

  // * : 로그인 상태 확인
  // const [user, setUser] = useState('');
  // useEffect(() => {
  //   setUser(localStorage.getItem('token') || '');
  // }, [setUser]);
  // * : 로그아웃 기능
  const { isLoggedIn, logout } = useUser();
  // const logout = () => {
  //   setUser('');
  //   localStorage.removeItem('token');
  // };

  return (
    <div className={styles.ly_more}>
      <Head>
        <title>Dark mode with SCSS and Next.js</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Dark mode with SCSS and Next- themes</h1>
      <div className={styles.ly_more_darkModeBtnWrapper}>
        <Toggle
          className={styles.el_darkModeToggle}
          checked={isMounted && theme === 'light'}
          onChange={switchTheme}
          icons={{ checked: '🌙', unchecked: '🔆' }}
          aria-label="Dark mode"
        />
      </div>
      {/* * : authentication */}
      <div style={{ padding: '40px', fontSize: '20px' }}>
        {isLoggedIn ? '로그인 O' : '로그인 X'}
      </div>
      {!isLoggedIn && (
        <>
          <div style={{ padding: '20px' }}>
            <button
              style={{ padding: '10px', margin: '10px', fontSize: '20px' }}
              onClick={() => {
                setOpen(true);
                setLogin(false);
              }}
            >
              회원가입
            </button>
          </div>
          <div style={{ padding: '20px' }}>
            <button
              style={{ padding: '10px', margin: '10px', fontSize: '20px' }}
              onClick={() => {
                setOpen(true);
                setLogin(true);
              }}
            >
              로그인
            </button>
          </div>
        </>
      )}
      <div style={{ padding: '20px' }}>
        {isLoggedIn && (
          <button
            style={{ padding: '10px', margin: '10px', fontSize: '20px' }}
            onClick={logout}
          >
            로그아웃
          </button>
        )}
      </div>
      <FormDialog open={open} setOpen={setOpen} signIn={login} />
    </div>
  );
}
