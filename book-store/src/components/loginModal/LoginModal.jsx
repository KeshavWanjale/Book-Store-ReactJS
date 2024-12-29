import React, { useState } from 'react'
import "../loginModal/LoginModal.css"
import { Modal, Box, TextField, Button } from "@mui/material";
import logo from "../../assets/images/logo.png"


const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "35%",
    transform: "translate(-50%, -50%)",
};


export default function LoginModal() {
    const [isLogin, setIsLogin] = useState(true);
    const toggleForm = () => {
        setIsLogin((prev) => !prev);
    };

    return (
        <Modal
            open={true}
            aria-labelledby="login-modal-title"
            aria-describedby="login-modal-description"
        >
            <Box sx={modalStyle}>
                <div className="login-container">
                    <div className="logo-container">
                        <img src={logo} alt="Logo" />
                        <h3 style={{ marginTop: "10px" }}>ONLINE BOOK SHOPPING</h3>
                    </div>
                    <div className="form-container">
                        <div className="form-header">
                            <h2
                                style={{
                                    color: isLogin ? "maroon" : "gray",
                                    cursor: "pointer",
                                }}
                                onClick={toggleForm}
                            >
                                LOGIN
                            </h2>
                            <h2
                                style={{
                                    color: isLogin ? "gray" : "maroon",
                                    cursor: "pointer",
                                }}
                                onClick={toggleForm}
                            >
                                SIGNUP
                            </h2>
                        </div>
                        <div className="login-form-body">
                            {isLogin ? (
                                <>
                                    <label>Email Id</label>
                                    <TextField
                                        size="small"
                                        fullWidth
                                    />
                                    <label>Password</label>
                                    <TextField
                                        size="small"
                                        type="password"
                                        fullWidth
                                    />
                                    <label
                                        style={{
                                            color: "gray",
                                            cursor: "pointer",
                                            marginTop: "10px",
                                        }}
                                    >
                                        Forgot Password?
                                    </label>
                                    <Button
                                        variant="contained"
                                        style={{ marginTop: "20px" }}
                                    >
                                        Login
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <label>Name</label>
                                    <TextField size="small" fullWidth />
                                    <label>Email Id</label>
                                    <TextField size="small" fullWidth />
                                    <label>Password</label>
                                    <TextField size="small" type="password" fullWidth />
                                    <Button variant="contained" style={{ marginTop: "20px" }}>
                                        Signup
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </Box>
        </Modal>
    )
}
