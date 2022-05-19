import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    name: "",
    message: "",
    checkedBool: true,
    messageWarning: false,
    calculateMessageWarning: false,
}

const messagesSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        setName: (state, action) => {
            state.name = action.payload;
        },
        setMessage: (state, action) => {
            state.message = action.payload;
        },
        setChecked: (state, action) => {
            state.checkedBool = action.payload;
        },
        setMessageWarning: (state, action) => {
            state.messageWarning = action.payload;
        },
        setCalculateMessageWarning: (state, action) => {
            state.calculateMessageWarning = action.payload;
        },
    }
});

export const {setName, setMessage, setChecked, setMessageWarning, setCalculateMessageWarning} = messagesSlice.actions;

export default messagesSlice.reducer;