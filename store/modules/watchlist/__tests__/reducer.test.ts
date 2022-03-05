import watchlistReducer, {
  initialState,
  fetchWatchlist,
} from 'store/modules/watchlist/watchlistSlice';

describe('watchlistSlice', () => {
  describe('reducers', () => {
    it('sets status loading when fetchWatchlist is pending', () => {
      const action = { type: fetchWatchlist.pending.type };
      const state = watchlistReducer(initialState, action);

      expect(state).toEqual({ watchlist: [], status: 'loading', error: '' });
    });

    it('sets the watchlist when fetchWatchlist is fulfilled', () => {
      const action = {
        type: fetchWatchlist.fulfilled.type,
        payload: [
          { c: 839.29, d: -40.6, dp: -4.6142, id: 120, symbol: 'TSLA' },
          {
            c: 166.23,
            d: -0.33,
            dp: -0.1981,
            id: 121,
            symbol: 'AAPL',
          },
        ],
      };
      const state = watchlistReducer(initialState, action);

      expect(state).toEqual({
        watchlist: [
          { c: 839.29, d: -40.6, dp: -4.6142, id: 120, symbol: 'TSLA' },
          {
            c: 166.23,
            d: -0.33,
            dp: -0.1981,
            id: 121,
            symbol: 'AAPL',
          },
        ],
        status: 'succeeded',
        error: '',
      });
    });

    it('sets status false when fetchWatchlist is rejected', () => {
      const action = {
        type: fetchWatchlist.rejected.type,
        error: {
          message: 'Failed to fetch',
          name: 'TypeError',
          stack: 'TypeError: Failed to fetch',
        },
      };
      const state = watchlistReducer(initialState, action);

      expect(state).toEqual({
        watchlist: [],
        status: 'failed',
        error: 'Failed to fetch',
      });
    });
  });
});
