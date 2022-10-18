import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: null,
    otpState: {
        phone: '',
        email: ''
    },
    // loading: false
};


const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        login: (state, action) => {
            state.currentUser = action.payload;
        },
        logout: (state) => {
            state.currentUser = null;
        },
        updateProfile: (state, action) => {
            state.currentUser.img = action.payload
        },
        setOtpState: (state, action) => {
            const { phone, email } = action.payload
            state.otpState.phone = phone;
            state.otpState.email = email;
        },
        followFriend: (state, action) => {
            if (!state.currentUser.followings.includes(action.payload)) {
                state.currentUser.followings.push(action.payload)
            }
        },
        unFollowFriend: (state, action) => {
            if (state.currentUser.followings.includes(action.payload)) {
                state.currentUser.followings.splice(
                    state.currentUser.followings.findIndex(
                        userId => userId === action.payload
                    ),
                    1
                )
            }
        },
    },
});

export const { login, logout, updateProfile, setOtpState, followFriend, unFollowFriend } = userSlice.actions;
export default userSlice.reducer