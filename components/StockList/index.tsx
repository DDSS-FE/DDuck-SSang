import { useEffect } from 'react';

import styles from 'components/StockList/StockList.module.scss';

import StockListItem from 'components/StockList/StockListItem';
import MarketInfoListItem from 'components/MarketInfoList/MarketInfoListItem';
import Spinner from 'components/Spinner';

import useWatchlist from 'store/modules/watchlist/useWatchlist';

export interface IWatchlistItem {
  c: number;
  d: number;
  dp: number;
  id: number;
  symbol: string;
}

const StockList = ({ editMode }: { editMode?: boolean }): JSX.Element => {
  const { watchlistData, watchlistStatus, fetchWatchlist, deleteWatchlist } =
    useWatchlist();

  useEffect(() => {
    fetchWatchlist();
  }, [fetchWatchlist]);

  return (
    <>
      {watchlistStatus === 'loading' && <Spinner />}
      {watchlistData.length ? (
        <ul className={styles.bl_vertStocks}>
          {watchlistData.map((d: IWatchlistItem) =>
            editMode ? (
              <StockListItem key={d.id} item={d} deleteItem={deleteWatchlist} />
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
