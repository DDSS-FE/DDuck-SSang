import Image from 'next/image';

import styles from 'components/CommentItem/CommentItem.module.scss';

import { ICommentAttributes } from 'utils/types';

interface IAritcleItemProps {
  image: React.ReactNode;
  author: string;
  title: string;
}

export function ArticleItem({
  image,
  author,
  title,
}: IAritcleItemProps): JSX.Element {
  return (
    <article className={styles.bl_articleItem}>
      <div className={styles.bl_articleItem_image}>{image}</div>
      <div className={styles.bl_articleItem_heading}>
        <p className={styles.bl_articleItem_author} data-testid="author">
          {author}
        </p>
        <div className={styles.bl_articleItem_title} data-testid="title">
          {title}
        </div>
      </div>
    </article>
  );
}

export default function CommentItem({
  user,
  createdAt,
  content,
  articleImage,
  articleName,
  articleProvider,
  articleUrl,
}: ICommentAttributes): JSX.Element {
  return (
    <article className={styles.bl_commentItem}>
      <div className={styles.bl_commentItem_heading}>
        <p className={styles.bl_commentItem_username} data-testid="username">
          {user.data.attributes.username}
        </p>
        <p className={styles.bl_commentItem_email} data-testid="email">
          {user.data.attributes.email}
        </p>
        <p className={styles.bl_commentItem_createdAt} data-testid="createdAt">
          {createdAt.split('T')[0].replace(/-/g, '. ')}
        </p>
      </div>

      <p className={styles.bl_commentItem_content} data-testid="content">
        {content}
      </p>

      <a href={articleUrl} rel="noreferrer" target="_blank">
        <ArticleItem
          image={
            <Image
              src={`/api/imagefetcher?url=${encodeURIComponent(
                articleImage.contentURL
              )}`}
              alt="news thumbnail"
              width={articleImage.width}
              height={articleImage.height}
              layout="responsive"
            />
          }
          author={articleProvider}
          title={articleName}
        />
      </a>
    </article>
  );
}
