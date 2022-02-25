import styles from 'components/MarketInfoList/MarketInfoList.module.scss';

import MarketInfoListItem from 'components/MarketInfoList/MarketInfoListItem';

const data = [{ id: 1, name: '', date: '', c: 1, d: 1, dp: 1 }];

const MarketInfoList = (): JSX.Element => {
  // TODO: market/stock/id, market/crypto/id, market/indices/id
  // const { data, loading } = useAxios<DATA>(`${MARKET_API}`);

  return (
    <ul className={styles.bl_vertMarketInfo}>
      {data.map((d) => (
        <MarketInfoListItem key={d.id} {...d} />
      ))}
    </ul>
  );
};

export default MarketInfoList;
