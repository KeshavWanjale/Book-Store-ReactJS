import React from "react";
import { Typography, TextField } from "@mui/material";
import Button from '@mui/material/Button';

export default function ProfilePage() {
    return (
        <>
            <div style={{ maxWidth: 600, margin: "auto", padding: "20px" }}>

                <div style={{ display: "flex" }}>
                    <Typography variant="h4" style={{ padding: "10px" }}>
                        Personal Details
                    </Typography>
                    <Button variant="text" size="small">Edit</Button>
                </div>

                <div style={{ marginTop: "10px" }}>

                    <Typography variant="h7 ">
                        Full Name
                    </Typography>
                    <TextField
                        disabled
                        id="fullName"
                        fullWidth
                        variant="filled"
                        margin="normal"
                        value={"Keshav Wanjale"}
                    />


                    <Typography variant="h7 ">
                        Email Id
                    </Typography>
                    <TextField
                        disabled
                        id="emailId"
                        fullWidth
                        variant="filled"
                        margin="normal"
                        type="email"
                        placeholder="Email"
                        value={"keshav@gmail.com"}
                    />

                    <Typography variant="h7 ">
                        Password
                    </Typography>
                    <TextField
                        disabled
                        id="password"
                        type="password"
                        fullWidth
                        variant="filled"
                        margin="normal"
                        placeholder="Password"
                        value={"Password"}
                    />

                    <Typography variant="h7 ">
                        Mobile Number
                    </Typography>
                    <TextField
                        disabled
                        placeholder="Mobile Number"
                        id="mobileNumber"
                        fullWidth
                        variant="filled"
                        margin="normal"
                        value={"1234568978"}
                    />
                </div>
            </div>
        </>

    )
}
