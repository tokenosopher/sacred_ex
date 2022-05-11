import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    value: ''
}

const swapButtonSlice = createSlice({
    name: 'swapButton',
    initialState,
    reducers: {
        setSwapButton: (state, action) => {
            state.value = action.payload
        }
    }
})

export const {setSwapButton} = swapButtonSlice.actions

export default swapButtonSlice.reducer