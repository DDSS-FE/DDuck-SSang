import type { NextPage } from 'next';

import styles from '../styles/Home.module.scss';

import Header from '../components/Header';
import StockList from '../components/StockList';

const Home: NextPage = () => {
  return (
    <div className={styles.ly_home}>
      <Header />

      <main>
        <article>
          <section className={styles.ly_cont}>
            <StockList />
          </section>
        </article>
      </main>
    </div>
  );
};

export default Home;
