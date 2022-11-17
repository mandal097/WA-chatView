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
    },
});

export const {setCurrentGroup} = userSlice.actions;
export default userSlice.reducer