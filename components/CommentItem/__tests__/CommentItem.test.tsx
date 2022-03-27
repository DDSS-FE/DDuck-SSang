import React from 'react';
import { render, screen } from '@testing-library/react';

import CommentItem, { ArticleItem } from 'components/CommentItem/CommentItem';
import Image from 'next/image';

const articleImage = {
  contentURL:
    'https://img.insight.co.kr/static/2022/02/25/1200/img_20220225111242_v95833ok.jpg',
  height: 371,
  width: 700,
};

const user = {
  data: {
    attributes: {
      blocked: false,
      confirmed: true,
      createdAt: '2022-03-26T20:38:38.797Z',
      email: 'coa@crl.com',
      provider: 'local',
      updatedAt: '2022-03-26T20:38:38.797Z',
      username: 'coa',
    },
    id: 1,
  },
};

const commentAttributes = {
  articleImage,
  articleName: "윌라, '주식농부' 박영옥 '주식투자 절대 원칙' 오디오북 공개",
  articleProvider: 'insight.co.kr',
  articleUrl: 'https://www.insight.co.kr/news/383860',
  content: '댓글 내용을 작성합니다.',
  createdAt: '2022. 03. 26', // split('T')[0].replace(/-/g, '. ')
  publishedAt: '2022-03-26T20:50:57.603Z',
  updatedAt: '2022-03-27T00:00:45.331Z',
  user,
};

describe('CommentItem 컴포넌트', () => {
  it('유저이름, 이메일, 작성일, 작성내용, 기사 링크를 가진다.', () => {
    render(<CommentItem {...commentAttributes} />);

    expect(screen.getByTestId('username')).toHaveTextContent(
      user.data.attributes.username
    );
    expect(screen.getByTestId('email')).toHaveTextContent(
      user.data.attributes.email
    );
    expect(screen.getByTestId('createdAt')).toHaveTextContent(
      commentAttributes.createdAt
    );
    expect(screen.getByTestId('content')).toHaveTextContent(
      commentAttributes.content
    );
    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      commentAttributes.articleUrl
    );
  });
});

describe('ArticleItem 컴포넌트', () => {
  it('작성자와 글 제목을 가진다.', () => {
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
