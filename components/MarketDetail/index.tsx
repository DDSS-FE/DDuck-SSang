import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';

import styles from 'components/MarketDetail/MarketDetail.module.scss';

import useAxios from 'hooks/useAxios';
import { MARKET_INFO_API } from 'utils/config';

import KeyInfo from 'components/KeyInfo';
import Chart from 'components/Chart';
import Header from 'components/Header';
import IconButton from 'components/IconButton';
import DetailNav from 'components/DetailNav';

export interface NavItem {
  name: string;
  href: string;
}
// ! : TODO. next/router 학습 후에 url을 변경할지 여부를 결정해야 함.
export const marketDetailNavItems: NavItem[] = [
  { name: '개요', href: '/overview' },
  { name: '분석', href: '/analysis' },
  { name: '주식시장', href: '/stocks' },
  { name: '경제지표', href: '/' },
  { name: '경제뉴스', href: '/' },
];

const MarketDetail = (): JSX.Element => {
  const { data } = useAxios(MARKET_INFO_API);

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
      <section>
        <header className={styles.ly_header}>
          <div className={styles.ly_header_inner}>
            <span className={styles.bl_marketPriceHeading}>
              <div className={styles.bl_marketPriceHeading_price}>
                <h2>2,727.08</h2>
                <p>+6.69 (+0.25%)</p>
              </div>
              <div className={styles.bl_marketPriceHeading_standard}>
                10:00:00 - 실시간. KRW 통화
              </div>
            </span>
          </div>
        </header>
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
