import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getBookByID, getOrderApi } from '../../utils/apis';

// Fetch orders and book names together
export const fetchOrders = createAsyncThunk('orders/fetchOrders', async (_, thunkAPI) => {
    try {
        // Fetch orders
        const response = await getOrderApi();
        const orders = response.data.data;

        // Fetch book names concurrently for all books in the orders
        const booksWithNames = await Promise.all(
            orders.flatMap(order =>
                order.items.map(async (item) => {
                    const bookResponse = await getBookByID(item.book);
                    return {
                        id: item.book,
                        price: item.price,
                        quantity: item.quantity,
                        name: bookResponse.data.name,
                        author: bookResponse.data.author,
                    };
                })
            )
        );

        return booksWithNames;  // Return the updated order items with book names
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message || 'Failed to fetch orders');
    }
});

const ordersSlice = createSlice({
    name: 'orders',
    initialState: {
        books: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.books = action.payload;  // Update the state with the fetched books data
                state.loading = false;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to fetch orders';
            });
    },
});

export const orderReducer = ordersSlice.reducer;
