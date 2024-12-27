import React from 'react'
import '../bookContainer/BookContainer.css'
import BookCard from '../bookCard/BookCard'
import { Grid } from "@mui/material";

export default function BookContainer() {
    const bookList = getBookList();

    return (
        <>
            <div className="books-container">
                <div className="header">
                    <h3>Books ({bookList.length} items)</h3>
                </div>
                <Grid container spacing={1} justifyContent="center">
                    {bookList.map((book, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
                            <BookCard book={book} />
                        </Grid>
                    ))}
                </Grid>
            </div>
        </>
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
