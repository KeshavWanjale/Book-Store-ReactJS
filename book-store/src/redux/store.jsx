import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "./slice/bookSlice";
import { cartReducer } from "./slice/cartSlice";
import { addressReducer } from "./slice/addressSlice";
import { orderReducer } from "./slice/orderSlice";
import { wishlistReducer } from "./slice/wishlistSlice";


export const store = configureStore({
    reducer: {
        books: bookReducer,
        cart: cartReducer,
        address: addressReducer,
        orders: orderReducer,
        wishlist: wishlistReducer,
    }
});

export default store