import React, { useState } from 'react'
import {
    Button,
    Typography,
    Box,
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
    IconButton,
} from "@mui/material";
import { ArrowDropDown, ArrowRight } from "@mui/icons-material";


export default function CartContainer() {
    const [isAddressOpen, setIsAddressOpen] = useState(false);
    const [isOrderSummaryOpen, setIsOrderSummaryOpen] = useState(false);

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
                <Typography variant="h5">My Cart ({2} items)</Typography>

                <div
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
                        <Typography variant="h6">BOOKNAME</Typography>
                        <Typography variant="body2">by autjor</Typography>
                        <Typography variant="h6" color="primary">
                            Rs. 200
                        </Typography>
                        <Typography variant="bod() => hany2">
                            Rating: {4} ({50} reviews)
                        </Typography>
                    </div>
                    <div>
                        <Button >-</Button>
                        <span>{2}</span>
                        <Button >+</Button>
                    </div>
                    <Button
                        variant="outlined"
                        color="secondary"
                    >
                        Remove
                    </Button>
                </div>
                <Box display="flex" justifyContent="flex-end">
                    <Button
                        variant="contained"
                        color="primary"
                    >
                        Place Order
                    </Button>
                </Box>
            </div>

            {/* ADDRESS SECTION */}
            <Box sx={{ marginBottom: "10px" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <IconButton onClick={() => setIsAddressOpen(!isAddressOpen)}>
                        {isAddressOpen ? <ArrowDropDown /> : <ArrowRight />}
                    </IconButton>
                    <Typography variant="h6">Select Address</Typography>
                </div>
            </Box>

            {/* Order summary SECTION */}
            <Box sx={{ marginBottom: "10px" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <IconButton
                        onClick={() => setIsOrderSummaryOpen(!isOrderSummaryOpen)}
                    >
                        {isOrderSummaryOpen ? <ArrowDropDown /> : <ArrowRight />}
                    </IconButton>
                    <Typography variant="h6">Order Summary</Typography>
                </div>
            </Box>



        </div>
    )
}
