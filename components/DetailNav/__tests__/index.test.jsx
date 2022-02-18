import { render, screen } from '@testing-library/react';

import DetailNav from 'components/DetailNav';
import { marketDetailNavItems } from 'components/MarketDetail';

describe('DetailNav', () => {
  describe('Layout', () => {
    it('has navItem 텍스트', () => {
      render(<DetailNav items={marketDetailNavItems} />);

      expect(screen.getAllByRole('link')).toHaveLength(5);

      marketDetailNavItems.forEach(({ name, href }) => {
        expect(screen.getByText(name)).toBeInTheDocument();
        expect(screen.getByRole('link', { name })).toHaveAttribute(
          'href',
          href
        );
      });
    });

    describe('Interaction', () => {});
  });
});
