import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    name: "",
    message: "",
    checkedBool: true
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
        }
    }
});

export const {setName, setMessage, setChecked} = messagesSlice.actions;

export default messagesSlice.reducer;