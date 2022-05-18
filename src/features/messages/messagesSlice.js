import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    name: "",
    message: "",
    checkedBool: true,
    messageWarning: false
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
        }
    }
});

export const {setName, setMessage, setChecked, setMessageWarning} = messagesSlice.actions;

export default messagesSlice.reducer;