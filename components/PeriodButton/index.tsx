import styles from 'components/PeriodButton/PeriodButton.module.scss';
import clsx from 'clsx';

import { useState } from 'react';

export const PeriodButton = ({
  setPeriod,
}: {
  setPeriod: (period: string) => void;
}): JSX.Element => {
  const [activeId, setActiveId] = useState(4);

  const listitems = [
    { id: 1, text: '15분', period: '15' },
    { id: 2, text: '30분', period: '30' },
    { id: 3, text: '60분', period: '60' },
    { id: 4, text: '1일', period: 'D' },
    { id: 5, text: '1주', period: 'W' },
    { id: 6, text: '1달', period: 'M' },
  ];

  return (
    <>
      <ul
        className={styles.bl_chartViewMenu}
        data-testid="PeriodButton-component"
        aria-label="Period"
      >
        {listitems.map(({ id, text, period }) => (
          <li
            key={id}
            onClick={() => {
              setPeriod(period);
              setActiveId(id);
            }}
            className={clsx(
              styles.bl_chartViewMenu_item,
              activeId === id && styles.is_active
            )}
          >
            {text}
          </li>
        ))}
      </ul>
    </>
  );
};
