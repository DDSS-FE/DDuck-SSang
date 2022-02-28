import { NextPageContext } from 'next';

import { faSearch, faStar } from '@fortawesome/free-solid-svg-icons';

import styles from 'pages/market/Market.module.scss';

import MarketDetail from 'components/MarketDetail';
import Header from 'components/Header';
import IconButton from 'components/IconButton';

import useUser from 'store/modules/user/useUser';

export interface MarketDetailProps {
  symbol: string;
  category: string;
}

function addToWatchlistAPI(symbol: string) {
  return fetch(`/api/watchlist/${symbol}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export default function MarketDetailPage({
  symbol,
  category,
}: MarketDetailProps): JSX.Element {
  const { isLoggedIn } = useUser();

  function addToWatchlist(sym: string) {
    if (isLoggedIn) {
      try {
        addToWatchlistAPI(sym);
      } catch {
        console.log('add to watchlist error');
      }
    } else {
      alert('You need to login to add to watchlist');
    }
  }

  return (
    <>
      <Header>
        <IconButton
          onClick={() => console.log('검색 자동완성 드롭다운')}
          icon={faSearch}
        />
        <IconButton onClick={() => addToWatchlist(symbol)} icon={faStar} />
      </Header>
      <div className={styles.ly_market}>
        <MarketDetail symbol={symbol} category={category} />
      </div>
    </>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const { query } = context;
  if (!query || !query.symbol || !query.category) {
    return {
      props: {
        symbol: '',
        category: '',
      },
    };
  }

  return {
    props: {
      symbol: query.symbol,
      category: query.category,
    },
  };
}
