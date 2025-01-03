import { addBooksToCartApi, getCartApi, updateBooksFromCartApi } from "../../utils/apis";
import { fetchCart, addItem } from "./cartSlice";


export const syncCart = () => async (dispatch, getState) => {
    try {

        // Fetch the redux cart
        const reduxCart = getState().cart.items;
        console.log("Redux Cart:", reduxCart);

        // Fetch the backend cart
        const backendResponse = await getCartApi();
        const backendCart = backendResponse.data.cart.items; // Array of items
        console.log("Backend Cart:", backendCart);


        // Map backend books by `book` (book ID) for quick lookup
        const backendBooksMap = backendCart.reduce((acc, item) => {
            acc[item.book] = item; // Use `book` instead of `bookID`
            return acc;
        }, {});

        // Update Redux and Backend
        reduxCart.forEach((reduxItem) => {
            const backendItem = backendBooksMap[reduxItem.bookID]; // Match with `book`
            if (backendItem) {
                // Case 3: Book in both backend and Redux
                if (reduxItem.quantity !== backendItem.quantity) {
                    backendItem.quantity = reduxItem.quantity
                    updateBooksFromCartApi({
                        bookId: reduxItem.bookID,
                        bookQuantity: reduxItem.quantity
                    })

                }
            } else {
                // Case 1: Book in Redux but not in Backend
                addBooksToCartApi({
                    book_id: reduxItem.bookID,
                    quantity: reduxItem.quantity,
                });
            }
        });

        // Case 2: Book in Backend but not in Redux
        backendCart.forEach((backendItem) => {
            const reduxItem = reduxCart.find(
                (item) => item.bookID === backendItem.book
            );
            if (!reduxItem) {
                dispatch(
                    addItem({
                        bookID: backendItem.book, // Map `book` to `bookID`
                        bookName: `Book ${backendItem.book}`, // Placeholder for book name
                        price: backendItem.price,
                        quantity: backendItem.quantity,
                    })
                );
            }
        });


        // Dispatch updated backend cart to Redux
        const formattedBackendCart = backendCart.map((item) => ({
            bookID: item.book, // Map `book` to `bookID`
            bookName: `Book ${item.book}`, // Placeholder for book name
            price: item.price,
            quantity: item.quantity,
        }));
        dispatch(fetchCart(formattedBackendCart));
    } catch (error) {
        console.error("Error syncing cart:", error);
    }
};
