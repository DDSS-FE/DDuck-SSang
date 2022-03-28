import React, { Dispatch, SetStateAction, useState } from 'react';

import { ArticleItem } from 'components/ArticleItem';

import { IArticleSummary } from 'utils/types';

import styles from 'components/CommentForm/CommentForm.module.scss';
import Image from 'next/image';

async function createComment(content: string, article: IArticleSummary) {
  try {
    const response = await fetch('http://localhost:1337/api/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        data: {
          content,
          articleName: article.articleName,
          articleUrl: article.articleUrl,
          articleImage: article.articleImage,
          articleProvider: article.articleProvider,
        },
      }),
    });
    if (!response.ok) throw new Error(response.statusText);
    return await response.json();
  } catch (error) {
    alert(error);
  }
}

export default function CommentForm({
  isOpen,
  setIsOpen,
  article,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  article: IArticleSummary;
}) {
  // 추후 validation check 추가
  const [content, setContent] = useState('');

  async function addComment(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    createComment(content, article);
    setContent('');
    setIsOpen(false);
  }

  const handleOnChage = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div className={styles.bl_comment_container}>
          <div className={styles.bl_comment}>
            <div className={styles.bl_comment_articleWrapper}>
              <a href={article.articleUrl} rel="noreferrer" target="_blank">
                <ArticleItem
                  simple
                  image={
                    <Image
                      src={`/api/imagefetcher?url=${encodeURIComponent(
                        article.articleImage.contentURL
                      )}`}
                      alt="news thumbnail"
                      width={article.articleImage.width}
                      height={article.articleImage.height}
                      layout="responsive"
                    />
                  }
                  author={article.articleProvider}
                  title={article.articleName}
                />
              </a>
            </div>

            <form className={styles.bl_comment_form} onSubmit={addComment}>
              <div className={styles.bl_comment_textarea_container}>
                <textarea
                  id="content"
                  onChange={handleOnChage}
                  required
                  className={styles.bl_comment_textarea}
                />
              </div>

              <div className={styles.bl_comment_button_container}>
                <button className={styles.el_cancel_Btn} onClick={handleClose}>
                  취소
                </button>
                <button className={styles.el_submit_Btn}>작성</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
