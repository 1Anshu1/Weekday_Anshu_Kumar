import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getJobsAction = createAsyncThunk("jobs/getJobs", async (payload, { rejectWithValue }) => {
    try {
        const response = await fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                limit: 10,
                offset: payload,
            }),
        });
        const result = await response.json();
        return result.jdList;
    } catch (error) {
        if (!error.response) {
            throw error;
        }
        return rejectWithValue(error);
    }
});

const jobsSlice = createSlice({
    name: "jobs",
    initialState: {
        loading: false,
        jobs: [],
        error: null,
    },

    extraReducers: (builder) => {
        builder.addCase(getJobsAction.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getJobsAction.fulfilled, (state, action) => {
            state.loading = false;
            state.jobs = [...state.jobs, ...action.payload];
        });
        builder.addCase(getJobsAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.response.data.message;
        });
    },
});

export default jobsSlice.reducer;
