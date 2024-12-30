import React, { useState } from 'react'
import {
    Button,
    Typography,
    Box,
    Container,
    TextField,
    Radio,
    RadioGroup,
    FormControlLabel,
    Collapse,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
} from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';


export default function CartContainer() {
    const cartItems = useSelector((state) => state.cart.items)
    const books = useSelector((state) => state.books.list)

    const dispatch = useDispatch();

    if (cartItems.length === 0) {
        return (
            <Container>
                <Typography variant="h4" sx={{ marginTop: "4rem" }}>
                    Cart Is Empty!!!
                </Typography>
            </Container>
        );
    }

    const handleIncreaseQuantity = (cartItem) => {
        const book = books.find((book) => book.id === cartItem.bookID);
        dispatch({
            type: "cart/updateItemQuantity",
            payload: { bookID: book.id, quantity: cartItem.quantity + 1 },
        });
    };

    const handleDecreaseQuantity = (cartItem) => {
        const book = books.find((book) => book.id === cartItem.bookID);
        if (cartItem.quantity > 1) {
            dispatch({
                type: "cart/updateItemQuantity",
                payload: { bookID: book.id, quantity: cartItem.quantity - 1 },
            });
        } else {
            dispatch({ type: "cart/removeItem", payload: book.id });
        }
    };
    const handleRemoveBook = (cartItem) => {
        const book = books.find((book) => book.id === cartItem.bookID);
        dispatch({ type: "cart/removeItem", payload: book.id });
    };

    return (
        <div style={{ width: "80%", margin: "auto", marginBlock: "45px" }}>
            <div
                style={{
                    border: "1px solid black",
                    padding: "20px",
                    borderRadius: "8px",
                    marginBottom: "20px",
                }}
            >
                <Typography variant="h5">My Cart ({cartItems.length} items)</Typography>
                {cartItems.map((item) => {
                    const book = books.find((book) => book.id === item.bookID);
                    return (
                        <div
                            key={item.bookID}
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                border: "0.5px solid black",
                                padding: "10px",
                                margin: "10px 0",
                            }}
                        >
                            <img
                                src={"/placeholder-image.jpg"}
                                alt={"book"}
                                style={{ width: "100px", height: "130px" }}
                            />
                            <div style={{ width: "30%" }}>
                                <Typography variant="h6">{book.name}</Typography>
                                <Typography variant="body2">{book.author}</Typography>
                                <Typography variant="h6" color="primary">
                                    Rs. {book.price}
                                </Typography>
                                <Typography variant="bod() => hany2">
                                    Rating: {4} ({50} reviews)
                                </Typography>
                            </div>
                            <div>
                                <Button onClick={() => handleDecreaseQuantity(item)}>-</Button>
                                <span>{item.quantity}</span>
                                <Button onClick={() => handleIncreaseQuantity(item)} >+</Button>
                            </div>
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={() => handleRemoveBook(item)}
                            >
                                Remove
                            </Button>
                        </div>
                    );

                })}

                <Box display="flex" justifyContent="flex-end">
                    <Button
                        variant="contained"
                        color="primary"
                    >
                        Place Order
                    </Button>
                </Box>
            </div>

            {/* ADDRESS SECTION */}
            <div
                style={{
                    border: "1px solid black",
                    padding: "20px",
                    borderRadius: "8px",
                    marginBottom: "20px",
                }}
            >
                <Box sx={{ marginBottom: "10px" }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <Typography variant="h6">Address Details</Typography>
                    </div>
                </Box>
            </div>

            {/* Order summary SECTION */}
            <div
                style={{
                    border: "1px solid black",
                    padding: "20px",
                    borderRadius: "8px",
                    marginBottom: "20px",
                }}
            >
                <Box sx={{ marginBottom: "10px" }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <Typography variant="h6">Order Summary</Typography>
                    </div>
                </Box>
            </div>

        </div>
    )
}
