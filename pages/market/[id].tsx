import { NextPage } from 'next';

import styles from './Market.module.scss';

import StockDetail from '../../components/StockDetail';

const MarketDetail: NextPage = () => {
  return (
    <div className={styles.ly_market}>
      <StockDetail />
    </div>
  );
};

export default MarketDetail;
