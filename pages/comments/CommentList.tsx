import { useQuery } from 'react-query';
import axios from 'axios';

import { CommentItem } from 'components/CommentItem';
import SkeletonCommentList from 'pages/comments/SkeletonCommentList';

import { IAllLike, ICommentData, IComments } from 'utils/types';
import { COMMENTS_API, LIKES_API } from 'utils/config';

const fetchComments = async (): Promise<IComments> => {
  const { data } = await axios.get(
    `${COMMENTS_API}?populate=*&sort=createdAt:DESC`
  );
  return data;
};

const fetchLikes = async (): Promise<IAllLike> => {
  const { data } = await axios.get(`${LIKES_API}?populate=*`);
  return data;
};

export default function CommentList() {
  const {
    data: comments,
    isError,
    isLoading,
  } = useQuery('comments', fetchComments);

  const {
    data: likes,
    isLoading: likesIsLoading,
    isError: likesIsError,
  } = useQuery('likes', fetchLikes);

  if (isError || likesIsError) {
    return (
      <div className="errorMsg">
        <p>댓글 데이터를 가져오는 데 실패했습니다.</p>
        <p> 잠시 후에 다시 시도해주세요.</p>
      </div>
    );
  }

  if (isLoading || likesIsLoading) {
    return <SkeletonCommentList />;
  }

  return (
    <ul>
      {comments?.data.map((comment: ICommentData) => {
        return (
          likes && (
            <CommentItem
              key={comment.id}
              {...comment.attributes}
              id={comment.id}
              allLikes={likes}
            />
          )
        );
      })}
    </ul>
  );
}
