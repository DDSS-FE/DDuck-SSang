import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';

import styles from 'components/ChartTypeToggleButton/ChartTypeToggleButton.module.scss';

const chartIcon = {
  candle: '/lineIcon.svg',
  line: '/candleIcon.svg',
};

export type ChartType = 'candle' | 'line';

const ChartTypeToggleButton = ({
  type,
  setType,
}: {
  type: ChartType;
  setType: Dispatch<SetStateAction<ChartType>>;
}): JSX.Element => {
  const getType = () => (type === 'candle' ? 'line' : 'candle');
  const handleClick = () => setType(getType());

  return (
    <button onClick={handleClick} className={styles.el_ChartTypeToggleBtn}>
      <Image src={chartIcon[type]} alt={getType()} width={24} height={24} />
    </button>
  );
};

export default ChartTypeToggleButton;
