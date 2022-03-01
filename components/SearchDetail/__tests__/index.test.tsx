import { render, screen } from '@testing-library/react';

// import { useRouter } from 'next/router';
// import { renderHook } from '@testing-library/react-hooks';

import SearchDetail from 'components/SearchDetail';

jest.mock('next/router', () => require('next-router-mock'));

// const { result } = renderHook(() => useRouter());

describe('SearchDetail 컴포넌트', () => {
  it('의 category가 market이면 router가 제대로 동작한다', async () => {
    render(<SearchDetail category="market" />);

    const inputEl = screen.getByPlaceholderText('상품 검색');

    expect(inputEl).toBeInTheDocument();
  });
  it('의 category가 news이면 router가 제대로 동작한다', async () => {
    render(<SearchDetail category="news" />);

    const inputEl = screen.getByPlaceholderText('뉴스 검색');

    expect(inputEl).toBeInTheDocument();
  });
});
