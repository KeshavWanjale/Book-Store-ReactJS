import React from "react";
import BookCard from '../bookCard/BookCard'
import { Grid, Typography, Container, Pagination } from "@mui/material";
// import { useSelector } from "react-redux";

const BookContainer = () => {
    // const books = useSelector((state) => state.books.items); 
    const books = getBookList();
    const [currentPage, setCurrentPage] = React.useState(1);
    const itemsPerPage = 12; // Number of books per page




    // Calculate the current items to display based on the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentBooks = books.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(books.length / itemsPerPage); // Total pages based on items

    // Handle page change
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    return (
        <Container>
            <div
                style={{
                    marginTop: "5rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <Typography variant="h6" gutterBottom>
                    Books ({books.length} Items)
                </Typography>
                {/* <SortBar sort={sort} handleSortChange={handleSortChange} /> */}
            </div>
            <Grid container spacing={3}>
                {currentBooks.map((book) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
                        <BookCard book={book} />
                    </Grid>
                ))}
            </Grid>
            <Pagination
                count={totalPages}
                color="primary"
                shape="rounded"
                page={currentPage} // Set current page for controlled pagination
                onChange={handlePageChange} // Handle page change
                sx={{
                    marginTop: 4,
                    paddingBottom: 12,
                    justifyContent: "center",
                    display: "flex",
                }}
            />
        </Container>
    );
};

export default BookContainer;

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
