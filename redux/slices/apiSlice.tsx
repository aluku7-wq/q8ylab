import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

// Create a base query function with custom headers
const baseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
        headers.set(
            "authorization",
            process.env.NEXT_PUBLIC_BACKEND_API_KEY as string
        );
        return headers;
    },
});
export const apiSlice = createApi({
    baseQuery,
    tagTypes: ["api"],

    // initialize an empty api service that we'll inject endpoints into later as needed
    endpoints: () => ({}),
});
