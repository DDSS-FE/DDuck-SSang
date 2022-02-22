import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { render, screen } from '@testing-library/react';

import MarketDetailHeader from 'components/MarketDetailHeader';
import { QUOTE_API } from 'utils/config';

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('MarketDetailHeader 컴포넌트는', () => {
  beforeEach(() => {
    server.use(
      rest.get(QUOTE_API, (req, res, ctx) => {
        return res(
          ctx.json({
            c: 1200,
            d: 100,
            dp: -5.01,
          }),
          ctx.status(200)
        );
      })
    );
  });

  it('텍스트 1200과 100 (-5.01%)를 가진다.', async () => {
    render(<MarketDetailHeader symbol="" />);

    const currentPrice = await screen.findByRole('heading');
    const changePrice = await screen.findByTestId(
      'MarketDetailHeader-changePrice'
    );

    expect(currentPrice).toHaveTextContent(/^1200$/);
    expect(changePrice).toHaveTextContent(/^100 \(-5.01%\)$/);
  });
});
