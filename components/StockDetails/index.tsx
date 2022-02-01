import styles from './StockDetails.module.scss';

import StockInfoList from '../StockInfoList';

const StockDetails = (): JSX.Element => {
  return (
    <>
      <header className={styles.ly_header}>
        <div className={styles.ly_header_inner}>
          <div className={styles.bl_stockHeading}>
            <p className={styles.bl_stockHeading_ttl}>코스피 지수</p>
            <p className={styles.bl_stockHeading_standard}>28/01 | 서울</p>
          </div>
          {/* /.bl_stockHeading */}
          <div className={styles.bl_btnWrapper}>
            <i className={(styles.el_btn, 'fas fa-search')} />
            <i className={(styles.el_btn, 'far fa-star')} />
          </div>
          {/* /.bl_btnWrapper */}
        </div>
        {/* /.ly_header_inner */}

        <div className={styles.ly_header_inner}>
          <span className={styles.bl_marketPriceHeading}>
            <div className={styles.bl_marketPriceHeading_price}>
              <h2>2,727.08</h2>
              <p>+6.69 (+0.25%)</p>
            </div>
            {/* /.bl_marketPriceHeading_price */}
            <div className={styles.bl_marketPriceHeading_standard}>
              13:16:20 - 실시간. KRW 통화
            </div>
            {/* /.bl_marketPriceHeading_standard */}
          </span>
        </div>
        {/* /.ly_header_inner */}
      </header>

      <main>
        <article>
          <section className={styles.ly_cont}>
            <canvas id="chart" />

            <StockInfoList />
          </section>
        </article>
      </main>
    </>
  );
};

export default StockDetails;
