// Layout.jsx
import { Outlet, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function Layout() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <div className="middlepart flex-1">
                <Outlet />
            </div>

            <Footer />
        </div>
    );
}

export default Layout;