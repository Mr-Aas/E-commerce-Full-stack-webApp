import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import searchIcon from "../assets/icons/search-svgrepo-com.svg";
import cartSvg from "/src/assets/icons/add-to-cartl.svg";
import profileSvg from "/src/assets/icons/user-icon.svg";
import logoutsvg from "../../public/LogOut.svg"
import logInsvg from "../../public/LoginSvg.svg"


// import HomePage from "../pages/HomePage";
// import { handleMouseEnter, handleMouseLeave } from "../utils/OnHoverTextShow";



function Navbar() {
    const { User, logout, login } = useContext(AuthContext)
    // console.log(User)
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
                    <div className="cart w-7 ">
                        <Link to="./cart">
                            <img src={cartSvg} alt="Cart" />
                        </Link>

                    </div>
                    <div className="profile w-7 mx-2">
                        <div className="relative  group ">
                            <img src={profileSvg} alt="Profile" />
                            <div className="ContextMenu absolute right-0 z-10 h-[50vh] w-[250px] bg-slate-100 rounded-2xl absolute hidden  group-hover:block">
                                <Link to="./profile" className="myProfile   bg-slate-200 rounded-2xl my-1 w-full w-[40px] flex gap-2 p-3 font-semibold ">
                                    <img src={profileSvg} alt="Profile" width={30} />
                                    My Profile
                                </Link>
                                <div className="logstatus">
                                    {User ? <Link onClick={logout} className="logIn bg-slate-200 rounded-2xl my-1 w-full w-[40px] flex gap-2 p-3 font-semibold ">
                                        <img src={logoutsvg} alt="Profile" width={30} />LogOut</Link> : <Link to="/login" className="logOut bg-slate-200 rounded-2xl my-1 w-full w-[40px] flex gap-2 p-3 font-semibold ">
                                        <img src={logInsvg} alt="Profile" width={30} />LogIn</Link>}
                                </div>
                            </div>


                        </div></div>


                </div>
            </nav>
        </div>
    )
}

export default Navbar
