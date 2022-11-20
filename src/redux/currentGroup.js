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
            state.currentGroup.location.name = action.payload.name
        },
    },
});

export const { setCurrentGroup,
    updateNameDesc,
    updatePrivacy,
    updateVisibility,
    updateGroupCoverImg,
    updateLocation
} = userSlice.actions;
export default userSlice.reducer