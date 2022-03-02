import { useCallback, useEffect, useState } from 'react';
import { NextPageContext } from 'next';

import { faSearch, faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faRegStar } from '@fortawesome/free-regular-svg-icons';

import styles from 'pages/market/Market.module.scss';

import { useRouter } from 'next/router';

import MarketDetail from 'components/MarketDetail';
import Header from 'components/Header';
import IconButton from 'components/IconButton';
import { WatchlistItem } from 'components/StockList';

import useUser from 'store/modules/user/useUser';
import { WATCHLISTS_API } from 'utils/config';
import useWatchlist from 'store/modules/watchlist/useWatchlist';

export interface MarketDetailProps {
  symbol: string;
  category: string;
}

export default function MarketDetailPage({
  symbol,
  category,
}: MarketDetailProps): JSX.Element {
  const router = useRouter();
  const { isLoggedIn } = useUser();
  const [isWatched, setIsWatched] = useState<number>(0);
  const { addWatchlist, deleteWatchlist } = useWatchlist();

  const checkExist = async (sym: string) => {
    try {
      const res = await fetch(WATCHLISTS_API, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const resData = await res.json();
      const item = resData.find((d: WatchlistItem) => d.symbol === sym);
      setIsWatched(item?.id || 0);
    } catch (e) {
      console.log('check exist error');
    }
  };

  const handleAddToWatchlist = useCallback(
    (sym: string) => {
      if (isLoggedIn && !isWatched) {
        addWatchlist(sym);
      } else {
        alert('You need to login to add to watchlist');
      }
    },
    [isLoggedIn, isWatched, addWatchlist]
  );

  useEffect(() => {
    checkExist(symbol);
  });

  return (
    <>
      <Header>
        <IconButton
          onClick={() => router.push('search/market')}
          icon={faSearch}
        />
        {isWatched ? (
          <IconButton
            onClick={() => deleteWatchlist(isWatched)}
            icon={faStar}
          />
        ) : (
          <IconButton
            onClick={() => handleAddToWatchlist(symbol)}
            icon={faRegStar}
          />
        )}
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
