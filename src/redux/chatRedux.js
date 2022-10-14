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
            const objIndex = state.currentChat.users.findIndex(user => user._id === action.payload)
           state.currentChat.users.splice(objIndex,1)
        },
        addNewUserToGroup: (state, action) => {
            const filteredArr = (a, b) => {
                return a.filter(x => !b.filter(y => y?._id === x?._id).length);
            }
            state.currentChat.users = state.currentChat.users.concat(filteredArr( action.payload,state.currentChat.users ))
        },
    },
});

export const { setGroups, setCurrentChat, setCurrentChatInitial, setCurrentChatName, removeFromGroup, changeAvatar ,addNewUserToGroup} = userSlice.actions;
export default userSlice.reducer