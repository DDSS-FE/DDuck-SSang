import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

import styles from 'components/NewsInfoListItem/NewsInfoListItem.module.scss';

import { NewsDataType } from 'pages/news/[category]';
interface NewsCategoryDataType extends NewsDataType {
  category: string;
}

export const NewsInfoListItem = ({
  isMain,
  news,
}: {
  isMain: boolean;
  news: NewsCategoryDataType;
}): JSX.Element => {
  const { image, url, provider, datePublished, name, category } = news;
  const { width, height, contentURL } = image;

  const router = useRouter();

  return (
    <>
      <article key={url}>
        <Link
          href={`/news/${category}/${name}`}
          as={`${router.asPath}/${name}`}
        >
          <a className={!isMain ? styles.ly_newsLink : ''}>
            <Image
              src={`/api/imagefetcher?url=${encodeURIComponent(contentURL)}`}
              alt="main news thumbnail"
              width={isMain ? width : 150}
              height={isMain ? height : 150}
            />

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
                <span
                  className={
                    isMain ? styles.bl_mainNews_time : styles.bl_news_time
                  }
                >
                  {datePublished}
                </span>
              </div>
            </section>
          </a>
        </Link>
      </article>
    </>
  );
};
