import styles from 'components/SearchInfoList/SearchInfoList.module.scss';

import DetailNav, { NavItem } from 'components/DetailNav';

import SearchInfoListItem from 'components/SearchInfoList/SearchInfoListItem';
import { SearchProps } from 'pages/search/[id]';

export const searchNavItems: NavItem[] = [
  { name: '종목', href: '/search/market' },
  { name: '뉴스', href: '/search/news' },
];

const SearchInfoList = ({
  keyword,
  data,
}: {
  keyword: string;
  data: SearchProps[];
}): JSX.Element => {
  const regExp = new RegExp(`${keyword.toUpperCase()}`);

  return (
    <ul className={styles.bl_vertSearchInfo}>
      <DetailNav navItems={searchNavItems} />
      {keyword &&
        data &&
        data.map((d) => {
          if (d.symbol.match(regExp)) {
            return <SearchInfoListItem key={d.id} {...d} />;
          }
        })}
    </ul>
  );
};

export default SearchInfoList;
