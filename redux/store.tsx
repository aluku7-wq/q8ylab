"use client";
import { configureStore } from "@reduxjs/toolkit";
import publicReducer from "./slices/public/publicSlice";
import cartReducer from "./slices/cart/cartSlice";
import { apiSlice } from "./slices/apiSlice";
export const makeStore = () => {
    return configureStore({
        reducer: {
            [apiSlice.reducerPath]: apiSlice.reducer,
            publicStates: publicReducer,
            cartStates: cartReducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat([apiSlice.middleware]),

        devTools: true,
    });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
