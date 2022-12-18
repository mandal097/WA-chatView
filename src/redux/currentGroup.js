import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentGroup: null
};


const userSlice = createSlice({
    name: "currentGroup",
    initialState: initialState,
    reducers: {
        setCurrentGroup: (state, action) => {
            state.currentGroup = action.payload
        },
        updateNameDesc: (state, action) => {
            state.currentGroup.groupName = action.payload.groupName
            state.currentGroup.desc = action.payload.desc
        },
        updatePrivacy: (state, action) => {
            state.currentGroup.isPrivate = action.payload
        },
        updateVisibility: (state, action) => {
            state.currentGroup.visibility = action.payload
        },
        updateGroupCoverImg: (state, action) => {
            state.currentGroup.groupCoverImg = action.payload
        },
        updateLocation: (state, action) => {
            state.currentGroup.location = action.payload
        },
        pullAdminInvites: (state, action) => {
            if (state.currentGroup.adminsInvited.includes(action.payload)) {
                state.currentGroup.adminsInvited.splice(
                    state.currentGroup.adminsInvited.findIndex(
                        userId => userId === action.payload
                    ),
                    1
                )
            }
        },
        pushAdminInvites: (state, action) => {
            state.currentGroup.adminsInvited.push(action.payload)
        },
        pushMemberRequest: (state, action) => {
            state.currentGroup.membersRequests.push(action.payload)
        },
        updateMembers: (state, action) => {
            state.currentGroup.members.push(action.payload)
        },
    },
});

export const { setCurrentGroup,
    updateNameDesc,
    updatePrivacy,
    updateVisibility,
    updateGroupCoverImg,
    updateLocation,
    pushAdminInvites,
    pullAdminInvites,
    updateMembers,
    pushMemberRequest
} = userSlice.actions;
export default userSlice.reducer