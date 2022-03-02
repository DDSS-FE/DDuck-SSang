import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IUserData, loginAction, logoutAction } from 'store/modules/user';
import { RootState } from 'store/modules';
import { initWatchlistAction } from '../watchlist/watchlistSlice';

export default function useUser() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(
    (state: RootState) => state.userReducer.isLoggedIn
  );
  const userData = useSelector(
    (state: RootState) => state.userReducer.userData
  );
  const login = useCallback(
    (data: IUserData) => {
      dispatch(loginAction(data));
    },
    [dispatch]
  );
  const logout = useCallback(() => {
    dispatch(initWatchlistAction());
    dispatch(logoutAction());
  }, [dispatch]);

  return {
    isLoggedIn,
    userData,
    login,
    logout,
  };
}
