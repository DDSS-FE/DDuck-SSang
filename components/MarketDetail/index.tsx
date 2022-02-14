import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';

import styles from './MarketDetail.module.scss';

import KeyInfo from '../KeyInfo';
import Chart from '../Chart';
import Header from '../Header';
import IconButton from '../IconButton';
import DetailNav from '../DetailNav';

const MarketDetail = (): JSX.Element => {
  return (
    <>
      <Header>
        <IconButton>
          <FontAwesomeIcon className={styles.el_Icon} icon={faSearch} />
          <FontAwesomeIcon className={styles.el_Icon} icon={faStar} />
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
      <DetailNav />

      <main>
        <article>
          <section className={styles.ly_cont}>
            <Chart />
            <KeyInfo />
          </section>
        </article>
      </main>
    </>
  );
};

export default MarketDetail;
