import { render, screen } from '@testing-library/react';

import { DetailNav } from 'components/DetailNav';
import { newsNavItems } from 'pages/news/[category]';
import { useRouter } from 'next/router';

jest.mock('next/router');
const mockUseRouter = useRouter as jest.Mock;

const useRouterReturn = {
  asPath: '/test/path',
};

describe('DetailNav 컴포넌트는', () => {
  beforeEach(() => {
    mockUseRouter.mockImplementation(() => useRouterReturn);
  });

  it.each`
    name          | path
    ${'최신'}     | ${'/news/new'}
    ${'주식'}     | ${'/news/stock'}
    ${'암호화폐'} | ${'/news/crypto'}
    ${'경제'}     | ${'/news/finance'}
    ${'상품'}     | ${'/news/commodities'}
  `('$name에 맞는 $path를 가지고 있다.', ({ name, path }) => {
    render(<DetailNav navItems={newsNavItems} />);
    expect(screen.getByTestId('DetailNav-component')).toHaveTextContent(name);
    expect(screen.getByRole('link', { name: name })).toHaveAttribute(
      'href',
      path
    );
  });
});
