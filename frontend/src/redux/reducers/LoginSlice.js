import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    loggedIn: false,
    error: null,
    navigation: "",
};
export const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        loginStart: (state, action) => {
            state.isLoading = true;
        },
        loginSuccess: (state, action) => {
            state.isLoading = false;
            state.error = null;
        },
        loginError: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

    }
});

export const {loginError, loginStart, loginSuccess} = loginSlice.actions;
export default loginSlice.reducer;
