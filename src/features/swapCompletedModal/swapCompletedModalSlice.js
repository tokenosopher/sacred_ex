import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  twitterMsgId: "",
  completedTransactionHash:""
};

const swapCompletedModalSlice = createSlice({
  name: 'swapCompletedModalState',
  initialState,
  reducers: {
    setSwapCompletedModalState: (state, action) => {
      state.isOpen = action.payload;
    },
    setTwitterMsgId: (state, action) => {
      state.twitterMsgId= action.payload
    },
    setCompletedTransactionHash: (state, action) => {
      state.completedTransactionHash = action.payload
    }
  }
});

export const {
  setSwapCompletedModalState,
  setTwitterMsgId,
  setCompletedTransactionHash
} = swapCompletedModalSlice.actions;

export default swapCompletedModalSlice.reducer;