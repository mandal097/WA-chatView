import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    members: [],
};


const userSlice = createSlice({
    name: "group",
    initialState: initialState,
    reducers: {
        setMembers: (state, action) => {
            if (!state.members.includes(action.payload)) {
                state.members.push(action.payload)
            } else {
                state.members.splice(
                    state.members.findIndex(
                        userId => userId === action.payload
                    ),
                    1
                );
            }
        },
        removeMembers: (state) => {
            state.members = []
        }
    },
});

export const { setMembers, removeMembers } = userSlice.actions;
export default userSlice.reducer