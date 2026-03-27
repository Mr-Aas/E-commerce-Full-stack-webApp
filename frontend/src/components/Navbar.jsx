import logoSvg from "../../public/websitelogo.svg";
import searchSvg from "/src/icons/user-icon.svg";
import cartSvg from "/src/icons/add-to-cartl.svg";
import profileSvg from "/src/icons/user-icon.svg";



function Navbar() {
    return (


        <div>
            <nav className="flex justify-between items-center w-full gap-4 flex-col ">
                <div className="head bg-teal-50 flex w-full justify-around">
                    <div className="logo  mx-9 w-60 h-13  overflow-hidden rounded-lg font-bold">
                        <img src="../../public/websitelogo (1).jpg" alt="" />

                    </div>

                    <ul className="flex gap-4 cursor-pointer items-center">
                        <li><a href="/">Home</a></li>
                        <li><a href="./shop">shop</a></li>
                        <li><a href="./contact">contact</a></li>
                        <li><a href="./about">about us</a></li>
                    </ul></div>
                <span className="rightmost flex items-center gap-4 ">
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


                </span>
            </nav>
        </div>
    )
}

export default Navbar
