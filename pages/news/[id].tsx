import { WithRouterProps } from 'next/dist/client/with-router';
import { withRouter } from 'next/router';
import Header from 'components/Header';
import IconButton from 'components/IconButton';
import { faSearch, faStar } from '@fortawesome/free-solid-svg-icons';

import { NewsDetail } from 'components/NewsDetail';

const NewsDetailPage: React.FC<WithRouterProps> = ({
  router: {
    query: { description, image, url, provider, datePublished, name },
  },
}): JSX.Element => {
  const { contentURL, width, height } = JSON.parse(image as string);
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

      <NewsDetail
        newsDesc={JSON.parse(description as string)}
        contentURL={contentURL}
        width={width}
        height={height}
        newsUrl={JSON.parse(url as string)}
        newsProvider={JSON.parse(provider as string)}
        newsDatePublished={JSON.parse(datePublished as string)}
        newsName={JSON.parse(name as string)}
      />
    </>
  );
};

export default withRouter(NewsDetailPage);
