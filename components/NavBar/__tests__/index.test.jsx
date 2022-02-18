import NavBar from 'components/NavBar';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('NavBar', () => {
  describe('레이아웃', () => {
    it('has 시장 텍스트를 가진 링크', () => {
      render(<NavBar />);
      const text = screen.getAllByRole('link', [
        { name: '시장' },
        { name: '뉴스' },
        { name: '관심목록' },
        { name: '더보기' },
      ]);
      console.log(text);
      expect(text).toBeInTheDocument();
    });
    it('has 뉴스 텍스트를 가진 링크', () => {
      render(<NavBar />);
      const text = screen.getByRole('link', { name: '뉴스' });
      expect(text).toBeInTheDocument();
    });
    it('has 관심목록 텍스트를 가진 링크', () => {
      render(<NavBar />);
      const text = screen.getByRole('link', { name: '관심목록' });
      expect(text).toBeInTheDocument();
    });
    it('has 더보기 텍스트를 가진 링크', () => {
      render(<NavBar />);
      const text = screen.getByRole('link', { name: '더보기' });
      expect(text).toBeInTheDocument();
    });
  });
  describe('인터랙션', () => {
    // TODO : unit testing next/router
    it('check 시장 링크 클릭 시 시장 버튼 활성화', () => {
      render(<NavBar />);
      const text = screen.getByRole('link', { name: '시장' });

      userEvent.click(text);

      expect(text).toHaveClass('is_active');
    });
    it('check 뉴스 링크 클릭 시 뉴스 버튼 활성화', () => {
      render(<NavBar />);
      const text = screen.getByRole('link', { name: '뉴스' });

      userEvent.click(text);

      expect(text).toHaveClass('is_active');
    });
    it('check 관심목록 링크 클릭 시 관심목록 버튼 활성화', () => {
      render(<NavBar />);
      const text = screen.getByRole('link', { name: '관심목록' });

      userEvent.click(text);

      expect(text).toHaveClass('is_active');
    });
    it('check 더보기 링크 클릭 시 더보기 버튼 활성화', () => {
      render(<NavBar />);
      const text = screen.getByRole('link', { name: '더보기' });

      userEvent.click(text);

      // expect(text).toHaveClass('is_active');

      expect(global.window.location.pathname).toEqual('/more');
    });
  });
});
