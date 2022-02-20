import { render, screen } from '@testing-library/react';

import { KeyInfo } from 'components/KeyInfo';
import { MarketInfoProps, MarketInfoSummary } from 'utils/market/types';
import { formatDecimal } from 'utils/formatDate';

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
      averageVolume: 800,
      beta: 0,
    };
    const defaultProps: ComponentProps = {
      data: {
        summaryDetail: defaultValue,
      },
    };

    const textNames = [
      '일일 변동폭',
      '52주 가격 변동폭',
      '이전 종가',
      '시가',
      '거래량',
      '평균 거래량',
    ];

    it('has keyInfo 텍스트', () => {
      const { getAllByRole, getByText } = renderKeyInfo({ ...defaultProps });

      const listItems = getAllByRole('listitem').map(
        (listItem) => listItem.children[0].textContent
      );

      textNames.forEach((textName, i) => {
        expect(listItems[i]).toBe(textName);
      });
    });

    it('has keyInfo 렌더링 값', () => {
      const { getAllByRole, getByText } = renderKeyInfo({ ...defaultProps });

      const listItems = getAllByRole('listitem').map(
        (listItem) => listItem.children[1].textContent
      );

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

      expect(listItems[0]).toBe(
        `${formatDecimal(dayLow)} ~ ${formatDecimal(dayHigh)}`
      );
      expect(listItems[1]).toBe(
        `${formatDecimal(fiftyTwoWeekLow)} ~ ${formatDecimal(fiftyTwoWeekHigh)}`
      );
      expect(listItems[2]).toBe(`${formatDecimal(previousClose)}`);
      expect(listItems[3]).toBe(`${formatDecimal(open)}`);
      expect(listItems[4]).toBe(`${volume.toLocaleString()}`);
      expect(listItems[5]).toBe(`${averageVolume.toLocaleString()}`);
    });

    describe('Interaction', () => {});
  });
});
