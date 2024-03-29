import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: null,
    otpState: {
        sourceType: 'phone',
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
            const { phone, email, sourceType } = action.payload
            state.otpState.phone = phone;
            state.otpState.email = email;
            state.otpState.sourceType = sourceType;
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
        updateDetails: (state, action) => {
            const { details } = action.payload;
            state.currentUser.name = details.name;
            state.currentUser.email = details.email;
            state.currentUser.phone = details.phone;
            state.currentUser.city = details.city;
            state.currentUser.schoolCollege = details.schoolCollege;
            state.currentUser.insta = details.insta;
        },
        updateBio: (state, action) => {
            state.currentUser.bio = action.payload.bio
        },
        updateProfilePic: (state, action) => {
            state.currentUser.profilePic = action.payload.profilePic
        },
        updateCover: (state, action) => {
            state.currentUser.coverImg = action.payload.coverImg
        },
    },
});

export const {
    login,
    logout,
    updateProfile,
    setOtpState,
    followFriend,
    unFollowFriend,
    updateDetails,
    updateBio,
    updateProfilePic,
    updateCover
} = userSlice.actions;
export default userSlice.reducer