import React from 'react'
import {
    AppBar,
    Toolbar,
    Typography,
    InputBase,
    Badge,
} from "@mui/material";
import {
    Search as SearchIcon,
    AccountCircle,
    ShoppingCart,
} from "@mui/icons-material";
import "./NavBar.css";
import bookImage from '../../assets/education/education.png'

export default function NavBar() {
    return (
        <AppBar position="fixed" color="primary" className="app-bar">
            <Toolbar className="toolbar">

                <div className="logo-name">
                    <img className="logo" src={bookImage} alt='book' />

                    <Typography variant="h6" className="title">
                        BookStore
                    </Typography>
                </div>


                <div className="search-box">
                    <InputBase
                        placeholder="Search…"
                        startAdornment={<SearchIcon />}
                        className="search-input"
                    />
                </div>


                <div className="icons-section">
                    <div className="icon-container">
                        <AccountCircle className="icon profile-icon" />
                        <Typography className="icon-label">Profile</Typography>
                    </div>
                    <div className="icon-container">
                        <Badge badgeContent={0} color="error">
                            <ShoppingCart className="icon cart-icon" />
                        </Badge>
                        <Typography className="icon-label">Cart</Typography>
                    </div>
                </div>
            </Toolbar>
        </AppBar>
    )
}
