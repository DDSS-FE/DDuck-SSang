import { Dispatch, SetStateAction } from 'react';
import { render, screen } from '@testing-library/react';

import ChartTypeToggleButton, {
  ChartType,
} from 'components/ChartTypeToggleButton';

describe('ChartTypeToggleButton 컴포넌트는', () => {
  describe('Layout', () => {
    it('chartType이 candle일 때 line 아이콘을 보여준다.', () => {
      const setType: Dispatch<SetStateAction<ChartType>> = jest.fn();
      render(<ChartTypeToggleButton type="candle" setType={setType} />);

      const icon = screen.getByRole('img');
      expect(icon).toHaveAttribute('alt', 'line');
    });

    it('chartType이 line일 때 candle 아이콘을 보여준다.', () => {
      const setType: Dispatch<SetStateAction<ChartType>> = jest.fn();
      render(<ChartTypeToggleButton type="line" setType={setType} />);

      const icon = screen.getByRole('img');
      expect(icon).toHaveAttribute('alt', 'candle');
    });
  });
});
