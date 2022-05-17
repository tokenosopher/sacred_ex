import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    approved: "",
    balance: "",
    globalSlippage: 0.1,
}


const activeTokenNumbersSlice = createSlice({
    name: 'activeTokenNumbers',
    initialState,
    reducers: {
        setAllowance: (state, action) => {
            state.approved = action.payload;
        },
        setAllowanceAndBalance: (state, action) => {
            state.approved = action.payload.approved;
            state.balance = action.payload.balance;
        },
        setGlobalSlippage: (state, action) => {
            state.globalSlippage = action.payload;
        }
    }
})

export const {setAllowance, setAllowanceAndBalance, setGlobalSlippage} = activeTokenNumbersSlice.actions;

export default activeTokenNumbersSlice.reducer;