import { addBooksToCartApi, getCartApi, updateBooksFromCartApi } from "../../utils/apis";
import { fetchCart, addItem } from "./cartSlice";


export const syncCart = () => async (dispatch, getState) => {
    try {
        // Fetch the Redux cart
        const reduxCart = getState().cart.items;
        console.log("Redux Cart:", reduxCart);

        // Initialize backendCart
        let backendCart = [];

        try {
            // Fetch the backend cart
            const backendResponse = await getCartApi();
            backendCart = backendResponse.data.cart.items;
            console.log("Backend Cart:", backendCart);
        } catch (error) {
            // Handle specific error for no active cart
            if (error.response?.status === 404 && error.response?.data?.message === "No active cart found for the user") {
                console.log("No active cart found. Creating a new cart...");

                if (reduxCart.length > 0) {
                    // Use the first item from Redux cart to create the new cart
                    const firstItem = reduxCart[0];
                    await addBooksToCartApi({
                        book_id: firstItem.bookID,
                        quantity: firstItem.quantity,
                    });
                    console.log("New cart created with the first item.");
                } else {
                    console.warn("No items in the Redux cart to create a new cart.");
                    return; // Exit if there's nothing to sync
                }
            } else {
                console.error("Unexpected error fetching cart:", error);
                throw error; // Re-throw unexpected errors
            }
        }

        // If a new cart was created, re-fetch it
        if (backendCart.length === 0) {
            const backendResponse = await getCartApi();
            backendCart = backendResponse.data.cart.items;
        }

        // Sync logic for Redux and backend cart
        const backendBooksMap = backendCart.reduce((acc, item) => {
            acc[item.book] = item;
            return acc;
        }, {});

        for (const reduxItem of reduxCart) {
            const backendItem = backendBooksMap[reduxItem.bookID];
            if (backendItem) {
                // Case 3: Book in both backend and Redux
                if (reduxItem.quantity !== backendItem.quantity) {
                    await updateBooksFromCartApi({
                        bookId: reduxItem.bookID,
                        bookQuantity: reduxItem.quantity,
                    });
                }
            } else {
                // Case 1: Book in Redux but not in Backend
                await addBooksToCartApi({
                    book_id: reduxItem.bookID,
                    quantity: reduxItem.quantity,
                });

                // Update Redux store incrementally for immediate UI feedback
                dispatch(
                    addItem({
                        bookID: reduxItem.bookID,
                        bookName: `Book ${reduxItem.bookID}`, // Placeholder for book name
                        price: reduxItem.price,
                        quantity: reduxItem.quantity,
                    })
                );
            }
        }

        // Re-fetch the backend cart to ensure complete synchronization
        const finalBackendResponse = await getCartApi();
        backendCart = finalBackendResponse.data.cart.items;

        // Dispatch updated backend cart to Redux
        const formattedBackendCart = backendCart.map((item) => ({
            bookID: item.book,
            bookName: `Book ${item.book}`,
            price: item.price,
            quantity: item.quantity,
        }));
        dispatch(fetchCart(formattedBackendCart));
    } catch (error) {
        console.error("Error syncing cart:", error);
    }
};
