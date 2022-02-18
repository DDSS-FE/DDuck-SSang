import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useTheme } from 'next-themes';
import Toggle from 'react-toggle';

import styles from 'pages/more/more.module.scss';
import 'react-toggle/style.css';

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
    </div>
  );
}
