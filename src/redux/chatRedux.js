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
        },
        renameGroup:(state, action)=>{
            state.currentChat.chatName= action.payload.name;
        }
    },
});

export const { setCurrentChat, setCurrentChatInitial ,renameGroup} = userSlice.actions;
export default userSlice.reducer