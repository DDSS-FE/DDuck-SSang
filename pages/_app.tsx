import '../styles/globals.scss';
import Router from 'next/router';
import type { AppProps } from 'next/app';
import Spinner from '../components/ui/spinner';
import { useState, useEffect, Fragment } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
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

  return (
    <Fragment>
      {isLoading && <Spinner />}
      <Component {...pageProps} />
    </Fragment>
  );
}
export default MyApp;
