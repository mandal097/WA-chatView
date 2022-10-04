import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentChat: null,
    chatId: ''
};


const userSlice = createSlice({
    name: "chat",
    initialState: initialState,
    reducers: {
        setCurrentChat: (state, action) => {
            state.currentChat = action.payload.currentChat
            state.chatId = action.payload.chatId
        },
    },
});

export const { setCurrentChat, setCurrentMessage } = userSlice.actions;
export default userSlice.reducer