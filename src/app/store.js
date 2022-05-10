import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from '../features/tokens/tokenSlice';

export const store = configureStore({
  reducer: {
    token: tokenReducer,
  },
});
