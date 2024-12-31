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