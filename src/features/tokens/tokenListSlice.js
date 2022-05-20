import {createSlice} from '@reduxjs/toolkit';

import tokens from './tokens'

const initialState = {
    value: tokens
}


const tokenListSlice = createSlice({
    name: 'tokenList',
    initialState,
    reducers: {}
})

export default tokenListSlice.reducer;