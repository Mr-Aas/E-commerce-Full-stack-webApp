import api from "../api/axios.js";
import { createBrowserRouter } from "react-router-dom";
import AdminRoute from "./AdminRoute.jsx";
import PrivateRoute from "./PrivateRoutes.jsx";
import Layout from "../pages/Layout.jsx"
import ItemsPage from "../pages/ItemsPage.jsx";
import Contact from "../pages/Contact.jsx"
import About from "../pages/About.jsx";
import HomePage from "../pages/HomePage.jsx";
import Checkout from "../pages/Checkout.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import SignupPage from "../pages/SignUp.jsx";
import MyProfile from "../pages/UserProfilePage.jsx";
import profileLoader from "./profileloader.jsx";
import AdminDashboard from "../pages/AdminDashboard.jsx";
import AddProduct from "../pages/AddProduct.jsx";
import AddCategory from "../pages/AddCategory.jsx";
import categoriesData from "./categoryloaderforprod.jsx";
import Dashboardloader from "./dashboardloader.jsx";
import AddSubCategory from "../pages/AddSubCategory.jsx";
import Cart from "../pages/Cart.jsx";
import SelectAddress from "../pages/SelectAddress.jsx";
import AddAddress from "../pages/AddAddress.jsx";
import Payment from "../pages/Payment.jsx";
import Success from "../pages/Success.jsx";
import EditAddress from "../pages/EditAddress.jsx";
import EditProduct from "../pages/EditProduct.jsx";





const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [{
            index: true,
            element: <HomePage />,
            loader: async () => {
                const res = await api.get("/categories")
                return res.data;
            }

        },
        {
            path: "contact",
            element: <Contact />,
        },
        {
            path: "about",
            element: <About />,
        },
        {
            path: "admin",
            element: (
                <AdminRoute>
                    <AdminDashboard />
                </AdminRoute>
            ),
            loader: Dashboardloader,

        },
        {
            path: "addproducts",
            element: (
                <AdminRoute>
                    <AddProduct />
                </AdminRoute>
            ),
            loader: categoriesData
        },
        {
            path: "addcategory",
            element: (
                <AdminRoute>
                    <AddCategory />
                </AdminRoute>
            )
        },
        {
            path: "addsubcategory",
            element: (
                <AdminRoute>
                    <AddSubCategory />
                </AdminRoute>
            ),
            loader: categoriesData
        },
        {
            path: "items/:category",
            element: <ItemsPage />,
            loader: async ({ params }) => {
                const product = await api.get(`/products/items/${params.category}`)
                const products = product.data
                const category = await api.get("/categories")
                const categories = category.data
                return { products, categories };

            }
        },
        {
            path: "checkout",
            element: (
                <PrivateRoute>
                    <Checkout />
                </PrivateRoute>
            )
        },
        {
            path: "login",
            element: <LoginPage />
        },
        {
            path: "signup",
            element: <SignupPage />
        },
        {
            path: "profile",
            element: (
                <PrivateRoute>
                    <MyProfile />
                </PrivateRoute>
            ),
            loader: profileLoader


        },
        {
            path: "/checkout/address",
            element: <SelectAddress />,
        },
            ,
        {
            path: "/checkout/address/new",
            element: <AddAddress />,
        },
        {
            path: "/checkout/payment",
            element: <Payment />,
        },
        {
            path: "/success",
            element: <Success />,
        },
        {
            path: "/cart",
            element: <Cart />,
        },
        {
            path: "/checkout/address/edit/:id",
            element: <EditAddress />,
        },
        {
            path: "/editproduct/:id",
            element: <EditProduct />,
             loader: categoriesData
        }


        ]
    }])


export default router