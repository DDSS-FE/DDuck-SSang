import { useCallback, useEffect } from 'react';
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { faSearch, faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faRegStar } from '@fortawesome/free-regular-svg-icons';
import debounce from 'debounce';

import styles from 'pages/market/Market.module.scss';

import MarketDetail from 'components/MarketDetail';
import Header from 'components/Header';
import IconButton from 'components/IconButton';

import useUser from 'store/modules/user/useUser';
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
  const {
    fetchWatchlist,
    checkWatchlistBySymbol,
    addWatchlist,
    deleteWatchlist,
  } = useWatchlist();
  const debouncedAddWatchlist = debounce(addWatchlist, 800);

  const handleAddToWatchlist = useCallback(
    (sym: string) => {
      if (!isLoggedIn) alert('You need to login to add to watchlist');
      if (!checkWatchlistBySymbol(sym)) debouncedAddWatchlist(sym);
    },
    [isLoggedIn, checkWatchlistBySymbol, debouncedAddWatchlist]
  );

  useEffect(() => {
    if (isLoggedIn) fetchWatchlist();
  }, [isLoggedIn, fetchWatchlist]);

  return (
    <>
      <Header>
        <IconButton
          onClick={() => router.push('search/market')}
          data-testid="market-search-button"
          icon={faSearch}
        />
        {checkWatchlistBySymbol(symbol) ? (
          <IconButton
            onClick={() => deleteWatchlist(checkWatchlistBySymbol(symbol))}
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
