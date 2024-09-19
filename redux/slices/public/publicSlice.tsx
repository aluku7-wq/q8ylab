import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sidebarStatus: "hidden",
};

export const publicSlice = createSlice({
    name: "public",
    initialState,
    reducers: {
        setsidebarStatus: (state, action) => {
            state = { ...state, sidebarStatus: action.payload };
            return state;
        },
    },
});

export const { setsidebarStatus } = publicSlice.actions;
export default publicSlice.reducer;
