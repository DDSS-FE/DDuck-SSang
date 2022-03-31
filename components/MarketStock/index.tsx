import { useEffect, useState } from 'react';

import MarketInfoList from 'components/MarketInfoList';
import StockList from 'components/StockList';
import { MarketCategory } from 'pages/market/[category]';

import { getStocks, IParsedResponseInput } from 'utils/stockFetcher';
import { symbolList } from 'utils/quote';

export interface IRealtimeDataItem {
  c: number | null;
  p: number;
  s: string;
  t: number;
  v: number;
}
export interface IRealtimeData {
  data: IRealtimeDataItem[];
  indicesToFetch: string[];
  period: number;
  timeFrame: number[] | string;
}

const MarketStock = ({
  category,
  editMode,
}: {
  category: MarketCategory | undefined;
  editMode?: boolean;
}): JSX.Element => {
  const [realtimeData, setRealtimeData] = useState<IParsedResponseInput>();

  useEffect(() => {
    getStocks(setRealtimeData, {
      indicesToFetch: category
        ? symbolList[category]
        : [...symbolList.stock, ...symbolList.crypto],
      timeFrame: [new Date(), Infinity],
      period: 1500,
    });
  }, [category, setRealtimeData]);

  return (
    <>
      {category ? (
        <MarketInfoList category={category} realtimeData={realtimeData} />
      ) : (
        <StockList editMode={editMode} realtimeData={realtimeData} />
      )}
    </>
  );
};

export default MarketStock;
