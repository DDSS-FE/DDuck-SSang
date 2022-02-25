import { useRouter } from 'next/router';
import Header from 'components/Header';
import IconButton from 'components/IconButton';
import { faSearch, faStar } from '@fortawesome/free-solid-svg-icons';

import { NewsDetail } from 'components/NewsDetail';

const NewsDetailPage = (): JSX.Element => {
  const router = useRouter();
  const { query, isReady } = router;

  return (
    <>
      <Header>
        <IconButton
          onClick={() => console.log('검색 자동완성 드롭다운')}
          icon={faSearch}
        />
        <IconButton
          onClick={() => console.log('관심목록에 추가')}
          icon={faStar}
        />
      </Header>

      {isReady && (
        <NewsDetail
          newsDesc={JSON.parse(query.description as string)}
          contentURL={JSON.parse(query.image as string).contentURL}
          width={JSON.parse(query.image as string).width}
          height={JSON.parse(query.image as string).height}
          newsUrl={JSON.parse(query.url as string)}
          newsProvider={JSON.parse(query.provider as string)}
          newsDatePublished={JSON.parse(query.datePublished as string)}
          newsName={JSON.parse(query.name as string)}
        />
      )}
    </>
  );
};

export default NewsDetailPage;
