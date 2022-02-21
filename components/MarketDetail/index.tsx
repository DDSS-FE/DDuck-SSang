import styles from 'components/MarketDetail/MarketDetail.module.scss';

import useAxios from 'hooks/useAxios';
import { MARKET_INFO_API } from 'utils/config';

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

const MarketDetail = (): JSX.Element => {
  const { data } = useAxios(MARKET_INFO_API);
  const marketDetailHeaderData = {
    priceLast: 2_727.08,
    priceChangeValue: 6.69, // + 6.69
    priceChangePercent: 0.25, // (+ 0.25%)
    // metadataTime: '2020-04-01T00:00:00.000Z', // 10:00:00
    // metadataCurrency: 'KRW',
  };

  return (
    <>
      <section role="market-detail">
        <MarketDetailHeader {...marketDetailHeaderData} />
        <DetailNav items={marketDetailNavItems} />
        <main>
          <article>
            <section className={styles.ly_cont}>
              <Chart />
              {data ? <KeyInfo data={data} /> : null}
            </section>
          </article>
        </main>
      </section>
    </>
  );
};

export default MarketDetail;
