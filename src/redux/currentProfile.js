import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentProfile: null,
    activeFriend: 'followers' //for routing in friends router in profile page
};


const userSlice = createSlice({
    name: "profile",
    initialState: initialState,
    reducers: {
        currentProfileState: (state, action) => {
            state.currentProfile = action.payload
        },
        setActiveFriend: (state, action) => {
            state.activeFriend = action.payload
        }
    },
});

export const { currentProfileState ,setActiveFriend} = userSlice.actions;
export default userSlice.reducer