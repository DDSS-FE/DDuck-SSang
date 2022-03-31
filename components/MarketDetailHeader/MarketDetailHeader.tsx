import { useState, useEffect } from 'react';

import styles from 'components/MarketDetailHeader/MarketDetailHeader.module.scss';

import { Spinner } from 'components/Spinner';

import useAxios from 'hooks/useAxios';
import { QUOTE_API } from 'utils/config';
import { getStocks, IParsedResponseInput } from 'utils/getStocks';

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
  const [realtimeData, setRealtimeData] = useState<IParsedResponseInput>();

  useEffect(() => {
    const socket = new WebSocket(
      `wss://ws.finnhub.io?token=${process.env.NEXT_PUBLIC_FINNHUB_KEY}`
    );
    getStocks(socket, setRealtimeData, {
      indicesToFetch: [symbol],
      timeFrame: [new Date(), Infinity],
      period: 1000,
    });
    return () => {
      socket.close();
    };
  }, [symbol]);

  const [newC, setNewC] = useState(quote?.c);
  const [newD, setNewD] = useState(quote?.dp);
  const [newDP, setNewDP] = useState(quote?.d);

  useEffect(() => {
    if (realtimeData) {
      const checkForUpdate = realtimeData?.data?.find(
        (item) => item.s === symbol
      );
      if (checkForUpdate && quote) {
        setNewC(checkForUpdate.p);
        setNewD(checkForUpdate.p - quote.c);
        setNewDP(((checkForUpdate.p - quote.c) / quote.c) * 100);
      }
    }
  }, [realtimeData, symbol, quote, quote?.c]);

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
                <p>{newC ? newC : quote.c}</p>
                <p
                  className={
                    (newDP ? newDP : quote.dp) < 0
                      ? styles.changePrice__neg
                      : styles.changePrice
                  }
                >
                  {(newD ? newD : quote.d).toFixed(3)} (
                  {(newDP ? newDP : quote.dp).toFixed(3)}%)
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
