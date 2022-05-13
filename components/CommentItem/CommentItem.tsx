import { useState } from 'react';
import Image from 'next/image';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

import { ArticleItem } from 'components/ArticleItem';
import { UiButton } from 'components/UiButton';

import { IAllLike, IAllLikeData, ICommentAttributes } from 'utils/types';
import useUser from 'store/modules/user/useUser';
import { LIKES_API } from 'utils/config';

import styles from 'components/CommentItem/CommentItem.module.scss';

interface ICommentItemProps extends ICommentAttributes {
  id: number;
  allLikes?: IAllLike;
}

interface IContext {
  previousValue: IAllLike;
}

export default function CommentItem({
  user,
  createdAt,
  content,
  articleImage,
  articleName,
  articleProvider,
  articleUrl,
  id,
  likes,
  allLikes,
}: ICommentItemProps): JSX.Element {
  const { userData } = useUser();
  const [likeIsClicked, setLikeIsClicked] = useState(
    !!allLikes?.data?.find((likeItem: IAllLikeData) => {
      return (
        likeItem.attributes.comments?.data[0].id === id &&
        likeItem.attributes.users?.data[0].id === userData?.id
      );
    })
  );
  const queryClient = useQueryClient();
  const mutatePostLike = useMutation<Response, unknown>(
    () =>
      axios.post(
        LIKES_API,
        {
          data: {
            comments: id,
            users: userData.id,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      ),
    {
      onMutate: () => {
        queryClient.cancelQueries('likes');
        const previousValue = queryClient.getQueryData<IAllLike | undefined>(
          'likes'
        );
        if (previousValue) {
          queryClient.setQueryData<IAllLike | undefined>('likes', {
            data: previousValue?.data,
          });
        }
        return { previousValue };
      },
      onError: (err, variables, context) => {
        queryClient.setQueryData(
          'likes',
          context ? (context as IContext) : context
        );
      },
      onSettled: () => {
        queryClient.invalidateQueries('likes');
        queryClient.invalidateQueries('comments');
      },
    }
  );

  function toggle() {
    if (!userData) alert('로그인이 필요합니다.');
    setLikeIsClicked(!likeIsClicked);
    mutatePostLike.mutate();
  }

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
      <div className={styles.bl_commentItem_btnWrapper}>
        <UiButton
          icon="♥"
          text="likes"
          number={likes.data.length}
          onClick={toggle}
          isClicked={likeIsClicked}
        />
      </div>
    </article>
  );
}
