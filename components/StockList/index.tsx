import { useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import styles from 'components/StockList/StockList.module.scss';

import IconButton from 'components/IconButton';
import MarketInfoListItem from 'components/MarketInfoList/MarketInfoListItem';
import Spinner from 'components/Spinner';

// const data = [
//   {
//     id: 1,
//     name: 'Apple Inc.',
//     symbol: 'AAPL',
//     c: 0.0,
//     d: 0.0,
//     dp: 0.0,
//   },
//   {
//     id: 2,
//     name: 'Microsoft Corporation',
//     symbol: 'MSFT',
//     c: 0.0,
//     d: 0.0,
//     dp: 0.0,
//   },
// ];

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
  const [wError, setWError] = useState<unknown>(null);
  const fetchWatchlist = useCallback(async () => {
    try {
      const res = await fetch(
        `http://localhost:1337/api/watchlists`, //?email=tester@crl.co`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      const resData = await res.json();
      setWData(resData);
      setWLoading(false);
    } catch (e) {
      setWLoading(false);
      setWError(e);
    }
  }, []);

  useEffect(() => {
    fetchWatchlist();
    return () => setWLoading(false);
  }, [fetchWatchlist]);

  const removeStock = (id: number): void => {
    console.log(`id가 ${id}인 심볼 삭제`);
  };

  console.log(wData, wLoading, wError);

  return (
    <>
      {wLoading && <Spinner />}
      {wData && (
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
                      <p className={styles.bl_vertStocks_ttl}>{d.symbol}</p>
                      <p className={styles.bl_vertStocks_standard}>UC</p>
                    </div>
                  </span>
                  <span className={styles.bl_vertStocks_marketPrice}>
                    <IconButton
                      onClick={() => removeStock(d.id)}
                      icon={faTimes}
                      color="red"
                      bgc="rgb(249,249,250)"
                    />
                  </span>
                </div>
              </li>
            ) : (
              // * : data를 받아올 때 symbol을 가지고 있으면 링크 가능
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
      )}
    </>
  );
};

export default StockList;
