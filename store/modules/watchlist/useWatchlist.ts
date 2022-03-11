import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IWatchlistItem } from 'components/StockList';

import { RootState } from 'store/modules';
import {
  fetchWatchlist as fetchData,
  addWatchlist as addData,
  deleteWatchlist as deleteData,
} from 'store/modules/watchlist/watchlistSlice';
import useUser from 'store/modules/user/useUser';

export default function useWatchlist() {
  const { userData } = useUser();
  const dispatch = useDispatch();
  const watchlistData = useSelector(
    (state: RootState) => state.watchlistReducer.watchlist
  );
  const watchlistStatus = useSelector(
    (state: RootState) => state.watchlistReducer.status
  );
  const watchlistError = useSelector(
    (state: RootState) => state.watchlistReducer.error
  );
  const checkWatchlistBySymbol = useCallback(
    (sym: string) => {
      if (watchlistData.error) return 0;
      const item = watchlistData?.find((d: IWatchlistItem) => d.symbol === sym);
      return item?.id || 0;
    },
    [watchlistData]
  );
  const fetchWatchlist = useCallback(() => {
    try {
      dispatch(fetchData());
    } catch (e) {
      console.error('fetch watchlist error');
    }
  }, [dispatch]);
  const addWatchlist = useCallback(
    (symbol: string) => {
      try {
        const data = { symbol, email: userData?.email };
        dispatch(addData(data));
      } catch (e) {
        console.error('add watchlist error');
      }
      fetchWatchlist();
    },
    [dispatch, userData?.email, fetchWatchlist]
  );
  const deleteWatchlist = useCallback(
    async (id: number) => {
      try {
        await dispatch(deleteData(id));
      } catch (e) {
        console.error('delete watchlist error');
      }
      fetchWatchlist();
    },
    [dispatch, fetchWatchlist]
  );

  return {
    watchlistData,
    watchlistStatus,
    watchlistError,
    checkWatchlistBySymbol,
    fetchWatchlist,
    addWatchlist,
    deleteWatchlist,
  };
}
