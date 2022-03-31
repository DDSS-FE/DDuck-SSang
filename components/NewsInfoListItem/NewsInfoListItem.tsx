import Link from 'next/link';
import Image from 'next/image';

import styles from 'components/NewsInfoListItem/NewsInfoListItem.module.scss';

import { NewsDataType } from 'pages/news/[category]';

interface NewsCategoryDataType extends NewsDataType {
  category: string;
}

const NewsInfoListItem = ({
  isMain,
  news,
}: {
  isMain: boolean;
  news: NewsCategoryDataType;
}): JSX.Element => {
  const { image, url, provider, datePublished, name, category } = news;
  const { width, height, contentURL } = image;

  return (
    <>
      <article key={url} className={styles.ly}>
        <Link href={`/news/${category}/${name}`}>
          <a className={!isMain ? styles.ly_newsLink : ''}>
            <div
              className={
                isMain
                  ? styles.bl_main_imgContainer
                  : styles.bl_news_imgContainer
              }
            >
              <Image
                src={`/api/imagefetcher?url=${encodeURIComponent(contentURL)}`}
                alt="news thumbnail"
                width={isMain ? width : 1}
                height={isMain ? height : 1}
                layout="responsive"
                className={styles.img}
              />
            </div>

            <section className={isMain ? styles.bl_mainNews : styles.bl_news}>
              <span
                className={isMain ? styles.bl_mainNews_ttl : styles.bl_news_ttl}
              >
                {name}
              </span>
              <div
                className={
                  isMain ? styles.bl_mainNews_info : styles.bl_news_info
                }
              >
                <span
                  className={
                    isMain ? styles.bl_mainNews_prov : styles.bl_news_prov
                  }
                >
                  {provider}
                </span>
                <span>{datePublished}</span>
              </div>
            </section>
          </a>
        </Link>
      </article>
    </>
  );
};

export default NewsInfoListItem;
