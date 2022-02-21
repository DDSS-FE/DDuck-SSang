import { render, screen } from '@testing-library/react';

import MarketDetailHeader from 'components/MarketDetailHeader';
describe('MarketDetailHeader', () => {
  describe('Layout', () => {
    const data = {
      priceLast: 2740.8,
      priceChangeValue: -0.72,
      priceChangePercent: -0.03,
    };
    it.each`
      value
      ${data.priceLast}
      ${data.priceChangeValue}
      ${data.priceChangePercent}
    `('haha', ({ value }) => {
      render(<MarketDetailHeader {...data} />);
      expect(
        screen.getByTestId('MarketDetailHeader-component')
      ).toHaveTextContent(value);
    });
  });
});
