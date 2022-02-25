import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { NewsDataType } from 'pages/news/[category]';

import styles from 'components/NewsHeadline/NewsHeadline.module.scss';

export const NewsHeadline = ({
  isMain,
  newsData,
}: {
  isMain: boolean;
  newsData: NewsDataType;
}): JSX.Element => {
  const router = useRouter();
  const { name, url, description, image, provider, datePublished } = newsData;
  return (
    <>
      <article
        className={isMain ? styles.ly_mainNews : styles.ly_news}
        key={url}
      >
        <Link
          href={{
            pathname: `/news/[category]/[id]`,
            query: {
              description: JSON.stringify(description),
              image: JSON.stringify(image),
              provider: JSON.stringify(provider),
              datePublished: JSON.stringify(datePublished),
              url: JSON.stringify(url),
              name: JSON.stringify(name),
            },
          }}
          as={`${router.asPath}/${name}`}
        >
          <a className={!isMain ? styles.ly_newsLink : ''}>
            <Image
              src={`/api/imagefetcher?url=${encodeURIComponent(
                image.contentURL
              )}`}
              alt="main news thumbnail"
              width={isMain ? image.width : 150}
              height={isMain ? image.height : 150}
              className={isMain ? styles.el_image__l : styles.el_image__s}
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
