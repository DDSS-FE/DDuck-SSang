import { NextPage } from 'next';
import { useRouter } from 'next/router';

import { faSearch, faStar } from '@fortawesome/free-solid-svg-icons';

import styles from 'pages/market/Market.module.scss';

import MarketDetail from 'components/MarketDetail';
import Header from 'components/Header';
import IconButton from 'components/IconButton';

const MarketDetailPage: NextPage = () => {
  const { query, isReady } = useRouter();
  const { symbol } = query;

  return (
    <>
      {isReady && (
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
            <MarketDetail symbol={symbol as string} />
          </div>
        </>
      )}
    </>
  );
};

export default MarketDetailPage;
