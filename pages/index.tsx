import type { NextPage } from 'next';
import Head from 'next/head';
import { Fragment } from 'react';
import NewsPage from './news';

const Home: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>DDuck-SSang</title>
        <meta name="description" content="The best finance informations"></meta>
      </Head>
      <NewsPage />
    </Fragment>
  );
};

export default Home;
