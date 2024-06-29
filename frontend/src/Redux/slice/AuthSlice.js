import { createSlice } from '@reduxjs/toolkit';

//! initial state

const authSlice = createSlice({
    name: "auth",  // action type - must be unique
    initialState: {
        user: JSON.parse(localStorage.getItem('userInfo')) || null,
    },

    // reducer
    reducers: {
        // state refers to initial state from above
        loginAction: (state, action) => {
            // update state --- here action.payload = when in backend request for the data and which data return are pass throw payloads
            state.user = action.payload;
        },
        // Logout
        logoutAction: (state, action) => {
            state.user = null;
        },
    },
});

//! Generate actions
export const { loginAction, logoutAction } = authSlice.actions;

// !Generate reducers
const authReducer = authSlice.reducer;
export default authReducer;