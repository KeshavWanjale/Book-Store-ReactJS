import React from 'react'
import NavBar from '../navBar/NavBar'
import { Outlet } from 'react-router-dom'


export default function Home() {
    return (
        <>
            <NavBar />
            <Outlet />
        </>
    )
}
