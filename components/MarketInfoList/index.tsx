import styles from 'components/MarketInfoList/MarketInfoList.module.scss';

import MarketInfoListItem from 'components/MarketInfoList/MarketInfoListItem';
import Spinner from 'components/Spinner';

import useAxios from 'hooks/useAxios';
import { QUOTE_API } from 'utils/config';

interface Props {
  category: 'stock' | 'crypto';
}

type MarketInfoData = MarketInfo[];

interface MarketInfo {
  id: number;
  name: string;
  symbol: string;
  c: number; // current
  d: number; // change
  dp: number; // percent change
}

const MarketInfoList = ({ category }: Props): JSX.Element => {
  const { data, loading } = useAxios<MarketInfoData>(
    `${QUOTE_API}?category=${category}`
  );

  return (
    <>
      {loading && <Spinner />}
      {data && (
        <ul className={styles.bl_vertMarketInfo}>
          {data.map((d) => (
            <MarketInfoListItem key={d.id} category={category} {...d} />
          ))}
        </ul>
      )}
    </>
  );
};

export default MarketInfoList;
