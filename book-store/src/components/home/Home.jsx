import React from 'react'
import NavBar from '../navBar/NavBar'
import { Outlet } from 'react-router-dom'
import Footer from '../footer/Footer'


export default function Home() {
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
