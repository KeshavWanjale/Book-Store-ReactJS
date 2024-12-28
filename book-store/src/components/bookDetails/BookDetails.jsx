import "../bookDetails/BookDetail.css";
import { useParams } from "react-router-dom";
import {
    Container,
    Typography,
    Grid,
    Button,
    TextField,
    Box,
    Divider,
    Avatar,
} from "@mui/material";
import { Rating } from "@mui/material";
import bookImage from "../../assets/education/education.png";
import { useDispatch, useSelector } from "react-redux";

export default function BookDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();

    // Fetch books and cart items from the store
    const books = useSelector((state) => state.books);
    const cartItems = useSelector((state) => state.cart.items);

    // Find the book based on the `id` parameter
    const book = books.find((book) => book.id === parseInt(id));

    // Check if the current book is in the cart
    const cartItem = cartItems.find((item) => item.book === book?.id);

    if (!book) {
        return (
            <Container>
                <Typography variant="h4" sx={{ marginTop: "4rem" }}>
                    Book not found!
                </Typography>
            </Container>
        );
    }

    const handleAddToCart = () => {
        dispatch({
            type: "cart/addItem",
            payload: { book: book.id, price: book.price, quantity: 1 },
        });
    };

    const handleIncreaseQuantity = () => {
        dispatch({
            type: "cart/updateItemQuantity",
            payload: { book: book.id, quantity: cartItem.quantity + 1 },
        });
    };

    const handleDecreaseQuantity = () => {
        if (cartItem.quantity > 1) {
            dispatch({
                type: "cart/updateItemQuantity",
                payload: { book: book.id, quantity: cartItem.quantity - 1 },
            });
        } else {
            dispatch({ type: "cart/removeItem", payload: book.id });
        }
    };

    return (
        <Container>
            <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                    <div
                        style={{
                            border: "1px solid #000",
                            borderRadius: "5px",
                            overflow: "hidden",
                            padding: "20px",
                        }}
                    >
                        <img
                            src={bookImage}
                            alt={book.name}
                            style={{ width: "100%", borderRadius: "5px" }}
                        />
                    </div>
                    <Grid container spacing={2} sx={{ marginTop: "20px" }}>
                        <Grid item>
                            {cartItem ? (
                                <Box display="flex" alignItems="center" gap={2}>
                                    <Button variant="outlined" onClick={handleDecreaseQuantity}>
                                        -
                                    </Button>
                                    <Typography>{cartItem.quantity}</Typography>
                                    <Button variant="outlined" onClick={handleIncreaseQuantity}>
                                        +
                                    </Button>
                                </Box>
                            ) : (
                                <Button
                                    variant="contained"
                                    color="#A03037"
                                    onClick={handleAddToCart}
                                >
                                    ADD TO BAG
                                </Button>
                            )}
                        </Grid>
                        <Grid item>
                            <Button variant="outlined" color="secondary">
                                WISHLIST
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Typography variant="h4" gutterBottom>
                        {book.name}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        by {book.author}
                    </Typography>
                    <Box display="flex" alignItems="center" mt={2}>
                        <Rating value={3.5} precision={0.5} readOnly />
                        <Typography variant="body2" ml={1}>
                            ({29})
                        </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" mt={2}>
                        <Typography variant="h6" color="textPrimary">
                            Rs. {book.price}
                        </Typography>
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            sx={{ textDecoration: "line-through", marginLeft: "10px" }}
                        >
                            Rs. {parseInt(book.price) + 500}
                        </Typography>
                    </Box>
                    <Divider></Divider>
                    <Typography variant="body1" color="textSecondary" mt={2}>
                        Book Details:
                        {book.description}
                    </Typography>
                    <Divider></Divider>
                    <Typography
                        variant="h5"
                        sx={{ marginTop: "40px", marginBottom: "10px" }}
                    >
                        Customer Feedback
                    </Typography>
                    <Box
                        sx={{
                            backgroundColor: "#F5F5F5",
                            padding: "20px",
                            borderRadius: "10px",
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                            position: "relative",
                        }}
                    >
                        <Box display="flex" alignItems="center">
                            <Typography variant="subtitle1">Overall rating</Typography>
                            <Rating value={0} precision={0.5} />
                        </Box>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Write your review"
                            multiline
                            rows={4}
                        />
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                                width: "100%",
                            }}
                        >
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{ marginTop: "10px" }}
                            >
                                Submit
                            </Button>
                        </Box>
                    </Box>
                    <div className="sub-container">
                        <div className="fourth-container">
                            <h3>Reviews</h3>
                            <div className="review-container">
                                <div className="review-header">
                                    <Avatar>JD</Avatar>
                                    <div className="reviewer-info">
                                        <strong>John Doe</strong>
                                        <div className="rating">
                                            <Rating value={3.5} precision={0.5} readOnly />
                                        </div>
                                    </div>
                                </div>

                                <div className="review-body">
                                    <p>
                                        This book was an incredible read! The story was gripping and
                                        the characters were well-developed. I couldn't put it down!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </Container>
    );
}
