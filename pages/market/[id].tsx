import { NextPage } from 'next';
import { faSearch, faStar } from '@fortawesome/free-solid-svg-icons';

import styles from 'pages/market/Market.module.scss';

import MarketDetail from 'components/MarketDetail';
import Header from 'components/Header';
import IconButton from 'components/IconButton';

const MarketDetailPage: NextPage = () => {
  return (
    <>
      <Header>
        <IconButton
          onClick={() => console.log('검색 자동완성 드롭다운')}
          icon={faSearch}
        />
        <IconButton
          onClick={() => console.log('관심목록에 추가')}
          icon={faStar}
        />
      </Header>
      <div className={styles.ly_market}>
        <MarketDetail symbol="AAPL" />
      </div>
    </>
  );
};

export default MarketDetailPage;
