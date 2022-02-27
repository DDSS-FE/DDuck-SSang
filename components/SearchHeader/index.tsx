import { faLongArrowLeft } from '@fortawesome/free-solid-svg-icons';

import styles from 'components/SearchHeader/SearchHeader.module.scss';

import React, { useRef, useState } from 'react';
import { useRouter } from 'next/router';

import IconButton from 'components/IconButton';

const SearchHeader = ({
  keywordHandler,
}: {
  keywordHandler: (str: string) => void;
}): JSX.Element => {
  const router = useRouter();
  const [input, setInput] = useState('');
  const inputRef = useRef<string>('');

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    inputRef.current = e.target.value;
    keywordHandler(e.target.value);
  };

  return (
    <header className={styles.ly_searchHeader}>
      <div className={styles.ly_searchHeader_inner}>
        <div className={styles.ly_searchHeader_inner_arrow}>
          <IconButton onClick={() => router.back()} icon={faLongArrowLeft} />
        </div>

        <input
          type="search"
          value={input}
          placeholder="상품 검색"
          className={styles.bl_searchInput}
          onChange={inputChangeHandler}
        ></input>
      </div>
    </header>
  );
};

export default SearchHeader;
