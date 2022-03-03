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

export const deleteWatchlist = createAsyncThunk(
  'watchlist/deleteWatchlist',
  async (id: number) => {
    await fetch(`${WATCHLISTS_API}/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
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
    [addWatchlist.fulfilled.type]: () => {},
    [deleteWatchlist.fulfilled.type]: () => {},
  },
});

export const selectWatchlistBySymbol = (
  state: WatchlistState,
  symbol: string
) => state.watchlist.find((item) => item.symbol === symbol);

const { reducer } = watchlistSlice;
export default reducer;
