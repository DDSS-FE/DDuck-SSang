import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'store/modules';
import { fetchWatchlist as fetchData } from 'store/modules/watchlist/watchlistSlice';

export default function useWatchlist() {
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

  return {
    watchlistData,
    watchlistStatus,
    watchlistError,
    fetchWatchlist,
  };
}
