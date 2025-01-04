import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { removeWishlist } from '../../redux/slice/wishlistSlice';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';


export default function WishList() {
    const wishlistItems = useSelector((state) => state.wishlist.items);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDelete = (bookID) => {
        dispatch(removeWishlist(bookID));
    };


    return (
        <div style={{ width: "80%", margin: "auto", marginBlock: "45px" }}>
            <Typography variant="h6" style={{ cursor: 'pointer' }} onClick={() => navigate("/books")}>
                <HomeIcon />Home</Typography>
            <div
                style={{
                    padding: "20px",
                    marginBottom: "20px",
                }}
            >
                <Typography variant="h5">My Wishlist ({wishlistItems.length})</Typography>
                {wishlistItems.map((item, index) => {
                    return (
                        <div
                            key={item.bookID}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-around",
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
                            <div style={{ width: "40%", marginLeft: "30px" }}>
                                <Typography variant="h6">{item.bookName}</Typography>
                                <Typography variant="body2">by {item.author}</Typography>
                                <Typography variant="h6" color="primary">
                                    Rs. {item.price}
                                </Typography>
                            </div>
                            <div style={{ width: "30%", display: 'flex', justifyContent: "flex-end" }}
                                onClick={() => handleDelete(item.bookID)}>
                                <DeleteIcon style={{ cursor: 'pointer' }} />
                            </div>
                        </div>
                    );

                })}

            </div>
        </div>
    )
}
