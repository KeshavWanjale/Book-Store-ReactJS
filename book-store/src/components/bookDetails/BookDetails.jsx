import "../bookDetails/BookDetail.css";
import { useNavigate, useParams } from "react-router-dom";
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
import { addBooksToCartApi, removeBooksFromCartApi, updateBooksFromCartApi } from "../../utils/apis";
import { useState } from "react";
import { addToWishlist } from "../../redux/slice/wishlistSlice";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';

export default function BookDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isWishlist, setIsWishlist] = useState(false)


    const books = useSelector((state) => state.books.list);
    const cartItems = useSelector((state) => state.cart.items);
    const wishlistItems = useSelector((state) => state.wishlist.items);

    const book = books.find((book) => book.id === parseInt(id));
    const cartItem = cartItems.find((item) => item.bookID === book?.id);
    const wishlistItem = wishlistItems.find((item) => item.bookID === book?.id);

    const user = localStorage.getItem("accessToken");

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
            payload: { bookID: book.id, bookName: book.name, price: book.price, quantity: 1 },
        });
        if (user) {
            addBooksToCartApi({
                book_id: book.id,
                quantity: 1,
            })
        }

    };

    const handleIncreaseQuantity = () => {
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

    const handleDecreaseQuantity = () => {
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
                removeBooksFromCartApi({ bookID: book.id });
            }
        }
    };

    const handleWishlist = () => {
        dispatch(addToWishlist({
            bookID: book.id,
            bookName: book.name,
            author: book.author,
            price: book.price,
        }));
        setIsWishlist(true);
    }

    const goToWishlist = () => {
        navigate("/wishlist")
    }

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
                            {!isWishlist & !wishlistItem ? (
                                <Button variant="outlined" color="secondary" onClick={handleWishlist}>
                                    <FavoriteBorderOutlinedIcon /> WISHLIST
                                </Button>
                            ) : (
                                <Button variant="outlined" color="secondary" onClick={goToWishlist}>
                                    <FavoriteOutlinedIcon /> View WISHLIST
                                </Button>
                            )}
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
