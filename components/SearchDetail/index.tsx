import styles from 'components/SearchDetail/SearchDetail.module.scss';

import { useState } from 'react';

import SearchHeader from 'components/SearchHeader';
import SearchInfoList from 'components/SearchInfoList';

const SearchDetail = ({ category }: { category: string }): JSX.Element => {
  const [keyword, setKeyword] = useState('');

  const keywordHandler = (str: string) => {
    setKeyword(str);
  };

  return (
    <div className={styles.ly_search} data-testid="SearchDetail-component">
      <SearchHeader keywordHandler={keywordHandler}></SearchHeader>
      <SearchInfoList keyword={keyword} category={category}></SearchInfoList>
    </div>
  );
};

export default SearchDetail;
