import React, { useState } from 'react'
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    InputBase,
    Badge,
    Menu,
    MenuItem,
    Tooltip,
    Modal
} from "@mui/material";
import {
    Search as SearchIcon,
    AccountCircle,
    ShoppingCart,
    Assignment as OrdersIcon,
    Favorite as WishlistIcon,
} from "@mui/icons-material";
import "./NavBar.css";
import bookImage from '../../assets/education/education.png'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import LoginModal from '../loginModal/LoginModal';
import { emptyCart } from '../../redux/slice/cartSlice';
import Button from '@mui/material/Button';


export default function NavBar() {
    const numberOfCartItems = useSelector((state) => state.cart.items.length);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = localStorage.getItem("accessToken")

    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLoginModalOpen = () => {
        setIsModalOpen(true);
        handleMenuClose();
    };
    const handleLoginModalClose = () => {
        setIsModalOpen(false);
    };

    const handleOnLogout = () => {
        localStorage.clear();
        dispatch(emptyCart())
        setAnchorEl(null)
    }

    const handleMyOrders = () => {
        navigate("/order-list")
    }

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
                        <IconButton
                            color="inherit"
                            onClick={handleProfileMenuOpen}
                        >
                            <AccountCircle />
                        </IconButton>
                        <Typography className="icon-label">Profile</Typography>
                        <Menu
                            anchorEl={anchorEl}
                            open={isMenuOpen}
                            onClose={handleMenuClose}
                            MenuListProps={{
                                "aria-labelledby": "profile-button",
                            }}
                        >
                            {user ? (
                                [
                                    <MenuItem key="hello-user">Hello User</MenuItem>,
                                    <MenuItem key="profile">
                                        <AccountCircle />
                                        Profile
                                    </MenuItem>,
                                    <MenuItem onClick={handleMyOrders}>
                                        <OrdersIcon style={{ marginRight: 8 }} />
                                        My Orders
                                    </MenuItem>,
                                    <MenuItem>
                                        <WishlistIcon style={{ marginRight: 8 }} />
                                        My Wishlist
                                    </MenuItem>,
                                    <MenuItem key="logout" onClick={handleOnLogout}>
                                        <Button variant="outlined">Logout</Button>
                                    </MenuItem>,

                                ]
                            ) : (
                                [
                                    <MenuItem key="login-signup" onClick={handleLoginModalOpen}>
                                        Login/Signup
                                    </MenuItem>,
                                    <Tooltip title="My Orders" arrow key="my-orders">
                                        <MenuItem>
                                            <OrdersIcon style={{ marginRight: 8 }} />
                                            My Orders
                                        </MenuItem>
                                    </Tooltip>,
                                    <Tooltip title="My Wishlist" arrow key="my-wishlist">
                                        <MenuItem>
                                            <WishlistIcon style={{ marginRight: 8 }} />
                                            My Wishlist
                                        </MenuItem>
                                    </Tooltip>,
                                ]
                            )}
                        </Menu>
                    </div>


                    <div className="icon-container" onClick={() => navigate("/cart")}>
                        <Badge badgeContent={numberOfCartItems} color="error">
                            <ShoppingCart className="icon cart-icon" />
                        </Badge>
                        <Typography className="icon-label">Cart</Typography>
                    </div>
                </div>
            </Toolbar>
            <Modal
                open={isModalOpen}
                onClose={handleLoginModalClose}
                aria-labelledby="login-modal-title"
                aria-describedby="login-modal-description"
            >
                <LoginModal onSuccess={handleLoginModalClose} />
            </Modal>
        </AppBar>
    )
}
