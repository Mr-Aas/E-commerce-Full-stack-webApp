import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { AuthContext } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import { Menu, X, Search, ListOrdered, ShoppingCart } from "lucide-react";
import cartSvg from "/src/assets/icons/add-to-cartl.svg";
import profileSvg from "/src/assets/icons/user-icon.svg";
import logoutsvg from "../../public/LogOut.svg";
import logInsvg from "../../public/LoginSvg.svg";
import LanguageSelector from "./LanguageSelector.jsx";
import { useTranslation } from "react-i18next";



function Navbar() {
    const navigate = useNavigate()
    const { t } = useTranslation();
    const { User, logout } = useContext(AuthContext);
    const [menuOpen, setMenuOpen] = useState(false);
    const [showprofile, setShowprofile] = useState(false);
    const { items } = useSelector((state) => state.cart);

    const cartCount = items.reduce((total, item) => total + item.quantity, 0);
    const [animateCart, setAnimateCart] = useState(false);
    useEffect(() => {
        if (cartCount > 0) {
            setAnimateCart(true);

            const timer = setTimeout(() => setAnimateCart(false), 300);
            return () => clearTimeout(timer);
        }
    }, [cartCount]);


    // console.log(User?.isAdmin)
    // const isAdmin = User?.isAdmin
    //     ? "admin"
    //     : false;

    return (
        <nav className="w-full shadow-md bg-white">

            {/* 🔹 TOP BAR */}
            <div className="flex items-center justify-between px-4 py-2  ">

                {/* LOGO */}
                <div className="logo w-42 h-12 overflow-hidden">

                    <Link to="/" className=" object-cover">
                        <img src="../../public/websitelogoimage.jpg" alt="logo" />
                    </Link>
                </div>


                {/* 🔹 DESKTOP MENU */}
                <ul className="hidden lg:flex gap-6 items-center font-medium">
                    <li><Link to="/">{t("Home")}</Link></li>
                    <li><Link to="/contact">{t("Contact")}</Link></li>
                    <li><Link to="/about">{t("About")}</Link></li>
                </ul>

                {/* 🔹 RIGHT ICONS (DESKTOP) */}
                <div className="hidden lg:flex items-center gap-4">



                    {/* language selector */}
                    <LanguageSelector />
                    {/* CART */}
                    {/* CART */}
                    <Link to="/cart" className="relative group">

                        <ShoppingCart className="w-7 h-7 text-gray-800 group-hover:scale-110 transition" />

                        <span
                            className={`
            absolute -top-2 -right-2 
            min-w-[18px] h-[18px] px-1 
            flex items-center justify-center
            text-[10px] font-bold text-white 
            bg-red-500 rounded-full shadow-md
            transition-all duration-200
            ${animateCart ? "scale-125 animate-bounce" : "scale-100"}
        `}
                        >
                            {cartCount > 99 ? "99+" : cartCount}
                        </span>
                    </Link>

                    {/* PROFILE */}
                    <div className="relative">
                        <img
                            src={profileSvg}
                            className="w-7 cursor-pointer"
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowprofile(prev => !prev);
                            }}
                        />

                        {showprofile && (
                            <div className="absolute right-0 top-10 w-60 bg-white shadow-lg rounded-xl p-2 z-20">

                                <Link to="/profile" className="flex gap-2 p-2 hover:bg-green-100 rounded">
                                    <img src={profileSvg} width={20} />
                                    {t("My Profile")}
                                </Link>
                                <Link to="/my-orders" className="flex gap-2 p-2  hover:bg-green-100 rounded">
                                    <ListOrdered width={20} />
                                    {t("My Orders")}
                                </Link>
  
                                {User?.isAdmin && (
                                    <Link to="/admin" className="flex gap-2 p-2 hover:bg-green-100 rounded">
                                        {t("Admin Panel")}
                                    </Link>
                                )}

                                {User ? (
                                    <button onClick={logout} className="flex gap-2 p-2 hover:bg-green-100 rounded w-full text-left">
                                        <img src={logoutsvg} width={20} />
                                        Logout
                                    </button>
                                ) : (
                                    <Link to="/loginchoice" className="flex gap-2 p-2 hover:bg-green-100 rounded">
                                        <img src={logInsvg} width={20} />
                                        Login
                                    </Link>
                                )}

                            </div>
                        )}

                    </div>
                </div>

                {/* 🔹 HAMBURGER (MOBILE + TABLET) */}

                <div className="lg:hidden flex items-center gap-3">

                    <LanguageSelector />
                    <Link to="/cart" className="relative">

                        <ShoppingCart className="w-6 h-6 text-gray-800" />

                        <span
                            className={`
            absolute -top-2 -right-2 
            min-w-[16px] h-[16px] text-[9px]
            flex items-center justify-center
            bg-red-500 text-white rounded-full
            ${animateCart ? "scale-125 animate-bounce" : ""}
        `}
                        >
                            {cartCount}
                        </span>
                    </Link>

                    <button onClick={() => setMenuOpen(true)}>
                        <Menu size={28} />
                    </button>
                </div>
            </div>



            {/* 🔹 MOBILE MENU OVERLAY */}
            {menuOpen && (
                <div className="fixed inset-0 bg-black/40 z-50">

                    <div className="bg-white w-64 h-full p-4 shadow-lg">

                        {/* CLOSE BUTTON */}
                        <div className="flex justify-end">
                            <X size={28} onClick={() => setMenuOpen(false)} />
                        </div>

                        {/* MENU ITEMS */}
                        <div className="flex flex-col gap-4 mt-6 font-medium">

                            <Link to="/" onClick={() => setMenuOpen(false)}>{t("Home")}</Link>
                            <Link to="/my-orders" onClick={() => setMenuOpen(false)}>{t("My Orders")}</Link>
                            <Link to="/contact" onClick={() => setMenuOpen(false)}>{t("Contact")}</Link>
                            <Link to="/about" onClick={() => setMenuOpen(false)}>{t("About")}</Link>

                            <Link to="/profile" onClick={() => setMenuOpen(false)}>{t("Profile")}</Link>

                            {User?.isAdmin && (
                                <Link to="/admin" onClick={() => setMenuOpen(false)}>
                                    {t("Admin Panel")}
                                </Link>
                            )}

                            {User ? (
                                <button onClick={logout}>Logout</button>
                            ) : (
                                <Link to="/loginchoice">Login</Link>
                            )}
                        </div>
                    </div>
                </div>
            )}

        </nav>
    );
}

export default Navbar;