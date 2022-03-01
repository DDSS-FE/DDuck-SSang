import { useCallback, useEffect, useState } from 'react';
import { NextPageContext } from 'next';

import { faSearch, faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faRegStar } from '@fortawesome/free-regular-svg-icons';

import styles from 'pages/market/Market.module.scss';

import MarketDetail from 'components/MarketDetail';
import Header from 'components/Header';
import IconButton from 'components/IconButton';
import { WatchlistItem } from 'components/StockList';

import useUser from 'store/modules/user/useUser';
import { WATCHLISTS_API } from 'utils/config';

export interface MarketDetailProps {
  symbol: string;
  category: string;
}

export default function MarketDetailPage({
  symbol,
  category,
}: MarketDetailProps): JSX.Element {
  const { isLoggedIn, userData } = useUser();
  const [isWatched, setIsWatched] = useState<number>(0);

  const addToWatchlist = useCallback(
    async (sym: string) => {
      if (isLoggedIn && !isWatched) {
        try {
          const res = await fetch(WATCHLISTS_API, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({
              data: { symbol: sym, email: userData.email },
            }),
          });
          const resData = await res.json();
          setIsWatched(resData.data.id);
        } catch (e) {
          console.log('add to watchlist error');
        }
      } else {
        alert('You need to login to add to watchlist');
      }
    },
    [isLoggedIn, isWatched, userData]
  );

  const deleteWatchlist = async (id: number) => {
    try {
      await fetch(`${WATCHLISTS_API}/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      window.location.reload();
    } catch (e) {
      console.log('delete watchlist error');
    }
  };

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

  useEffect(() => {
    checkExist(symbol);
  });

  return (
    <>
      <Header>
        <IconButton
          onClick={() => console.log('검색 자동완성 드롭다운')}
          icon={faSearch}
        />
        {isWatched ? (
          <IconButton
            onClick={() => deleteWatchlist(isWatched)}
            icon={faStar}
          />
        ) : (
          <IconButton onClick={() => addToWatchlist(symbol)} icon={faRegStar} />
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
