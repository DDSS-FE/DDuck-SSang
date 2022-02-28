import clsx from 'clsx';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import styles from 'components/StockList/StockList.module.scss';

import IconButton from 'components/IconButton';
import MarketInfoListItem from 'components/MarketInfoList/MarketInfoListItem';

const data = [
  {
    id: 1,
    name: 'Apple Inc.',
    symbol: 'AAPL',
    c: 0.0,
    d: 0.0,
    dp: 0.0,
  },
  {
    id: 2,
    name: 'Microsoft Corporation',
    symbol: 'MSFT',
    c: 0.0,
    d: 0.0,
    dp: 0.0,
  },
];

const StockList = ({ editMode }: { editMode?: boolean }): JSX.Element => {
  // const { data, loading } = useAxios<MarketInfoData>(
  //   `${QUOTE_API}?category=${stock}`
  // );

  return (
    <>
      {/* {loading && <Spinner />} */}
      {data && (
        <ul className={styles.bl_vertStocks}>
          {data.map((d) =>
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
                      onClick={() => console.log('편집')}
                      icon={faTimes}
                      color="red"
                      bgc="rgb(249,249,250)"
                    />
                  </span>
                </div>
              </li>
            ) : (
              <MarketInfoListItem key={d.id} category="stock" {...d} />
            )
          )}
        </ul>
      )}
    </>
  );
};

export default StockList;
