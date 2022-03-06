//main functions which open the socket connection

import { Dispatch, SetStateAction } from 'react';

import { IRealtimeDataItem } from 'components/MarketInfoList';

export interface IParsedResponseInput {
  data: IRealtimeDataItem[];
  timeFrame: Date[];
}
// dispatch,
export const getStocks = async (
  setData: Dispatch<SetStateAction<IParsedResponseInput | undefined>>,
  {
    indicesToFetch,
    timeFrame,
    period,
  }: { indicesToFetch: string[]; timeFrame: (number | Date)[]; period: number }
) => {
  const socket = new WebSocket(
    `wss://ws.finnhub.io?token=${process.env.NEXT_PUBLIC_FINNHUB_KEY}`
  );
  // Connection opened -> Subscribe
  socket.addEventListener('open', function () {
    for (const key of indicesToFetch) {
      socket.send(JSON.stringify({ type: 'subscribe', symbol: key }));
    }
  });

  // Listen for messages
  socket.addEventListener('message', function (event) {
    // console.log('Message from server ', event.data);
    const parsedResponse = {
      indicesToFetch,
      timeFrame,
      period,
    };
    let resp;
    try {
      resp = { ...JSON.parse(event.data), ...parsedResponse };
    } catch (e) {
      console.error('Could not parse data');
    }
    if (resp.type !== 'ping') {
      console.log(resp.data);
      setData({
        data: resp.data?.filter(
          (v: IRealtimeDataItem, i: number, a: IRealtimeDataItem[]) =>
            a.findIndex((t: IRealtimeDataItem) => t.s === v.s) === i
        ),
        timeFrame: resp.timeFrame[0].toString().split(' ')[4],
      });
    }
  });

  // const unsubscribe = (symbol: string) => {
  //   socket.send(JSON.stringify({ type: 'unsubscribe', symbol: symbol }));
  // };
};
