import styles from 'components/NewsDetailHeader/NewsDetailHeader.module.scss';
import clsx from 'clsx';
import { useState } from 'react';

export const NewsDetailHeader = ({
  setCategory,
}: {
  setCategory: (period: string) => void;
}): JSX.Element => {
  const [activeId, setActiveId] = useState(1);

  const headerItems = [
    { id: 1, text: '최신', value: '주식&비트코인&경제&정치' },
    { id: 2, text: '주식', value: '주식' },
    { id: 3, text: '암호화폐', value: '비트코인&암호화폐' },
    { id: 4, text: '경제', value: '경제' },
    { id: 5, text: '상품', value: '금&은&원유&천연가스&유가&달러' },
  ];

  return (
    <>
      <nav className={styles.bl_chartViewMenu}>
        {headerItems.map(({ id, text, value }) => (
          <button
            key={id}
            onClick={() => {
              setCategory(value);
              setActiveId(id);
            }}
            className={clsx(
              styles.bl_chartViewMenu_item,
              activeId === id && styles.is_active
            )}
          >
            {text}
          </button>
        ))}
      </nav>
    </>
  );
};
