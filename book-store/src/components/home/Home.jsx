import React, { useEffect } from 'react'
import NavBar from '../navBar/NavBar'
import { Outlet } from 'react-router-dom'
import Footer from '../footer/Footer'
import { useDispatch } from 'react-redux'
import { fetchBooks } from '../../redux/slice/bookSlice'



export default function Home() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchBooks());
    }, [dispatch]);

    return (
        <>
            <NavBar />
            <div style={{ paddingBottom: "100px", paddingTop: "100px" }}>
                <Outlet />
            </div>
            <Footer />

        </>
    )
}
