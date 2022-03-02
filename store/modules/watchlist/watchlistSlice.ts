import {
  createAsyncThunk,
  createSlice,
  // , PayloadAction
} from '@reduxjs/toolkit';
import { WatchlistItem } from 'components/StockList';
import { WATCHLISTS_API } from 'utils/config';

export interface WatchlistState {
  watchlist: WatchlistItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | '';
}
const wEnhancers: Array<WatchlistItem> = [];
const initialState = {
  watchlist: wEnhancers,
  status: 'idle',
  error: '',
};

export const fetchWatchlist = createAsyncThunk(
  'watchlist/fetchWatchlist',
  async () => {
    const response = await fetch(WATCHLISTS_API, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.json();
  }
);

export const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchWatchlist.pending.type]: (state) => {
      state.status = 'loading';
    },
    [fetchWatchlist.fulfilled.type]: (state, action) => {
      state.status = 'succeeded';
      state.watchlist = action.payload;
    },
    [fetchWatchlist.rejected.type]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

const {
  // actions,
  reducer,
} = watchlistSlice;
// export const { getWatchlistAction } = actions;
export default reducer;
