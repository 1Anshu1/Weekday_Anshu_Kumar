import { configureStore } from "@reduxjs/toolkit";
import jobsReducer from "./feature/jobsSlice.js";

const store = configureStore({
    reducer: {
        jobs: jobsReducer,
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
