import React from 'react';
import { render, screen } from '@testing-library/react';

import { SearchMarketListItem } from 'components/SearchInfoList';

describe('SearchInfoList 컴포넌트', () => {
  it.each`
    name        | symbol    | ticker      | category
    ${'애플'}   | ${'AAPL'} | ${'NASDAQ'} | ${'stock'}
    ${'구글'}   | ${'GOOG'} | ${'NASDAQ'} | ${'stock'}
    ${'테슬라'} | ${'TSLA'} | ${'NASDAQ'} | ${'stock'}
    ${'아마존'} | ${'AMZN'} | ${'NASDAQ'} | ${'stock'}
    ${'페이팔'} | ${'PYPL'} | ${'NASDAQ'} | ${'stock'}
  `(
    '주식의 SearchMarketListItem 텍스트가 정상 출력된다.',
    ({ name, symbol, ticker, category }) => {
      render(
        <SearchMarketListItem
          name={name}
          symbol={symbol}
          ticker={ticker}
          category={category}
        />
      );

      expect(screen.getByTestId('name')).toHaveTextContent(name);
      expect(screen.getByTestId('symbol&category')).toHaveTextContent(
        `${symbol} | ${category}`
      );
    }
  );

  it.each`
    name              | symbol               | category
    ${'비트코인'}     | ${'BINANCE:BTCUSDT'} | ${'crypto'}
    ${'이더리움'}     | ${'BINANCE:BTCUSDT'} | ${'crypto'}
    ${'바이낸스코인'} | ${'BINANCE:BTCUSDT'} | ${'crypto'}
    ${'리플'}         | ${'BINANCE:BTCUSDT'} | ${'crypto'}
    ${'에이다'}       | ${'BINANCE:BTCUSDT'} | ${'crypto'}
  `(
    '암호화폐의 SearchMarketListItem 텍스트가 정상 출력된다.',
    ({ name, symbol, ticker, category }) => {
      render(
        <SearchMarketListItem
          name={name}
          symbol={symbol}
          ticker={ticker}
          category={category}
        />
      );

      expect(screen.getByTestId('name')).toHaveTextContent(name);
      expect(screen.getByTestId('symbol&category')).toHaveTextContent(
        `${symbol.slice(8)} | ${category}`
      );
    }
  );
});
