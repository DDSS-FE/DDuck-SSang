import { faSearch, faStar } from '@fortawesome/free-solid-svg-icons';

import styles from 'pages/news/news.module.scss';

import useAxios from 'hooks/useAxios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { NEWS_API } from 'utils/config';

import Header from 'components/Header';
import IconButton from 'components/IconButton';
import Spinner from 'components/Spinner';
import { NewsHeadline } from 'components/NewsHeadline';
import DetailNav from 'components/DetailNav';

export interface NewsDataType {
  name: string;
  url: string;
  image: {
    contentURL: string;
    width: number;
    height: number;
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
}

const navItems: NavItem[] = [
  {
    name: '최신',
    href: '/news/new',
    category: '주식&암호화폐&경제&상품&비트코인',
  },
  { name: '주식', href: '/news/stock', category: '주식' },
  { name: '암호화폐', href: '/news/crypto', category: '암호화폐&비트코인' },
  { name: '경제', href: '/news/finance', category: '경제' },
  { name: '상품', href: '/news/commodities', category: '상품' },
];

const NewsPage = (): JSX.Element => {
  const [scrollIdx, setScrollIdx] = useState(3);
  const [category, setCategory] = useState('');

  const router = useRouter();
  const { asPath, isReady } = router;

  const navItem = navItems.find(({ href }) => href === asPath);
  // const category = navItem ? navItem.category : '';
  // if (!isReady) {
  //   setCategory(navItem.category);
  // }
  setCategory(navItem.category);
  const { data, loading } = useAxios<NewsType>(
    `${NEWS_API}?queryString=${category}`
  );

  const increaseScrollIdx = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight) {
      setScrollIdx(scrollIdx + 3);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', increaseScrollIdx);
    return () => {
      window.removeEventListener('scroll', increaseScrollIdx);
    };
  }, []);

  return (
    <>
      <Header>
        <IconButton
          onClick={() => console.log('검색 자동완성 드롭다운')}
          icon={faSearch}
        />
        <IconButton
          onClick={() => console.log('관심목록에 추가')}
          icon={faStar}
        />
      </Header>
      <main>
        <DetailNav navItems={navItems} />
        <section className={styles.ly_news}>
          {loading && <Spinner />}
          {data &&
            data
              .filter((_, i) => i <= scrollIdx)
              .map((newsData, idx) => {
                return (
                  <NewsHeadline
                    key={newsData.name}
                    isMain={!idx}
                    newsData={newsData}
                  />
                );
              })}
        </section>
      </main>
    </>
  );
};

export default NewsPage;
