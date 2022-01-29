import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';

import '../styles/globals.scss';

import Footer from '../components/Footer';
import NavBar from '../components/NavBar';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
          integrity="sha512-Fo3rlrZj/k7ujTnHg4CGR2D7kSs0v4LLanw2qksYuRlEzO+tcaEPQogQ0KaoGN26/zrn20ImR1DfuLWnOo7aBA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </Head>
      <Component {...pageProps} />

      {/* Footer, NavBar는 에러 페이지 제외하고 공통 */}
      {router.pathname !== '/404' && (
        <>
          <Footer />
          <NavBar />
        </>
      )}
    </>
  );
}
export default MyApp;
