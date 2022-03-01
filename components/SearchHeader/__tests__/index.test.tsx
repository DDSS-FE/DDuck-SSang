import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SearchHeader from 'components/SearchHeader';

describe('SearchHeader 컴포넌트', () => {
  it('의 category가 market이면 router가 제대로 동작한다', async () => {
    render(<SearchHeader keywordHandler={() => {}} category={'market'} />);

    const inputEl = screen.getByPlaceholderText('상품 검색');

    expect(inputEl).toBeInTheDocument();
  });
  it('의 category가 news이면 router가 제대로 동작한다', async () => {
    render(<SearchHeader keywordHandler={() => {}} category={'news'} />);

    const inputEl = screen.getByPlaceholderText('뉴스 검색');

    expect(inputEl).toBeInTheDocument();
  });

  it('의 input값을 변경하면 변경된 값이 제대로 입력된다', async () => {
    const keywordHandler = jest.fn();
    render(
      <SearchHeader keywordHandler={keywordHandler} category={'market'} />
    );

    const inputEl = screen.getByPlaceholderText('상품 검색');

    userEvent.type(inputEl, 'foo');

    expect(inputEl).toHaveValue('foo');
  });
});
