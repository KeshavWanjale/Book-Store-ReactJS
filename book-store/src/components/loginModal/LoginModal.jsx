import React, { useState } from 'react';
import "../loginModal/LoginModal.css";
import { Box, TextField, Button } from "@mui/material";
import logo from "../../assets/images/logo.png";
import { LoginApiCall } from '../../utils/apis';
import { syncCart } from '../../redux/slice/syncCart';
import { useDispatch } from 'react-redux';

const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "35%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: "8px",
};

export default function LoginModal({ onSuccess }) {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch()

    const toggleForm = () => {
        setIsLogin((prev) => !prev);
    };

    const handleLogin = () => {
        LoginApiCall({ email, password })
            .then((response) => {
                console.log('Login successful:', response);
                alert('Login successful');
                dispatch(syncCart())
                onSuccess()
            })
            .catch((err) => {
                console.error('Login error:', err);
                alert('Login failed, please try again.');
            });
    };

    return (
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
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <label>Password</label>
                                <TextField
                                    size="small"
                                    type="password"
                                    fullWidth
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
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
                                    onClick={handleLogin}
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
    );
}
