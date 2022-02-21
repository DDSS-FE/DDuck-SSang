import { render, screen } from '@testing-library/react';

import { Logo } from 'components/Logo';

describe('Logo', () => {
  it('has root href', () => {
    render(<Logo />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/');
  });
});
