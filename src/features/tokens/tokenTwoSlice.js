import {createSlice} from '@reduxjs/toolkit';

import tokens from './tokens'

const initialState = {
    value: tokens[0]
}

const tokenTwoSlice = createSlice({
    name: 'tokenTwo',
    initialState,
    reducers: {
        setTokenTwo: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const {setTokenTwo} = tokenTwoSlice.actions;

export default tokenTwoSlice.reducer;