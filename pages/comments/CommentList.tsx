import { useQuery } from 'react-query';

import { CommentItem } from 'components/CommentItem';
import SkeletonCommentList from 'pages/comments/SkeletonCommentList';

import { ICommentData } from 'utils/types';

const fetchComments = async () => {
  const res = await fetch('http://localhost:1337/api/comments?populate=*');
  const data = await res.json();
  return data;
};

export default function CommentList() {
  const {
    data: comments,
    isError,
    isLoading,
  } = useQuery('comments', fetchComments);
  // 관심목록 에러 메시지 관련 pull request 머지 후에 변경
  if (isError) {
    return <p>Failed to load comments.</p>;
  }

  if (isLoading) {
    return <SkeletonCommentList />;
  }

  return (
    <ul>
      {comments?.data.map((comment: ICommentData) => {
        return <CommentItem key={comment.id} {...comment.attributes} />;
      })}
    </ul>
  );
}
