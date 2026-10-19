import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AuthContext } from "../context/AuthContext";
import { LanguageContext } from "../context/languageContext";
import { Menu, X, ListOrdered, ShoppingBag, Plus, Minus, Trash2 } from "lucide-react";
import profileSvg from "/src/assets/icons/user-icon.svg";
import logoutsvg from "../../public/LogOut.svg";
import logInsvg from "../../public/LoginSvg.svg";
import LanguageSelector from "./LanguageSelector.jsx";
import { useTranslation } from "react-i18next";
import { removeFromCart, increaseQty, decreaseQty } from "../features/Cart/CartSlice.js";
import { ShieldQuestionMark } from 'lucide-react';

function Navbar() {
  const [isVisible, setisVisible] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { User, logout } = useContext(AuthContext);
  const { lang } = useContext(LanguageContext);

  const [menuOpen, setMenuOpen] = useState(false);
  const [showprofile, setShowprofile] = useState(false);
  const [basketOpen, setBasketOpen] = useState(false);

  const { items, totalPrice } = useSelector((state) => state.cart);
  const cartCount = items.reduce((total, item) => total + item.quantity, 0);

  const [animateCart, setAnimateCart] = useState(false);
  useEffect(() => {
    if (cartCount > 0) {
      setAnimateCart(true);
      const timer = setTimeout(() => setAnimateCart(false), 300);
      return () => clearTimeout(timer);
    }
  }, [cartCount]);

  return (
    <nav className="w-full shadow-md bg-white relative z-40">
      {/* 🔹 TOP BAR */}
      <div className="flex items-center justify-between px-4 py-2">
        {/* LOGO */}
        <div className="logo w-56 h-12 overflow-hidden">
          <Link to="/" className="block w-full h-full">
            <img
              src="https://res.cloudinary.com/dcfpnfdgy/image/upload/v1780423041/websitelogo_6_onbt3x.jpg"
              alt="logo"
              className="w-full h-full object-cover
              [mask-image:linear-gradient(to_right,transparent_0px,black_4px,black_calc(100%-4px),transparent_100%),linear-gradient(to_bottom,transparent_0px,black_4px,black_calc(100%-4px),transparent_100%)]
              [mask-composite:intersect]
              [-webkit-mask-image:linear-gradient(to_right,transparent_0px,black_4px,black_calc(100%-4px),transparent_100%),linear-gradient(to_bottom,transparent_0px,black_4px,black_calc(100%-4px),transparent_100%)]
              [-webkit-mask-composite:source-in]"
            />
          </Link>
        </div>

        {/* 🔹 DESKTOP MENU */}
        <ul className="hidden lg:flex gap-6 items-center font-medium text-gray-700">
          <li>
            <Link to="/" className="hover:text-teal-600 transition">
              {t("Home")}
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-teal-600 transition">
              {t("Connect With Us")}
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-teal-600 transition">
              {t("About")}
            </Link>
          </li>
          <li onMouseEnter={() => { setisVisible(true) }} onMouseLeave={() => setisVisible(false)}
            className=""> <ShieldQuestionMark width={24} />
        {isVisible && <div className="tooltip-box flex flex-col gap-2 absolute">
                    <div>
                      to explore the admin dashboard contact to <b>
                     mraas0003@gmail.com
                        </b>
                       </div>
                        <div><p className="text-xl font-bold">where admin can</p>
                        <ul className="list-disc">
                          <li>add item and click photo of the product within browser </li>
                          <li>
                            update and delete items</li>
                            <li>
                              manage users  and get insights </li>
                              <li>
                                orders and sales section </li></ul></div>
                      </div>}
            </li>
        </ul>

        {/* 🔹 RIGHT ICONS (DESKTOP) */}
        <div className="hidden lg:flex items-center gap-4">
          <LanguageSelector />

          {/* BASKET BUTTON */}
          <button
            onClick={() => setBasketOpen(true)}
            className="relative flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-teal-500/30 text-teal-800 bg-teal-50/60 hover:bg-teal-100/80 transition-all font-medium text-sm shadow-sm cursor-pointer"
            aria-label={`Open basket with ${cartCount} items`}
          >
            <ShoppingBag className="w-5 h-5 text-teal-600" />
            <span className="font-semibold">{t("Basket")}</span>
            <span
              className={`min-w-[20px] h-[20px] px-1 flex items-center justify-center text-xs font-bold text-white bg-teal-600 rounded-full transition-transform duration-200 ${animateCart ? "scale-125 animate-bounce" : "scale-100"
                }`}
            >
              {cartCount > 99 ? "99+" : cartCount}
            </span>
          </button>

          {/* PROFILE */}
          <div className="relative">
            <img
              src={profileSvg}
              alt="Profile"
              className="w-7 h-7 cursor-pointer hover:opacity-80 transition"
              onClick={(e) => {
                e.stopPropagation();
                setShowprofile((prev) => !prev);
              }}
            />

            {showprofile && (
              <div className="absolute right-0 top-10 w-60 bg-white shadow-xl rounded-xl p-2 z-50 border border-gray-100">
                <Link
                  to="/profile"
                  onClick={() => setShowprofile(false)}
                  className="flex items-center gap-2 p-2 hover:bg-teal-50 rounded-lg text-gray-700"
                >
                  <img src={profileSvg} width={20} alt="Profile icon" />
                  {t("My Profile")}
                </Link>
                <Link
                  to="/my-orders"
                  onClick={() => setShowprofile(false)}
                  className="flex items-center gap-2 p-2 hover:bg-teal-50 rounded-lg text-gray-700"
                >
                  <ListOrdered width={20} />
                  {t("My Orders")}
                </Link>

                {User?.isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setShowprofile(false)}
                    className="flex items-center gap-2 p-2 hover:bg-teal-50 rounded-lg text-gray-700 font-semibold"
                  >
                    {t("Admin Panel")}
                  </Link>
                )}

                {User ? (
                  <button
                    onClick={() => {
                      setShowprofile(false);
                      logout();
                    }}
                    className="flex items-center gap-2 p-2 hover:bg-red-50 text-red-600 rounded-lg w-full text-left font-medium"
                  >
                    <img src={logoutsvg} width={20} alt="Logout icon" />
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/loginchoice"
                    onClick={() => setShowprofile(false)}
                    className="flex items-center gap-2 p-2 hover:bg-teal-50 rounded-lg text-teal-700 font-semibold"
                  >
                    <img src={logInsvg} width={20} alt="Login icon" />
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

          {/* MOBILE BASKET BUTTON */}
          <button
            onClick={() => setBasketOpen(true)}
            className="relative p-1.5 rounded-full text-teal-700 hover:bg-teal-50"
            aria-label={`Open basket with ${cartCount} items`}
          >
            <ShoppingBag className="w-6 h-6 text-teal-600" />
            <span
              className={`absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 flex items-center justify-center text-[10px] font-bold text-white bg-teal-600 rounded-full transition-transform ${animateCart ? "scale-125 animate-bounce" : ""
                }`}
            >
              {cartCount}
            </span>
          </button>

          <button onClick={() => setMenuOpen(true)} aria-label="Open navigation menu">
            <Menu size={28} className="text-gray-800" />
          </button>
        </div>
      </div>

      {/* 🔹 MOBILE MENU OVERLAY */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black/40 z-50">
          <div className="bg-white w-64 h-full p-5 shadow-xl flex flex-col justify-between">
            <div>
              {/* CLOSE BUTTON */}
              <div className="flex justify-end">
                <X size={28} onClick={() => setMenuOpen(false)} className="cursor-pointer text-gray-600" />
              </div>

              {/* MENU ITEMS */}
              <div className="flex flex-col gap-4 mt-6 font-medium text-gray-800">
                <Link to="/" onClick={() => setMenuOpen(false)}>
                  {t("Home")}
                </Link>
                <Link to="/my-orders" onClick={() => setMenuOpen(false)}>
                  {t("My Orders")}
                </Link>
                <Link to="/contact" onClick={() => setMenuOpen(false)}>
                  {t("Contact")}
                </Link>
                <Link to="/about" onClick={() => setMenuOpen(false)}>
                  {t("About")}
                </Link>
                <Link to="/profile" onClick={() => setMenuOpen(false)}>
                  {t("Profile")}
                </Link>
             
                  <div className=" flex gap-2" onMouseEnter={() => setisVisible(true)}
                    onMouseLeave={() => setisVisible(false)}> <ShieldQuestionMark width={24} />(secret door) 
                    </div>  

                  {isVisible && <div className="tooltip-box flex flex-col gap-2">
                    <div>
                      to explore the admin dashboard contact to <b>
                     mraas0003@gmail.com
                        </b>
                       </div>
                        <div><p className="text-xl font-bold">where admin can</p>
                        <ul className="list-disc">
                          <li>add item and click photo of the product within browser </li>
                          <li>
                            update and delete items</li>
                            <li>
                              manage users  and get insights </li>
                              <li>
                                orders and sales section </li></ul></div>
                      </div>}
                

                {User?.isAdmin && (
                  <Link to="/admin" onClick={() => setMenuOpen(false)} className="text-teal-600 font-bold">
                    {t("Admin Panel")}
                  </Link>
                )}

                {User ? (
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      logout();
                    }}
                    className="text-left text-red-600 font-medium pt-2"
                  >
                    Logout
                  </button>
                ) : (
                  <Link to="/loginchoice" onClick={() => setMenuOpen(false)} className="text-teal-600 font-semibold">
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 🔹 INSTANT BASKET VIEW SLIDE-OVER DRAWER */}
      {basketOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={() => setBasketOpen(false)}
        >
          <aside
            role="dialog"
            aria-modal="true"
            aria-label="Your basket"
            className="flex h-full w-full max-w-md flex-col bg-white p-6 shadow-2xl transition-transform"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-gray-200 pb-4">
              <h2 className="font-bold text-xl flex items-center gap-2 text-gray-900">
                <ShoppingBag className="h-5 w-5 text-teal-600" />
                {t("Your Cart")} ({cartCount})
              </h2>
              <button
                aria-label="Close basket"
                onClick={() => setBasketOpen(false)}
                className="p-1 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {items.length ? (
              <>
                <div className="flex-1 overflow-y-auto py-4 space-y-4">
                  {items.map((item) => {
                    const itemName =
                      typeof item.name === "object"
                        ? item.name[lang] || item.name.en || item.name.hi || Object.values(item.name)[0] || ""
                        : item.name || "";
                    return (
                      <div
                        key={item.productId}
                        className="flex items-center gap-3 rounded-xl border border-gray-200 p-3 bg-gray-50/50"
                      >
                        <img
                          src={item.image || "/fallback.jpg"}
                          alt={itemName}
                          className="h-14 w-14 rounded-lg object-cover border border-gray-200"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-gray-900">{itemName}</p>
                          <p className="text-xs font-bold text-teal-600 mt-0.5">
                            ₹{item.price}{" "}
                            <span className="text-gray-500 font-normal">
                              / {item.unitType || "unit"}
                            </span>
                          </p>
                        </div>

                        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
                          <button
                            onClick={() => dispatch(decreaseQty(item.productId))}
                            className="p-1.5 hover:bg-gray-100 text-gray-600"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="px-2.5 text-xs font-bold text-gray-800">{item.quantity}</span>
                          <button
                            onClick={() => dispatch(increaseQty(item.productId))}
                            className="p-1.5 hover:bg-gray-100 text-gray-600"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        <button
                          className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition"
                          aria-label={`Remove ${itemName}`}
                          onClick={() => dispatch(removeFromCart(item.productId))}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>

                <div className="border-t border-gray-200 pt-4 space-y-3">
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Subtotal</span>
                    <span>₹{(totalPrice || 0).toLocaleString("en-IN")}</span>
                  </div>
                  <button
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-xl transition shadow-md cursor-pointer"
                    onClick={() => {
                      setBasketOpen(false);
                      navigate("/cart");
                    }}
                  >
                    View Full Cart & Checkout
                  </button>
                </div>
              </>
            ) : (
              <div className="py-16 text-center text-gray-500 flex flex-col items-center justify-center flex-1">
                <ShoppingBag className="h-12 w-12 stroke-1 text-gray-400 mb-3" />
                <p className="font-semibold text-gray-800">Your basket is empty</p>
                <p className="text-xs text-gray-500 mt-1">Add items from the store to see them here.</p>
              </div>
            )}
          </aside>
        </div>
      )}
    </nav>
  );
}

export default Navbar;