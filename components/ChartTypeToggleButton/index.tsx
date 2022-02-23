import Image from 'next/image';

import { Dispatch, SetStateAction } from 'react';

import candleIcon from 'styles/assets/candleIcon.svg';
import lineIcon from 'styles/assets/lineIcon.svg';

const chartIcon = {
  candle: lineIcon,
  line: candleIcon,
};

export type ChartType = 'candle' | 'line';

const ChartTypeToggleButton = ({
  type,
  setChartType,
}: {
  type: ChartType;
  setChartType: Dispatch<SetStateAction<ChartType>>;
}): JSX.Element => {
  const handleClick = () => setChartType(type === 'candle' ? 'line' : 'candle');

  return (
    <button onClick={handleClick}>
      <Image src={chartIcon[type]} alt={type} />
    </button>
  );
};

export default ChartTypeToggleButton;
