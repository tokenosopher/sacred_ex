import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    approved: "",
    globalSlippage: 0.1
}


const activeTokenNumbersSlice = createSlice({
    name: 'activeTokenNumbers',
    initialState,
    reducers: {
        setAllowance: (state, action) => {
            state.approved = action.payload;
        },
        setGlobalSlippage: (state, action) => {
            state.globalSlippage = action.payload;
        }
    }
})

export const {setAllowance, setGlobalSlippage} = activeTokenNumbersSlice.actions;

export default activeTokenNumbersSlice.reducer;