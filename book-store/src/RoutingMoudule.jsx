import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import BookContainer from './components/bookContainer/BookContainer';
import Home from './components/home/Home';
import BookDetails from './components/bookDetails/BookDetails';

export default function RoutingMoudule() {
    const AppRoutes = createBrowserRouter([
        {
            path: "/",
            element: <Home />,
            children: [
                {
                    path: "/books",
                    element: <BookContainer />,
                },
                {
                    path: "/details",
                    element: <BookDetails />,
                }
            ],
        },
    ]);

    return <RouterProvider router={AppRoutes} />;
}
