import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllBooksApiCall } from "../../utils/Apis";

// Async thunk for fetching books
export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
    const books = await getAllBooksApiCall();
    return books;
});

const bookSlice = createSlice({
    name: "books",
    initialState: {
        list: [], // Initial state is an empty list
        status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null,   // To track errors
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBooks.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchBooks.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.list = action.payload; // Populate the state with the fetched books
            })
            .addCase(fetchBooks.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export default bookSlice.reducer;
