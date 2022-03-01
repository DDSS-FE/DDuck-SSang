import styles from 'components/SearchInfoList/SearchInfoList.module.scss';

import DetailNav, { NavItem } from 'components/DetailNav';

import tickerMap from 'utils/tickerMap';
import SearchMarketListItem from 'components/SearchInfoList/SearchMarketListItem';
import SearchNewsListItem from 'components/SearchInfoList/SearchNewsListItem';

export const searchNavItems: NavItem[] = [
  { name: '종목', href: '/search/market' },
  { name: '뉴스', href: '/search/news' },
];

export interface MarketListProps {
  id: number;
  name: string;
  symbol: string;
  category: string;
}

const SearchInfoList = ({
  keyword,
  category,
}: {
  keyword: string;
  category: string;
}): JSX.Element => {
  const regExp = new RegExp(`${keyword.toUpperCase()}`);

  const { crypto, stock } = tickerMap;

  const renderSearchMarketList = (
    data: ReadonlyArray<MarketListProps>,
    ticker: string
  ) =>
    data.map((d) => {
      if (d.symbol.match(regExp) || d.name.match(regExp)) {
        return <SearchMarketListItem key={d.id} {...{ ...d, ticker }} />;
      }
    });

  return (
    <ul className={styles.bl_vertSearchInfo}>
      <DetailNav navItems={searchNavItems} />
      {keyword &&
        category === 'market' &&
        renderSearchMarketList(crypto, 'crypto')}
      {keyword &&
        category === 'market' &&
        renderSearchMarketList(stock, 'stock')}
      {keyword && category === 'news' && (
        <SearchNewsListItem keyword={keyword} />
      )}
    </ul>
  );
};

export default SearchInfoList;
