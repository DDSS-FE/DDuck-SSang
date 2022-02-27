import { useRouter } from 'next/router';
import Header from 'components/Header';
import IconButton from 'components/IconButton';
import { NewsDetailHeader } from 'components/NewsDetailHeader';
import Spinner from 'components/Spinner';
import { NewsHeadline } from 'components/NewsHeadline';

import styles from 'pages/news/news.module.scss';

import { faSearch, faStar } from '@fortawesome/free-solid-svg-icons';
import { NEWS_API } from 'utils/config';
import useAxios from 'hooks/useAxios';
import { useState, useEffect } from 'react';

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

const NewsPage = (): JSX.Element => {
  const router = useRouter();
  const [category, setCategory] = useState('주식&비트코인&경제&정치');
  const { data, loading, fetchData } = useAxios<NewsType>(
    `${NEWS_API}?queryString=${category}`
  );
  useEffect(() => {
    fetchData();
  }, [category, fetchData]);

  return (
    <>
      <Header>
        <IconButton
          onClick={() => {
            router.push('/search/news');
          }}
          icon={faSearch}
        />
        <IconButton
          onClick={() => console.log('관심목록에 추가')}
          icon={faStar}
        />
      </Header>
      <main>
        <NewsDetailHeader setCategory={setCategory} />
        <section className={styles.ly_news}>
          {loading && <Spinner />}
          {data &&
            data.map((newsData, idx) => {
              if (idx === 0) {
                return <NewsHeadline isMain={true} newsData={newsData} />;
              } else {
                return <NewsHeadline isMain={false} newsData={newsData} />;
              }
            })}
        </section>
      </main>
    </>
  );
};

export default NewsPage;
