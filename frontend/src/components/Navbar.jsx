import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import { Menu, X, Search } from "lucide-react";
import cartSvg from "/src/assets/icons/add-to-cartl.svg";
import profileSvg from "/src/assets/icons/user-icon.svg";
import logoutsvg from "../../public/LogOut.svg";
import logInsvg from "../../public/LoginSvg.svg";
import LanguageSelector from "./LanguageSelector.jsx";
import { useTranslation } from "react-i18next";


function Navbar() {
    const { t } = useTranslation();
    const { User, logout } = useContext(AuthContext);
    const [menuOpen, setMenuOpen] = useState(false);
    const [showprofile, setShowprofile] = useState(false);


    const isAdmin = User?.token
        ? jwtDecode(User.token).role === "admin"
        : false;


    return (
        <nav className="w-full shadow-md bg-white">

            {/* 🔹 TOP BAR */}
            <div className="flex items-center justify-between px-4 py-2  ">

                {/* LOGO */}
                <div className="logo w-42 h-12 overflow-hidden">

                    <Link to="/" className=" object-contain">
                        <img src="/websitelogo.jpg" alt="logo" />
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
                    <Link to="/cart">
                        <img src={cartSvg} className="w-6" />
                    </Link>

                    {/* PROFILE */}
                    <div className="relative">
                        <img
                            src={profileSvg}
                            className="w-7 cursor-pointer"
                            onClick={() => setShowprofile(!showprofile)}
                        />

                        {showprofile && (
                            <div className="absolute right-0 top-10 w-60 bg-white shadow-lg rounded-xl p-2 z-20">

                                <Link to="/profile" className="flex gap-2 p-2 hover:bg-gray-100 rounded">
                                    <img src={profileSvg} width={20} />
                                    {t("My Profile")}
                                </Link>

                                {isAdmin && (
                                    <Link to="/admin" className="flex gap-2 p-2 hover:bg-gray-100 rounded">
                                        {t("Admin Panel")}
                                    </Link>
                                )}

                                {User ? (
                                    <button onClick={logout} className="flex gap-2 p-2 hover:bg-gray-100 rounded w-full text-left">
                                        <img src={logoutsvg} width={20} />
                                        Logout
                                    </button>
                                ) : (
                                    <Link to="/login" className="flex gap-2 p-2 hover:bg-gray-100 rounded">
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
                    <Link to="/cart">
                        <img src={cartSvg} className="w-6" />
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
                            <Link to="/contact" onClick={() => setMenuOpen(false)}>{t("Contact")}</Link>
                            <Link to="/about" onClick={() => setMenuOpen(false)}>{t("About")}</Link>

                            <Link to="/profile" onClick={() => setMenuOpen(false)}>{t("Profile")}</Link>

                            {isAdmin && (
                                <Link to="/admin" onClick={() => setMenuOpen(false)}>
                                    {t("Admin Panel")}
                                </Link>
                            )}

                            {User ? (
                                <button onClick={logout}>Logout</button>
                            ) : (
                                <Link to="/login">Login</Link>
                            )}
                        </div>
                    </div>
                </div>
            )}

        </nav>
    );
}

export default Navbar;