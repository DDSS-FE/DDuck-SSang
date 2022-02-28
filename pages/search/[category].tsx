import { GetStaticPropsContext } from 'next';

import dynamic from 'next/dynamic';

import SearchDetail from 'components/SearchDetail';

const SearchPage = ({ category }: { category: string }): JSX.Element => {
  return (
    <>
      <SearchDetail category={category}></SearchDetail>
    </>
  );
};

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          category: 'market',
        },
      },
      {
        params: {
          category: 'news',
        },
      },
    ],
    fallback: false,
  };
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const pathname = params?.category;

  if (pathname !== 'market') {
    return {
      props: {
        category: 'news',
      },
    };
  }

  return {
    props: {
      category: 'market',
    },
  };
}

export default dynamic(() => Promise.resolve(SearchPage), {
  ssr: false,
});
