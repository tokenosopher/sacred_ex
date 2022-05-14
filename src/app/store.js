import { configureStore } from '@reduxjs/toolkit';
import tokenOneReducer from '../features/tokens/tokenOneSlice';
import tokenTwoReducer from "../features/tokens/tokenTwoSlice";
import tokenListReducer from '../features/tokens/tokenListSlice';
import swapButtonReducer from "../features/swapModal/swapButton";
import activeTokenNumbers from "../features/activeTokenNumbers/activeTokenNumbers";

export const store = configureStore({
  reducer: {
    tokenOne: tokenOneReducer,
    tokenTwo: tokenTwoReducer,
    tokenList: tokenListReducer,
    swapButton: swapButtonReducer,
    activeTokenNumbers: activeTokenNumbers
  }
});
