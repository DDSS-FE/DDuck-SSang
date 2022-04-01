import Skeleton from 'react-loading-skeleton';

import styles from 'components/CommentItem/CommentItem.module.scss';

export default function SkeletonCommentList() {
  return (
    <ul>
      {Array(3)
        .fill()
        .map((_, index) => {
          return (
            <article className={styles.bl_commentItem} key={index}>
              <div className={styles.bl_commentItem_heading}>
                <Skeleton
                  className={styles.bl_commentItem_username}
                  width={50}
                />
                <Skeleton className={styles.bl_commentItem_email} width={100} />
                <p className={styles.bl_commentItem_createdAt}>
                  <Skeleton width={100} />
                </p>
              </div>

              <p className={styles.bl_commentItem_content}>
                <Skeleton />
                <Skeleton width="90%" />
              </p>

              <article className={styles.bl_articleItem}>
                <Skeleton
                  className={styles.bl_articleItem_image}
                  height="40vh"
                />
                <div className={styles.bl_articleItem_heading}>
                  <p className={styles.bl_articleItem_author}>
                    <Skeleton width={100} />
                  </p>
                  <div className={styles.bl_articleItem_title}>
                    <Skeleton />
                  </div>
                </div>
              </article>
            </article>
          );
        })}
    </ul>
  );
}
