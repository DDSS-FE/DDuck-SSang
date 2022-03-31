import { NEWS_API } from 'utils/config';

import styles from 'components/SearchInfoList/SearchInfoList.module.scss';

import { useState, useEffect } from 'react';
import useAxios from 'hooks/useAxios';

import { NewsDataType } from 'pages/news/[category]';
import { NewsInfoListItem } from 'components/NewsInfoListItem';
import { Spinner } from 'components/Spinner';

interface Props {
  keyword: string;
}

const SearchNewsListItem = ({ keyword }: Props): JSX.Element => {
  const { data, loading } = useAxios<NewsDataType[]>(
    `${NEWS_API}?queryString=${keyword}`
  );

  const [scrollIdx, setScrollIdx] = useState(10);

  const increaseScrollIdx = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight) {
      setScrollIdx(scrollIdx + 5);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', increaseScrollIdx);
    return () => {
      window.removeEventListener('scroll', increaseScrollIdx);
    };
  });

  return (
    <>
      {loading && <Spinner />}
      <li className={styles.bl_vertSearchInfo_item}>
        {data &&
          !loading &&
          data
            .filter((_, idx) => idx <= scrollIdx)
            .map((news) => (
              <NewsInfoListItem
                key={news.name}
                isMain={false}
                news={{ ...news, category: 'search' }}
              />
            ))}
      </li>
    </>
  );
};

export default SearchNewsListItem;
