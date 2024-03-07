import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Login from './pages/Login/Login';
import ProductView from './pages/ProductView/ProductView';
import ErrorPage from './pages/Errorpage/Errorpage'
import reportWebVitals from './reportWebVitals';
import HomePage from './pages/Home/Home';
import CartPage from './pages/Cart/Cart';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "product",
    element: ProductView(13),
  },
  {
    path: "home",
    element: <HomePage />,
  },
  {
    path: "Cart",
    element: <CartPage />,
  },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
