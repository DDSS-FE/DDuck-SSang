import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';

import CommentItem from 'components/CommentItem/CommentItem';
import {
  mockUseUser,
  useUserReturn,
} from 'components/Form/__tests__/SignIn.test';

jest.mock('store/modules/user/useUser');

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

export const commentAttributes = {
  articleImage,
  articleName: "윌라, '주식농부' 박영옥 '주식투자 절대 원칙' 오디오북 공개",
  articleProvider: 'insight.co.kr',
  articleUrl: 'https://www.insight.co.kr/news/383860',
  content: '댓글 내용을 작성합니다.',
  createdAt: '2022. 03. 26', // split('T')[0].replace(/-/g, '. ')
  publishedAt: '2022-03-26T20:50:57.603Z',
  updatedAt: '2022-03-27T00:00:45.331Z',
  user,
  likes: {
    data: [
      {
        id: 1,
        attributes: {
          createdAt: '2022-03-26T20:38:38.797Z',
          updatedAt: '2022-03-26T20:38:38.797Z',
        },
      },
      {
        id: 2,
        attributes: {
          createdAt: '2022-03-26T20:38:38.797Z',
          updatedAt: '2022-03-26T20:38:38.797Z',
        },
      },
    ],
  },
};

const createWrapper = (children: React.ReactNode) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('CommentItem 컴포넌트', () => {
  beforeEach(() => {
    mockUseUser.mockImplementation(() => useUserReturn);
  });

  it('유저이름, 이메일, 작성일, 작성내용, 기사 링크를 가진다.', () => {
    render(createWrapper(<CommentItem {...commentAttributes} id={1} />));

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
