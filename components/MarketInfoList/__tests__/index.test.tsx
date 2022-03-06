import { render, screen } from '@testing-library/react';

import MarketInfoListItem, {
  Props,
} from 'components/MarketInfoList/MarketInfoListItem';

const props: Props = {
  category: 'stock',
  symbol: 'AAPL',
  name: '애플',
  c: 161,
  d: 3.4,
  dp: 0.2,
};

describe('MarketInfoListItem 컴포넌트는', () => {
  it('텍스트(애플, 161, 3.4, 0.2)를 가진다.', () => {
    render(<MarketInfoListItem {...props} />);

    const Component = screen.getByRole('listitem');

    expect(Component).toHaveTextContent('161');
    expect(Component).toHaveTextContent('3.4');
    expect(Component).toHaveTextContent('0.2%');
  });
});
