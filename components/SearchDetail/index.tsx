import styles from 'components/SearchDetail/SearchDetail.module.scss';

import { useState } from 'react';

import SearchHeader from 'components/SearchHeader';
import SearchInfoList from 'components/SearchInfoList';
import { SearchProps } from 'pages/search/[id]';

const SearchDetail = ({ data }: { data: SearchProps[] }): JSX.Element => {
  const [keyword, setKeyword] = useState('');

  const keywordHandler = (str: string) => {
    setKeyword(str);
  };

  return (
    <div className={styles.ly_search} data-testid="SearchDetail-component">
      <SearchHeader keywordHandler={keywordHandler}></SearchHeader>
      <SearchInfoList keyword={keyword} data={data}></SearchInfoList>
    </div>
  );
};

export default SearchDetail;
