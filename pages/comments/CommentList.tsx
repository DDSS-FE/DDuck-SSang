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

  if (isError) {
    return (
      <div className="errorMsg">
        <p>댓글 데이터를 가져오는 데 실패했습니다.</p>
        <p> 잠시 후에 다시 시도해주세요.</p>
      </div>
    );
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
