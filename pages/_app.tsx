import { useState, useEffect } from 'react';
import Router from 'next/router';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'next-themes';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { wrapper, store } from 'store';

import 'styles/globals.scss';
import 'styles/theme.scss';
import 'react-loading-skeleton/dist/skeleton.css';

import Spinner from 'components/Spinner';
import NavBar from 'components/NavBar';

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  // const store = createStore(persistedReducer);
  const persistor = persistStore(store);

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
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <PersistGate loading={null} persistor={persistor}>
          <Head>
            <title>DDuck-SSang</title>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/logo.png" />
            <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
              integrity="sha512-Fo3rlrZj/k7ujTnHg4CGR2D7kSs0v4LLanw2qksYuRlEzO+tcaEPQogQ0KaoGN26/zrn20ImR1DfuLWnOo7aBA=="
              crossOrigin="anonymous"
              referrerPolicy="no-referrer"
            />
          </Head>
          {isLoading && <Spinner />}
          <ThemeProvider attribute="class">
            <Component {...pageProps} key={router.asPath} />
          </ThemeProvider>
          <NavBar />
        </PersistGate>
        <ReactQueryDevtools initialIsOpen={false} />
      </Hydrate>
    </QueryClientProvider>
  );
}
// export default MyApp;
export default wrapper.withRedux(MyApp);
