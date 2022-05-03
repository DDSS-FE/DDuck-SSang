import { useEffect, useState } from 'react';

import styles from 'components/StockList/StockList.module.scss';

import { MarketCategory } from 'pages/market/[category]';
import { StockListItem } from 'components/StockList';
import { MarketInfoListItem } from 'components/MarketInfoList';
import { Spinner } from 'components/Spinner';
import { OpenPriceData, OpenPriceDataItem } from 'components/MarketInfoList';

import useWatchlist from 'store/modules/watchlist/useWatchlist';
import useAxios from 'hooks/useAxios';
import { QUOTE_API } from 'utils/config';
import { getStocks, IParsedResponseInput } from 'utils/getStocks';
import { symbolList } from 'utils/quote';

export interface IWatchlistItem {
  c: number;
  d: number;
  dp: number;
  id: number;
  symbol: string;
  category?: MarketCategory;
}

const StockList = ({ editMode }: { editMode?: boolean }): JSX.Element => {
  const { watchlistData, watchlistStatus, fetchWatchlist, deleteWatchlist } =
    useWatchlist();

  useEffect(() => {
    fetchWatchlist();
  }, [fetchWatchlist]);

  const [realtimeData, setRealtimeData] = useState<IParsedResponseInput>();
  const [priceList, getPriceList] = useState(watchlistData);

  useEffect(() => {
    if (Array.isArray(watchlistData)) {
      const socket = new WebSocket(
        `wss://ws.finnhub.io?token=${process.env.NEXT_PUBLIC_FINNHUB_KEY}`
      );
      getStocks(socket, setRealtimeData, {
        indicesToFetch: [...symbolList.stock, ...symbolList.crypto],
        timeFrame: [new Date(), Infinity],
        period: 1000,
      });
      return () => {
        socket.close();
      };
    }
  }, [watchlistData, setRealtimeData]);

  const { data: marketStockData } = useAxios<OpenPriceData>(
    `${QUOTE_API}?category=stock`
  );
  const { data: marketCryptoData } = useAxios<OpenPriceData>(
    `${QUOTE_API}?category=crypto`
  );

  useEffect(() => {
    const filterSymbolList = (category: 'stock' | 'crypto') =>
      Array.isArray(watchlistData)
        ? watchlistData
            ?.filter((item: IWatchlistItem) =>
              symbolList[category].includes(item.symbol)
            )
            .map((item: IWatchlistItem) => ({
              ...(category === 'stock'
                ? marketStockData
                : marketCryptoData
              )?.data.find(
                (stock: OpenPriceDataItem) => stock.symbol === item.symbol
              ),
              id: item.id,
              category,
            }))
        : [];
    if (marketStockData && marketCryptoData) {
      getPriceList([
        ...filterSymbolList('stock'),
        ...filterSymbolList('crypto'),
      ]);
    }
  }, [watchlistData, marketStockData, marketCryptoData]);

  return (
    <>
      {watchlistStatus === 'loading' && <Spinner />}
      {priceList.length ? (
        <ul className={styles.bl_vertStocks}>
          {priceList?.map((d: IWatchlistItem) =>
            editMode ? (
              <StockListItem key={d.id} item={d} deleteItem={deleteWatchlist} />
            ) : (
              <MarketInfoListItem
                key={d.id}
                category={d.category as MarketCategory}
                {...d}
                realtimeData={realtimeData}
              />
            )
          )}
        </ul>
      ) : (
        <div data-testid="no-watchlist-message" className="emptyMsg">
          관심 목록이 없습니다.
        </div>
      )}
    </>
  );
};

export default StockList;
