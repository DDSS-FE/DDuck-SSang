import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'store/modules';
import {
  fetchWatchlist as fetchData,
  addWatchlist as addData,
} from 'store/modules/watchlist/watchlistSlice';
import useUser from '../user/useUser';

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
  const fetchWatchlist = useCallback(() => {
    try {
      dispatch(fetchData());
    } catch (e) {
      console.log('fetch watchlist error');
    }
  }, [dispatch]);
  const addWatchlist = useCallback(
    (symbol: string) => {
      try {
        const data = { symbol, email: userData?.email };
        dispatch(addData(data));
        fetchWatchlist();
      } catch (e) {
        console.log('add watchlist error');
      }
    },
    [dispatch, userData?.email, fetchWatchlist]
  );

  return {
    watchlistData,
    watchlistStatus,
    watchlistError,
    fetchWatchlist,
    addWatchlist,
  };
}
