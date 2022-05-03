import { NavBar } from 'components/NavBar';
import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';

jest.mock('next/router');

describe('NavBar', () => {
  describe('Layout', () => {
    beforeEach(() => {
      useRouter.mockImplementation(() => ({ pathname: '' }));
    });

    it.each`
      name
      ${'시장'}
      ${'뉴스'}
      ${'관심목록'}
      ${'댓글'}
      ${'더보기'}
    `('has $name 텍스트를 가진 링크', ({ name }) => {
      render(<NavBar />);
      const linkComponent = screen.getByRole('link', { name });
      expect(linkComponent).toBeInTheDocument();
    });
  });
});
