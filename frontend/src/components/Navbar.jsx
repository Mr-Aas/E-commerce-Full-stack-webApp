import logoSvg from "../assets/logo.svg";
import searchSvg from "../assets/search.svg";
import cartSvg from "../assets/cart.svg";
import profileSvg from "../assets/profile.svg";

function Navbar() {
    return (
        <div>
            <nav className="flex justify-between bg-violet-600 text-white items-center w-full h-15">
                <div className="logo flex text-2xl items-center  font-bold">
                    <div className="circle rounded-full w-15 flex items-center justify-center fill-amber-500 h-15 bg-violet-900 border-b-2">
                        <img src={logoSvg} className='invert ' width="40" alt="All Mart" /></div>
                    <a href="/">
                        <span className='mx-1'> ALL MART</span></a>
                </div>

                <ul className="flex gap-4 cursor-s-resize">
                    <li><a href="/">Home</a></li>
                    <li><a href="./shop">shop</a></li>
                    <li><a href="./contact">contact</a></li>
                    <li><a href="./about">about us</a></li>
                </ul>
                <div className="rightmost flex items-center gap-2 ">
                    <div className="serch relative ">
                        <input type="text" placeholder='search items' className='border h-8 rounded-full px-2 ' /> <div className="image absolute top-0.5 right-1">
                            <img src={searchSvg} alt="Search" width="26" className='invert' />
                        </div>
                    </div>
                    <div className="cart w-7">
                        <a href="/cart">
                            <img src={cartSvg} alt="Cart" />
                        </a></div>
                    <div className="cart w-7 mx-2">
                        <a href="/cart">
                            <img src={profileSvg} alt="Profile" />
                        </a></div>


                </div>
            </nav>
        </div>
    )
}

export default Navbar
