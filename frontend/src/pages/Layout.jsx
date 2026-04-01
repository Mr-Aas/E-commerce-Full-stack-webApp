// Layout.jsx
import { Outlet, Link } from "react-router-dom";
import Navbar from "../components/Navbar"


function Layout() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            {/* <TestHome/> */}

            <div className="middlepart flex-1">
                <Outlet />
            </div>

            
        </div>
    );
}

export default Layout;