import { configureStore } from '@reduxjs/toolkit';
import tokenOneReducer from '../features/tokens/tokenOneSlice';
import tokenTwoReducer from "../features/tokens/tokenTwoSlice";
import tokenListReducer from '../features/tokens/tokenListSlice';
import swapButtonReducer from "../features/swapModal/swapButton";
import activeTokenNumbers from "../features/activeTokenNumbers/activeTokenNumbers";
import messages from "../features/messages/messagesSlice";
import swapCompletedModalState from "../features/swapCompletedModal/swapCompletedModalSlice";

export const store = configureStore({
  reducer: {
    tokenOne: tokenOneReducer,
    tokenTwo: tokenTwoReducer,
    tokenList: tokenListReducer,
    swapButton: swapButtonReducer,
    activeTokenNumbers: activeTokenNumbers,
    messages: messages,
    swapCompletedModalState: swapCompletedModalState
  }
});
