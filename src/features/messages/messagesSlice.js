import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    name: "",
    message: "",
    //true if the checkbox in the messages component is checked:
    checkedBool: true,
    //displays the warning under the connect/swap button if true:
    messageWarning: false,
    //set to true if the user tried to swap without filling in the necessary fields for the message and checkedBool was true
    //if set to true, the messageWarning will be triggered when the fields were empty
    //created so that the messageWarning wouldn't be displayed from the beginning - only if the user mistakenly tries to submit without filling the fields.
    calculateMessageWarning: false,
    disableNameField: false,
    disableMessageField: false
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
        setDisableNameAndMessageFields: (state, action) => {
            state.disableNameField = action.payload;
            state.disableMessageField = action.payload;
        }
    }
});

export const {
    setName,
    setMessage,
    setChecked,
    setMessageWarning,
    setCalculateMessageWarning,
    setDisableNameAndMessageFields
} = messagesSlice.actions;

export default messagesSlice.reducer;