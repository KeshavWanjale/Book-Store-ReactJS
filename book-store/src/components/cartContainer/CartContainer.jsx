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
    Modal,
} from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { addAddress } from '../../redux/slice/addressSlice';
import LoginModal from '../loginModal/LoginModal';
import { useNavigate } from 'react-router-dom';
import { syncCart } from '../../redux/slice/syncCart';
import { placeOrderApi, removeBooksFromCartApi, updateBooksFromCartApi } from '../../utils/apis';
import { emptyCart } from '../../redux/slice/cartSlice';


export default function CartContainer() {
    const cartItems = useSelector((state) => state.cart.items)
    const books = useSelector((state) => state.books.list)
    const [isPlaceOrder, setIsPlaceOrder] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [existingAddress, setExistingAddress] = useState("");
    const addresses = useSelector((state) => state.address.addresses);
    const [isOrderSummaryOpen, setIsOrderSummaryOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = localStorage.getItem("accessToken");

    const [address, setAddress] = useState({
        fullName: "",
        phone: "",
        addressLine: "",
        city: "",
        state: "",
    });


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
        if (user) {
            updateBooksFromCartApi({
                bookId: book.id,
                bookQuantity: cartItem.quantity + 1
            })
        }
    };

    const handleDecreaseQuantity = (cartItem) => {
        const book = books.find((book) => book.id === cartItem.bookID);
        if (cartItem.quantity > 1) {
            dispatch({
                type: "cart/updateItemQuantity",
                payload: { bookID: book.id, quantity: cartItem.quantity - 1 },
            });
            if (user) {
                updateBooksFromCartApi({
                    bookId: book.id,
                    bookQuantity: cartItem.quantity - 1
                })
            }
        } else {
            dispatch({ type: "cart/removeItem", payload: book.id });
            if (user) {
                removeBooksFromCartApi(book.id)
            }
        }
    };

    const handleRemoveBook = (cartItem) => {
        const book = books.find((book) => book.id === cartItem.bookID);
        dispatch({ type: "cart/removeItem", payload: book.id });
        if (user) {
            removeBooksFromCartApi(book.id)
        }
    };

    const handlePlaceOrder = () => {
        const user = localStorage.getItem("accessToken")
        if (user) {
            dispatch(syncCart());
            setIsPlaceOrder(true);
        } else {
            setIsModalOpen(true);
        }
    }

    const handleLoginModalClose = () => {
        setIsModalOpen(false);
    };

    const handleAddAddress = () => {
        if (
            address.fullName &&
            address.phone &&
            address.addressLine &&
            address.city &&
            address.state
        ) {
            dispatch(addAddress(address));
            setAddress({
                fullName: "",
                phone: "",
                addressLine: "",
                city: "",
                state: "",
            });
            alert("Address added successfully!");
        } else {
            alert("Please fill in all address fields.");
        }
    };

    const handleContinue = () => {
        if (existingAddress || (address.fullName && address.phone)) {
            setIsOrderSummaryOpen(true);
        } else {
            alert("Please select or enter an address.");
        }
    };

    const handleChekout = () => {
        placeOrderApi();
        dispatch(emptyCart())
        navigate('/order-placed');
    }


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
                {!isPlaceOrder ? (
                    <Box display="flex" justifyContent="flex-end">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handlePlaceOrder}
                        >
                            Place Order
                        </Button>
                    </Box>
                ) : (
                    <></>
                )}

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

                <Collapse in={isPlaceOrder}>
                    <Box sx={{ border: "0.5px solid black", padding: "20px" }}>
                        <RadioGroup
                            value={existingAddress}
                            onChange={(e) => setExistingAddress(e.target.value)}
                        >
                            {addresses.map((addr, index) => (
                                <FormControlLabel
                                    key={index}
                                    value={addr.fullName}
                                    control={<Radio />}
                                    label={`${addr.fullName} - ${addr.phone}, ${addr.addressLine}, ${addr.city}, ${addr.state}`}
                                />
                            ))}
                        </RadioGroup>
                        <Typography variant="subtitle1" marginY={1}>
                            Add New Address
                        </Typography>
                        <TextField
                            label="Full Name"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={address.fullName}
                            onChange={(e) =>
                                setAddress({ ...address, fullName: e.target.value })
                            }
                        />
                        <TextField
                            label="Mobile Number"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            type="number"
                            value={address.phone}
                            onChange={(e) =>
                                setAddress({ ...address, phone: e.target.value })
                            }
                        />
                        <TextField
                            label="Address"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            multiline
                            rows={3}
                            value={address.addressLine}
                            onChange={(e) =>
                                setAddress({ ...address, addressLine: e.target.value })
                            }
                        />
                        <TextField
                            label="City/Town"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={address.city}
                            onChange={(e) => setAddress({ ...address, city: e.target.value })}
                        />
                        <TextField
                            label="State"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={address.state}
                            onChange={(e) =>
                                setAddress({ ...address, state: e.target.value })
                            }
                        />
                        <Box display="flex" justifyContent="flex-end" marginTop="10px">
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleAddAddress}
                            >
                                Add Address
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleContinue}
                                style={{ marginLeft: "10px" }}
                            >
                                Continue
                            </Button>
                        </Box>
                    </Box>
                </Collapse>
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
                <Collapse in={isOrderSummaryOpen}>
                    <Box sx={{ border: "0.5px solid black", padding: "20px" }}>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Item</TableCell>
                                        <TableCell align="right">Quantity</TableCell>
                                        <TableCell align="right">Price</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {cartItems.map((item) => {
                                        const book = books.find((book) => book.id === item.bookID);
                                        return (
                                            <TableRow key={item.bookID}>
                                                <TableCell>{book?.name}</TableCell>
                                                <TableCell align="right">{item.quantity}</TableCell>
                                                <TableCell align="right">
                                                    Rs. {book?.price * item.quantity}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                    <TableRow>
                                        <TableCell colSpan={2} align="right">
                                            <strong>Total:</strong>
                                        </TableCell>
                                        <TableCell align="right">
                                            <strong>
                                                Rs.{" "}
                                                {cartItems.reduce((total, item) => {
                                                    const book = books.find((book) => book.id === item.bookID);
                                                    return total + (book?.price * item.quantity || 0);
                                                }, 0)}
                                            </strong>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Box display="flex" justifyContent="flex-end" marginTop="10px">
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleChekout}
                            >
                                Checkout
                            </Button>
                        </Box>
                    </Box>
                </Collapse>
            </div>

            <Modal
                open={isModalOpen}
                onClose={handleLoginModalClose}
                aria-labelledby="login-modal-title"
                aria-describedby="login-modal-description"
            >
                <LoginModal onSuccess={handleLoginModalClose} />
            </Modal>
        </div>
    )
}
