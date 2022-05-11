import {createSlice} from '@reduxjs/toolkit';
import polygon_token from "../../assets/token_icons/polygon_token.png";
import gratitude_coin from "../../assets/token_icons/gratitude_coin.png";
import gepeto_coin from "../../assets/token_icons/gepeto_coin.png";

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