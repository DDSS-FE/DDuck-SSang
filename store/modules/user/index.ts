import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IUserData {
  id: number;
  email: string;
  username: string;
}

export interface UserState {
  isLoggedIn: boolean;
  userData: IUserData | null;
}

const initialState: UserState = {
  isLoggedIn: false,
  userData: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginAction(state: UserState, action: PayloadAction<IUserData>) {
      state.isLoggedIn = true;
      state.userData = action.payload;
    },
    logoutAction(state: UserState) {
      state.isLoggedIn = false;
      state.userData = null;
      localStorage.removeItem('token');
      localStorage.removeItem('persist:root');
    },
  },
});

const { actions, reducer } = userSlice;
export const { loginAction, logoutAction } = actions;
export default reducer;
