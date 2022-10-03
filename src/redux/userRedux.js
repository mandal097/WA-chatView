import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: null,
    otpState: {
        phone: '',
        email: ''
    }
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
    },
});

export const { login, logout, updateProfile, setOtpState } = userSlice.actions;
export default userSlice.reducer