import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
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

interface IAddItem {
  symbol: string;
  email: string;
}

export const addWatchlist = createAsyncThunk(
  'watchlist/addWatchlist',
  async (item: IAddItem) => {
    await fetch(WATCHLISTS_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        data: item,
      }),
    });
  }
);

export const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState,
  reducers: {
    initWatchlistAction(state) {
      state.watchlist = initialState.watchlist;
      state.status = initialState.status;
      state.error = initialState.error;
    },
  },
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
    [addWatchlist.fulfilled.type]: () => {},
  },
});

const { actions, reducer } = watchlistSlice;
export const { initWatchlistAction } = actions;
export default reducer;
