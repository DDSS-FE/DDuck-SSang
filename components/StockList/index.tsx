import { useCallback, useEffect } from 'react';

import clsx from 'clsx';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import styles from 'components/StockList/StockList.module.scss';

import IconButton from 'components/IconButton';
import MarketInfoListItem from 'components/MarketInfoList/MarketInfoListItem';
import Spinner from 'components/Spinner';

import { WATCHLISTS_API } from 'utils/config';
import useWatchlist from 'store/modules/watchlist/useWatchlist';

export interface WatchlistItem {
  c: number;
  d: number;
  dp: number;
  id: number;
  symbol: string;
}

const StockList = ({ editMode }: { editMode?: boolean }): JSX.Element => {
  const { watchlistData, watchlistStatus, fetchWatchlist } = useWatchlist();

  const deleteWatchlist = useCallback(
    async (id) => {
      try {
        await fetch(`${WATCHLISTS_API}/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        fetchWatchlist();
      } catch (e) {
        console.log('delete watchlist error');
      }
    },
    [fetchWatchlist]
  );

  useEffect(() => {
    if (watchlistStatus === 'idle') {
      fetchWatchlist();
    }
  }, [watchlistStatus, fetchWatchlist]);

  return (
    <>
      {watchlistStatus === 'loading' && <Spinner />}
      {watchlistData.length ? (
        <ul className={styles.bl_vertStocks}>
          {watchlistData.map((d: WatchlistItem) =>
            editMode ? (
              <li key={d.id} className={styles.bl_vertStocks_item}>
                <div className={styles.bl_vertStocks_inner}>
                  <span
                    className={clsx(
                      styles.bl_vertStocks_stock,
                      styles.bl_vertStocks_stock__sort
                    )}
                  >
                    <div className={styles.bl_vertStocks_ttlWrapper}>
                      <p
                        className={styles.bl_vertStocks_ttl}
                        data-testid="stock-list-item-symbol"
                      >
                        {d.symbol}
                      </p>
                      <p className={styles.bl_vertStocks_standard}>UC</p>
                    </div>
                  </span>
                  <span className={styles.bl_vertStocks_marketPrice}>
                    <IconButton
                      onClick={() => deleteWatchlist(d.id)}
                      icon={faTimes}
                      color="red"
                      bgc="rgb(249,249,250)"
                    />
                  </span>
                </div>
              </li>
            ) : (
              <MarketInfoListItem
                key={d.id}
                category="stock"
                c={d.c}
                d={d.d}
                dp={d.dp}
                symbol={d.symbol}
              />
            )
          )}
        </ul>
      ) : (
        <div data-testid="no-watchlist-message" className={styles.bl_emptyData}>
          관심 목록이 없습니다.
        </div>
      )}
    </>
  );
};

export default StockList;
