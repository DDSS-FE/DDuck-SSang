import Image from 'next/image';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from 'components/NewsDetail/NewsDetail.module.scss';
import useCommentForm from 'hooks/useCommentForm';

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

export const NewsDetail = ({
  newsDesc,
  contentURL,
  width,
  height,
  newsUrl,
  newsProvider,
  newsDatePublished,
  newsName,
}: NewsDetailProps): JSX.Element => {
  const { handleOpen, renderCommentForm } = useCommentForm();
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

          <div className={styles.bl_NewsDetail_btnWrapper}>
            <button
              onClick={handleOpen}
              className={styles.bl_NewsDetail_commentBtn}
            >
              <FontAwesomeIcon icon={faComments} />
              댓글 작성
            </button>
          </div>
        </section>
        {renderCommentForm({
          articleName: newsName,
          articleUrl: newsUrl,
          articleImage: {
            contentURL,
            width: +width,
            height: +height,
          },
          articleProvider: newsProvider,
        })}
      </article>
    </>
  );
};
