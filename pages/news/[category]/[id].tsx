import { NextPageContext } from 'next';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import { NEWS_API } from 'utils/config';
import { axiosConfig } from 'hooks/useAxios';

import Header from 'components/Header';
import IconButton from 'components/IconButton';
import { NewsDetail } from 'components/NewsDetail';
import { NewsDataType } from 'pages/news/[category]';

export default function NewsDetailPage({
  data,
}: {
  data: NewsDataType;
}): JSX.Element {
  const { description, image, url, provider, datePublished, name } = data;
  const { width, height, contentURL } = image;

  return (
    <>
      <Header>
        <IconButton
          onClick={() => console.log('검색 자동완성 드롭다운')}
          icon={faSearch}
        />
      </Header>

      <NewsDetail
        newsDesc={description}
        contentURL={contentURL}
        width={width}
        height={height}
        newsUrl={url}
        newsProvider={provider}
        newsDatePublished={datePublished}
        newsName={name}
      />
    </>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const queryId = context.query.id as string;
  const id = queryId?.replace(/[“”"]/g, '');

  try {
    const res = await axios.get(
      `${NEWS_API}?queryString=${encodeURI(id)}`,
      axiosConfig
    );
    if (res.status === 200) {
      return { props: { data: res.data[0] as NewsDataType } };
    } else throw new Error();
  } catch (err) {
    console.error(err);
  }
}
