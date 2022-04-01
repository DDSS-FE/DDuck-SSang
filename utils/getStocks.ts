//main functions which open the socket connection

import { Dispatch, SetStateAction } from 'react';

import { IRealtimeDataItem } from 'components/MarketInfoList';

export interface IParsedResponseInput {
  data: IRealtimeDataItem[];
  timeFrame: Date[];
}

export const getStocks = async (
  socket: WebSocket,
  setData: Dispatch<SetStateAction<IParsedResponseInput | undefined>>,
  {
    indicesToFetch,
    timeFrame,
    period,
  }: { indicesToFetch: string[]; timeFrame: (number | Date)[]; period: number }
) => {
  socket.addEventListener('open', function () {
    for (const key of indicesToFetch) {
      socket.send(JSON.stringify({ type: 'subscribe', symbol: key }));
    }
  });

  socket.addEventListener('message', function (event) {
    const parsedResponse = {
      indicesToFetch,
      timeFrame,
      period,
    };
    let resp = null;
    try {
      resp = { ...JSON.parse(event.data), ...parsedResponse };
    } catch (e) {
      console.error('Could not parse data');
    }
    if (resp.type !== 'ping') {
      setData({
        data: resp.data?.filter(
          (v: IRealtimeDataItem, i: number, a: IRealtimeDataItem[]) =>
            a.findIndex((t: IRealtimeDataItem) => t.s === v.s) === i
        ),
        timeFrame: resp.timeFrame[0].toString().split(' ')[4],
      });
    }
  });

  return socket;
};
