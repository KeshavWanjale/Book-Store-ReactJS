import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllBooksApiCall } from "../../utils/apis";

// Async thunk for fetching books
export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
    const books = await getAllBooksApiCall();
    return books;
});

const bookSlice = createSlice({
    name: "books",
    initialState: {
        list: [],
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBooks.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchBooks.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.list = action.payload;
            })
            .addCase(fetchBooks.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export default bookSlice.reducer;
