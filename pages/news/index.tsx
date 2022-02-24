import Link from 'next/link';
import Image from 'next/image';
import classes from 'pages/news/news.module.scss';
import Header from 'components/Header';
import IconButton from 'components/IconButton';
import { NewsDetailHeader } from 'components/NewsDetailHeader';
import Spinner from 'components/Spinner';

import { faSearch, faStar } from '@fortawesome/free-solid-svg-icons';
import { NEWS_API } from 'utils/config';
import useAxios from 'hooks/useAxios';
import { useState, useEffect } from 'react';

interface NewsDataType {
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

type NewsType = NewsDataType[];

const NewsPage = (): JSX.Element => {
  const [category, setCategory] = useState('주식&비트코인&경제&정치');
  const { data, loading, fetchData } = useAxios<NewsType>(
    `${NEWS_API}?queryString=${category}`
  );
  useEffect(() => {
    fetchData();
  }, [category]);

  console.log(data);

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
        <NewsDetailHeader setCategory={setCategory} />
        {loading && <Spinner />}
        {data &&
          data.map(
            (
              { name, url, image, description, provider, datePublished },
              idx
            ) => {
              if (idx === 0) {
                return (
                  <article className={classes.main__news__item} key={url}>
                    <Image
                      src={`/api/imagefetcher?url=${encodeURIComponent(
                        image.contentURL
                      )}`}
                      alt="main__news__thumbnail"
                      width={image.width}
                      height={image.height}
                      className={classes.main__news__thumbnail}
                    />
                    <section className={classes.main__news__headline}>
                      <span className={classes.main__news__title}>{name}</span>
                      <div className={classes.main__news__information}>
                        <span className={classes.main__news__source}>
                          {provider}
                        </span>
                        <span className={classes.main__news__writtenTime}>
                          {datePublished}
                        </span>
                      </div>
                    </section>
                  </article>
                );
              }
              return (
                <article className={classes.news__item} key={url}>
                  <Image
                    src={`/api/imagefetcher?url=${encodeURIComponent(
                      image.contentURL
                    )}`}
                    alt="news__thumbnail"
                    width={100}
                    height={100}
                    className={classes.news__thumbnail}
                  />
                  {console.log(name, image.width, image.height)}
                  <section className={classes.news__headline}>
                    <span className={classes.news__title}>{name}</span>
                    <div className={classes.news__information}>
                      <span className={classes.news__source}>{provider}</span>
                      <span className={classes.news__writtenTime}>
                        {datePublished}
                      </span>
                    </div>
                  </section>
                </article>
              );
            }
          )}
      </main>
    </>
  );
};

export default NewsPage;
