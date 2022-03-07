import { faSearch } from '@fortawesome/free-solid-svg-icons';

import Header from 'components/Header';
import IconButton from 'components/IconButton';
import DetailNav, { NavItem } from 'components/DetailNav';
import MarketInfoList from 'components/MarketInfoList';

import { useRouter } from 'next/router';

export const marketNavItems: NavItem[] = [
  { name: '주식', href: '/market/stock' },
  { name: '암호화폐', href: '/market/crypto' },
  { name: '지수', href: '/market/indices' }, // 지수는 데이터 찾을 시 구현 예정
];

export type MarketCategory = 'stock' | 'crypto'; //| 'indices';

export interface MarketCategoryProps {
  category: MarketCategory;
}

export default function MarketCategoryPage({
  category,
}: MarketCategoryProps): JSX.Element {
  const router = useRouter();

  return (
    <>
      <Header>
        <IconButton
          onClick={() => router.push('/search/market')}
          icon={faSearch}
        />
      </Header>
      <DetailNav navItems={marketNavItems} />
      <MarketInfoList category={category} />
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { category: 'stock' } },
      { params: { category: 'crypto' } },
    ],
    fallback: false,
  };
}

export async function getStaticProps({
  params,
}: {
  params: MarketCategoryProps;
}) {
  return {
    props: {
      category: params.category,
    },
  };
}
