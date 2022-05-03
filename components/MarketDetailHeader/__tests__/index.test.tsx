import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { render, screen } from '@testing-library/react';

import { MarketDetailHeader } from 'components/MarketDetailHeader';

import { QUOTE_API } from 'utils/config';

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('MarketDetailHeader 컴포넌트는', () => {
  server.use(
    rest.get(QUOTE_API, (req, res, ctx) => {
      return res(
        ctx.json({
          name: '애플',
          symbol: 'AAPL',
          c: 1200,
          d: 100,
          dp: -5.01,
        }),
        ctx.status(200)
      );
    })
  );

  it('텍스트 "애플(AAPL)"과 "1200100 (-5.01%)"를 가진다.', async () => {
    render(<MarketDetailHeader symbol="" />);

    const nameWithSymbol = await screen.findByRole('heading');
    const priceInfo = await screen.findByTestId('MarketDetailHeader-PriceInfo');

    expect(nameWithSymbol).toHaveTextContent(/^애플\(AAPL\)$/);
    expect(priceInfo).toHaveTextContent('1200100.000 (-5.010%)');
  });
});
