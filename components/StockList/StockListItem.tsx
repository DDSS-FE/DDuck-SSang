import clsx from 'clsx';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import styles from 'components/StockList/StockList.module.scss';

import IconButton from 'components/IconButton';
import { IWatchlistItem } from 'components/StockList';

interface Props {
  item: IWatchlistItem;
  deleteItem: (id: number) => void;
}

const StockListItem = ({ item, deleteItem }: Props): JSX.Element => {
  return (
    <li key={item.id} className={styles.bl_vertStocks_item}>
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
              {item.symbol}
            </p>
            <p className={styles.bl_vertStocks_standard}>UC</p>
          </div>
        </span>
        <span className={styles.bl_vertStocks_marketPrice}>
          <IconButton
            onClick={() => deleteItem(item.id)}
            icon={faTimes}
            color="red"
            bgc="rgb(249,249,250)"
          />
        </span>
      </div>
    </li>
  );
};

export default StockListItem;
