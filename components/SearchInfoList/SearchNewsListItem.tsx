import { NEWS_API } from 'utils/config';

import styles from 'components/SearchInfoList/SearchInfoList.module.scss';

import useAxios from 'hooks/useAxios';

import { NewsHeadline } from 'components/NewsHeadline';
import { NewsDataType } from 'pages/news/[category]';
import Spinner from 'components/Spinner';

interface Props {
  keyword: string;
}

const SearchMarketListItem = ({ keyword }: Props): JSX.Element => {
  const { data, loading } = useAxios<NewsDataType[]>(
    `${NEWS_API}?queryString=${keyword}`
  );

  return (
    <>
      {loading && <Spinner />}
      {data &&
        !loading &&
        data.map((d) => (
          <li key={d.name} className={styles.bl_vertSearchInfo_item}>
            <NewsHeadline isMain={false} newsData={d} />
          </li>
        ))}
    </>
  );
};

export default SearchMarketListItem;
