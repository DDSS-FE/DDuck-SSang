import styles from 'components/MarketDetailHeader/MarketDetailHeader.module.scss';

import Spinner from 'components/Spinner';
import useAxios from 'hooks/useAxios';
import { QUOTE_API } from 'utils/config';

interface Quote {
  name: string;
  symbol: string;
  c: number;
  d: number;
  dp: number;
}

const MarketDetailHeader = ({ symbol }: { symbol: string }): JSX.Element => {
  const { data: quote, loading } = useAxios<Quote>(
    `${QUOTE_API}?symbol=${symbol}`
  );

  return (
    <>
      {loading && <Spinner />}
      {quote && (
        <header className={styles.ly_header}>
          <div className={styles.ly_header_inner}>
            <span className={styles.bl_marketPriceHeading}>
              <h2>
                {quote.name}({quote.symbol})
              </h2>
              <div
                className={styles.bl_marketPriceHeading_price}
                data-testid="MarketDetailHeader-PriceInfo"
              >
                <p>{quote.c}</p>
                <p
                  className={
                    quote.dp > 0 ? styles.changePrice : styles.changePrice__neg
                  }
                >
                  {quote.d} ({quote.dp}%)
                </p>
              </div>
              <div className={styles.bl_marketPriceHeading_standard}>
                Currency in USD
              </div>
            </span>
          </div>
        </header>
      )}
    </>
  );
};

export default MarketDetailHeader;
