import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';

import styles from './MarketDetail.module.scss';

import useAxios from 'hooks/useAxios';
import KeyInfo from 'components/KeyInfo';
import Chart from 'components/Chart';
import Header from 'components/Header';
import IconButton from 'components/IconButton';
import DetailNav from 'components/DetailNav';
import { MARKET_INFO_API } from 'utils/config';

const MarketDetail = (): JSX.Element => {
  const { data } = useAxios(MARKET_INFO_API);

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
              10:00:00 - 실시간. KRW 통화
            </div>
          </span>
        </div>
      </header>
      <DetailNav />

      <main>
        <article>
          <section className={styles.ly_cont}>
            <Chart />
            {data ? <KeyInfo data={data} /> : null}
          </section>
        </article>
      </main>
    </>
  );
};

export default MarketDetail;
