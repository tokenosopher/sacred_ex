import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from '../features/tokens/tokenSlice';
import tokenListReducer from '../features/tokens/tokenListSlice';

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    tokenList: tokenListReducer
  }
});
