import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Categories from "./pages/Categories"
import Product from "./pages/Product";



export const router = createBrowserRouter ([
    {path: '/', element: <App /> },
    {path: '/login', element: <Login /> },
    {path: '/profile', element: <Profile /> },
    {path: '/category', element: <Categories /> },
    {path: '/product', element: <Product /> },

])