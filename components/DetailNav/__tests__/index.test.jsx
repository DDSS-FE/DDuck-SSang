import { render, screen } from '@testing-library/react';

import DetailNav from 'components/DetailNav';
import { marketDetailNavItems } from 'components/MarketDetail';

describe('DetailNav', () => {
  describe('Layout', () => {
    it.each`
      name          | path
      ${'개요'}     | ${'/overview'}
      ${'분석'}     | ${'/analysis'}
      ${'주식시장'} | ${'/stocks'}
      ${'경제지표'} | ${'/'}
      ${'경제뉴스'} | ${'/'}
    `('has navItem 텍스트', ({ name, path }) => {
      render(<DetailNav items={marketDetailNavItems} />);

      expect(screen.getByTestId('DetailNav-component')).toHaveTextContent(name);
      expect(screen.getByRole('link', { name })).toHaveAttribute('href', path);
    });
  });
  describe('Interaction', () => {});
});
