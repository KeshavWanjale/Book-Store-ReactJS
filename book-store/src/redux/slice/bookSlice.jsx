import { createSlice } from "@reduxjs/toolkit";


const initialState = [
    {
        "id": 1,
        "name": "The Silent Watcher",
        "author": "Eleanor Cross",
        "description": "A thrilling mystery novel.",
        "user": 1,
        "price": 250,
        "stock": 120
    },
    {
        "id": 2,
        "name": "Path to Resilience",
        "author": "James Hill",
        "description": "An inspiring self-help guide.",
        "user": 2,
        "price": 300,
        "stock": 80
    },
    {
        "id": 3,
        "name": "Echoes of Antiquity",
        "author": "Dr. Martin Lopez",
        "description": "A deep dive into ancient history.",
        "user": 1,
        "price": 400,
        "stock": 150
    },
    {
        "id": 4,
        "name": "Seasons of the Heart",
        "author": "Amelia Grace",
        "description": "A heartwarming romance story.",
        "user": 2,
        "price": 350,
        "stock": 200
    },
    {
        "id": 5,
        "name": "Whispers of the Soul",
        "author": "Riya Patel",
        "description": "A collection of thought-provoking poems.",
        "user": 3,
        "price": 200,
        "stock": 300
    },
    {
        "id": 6,
        "name": "Code Simplified",
        "author": "Alan Parker",
        "description": "A beginner's guide to coding.",
        "user": 4,
        "price": 500,
        "stock": 90
    },
    {
        "id": 7,
        "name": "Galactic Chronicles",
        "author": "Felix Morgan",
        "description": "An action-packed science fiction saga.",
        "user": 2,
        "price": 600,
        "stock": 75
    },
    {
        "id": 8,
        "name": "The Healthy Plate",
        "author": "Sophia Bennett",
        "description": "A cookbook for healthy living.",
        "user": 3,
        "price": 150,
        "stock": 250
    },
    {
        "id": 9,
        "name": "The Art of Persuasion",
        "author": "William Carter",
        "description": "An insightful guide to mastering communication skills.",
        "user": 1,
        "price": 320,
        "stock": 180
    },
    {
        "id": 10,
        "name": "Through the Enchanted Forest",
        "author": "Lila Thomas",
        "description": "A magical adventure in a fantastical world.",
        "user": 4,
        "price": 270,
        "stock": 110
    },
    {
        "id": 11,
        "name": "Financial Freedom 101",
        "author": "Robert Kingsley",
        "description": "An essential guide to personal finance and wealth building.",
        "user": 3,
        "price": 450,
        "stock": 130
    },
    {
        "id": 12,
        "name": "Mastering Photography",
        "author": "Lydia Bloom",
        "description": "A comprehensive guide to capturing stunning photos.",
        "user": 2,
        "price": 380,
        "stock": 90
    },
    {
        "id": 13,
        "name": "Beneath the Crimson Sky",
        "author": "Oliver Dean",
        "description": "A historical fiction novel set during World War II.",
        "user": 1,
        "price": 520,
        "stock": 95
    },
    {
        "id": 14,
        "name": "The Mindful Path",
        "author": "Emily Rivers",
        "description": "A guide to mindfulness and meditation practices.",
        "user": 4,
        "price": 250,
        "stock": 140
    },
    {
        "id": 15,
        "name": "The Science of Everything",
        "author": "Dr. Ava Robinson",
        "description": "An exploration of groundbreaking scientific discoveries.",
        "user": 2,
        "price": 600,
        "stock": 100
    },
    {
        "id": 16,
        "name": "Winds of Change",
        "author": "Hannah Edwards",
        "description": "A captivating story of resilience and hope.",
        "user": 3,
        "price": 300,
        "stock": 200
    }
]


const bookSlice = createSlice({
    name: "books",
    initialState,
    reducers: {

    }
})
export default bookSlice.reducer