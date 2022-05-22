import {createSlice} from '@reduxjs/toolkit';

//TODO: added a hack where the variable that determines whether the incomplete modal lives here, but should rename this slice and reducer to reflect that, as well as the variable names. Running short on time for the hackathon.
const initialState = {
  isOpened: false,
  incompleteIsOpen: false,
  twitterMsgId: "",
  completedTransactionHash:""
};

const swapCompletedModalSlice = createSlice({
  name: 'swapCompletedModalState',
  initialState,
  reducers: {
    setSwapCompletedModalState: (state, action) => {
      state.isOpened = action.payload;
    },
    setIncompleteSwapModalState: (state, action) => {
      state.incompleteIsOpen = action.payload;
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
  setIncompleteSwapModalState,
  setTwitterMsgId,
  setCompletedTransactionHash
} = swapCompletedModalSlice.actions;

export default swapCompletedModalSlice.reducer;