import styles from 'components/MarketDetail/MarketDetail.module.scss';

import KeyInfo from 'components/KeyInfo';
import Chart from 'components/Chart';
import DetailNav, { NavItem } from 'components/DetailNav';
import MarketDetailHeader from 'components/MarketDetailHeader';
import { MarketDetailProps } from 'pages/market/[category]/[symbol]';

// ! : TODO. next/router -> integration test로 진행
export const marketDetailNavItems: NavItem[] = [
  { name: '개요', href: '/overview' },
  { name: '분석', href: '/analysis' },
  { name: '주식시장', href: '/stocks' },
  { name: '경제지표', href: '/' },
  { name: '경제뉴스', href: '/' },
];

const MarketDetail = ({ symbol, category }: MarketDetailProps): JSX.Element => {
  return (
    <>
      <section role="market-detail">
        <MarketDetailHeader symbol={symbol} />
        <DetailNav navItems={marketDetailNavItems} />
        <main>
          <article>
            <section className={styles.ly_cont}>
              <Chart symbol={symbol} />
              {category === 'stock' && (
                <KeyInfo symbol={symbol} category={category} />
              )}
            </section>
          </article>
        </main>
      </section>
    </>
  );
};

export default MarketDetail;
