// Layout.jsx
import { Outlet, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import TestHome from "./components/testHome";

function Layout() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <TestHome/>

            <div className="middlepart flex-1">
                <Outlet />
            </div>

            <Footer />
        </div>
    );
}

export default Layout;