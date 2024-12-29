import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import BookContainer from './components/bookContainer/BookContainer';
import Home from './components/home/Home';
import BookDetails from './components/bookDetails/BookDetails';
import OrderPlaced from './components/orderPlaced/OrderPlaced';
import CartContainer from './components/cartContainer/CartContainer';

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
                    path: "/books/:id",
                    element: <BookDetails />,
                },
                {
                    path: "/order-placed",
                    element: <OrderPlaced />,
                },
                {
                    path: "/cart",
                    element: <CartContainer />,
                }
            ],
        },
    ]);

    return <RouterProvider router={AppRoutes} />;
}
