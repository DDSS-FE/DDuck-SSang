import { combineReducers, CombinedState, AnyAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import userReducer, { UserState } from 'store/modules/user';

interface IRootReducer {
  userReducer: UserState;
  // add more
}

const appReducer = combineReducers({
  userReducer,
});

const rootReducer = (
  state: CombinedState<IRootReducer> | undefined,
  action: AnyAction
) => {
  switch (action.type) {
    case HYDRATE:
      // console.log('HYDRATE', action);
      const nextState = {
        ...state, // use previous state
        ...action.payload, // apply delta from hydration
      };
      return nextState;

    default: {
      return appReducer(state, action);
    }
  }
};

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
