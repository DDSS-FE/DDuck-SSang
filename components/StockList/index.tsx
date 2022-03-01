import { useCallback, useEffect, useState } from 'react';

import clsx from 'clsx';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import styles from 'components/StockList/StockList.module.scss';

import IconButton from 'components/IconButton';
import MarketInfoListItem from 'components/MarketInfoList/MarketInfoListItem';
import Spinner from 'components/Spinner';

type WatchListData = WatchlistItem[];

export interface WatchlistItem {
  c: number;
  d: number;
  dp: number;
  id: number;
  symbol: string;
}

const StockList = ({ editMode }: { editMode?: boolean }): JSX.Element => {
  const [wData, setWData] = useState<WatchListData>([]);
  const [wLoading, setWLoading] = useState<boolean>(false);

  const fetchWatchlist = useCallback(async () => {
    try {
      setWLoading(true);
      const res = await fetch(
        `http://localhost:1337/api/watchlists`, //?email=tester@crl.co`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      const resData = await res.json();
      console.log(resData);
      setWData(resData);
      setWLoading(false);
    } catch (e) {
      setWLoading(false);
      console.log('fetch watchlist error');
    }
  }, []);

  const deleteWatchlist = useCallback(async (id) => {
    try {
      await fetch(`http://localhost:1337/api/watchlists/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      window.location.reload();
    } catch (e) {
      console.log('delete watchlist error');
    }
  }, []);

  useEffect(() => {
    fetchWatchlist();
    return () => setWLoading(false);
  }, [fetchWatchlist]);

  return (
    <>
      {wLoading && <Spinner />}
      {wData.length ? (
        <ul className={styles.bl_vertStocks}>
          {wData.map((d) =>
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
