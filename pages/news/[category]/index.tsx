import { faSearch } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import { axiosConfig } from 'hooks/useAxios';
import { NEWS_API } from 'utils/config';

import Header from 'components/Header';
import IconButton from 'components/IconButton';
import DetailNav from 'components/DetailNav';
import { NewsInfoList } from 'components/NewsInfoList';

export interface NewsDataType {
  name: string;
  url: string;
  image: {
    contentURL: string;
    width: string;
    height: string;
  };
  description: string;
  provider: string;
  datePublished: string;
}

export type NewsType = NewsDataType[];

interface NavItem {
  name: string;
  href: string;
  category: string;
  searchCategory: string;
}

const newsNavItems: NavItem[] = [
  {
    name: '최신',
    href: '/news/new',
    searchCategory: '주식&암호화폐&경제&상품&비트코인',
    category: 'new',
  },
  {
    name: '주식',
    href: '/news/stock',
    searchCategory: '주식',
    category: 'stock',
  },
  {
    name: '암호화폐',
    href: '/news/crypto',
    searchCategory: '암호화폐&비트코인',
    category: 'crypto',
  },
  {
    name: '경제',
    href: '/news/finance',
    searchCategory: '경제',
    category: 'finance',
  },
  {
    name: '상품',
    href: '/news/commodities',
    searchCategory: '상품',
    category: 'commodities',
  },
];

const NewsPage = ({
  newsList,
  navCategory,
}: {
  newsList: NewsDataType[];
  navCategory: string;
}): JSX.Element => {
  return (
    <>
      <Header>
        <IconButton
          onClick={() => console.log('검색 자동완성 드롭다운')}
          icon={faSearch}
        />
      </Header>
      <main>
        <DetailNav navItems={newsNavItems} />
        <NewsInfoList newsList={newsList} navCategory={navCategory} />
      </main>
    </>
  );
};

export default NewsPage;

export async function getServerSideProps(context: {
  query: { category: string };
}) {
  const isValid = newsNavItems
    .map(({ category }) => category)
    .includes(context.query.category);

  const navItem = newsNavItems.find(
    ({ category }) => category === context.query.category
  );

  if (!isValid) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }

  try {
    const res = await axios.get(
      `${NEWS_API}?queryString=${encodeURI(navItem?.searchCategory as string)}`,
      axiosConfig
    );
    if (res.status === 200) {
      return {
        props: { newsList: res.data, navCategory: context.query.category },
      };
    } else throw new Error();
  } catch (err) {
    console.error(err);
  }
}
