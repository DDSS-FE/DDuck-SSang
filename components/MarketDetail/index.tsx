import styles from 'components/MarketDetail/MarketDetail.module.scss';

import KeyInfo from 'components/KeyInfo';
import Chart from 'components/Chart';
import DetailNav from 'components/DetailNav';
import MarketDetailHeader from 'components/MarketDetailHeader';

export interface NavItem {
  name: string;
  href: string;
}
// ! : TODO. next/router -> integration test로 진행
export const marketDetailNavItems: NavItem[] = [
  { name: '개요', href: '/overview' },
  { name: '분석', href: '/analysis' },
  { name: '주식시장', href: '/stocks' },
  { name: '경제지표', href: '/' },
  { name: '경제뉴스', href: '/' },
];

const MarketDetail = ({ symbol }: { symbol: string }): JSX.Element => {
  return (
    <>
      <section role="market-detail">
        <MarketDetailHeader symbol={symbol} />
        <DetailNav items={marketDetailNavItems} />
        <main>
          <article>
            <section className={styles.ly_cont}>
              <Chart symbol={symbol} />
              <KeyInfo symbol={symbol} />
            </section>
          </article>
        </main>
      </section>
    </>
  );
};

export default MarketDetail;
