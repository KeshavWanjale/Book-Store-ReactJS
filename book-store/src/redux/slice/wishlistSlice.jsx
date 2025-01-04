import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [], // Stores wishlist books
};

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        fetchWishlist(state) {
            // This reducer can be used to retrieve wishlist data from the store
            return state;
        },
        addToWishlist(state, action) {
            const { bookID } = action.payload;

            // Check if the book is already in the wishlist
            const existingBook = state.items.find((item) => item.bookID === bookID);
            if (!existingBook) {
                state.items.push(action.payload);
            }
        },
        removeWishlist(state, action) {
            const bookID = action.payload;
            state.items = state.items.filter((item) => item.bookID !== bookID);
        },
    },
});

export const { fetchWishlist, addToWishlist, removeWishlist } = wishlistSlice.actions;
export const wishlistReducer = wishlistSlice.reducer;
