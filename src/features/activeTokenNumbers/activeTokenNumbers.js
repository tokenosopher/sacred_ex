import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    approved: ""
}


const activeTokenNumbersSlice = createSlice({
    name: 'activeTokenNumbers',
    initialState,
    reducers: {
        setAllowance: (state, action) => {
            state.approved = action.payload;
        }
    }
})

export const {setAllowance} = activeTokenNumbersSlice.actions;

export default activeTokenNumbersSlice.reducer;