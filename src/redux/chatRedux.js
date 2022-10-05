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
        setCurrentChatInitial: (state) => {
            state.currentChat = null
            state.chatId = ''
        }
    },
});

export const { setCurrentChat, setCurrentChatInitial } = userSlice.actions;
export default userSlice.reducer