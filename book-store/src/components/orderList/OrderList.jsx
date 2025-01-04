import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { fetchOrders } from '../../redux/slice/orderSlice';
import { Typography } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';


export default function OrderList() {
    const dispatch = useDispatch();
    const { books, loading, error } = useSelector((state) => state.orders);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    if (books.length === 0) {
        return (
            <Typography variant="h4" sx={{ marginTop: "4rem" }}>
                Order List is Empty
            </Typography>
        );
    }


    return (

        <div style={{ width: "80%", margin: "auto", marginBlock: "45px" }}>
            <Typography variant="h5" style={{ cursor: 'pointer' }} onClick={() => navigate("/books")}>
                <HomeIcon />Home</Typography>
            <div
                style={{
                    padding: "20px",
                    marginBottom: "20px",
                }}
            >
                <Typography variant="h5">My Orders</Typography>
                {books.map((item, index) => {
                    return (
                        <div
                            key={index}
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
                                <Typography variant="h6">{item.name}</Typography>
                                <Typography variant="body2">by {item.author}</Typography>
                                <Typography variant="body2">quantity: {item.quantity}</Typography>
                                <Typography variant="h6" color="primary">
                                    Rs. {item.price}
                                </Typography>
                            </div>
                            <div style={{ width: "30%", display: 'flex', justifyContent: "flex-end" }}>
                                <Typography variant="h6" color="primary">
                                    Placed on 1 jan 2025
                                </Typography>
                            </div>
                        </div>
                    );

                })}

            </div>
        </div>
    )
}
