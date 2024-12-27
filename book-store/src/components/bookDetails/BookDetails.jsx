import React, { useState } from 'react'
import "../bookDetails/BookDetail.css"
import { useParams } from "react-router-dom";
import {
    Container,
    Typography,
    Grid,
    Button,
    TextField,
    Box,
    Divider,
    Avatar
} from "@mui/material";
import { Rating } from "@mui/material";
import bookImage from '../../assets/education/education.png'

export default function BookDetails() {
    const { id } = useParams();
    const books = getBookList();

    const [isInBag, setIsInBag] = useState(false);

    const addToBag = () => {
        setIsInBag(true);
    };

    // Find the book based on the `id` parameter
    const book = books.find((book) => book.id === parseInt(id));

    if (!book) {
        return (
            <Container>
                <Typography variant="h4" sx={{ marginTop: "4rem" }}>
                    Book not found!
                </Typography>
            </Container>
        );
    }

    return (
        <Container>
            <Grid container spacing={4} sx={{ marginTop: "4rem" }}>
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
                            {!isInBag ? (
                                <Button
                                    variant="contained"
                                    color="#A03037"
                                    onClick={addToBag}
                                >
                                    ADD TO BAG
                                </Button>
                            ) : (
                                <Box display="flex" alignItems="center" gap={2}>
                                    <Button variant="outlined" >
                                        -
                                    </Button>
                                    <Typography>1</Typography>
                                    <Button variant="outlined" >
                                        +
                                    </Button>
                                </Box>
                            )
                            }

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
                                <div className="review-header" >
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

function getBookList() {
    return [
        {
            "id": 1,
            "name": "Book1",
            "author": "Author 1",
            "description": "A thrilling mystery novel.",
            "user": 1,
            "price": 250,
            "stock": 120
        },
        {
            "id": 2,
            "name": "Book2",
            "author": "Author 2",
            "description": "An inspiring self-help guide.",
            "user": 2,
            "price": 300,
            "stock": 80
        },
        {
            "id": 3,
            "name": "Book3",
            "author": "Author 3",
            "description": "A deep dive into ancient history.",
            "user": 1,
            "price": 400,
            "stock": 150
        },
        {
            "id": 4,
            "name": "Book4",
            "author": "Author 4",
            "description": "A heartwarming romance story.",
            "user": 2,
            "price": 350,
            "stock": 200
        },
        {
            "id": 5,
            "name": "Book5",
            "author": "Author 5",
            "description": "A collection of thought-provoking poems.",
            "user": 3,
            "price": 200,
            "stock": 300
        },
        {
            "id": 6,
            "name": "Book6",
            "author": "Author 6",
            "description": "A beginner's guide to coding.",
            "user": 4,
            "price": 500,
            "stock": 90
        },
        {
            "id": 7,
            "name": "Book7",
            "author": "Author 7",
            "description": "An action-packed science fiction saga.",
            "user": 2,
            "price": 600,
            "stock": 75
        },
        {
            "id": 8,
            "name": "Book8",
            "author": "Author 8",
            "description": "A cookbook for healthy living.",
            "user": 3,
            "price": 150,
            "stock": 250
        }
    ]
}
