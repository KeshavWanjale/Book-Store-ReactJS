import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import BookContainer from './components/bookContainer/BookContainer';
import Home from './components/home/Home';
import BookDetails from './components/bookDetails/BookDetails';
import OrderPlaced from './components/orderPlaced/OrderPlaced';
import CartContainer from './components/cartContainer/CartContainer';
import LoginModal from './components/loginModal/LoginModal';
import OrderList from './components/orderList/OrderList';

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
                },
                {
                    path: "/login",
                    element: <LoginModal />,
                },
                {
                    path: "/order-list",
                    element: <OrderList />,
                }
            ],
        },
    ]);

    return <RouterProvider router={AppRoutes} />;
}
