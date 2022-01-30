import * as React from 'react';
import Head from 'next/head';
import Image from 'next/image';

import styles from './Page404.module.scss';

export const Page404: React.FC = () => {
  const title = 'DDuck-SSang Page Not Found';

  return (
    <>
      <Head>
        <meta property="og:site_name" content={title} />
        <meta property="og:title" content={title} />

        <title>{title}</title>
      </Head>

      <div className={styles.ly_customPageContainer}>
        <main className={styles.ly_customPageContainer_inner}>
          <h1 className={styles.el_title}>Page Not Found</h1>

          <figure className={styles.ly_imgWrapper}>
            <Image
              src="/404.png"
              alt="404 Not Found"
              layout="fill"
              className={styles.el_img}
            />
          </figure>
        </main>
      </div>
      {/* /.ly_customPageContainer */}
    </>
  );
};
