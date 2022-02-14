import clsx from 'clsx';

import styles from './StockDetail.module.scss';

import StockInfoList from '../StockInfoList';
import Chart from '../Chart';
import Header from '../Header';
import IconButton from '../IconButton';
import DetailHeader from '../DetailHeader';

const StockDetail = (): JSX.Element => {
  return (
    <>
      <Header>
        <IconButton>
          <i
            className={clsx('fas fa-search fa-2x', styles.el_darkModeIcon)}
            aria-hidden="true"
          />
        </IconButton>
        <IconButton>
          <i className={clsx('far fa-star fa-2x', styles.el_darkModeIcon)} />
        </IconButton>
      </Header>

      <header className={styles.ly_header}>
        <div className={styles.ly_header_inner}>
          <span className={styles.bl_marketPriceHeading}>
            <div className={styles.bl_marketPriceHeading_price}>
              <h2>2,727.08</h2>
              <p>+6.69 (+0.25%)</p>
            </div>
            <div className={styles.bl_marketPriceHeading_standard}>
              13:16:20 - 실시간. KRW 통화
            </div>
          </span>
        </div>
      </header>

      <DetailHeader />

      <main>
        <article>
          <section className={styles.ly_cont}>
            <Chart />

            <StockInfoList />
          </section>
        </article>
      </main>
    </>
  );
};

export default StockDetail;
