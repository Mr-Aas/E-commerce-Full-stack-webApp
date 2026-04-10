// Layout.jsx
import { Outlet, Link } from "react-router-dom";
import Navbar from "../components/Navbar"
import SearchBar from "../components/SearchBar";


function Layout() {
    return (
        <div className="min-h-screen relative flex flex-col">
            <Navbar />

            <SearchBar />
            {/* <TestHome/> */}

            <div className="middlepart flex-1">
                <Outlet />
            </div>


        </div>
    );
}

export default Layout;