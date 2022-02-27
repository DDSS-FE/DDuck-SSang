import axios from 'axios';
import { GetStaticPropsContext } from 'next';

import dynamic from 'next/dynamic';

import { SEARCH_MARKET_API } from 'utils/config';
import { axiosConfig } from 'hooks/useAxios';

import SearchDetail from 'components/SearchDetail';

export interface SearchProps {
  id: number;
  name: string;
  symbol: string;
  index: string;
  category: string;
}

const Search = ({ data }: { data: SearchProps[] }): JSX.Element => {
  return (
    <>
      <SearchDetail data={data}></SearchDetail>
    </>
  );
};

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          id: 'market',
        },
      },
      {
        params: {
          id: 'news',
        },
      },
    ],
    fallback: false,
  };
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const pathname = params?.id;

  try {
    if (pathname !== 'market')
      return {
        props: {
          data: null,
          category: 'news',
        },
      };
    const res = await axios.get(
      `${SEARCH_MARKET_API}/${pathname}`,
      axiosConfig
    );

    if (res.status === 200) {
      return {
        props: {
          data: res.data,
          category: 'market',
        },
      };
    } else throw new Error();
  } catch (err) {
    console.error(err);
  }
}

export default dynamic(() => Promise.resolve(Search), {
  ssr: false,
});
