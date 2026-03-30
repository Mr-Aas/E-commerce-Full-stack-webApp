import { Link } from "react-router-dom";
import searchSvg from "/src/icons/user-icon.svg";
import cartSvg from "/src/icons/add-to-cartl.svg";
import profileSvg from "/src/icons/user-icon.svg";



function Navbar() {
    return (


        <div>
            <nav className="flex justify-between items-center w-full gap-4 flex-col">

                <div className="head flex w-full justify-around">

                    <div className="logo mx-9 w-60 h-16 overflow-hidden rounded-lg font-bold">
                        <img src="/websitelogo.jpg" alt="logo" />
                    </div>

                    <ul className="flex gap-4 cursor-pointer items-center ">
                        <li><Link to="/">Home</Link></li>

                        <li><Link to="./contact">contact</Link></li>
                        <li><Link to="./about">about us</Link></li>
                    </ul></div>
                <div className="rightmost flex items-center gap-3 py-2 ">
                    <div className="serch relative ">
                        <input type="text" placeholder='search items' className='border h-8 rounded-lg w-[70vw] px-2  ' /> <div className="image absolute top-0.5 right-1">
                            <img src={searchSvg} alt="Search" width="26" className='invert' />
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
