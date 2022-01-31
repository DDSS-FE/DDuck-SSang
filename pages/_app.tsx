import type { AppProps } from 'next/app';
import Router from 'next/router';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import Layout from '../components/layout/layout';
import '../styles/globals.scss';
import { useState, useEffect, Fragment } from 'react';
import Spinner from '../components/ui/spinner';
import MoreHeader from '../components/layout/more-header';
import MainNavigation from '../components/layout/main-navigation';
import TickerHeader from '../components/layout/ticker-header';
config.autoAddCss = false;

function MyApp({ Component, pageProps, ...appProps }: AppProps) {
  const [isLoading, setIsLoading] = useState(false);

  function routeChangeStart() {
    Router.events.on('routeChangeStart', () => {
      setIsLoading(true);
    });
  }

  function routeChangeComplete() {
    Router.events.on('routeChangeComplete', () => {
      setIsLoading(false);
    });
  }

  useEffect(() => {
    routeChangeStart();
    routeChangeComplete();
  });

  const getContent = () => {
    if ([`/more`].includes(appProps.router.pathname))
      return (
        <Fragment>
          {isLoading && <Spinner />}
          <MoreHeader />
          <Component {...pageProps} />
          <MainNavigation />
        </Fragment>
      );

    if ([`/chart`].includes(appProps.router.pathname))
      return (
        <Fragment>
          {isLoading && <Spinner />}
          <TickerHeader />
          <Component {...pageProps} />
          <MainNavigation />
        </Fragment>
      );

    return (
      <Layout>
        {isLoading && <Spinner />}
        <Component {...pageProps} />{' '}
      </Layout>
    );
  };

  return <Fragment>{getContent()}</Fragment>;
}
export default MyApp;
