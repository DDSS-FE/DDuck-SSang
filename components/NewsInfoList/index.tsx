import { useState, useEffect } from 'react';

import styles from 'components/NewsInfoList/NewsInfoList.module.scss';

import { NewsInfoListItem } from 'components/NewsInfoListItem/';
import { NewsDataType } from 'pages/news/[category]';

export const NewsInfoList = ({
  newsList,
  navCategory,
}: {
  newsList: NewsDataType[];
  navCategory: string;
}): JSX.Element => {
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
      <section className={styles.ly_news}>
        {newsList
          .filter((_, idx) => idx <= scrollIdx)
          .map((news, idx) => {
            return (
              <NewsInfoListItem
                key={news.name}
                isMain={idx === 0}
                news={{ ...news, navCategory }} // 타입 어떻게 해야할지 모르겠습니다.
              />
            );
          })}
      </section>
    </>
  );
};
