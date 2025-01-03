import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api';


// USER API CALLS
export const RegisterApiCall = (userData) => {
    return axios.post(`${BASE_URL}/users/register`, userData)
        .then((response) => response.data)
        .catch((error) => {
            throw error.response ? error.response.data : error;
        });
};

export const LoginApiCall = (loginData) => {
    return axios.post(`${BASE_URL}/users/login`, loginData)
        .then((response) => {
            const { data } = response;
            if (data.status === "success") {
                localStorage.setItem('userEmail', data.data.email);
                localStorage.setItem('accessToken', data.access);
            }
            return data;
        })
        .catch((error) => {
            throw error.response ? error.response.data : error;
        });
};


// BOOKS API calls
export const getAllBooksApiCall = async () => {
    let response = await axios.get(`${BASE_URL}/books/`, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    console.log("book response:", response.data);
    return response.data;
};

export const getBookByID = async (BookId) => {
    try {
        let response = await axios.get(`${BASE_URL}/books/${BookId}/`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log("Get Book By ID:", response.data);
        return response;
    } catch (error) {
        console.error("Error Getting Book By ID:", error);
        throw error;
    }
};


// Cart API CALLS
// fetch cart for user
export const getCartApi = async () => {
    try {
        const token = localStorage.getItem("accessToken")
        if (token) {
            const response = await axios.get(`${BASE_URL}/carts/`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                });
            console.log(response);
            return response
        } else {
            console.error("User is not logged in");
            throw new Error("User is not logged in");
        }
    } catch (error) {
        console.error("Error Getting Cart For User:", error);
        throw error;
    }
}

// add books to the cart
export const addBooksToCartApi = async (bookData) => {
    try {
        const token = localStorage.getItem("accessToken")
        if (token) {
            const response = await axios.post(`${BASE_URL}/carts/`,
                bookData,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                });
            console.log(response);
            return response
        } else {
            console.error("User is not logged in");
            throw new Error("User is not logged in");
        }
    } catch (error) {
        console.error("Error Getting Cart For User:", error);
        throw error;
    }
}

export const removeBooksFromCartApi = async (bookId) => {
    try {
        const token = localStorage.getItem("accessToken")
        if (token) {
            const response = await axios.delete(`${BASE_URL}/carts/${bookId}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                });
            console.log(response);
            return response
        } else {
            console.error("User is not logged in");
            throw new Error("User is not logged in");
        }
    } catch (error) {
        console.error("Error removing items from Cart:", error);
        throw error;
    }
}

export const updateBooksFromCartApi = async ({ bookId, bookQuantity }) => {
    try {
        const token = localStorage.getItem("accessToken")
        if (token) {
            const response = await axios.put(`${BASE_URL}/carts/${bookId}`,
                { new_quantity: bookQuantity },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                });
            console.log(response);
            return response
        } else {
            console.error("User is not logged in");
            throw new Error("User is not logged in");
        }
    } catch (error) {
        console.error("Error removing items from Cart:", error);
        throw error;
    }
}

// Place Order API Call
export const placeOrderApi = async () => {
    try {
        const token = localStorage.getItem("accessToken")
        if (token) {
            const response = await axios.post(`${BASE_URL}/carts/orders`,
                {},
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                });
            console.log(response);
            return response
        } else {
            console.error("User is not logged in");
            throw new Error("User is not logged in");
        }
    } catch (error) {
        console.error("Error placing order For User:", error);
        throw error;
    }
}