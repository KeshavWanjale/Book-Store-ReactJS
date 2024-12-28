import { Box, Typography, Button, TableContainer, Table, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import orderSuccessful from "../../assets/images/orderSuccessfull.png"
import { useNavigate } from "react-router-dom";

export default function OrderPlaced() {
    const navigate = useNavigate();

    const goHome = () => {
        navigate("/books");
    };

    return (
        <div className="main-container">

            <Box sx={{ textAlign: 'center', mt: 3 }}>
                <img src={orderSuccessful} alt="Order Successful" style={{ maxWidth: '100%', marginBottom: '2%' }} />

                <Typography variant="h6" sx={{ width: '60%', mx: 'auto', color: '#333232', mb: 4 }}>
                    <strong>
                        hurray!!! your order is confirmed. The order ID is #72146. Save the order ID for further communication.
                    </strong>
                </Typography>

                <TableContainer component={Paper} sx={{ width: '60%', mx: 'auto', mb: 4 }}>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell align="center" sx={{ backgroundColor: '#FAFAFA', fontWeight: 'bold' }}>Email us</TableCell>
                                <TableCell align="center" sx={{ backgroundColor: '#FAFAFA', fontWeight: 'bold' }}>Contact us</TableCell>
                                <TableCell align="center" sx={{ backgroundColor: '#FAFAFA', fontWeight: 'bold' }}>Address</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="center">contact@johndoe.com</TableCell>
                                <TableCell align="center">+91- 1023456987</TableCell>
                                <TableCell align="center">karvenagar, pune</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

                <Button variant="contained" color="primary" onClick={goHome}>
                    CONTINUE SHOPPING
                </Button>
            </Box>
        </div>
    );
}