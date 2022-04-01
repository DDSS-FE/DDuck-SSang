import { Header } from 'components/Header';
import CommentList from 'pages/comments/CommentList';

import styles from 'pages/comments/comments.module.scss';

export default function CommentsPage(): JSX.Element {
  return (
    <>
      <Header />
      <section className={styles.ly_comments}>
        <CommentList />
      </section>
    </>
  );
}
