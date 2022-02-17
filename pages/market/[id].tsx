import { NextPage } from 'next';

import styles from './Market.module.scss';

import MarketDetail from 'components/MarketDetail';

const MarketDetailPage: NextPage = () => {
  return (
    <div className={styles.ly_market}>
      <MarketDetail />
    </div>
  );
};

export default MarketDetailPage;
