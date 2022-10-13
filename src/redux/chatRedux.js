import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    groups: null,
    currentChat: null,
    chatId: ''
};


const userSlice = createSlice({
    name: "chat",
    initialState: initialState,
    reducers: {
        setGroups: (state, action) => {
            state.groups = action.payload
        },
        setCurrentChat: (state, action) => {
            state.currentChat = action.payload.currentChat
            state.chatId = action.payload.chatId
        },
        setCurrentChatInitial: (state) => {
            state.currentChat = null
            state.chatId = ''
        },
        setCurrentChatName: (state, action) => {
            const { chatName, chatId } = action.payload;
            state.currentChat.chatName = chatName;
            const obj = state.groups.find(g => g._id === chatId);
            if (obj) {
                obj['chatName'] = chatName;
            }
        },
        changeAvatar: (state, action) => {
            const { url, chatId } = action.payload;
            state.currentChat.groupAvatar = url;
            const obj = state.groups.find(g => g._id === chatId);
            if (obj) {
                obj['groupAvatar'] = url;
            }
        },
        removeFromGroup: (state, action) => {
            console.log(action.payload);
            state.currentChat.users.includes(action.payload) &&
                state.currentChat.users.splice(
                    state.currentChat.users.findIndex(
                        userId => userId === action.payload
                    ),
                    1
                )
        },
    },
});

export const { setGroups, setCurrentChat, setCurrentChatInitial, setCurrentChatName, removeFromGroup ,changeAvatar} = userSlice.actions;
export default userSlice.reducer