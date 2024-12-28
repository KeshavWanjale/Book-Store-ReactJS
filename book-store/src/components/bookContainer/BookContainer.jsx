import React from "react";
import BookCard from '../bookCard/BookCard'
import { Grid, Typography, Container, Pagination } from "@mui/material";
import { useSelector } from "react-redux";

const BookContainer = () => {
    const books = useSelector((state) => state.books);
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
