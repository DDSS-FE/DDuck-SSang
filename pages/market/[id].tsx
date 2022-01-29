import { NextPage } from 'next';

import styles from './Market.module.scss';

import StockDetails from '../../components/StockDetails';

const index: NextPage = () => {
  return (
    <div className={styles.ly_market}>
      <StockDetails />
    </div>
  );
};

export default index;
