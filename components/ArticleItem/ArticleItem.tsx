import styles from 'components/ArticleItem/ArticleItem.module.scss';

interface IAritcleItemProps {
  image: React.ReactNode;
  author: string;
  title: string;
  simple?: boolean;
}

export default function ArticleItem({
  image,
  author,
  title,
  simple = false,
}: IAritcleItemProps): JSX.Element {
  return (
    <article
      className={simple ? styles.bl_simpleArticleItem : styles.bl_articleItem}
    >
      <div
        className={
          simple
            ? styles.bl_simpleArticleItem_image
            : styles.bl_articleItem_image
        }
      >
        {image}
      </div>
      <div
        className={
          simple
            ? styles.bl_simpleArticleItem_heading
            : styles.bl_articleItem_heading
        }
      >
        <p
          className={
            simple
              ? styles.bl_simpleArticleItem_author
              : styles.bl_articleItem_author
          }
          data-testid="author"
        >
          {author}
        </p>
        <div
          className={
            simple
              ? styles.bl_simpleArticleItem_title
              : styles.bl_articleItem_title
          }
          data-testid="title"
        >
          {title}
        </div>
      </div>
    </article>
  );
}
