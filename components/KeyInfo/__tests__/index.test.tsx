import { render, screen } from '@testing-library/react';

import { KeyInfo } from 'components/KeyInfo';

type ComponentProps = React.ComponentProps<typeof KeyInfo>;

function renderKeyInfo(props: ComponentProps) {
  return render(<KeyInfo {...props} />);
}

describe('KeyInfo', () => {
  describe('Layout', () => {
    const defaultValue = {
      previousClose: 130,
      dayLow: 150,
      dayHigh: 200,
      open: 160,
      fiftyTwoWeekLow: 100,
      fiftyTwoWeekHigh: 220,
      volume: 1000,
      marketCap: 0,
      dividendRate: 0,
      averageVolume: 8000,
      beta: 0,
    };
    const defaultProps: ComponentProps = {
      data: {
        summaryDetail: defaultValue,
      },
    };

    it.each`
      textNames
      ${'일일 변동폭'}
      ${'52주 가격 변동폭'}
      ${'이전 종가'}
      ${'시가'}
      ${'거래량'}
      ${'평균 거래량'}
    `('has keyInfo text', ({ textNames }) => {
      renderKeyInfo({ ...defaultProps });
      expect(screen.getByTestId('KeyInfo-component')).toHaveTextContent(
        textNames
      );
    });

    const {
      previousClose,
      dayLow,
      dayHigh,
      open,
      fiftyTwoWeekHigh,
      fiftyTwoWeekLow,
      volume,
      averageVolume,
    } = defaultValue;

    it.each`
      value
      ${previousClose}
      ${dayLow}
      ${dayHigh}
      ${open}
      ${fiftyTwoWeekHigh}
      ${fiftyTwoWeekLow}
      ${volume.toLocaleString()}
      ${averageVolume.toLocaleString()}
    `('has value text', ({ value }) => {
      renderKeyInfo({ ...defaultProps });
      expect(screen.getByTestId('KeyInfo-component')).toHaveTextContent(value);
    });

    describe('Interaction', () => {});
  });
});
