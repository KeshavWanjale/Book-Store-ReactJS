import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { fetchOrders } from '../../redux/slice/orderSlice';
import { Typography } from "@mui/material";


export default function OrderList() {
    const dispatch = useDispatch();
    const { books, loading, error } = useSelector((state) => state.orders);


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
            <div
                style={{
                    border: "1px solid black",
                    padding: "20px",
                    borderRadius: "8px",
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


        // <div>
        //     <h2>Order List</h2>
        //     <table>
        //         <thead>
        //             <tr>
        //                 <th>Book Name</th>
        //                 <th>Author</th>
        //                 <th>Price</th>
        //                 <th>Quantity</th>
        //             </tr>
        //         </thead>
        //         <tbody>
        //             {books.map((book, index) => (
        //                 <tr key={index}>
        //                     <td>{book.name}</td>
        //                     <td>{book.author}</td>
        //                     <td>{book.price}</td>
        //                     <td>{book.quantity}</td>
        //                 </tr>
        //             ))}
        //         </tbody>
        //     </table>
        // </div>
    )
}
