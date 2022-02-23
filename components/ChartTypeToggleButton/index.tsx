import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';

const chartIcon = {
  candle: '/lineIcon.svg',
  line: '/candleIcon.svg',
};

export type ChartType = 'candle' | 'line';

const ChartTypeToggleButton = ({
  type,
  setChartType,
}: {
  type: ChartType;
  setChartType: Dispatch<SetStateAction<ChartType>>;
}): JSX.Element => {
  const getType = () => (type === 'candle' ? 'line' : 'candle');
  const handleClick = () => setChartType(getType());

  return (
    <button onClick={handleClick}>
      <Image src={chartIcon[type]} alt={getType()} width={24} height={24} />
    </button>
  );
};

export default ChartTypeToggleButton;
