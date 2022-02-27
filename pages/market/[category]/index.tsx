import { NextPage } from 'next';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

import { faSearch } from '@fortawesome/free-solid-svg-icons';

import Header from 'components/Header';
import IconButton from 'components/IconButton';
import DetailNav, { NavItem } from 'components/DetailNav';
import MarketInfoList from 'components/MarketInfoList';

export const marketNavItems: NavItem[] = [
  { name: '주식', href: '/market/stock' },
  { name: '암호화폐', href: '/market/crypto' },
  { name: '지수', href: '/market/indices' },
];

const Category: NextPage = () => {
  const router = useRouter();
  const { category } = router.query;

  // TODO: FIX 404
  function notFound() {
    const isString = typeof category === 'string';
    if (isString && !['stock', 'indices', 'crypto'].includes(category)) {
      router.push('/404');
      return <></>;
    }
    return false;
  }

  return (
    <>
      {notFound() || (
        <>
          <Header>
            <IconButton
              onClick={() => {
                router.push('/search/market');
              }}
              icon={faSearch}
            />
          </Header>
          <DetailNav navItems={marketNavItems} />
          <MarketInfoList />
        </>
      )}
    </>
  );
};

export default dynamic(() => Promise.resolve(Category), {
  ssr: false,
});
