import NavBar from 'components/NavBar';
import { render, screen } from '@testing-library/react';

describe('NavBar', () => {
  describe('Layout', () => {
    it.each`
      name
      ${'시장'}
      ${'뉴스'}
      ${'관심목록'}
      ${'더보기'}
    `('has $name 텍스트를 가진 링크', ({ name }) => {
      render(<NavBar />);
      const linkComponent = screen.getByRole('link', { name });
      expect(linkComponent).toBeInTheDocument();
    });
  });

  describe('Interaction', () => {});
});
