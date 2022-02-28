import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useTheme } from 'next-themes';
import Toggle from 'react-toggle';

import styles from 'pages/more/more.module.scss';
import 'react-toggle/style.css';
import FormDialog from 'components/FormDialog';
import useUser from 'store/modules/user/useUser';

export default function More({
  posts,
  loginResponseData,
}: //  loginResponseData
{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  loginResponseData: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  posts: any;
}) {
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
  const { isLoggedIn, logout } = useUser();

  console.log(posts);
  console.log(loginResponseData);

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

      <div style={{ padding: '20px' }}></div>
    </div>
  );
}

export async function getServerSideProps() {
  // param : ctx

  const loginData = {
    identifier: 'tester@crl.com',
    password: '123123',
  };

  const login = await fetch(`http://localhost:1337/api/auth/local`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginData),
  });

  const loginResponseData = await login.json();

  // // get posts from strapi REST API
  console.log(loginResponseData.jwt);
  const res2 = await fetch(
    `http://localhost:1337/api/candle?symbol=AAPL&period=30`,
    {
      headers: {
        Authorization: `Bearer ${loginResponseData.jwt}`,
      },
    }
  );
  const candles = await res2.json();

  return {
    props: {
      posts: candles, //res2, //posts,
      loginResponseData: loginResponseData,
    },
  };
}
