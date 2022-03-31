import Image from 'next/image';

import styles from 'components/NewsDetail/NewsDetail.module.scss';

export interface NewsDetailProps {
  newsDesc: string;
  contentURL: string;
  width: string;
  height: string;
  newsUrl: string;
  newsProvider: string;
  newsDatePublished: string;
  newsName: string;
}

const NewsDetail = ({
  newsDesc,
  contentURL,
  width,
  height,
  newsUrl,
  newsProvider,
  newsDatePublished,
  newsName,
}: NewsDetailProps): JSX.Element => {
  return (
    <>
      <article className={styles.ly_NewsDetail}>
        <section className={styles.bl_NewsDetail}>
          <div className={styles.bl_NewsDetail_ttl}>
            <h1>{newsName}</h1>
          </div>
          <div className={styles.bl_NewsDetail_prov}>{newsProvider}</div>
          <div className={styles.bl_NewsDetail_time}>{newsDatePublished}</div>
          <div className={styles.bl_NewsDetail_thumb}>
            <Image
              src={`/api/imagefetcher?url=${encodeURIComponent(contentURL)}`}
              alt="main__news__thumbnail"
              width={width}
              height={height}
            />
          </div>
          <div className={styles.bl_NewsDetail_desc}>
            {newsDesc}
            <a href={newsUrl}>...원문보기</a>
          </div>
        </section>
      </article>
    </>
  );
};

export default NewsDetail;
