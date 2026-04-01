import { Link } from "react-router-dom";
import searchIcon from "../assets/icons/search-svgrepo-com.svg";
import cartSvg from "/src/assets/icons/add-to-cartl.svg";
import profileSvg from "/src/assets/icons/user-icon.svg";
import HomePage from "../pages/HomePage";



function Navbar() {
    return (


        <div>
            <nav className="flex justify-between items-center w-full gap-4 flex-col">

                <div className="head flex w-full justify-around">

                    <div className="logo mx-9 w-60 h-16 overflow-hidden rounded-lg font-bold">
                        <Link to="./">
                        <img src="/websitelogo.jpg" alt="logo" />
                        </Link>
                    </div>

                    <ul className="flex gap-4 cursor-pointer items-center ">
                        <li><Link to="/">Home</Link></li>

                        <li><Link to="./contact">contact</Link></li>
                        <li><Link to="./about">about us</Link></li>
                    </ul></div>
                <div className="rightmost flex items-center gap-3 py-2 ">
                    <div className="serch relative ">
                        <input type="text" placeholder='search items' className='border h-8 rounded-lg w-[70vw] px-2  ' /> <div className="image absolute top-1.5 right-4">
                            <img src={searchIcon} alt="Search" width="20" className='' />
                        </div>
                    </div>
                    <div className="cart w-7">
                        <a href="/cart">
                            <img src={cartSvg} alt="Cart" />
                        </a></div>
                    <div className="profile w-7 mx-2">
                        <a href="/cart">
                            <img src={profileSvg} alt="Profile" />
                        </a></div>


                </div>
            </nav>
        </div>
    )
}

export default Navbar
