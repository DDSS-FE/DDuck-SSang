import { render, screen } from '@testing-library/react';
import Image from 'next/image';

import { ArticleItem } from 'components/ArticleItem';
import { commentAttributes } from 'components/CommentItem/__tests__/CommentItem.test';

describe('ArticleItem 컴포넌트', () => {
  it('simpleArticleItem 스타일인 경우 작성자와 글 제목을 가진다.', () => {
    render(
      <ArticleItem
        simple
        image={
          <Image
            src={`/api/imagefetcher?url=${encodeURIComponent(
              commentAttributes.articleImage.contentURL
            )}`}
            alt="news thumbnail"
            width={commentAttributes.articleImage.width}
            height={commentAttributes.articleImage.height}
            layout="responsive"
          />
        }
        author={commentAttributes.articleProvider}
        title={commentAttributes.articleName}
      />
    );

    expect(screen.getByTestId('author')).toHaveTextContent(
      commentAttributes.articleProvider
    );
    expect(screen.getByTestId('title')).toHaveTextContent(
      commentAttributes.articleName
    );
  });
  it('articleItem 스타일인 경우 작성자와 글 제목을 가진다.', () => {
    render(
      <ArticleItem
        image={
          <Image
            src={`/api/imagefetcher?url=${encodeURIComponent(
              commentAttributes.articleImage.contentURL
            )}`}
            alt="news thumbnail"
            width={commentAttributes.articleImage.width}
            height={commentAttributes.articleImage.height}
            layout="responsive"
          />
        }
        author={commentAttributes.articleProvider}
        title={commentAttributes.articleName}
      />
    );

    expect(screen.getByTestId('author')).toHaveTextContent(
      commentAttributes.articleProvider
    );
    expect(screen.getByTestId('title')).toHaveTextContent(
      commentAttributes.articleName
    );
  });
});
