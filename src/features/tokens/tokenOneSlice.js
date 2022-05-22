import {createSlice} from '@reduxjs/toolkit';

import tokens from './tokens'

const initialState = {
  value: tokens[0]
}

  const tokenOneSlice = createSlice({
    name: 'tokenOne',
    initialState,
    reducers: {
      setTokenOne: (state, action) => {
        state.value = action.payload;
      }
    }
  })

  export const {setTokenOne} = tokenOneSlice.actions;

  export default tokenOneSlice.reducer;