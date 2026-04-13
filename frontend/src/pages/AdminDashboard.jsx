import { useState, useContext, useEffect } from "react";
import { Home, Package, Users, Settings, LogOut, ChevronRight, ChevronLeft, ShoppingBag, BarChart } from "lucide-react";
import { useNavigate, useLoaderData } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import ProductRow from "../components/ProductRow";
import { deleteProduct } from "../api/productApi";
import { getOrders, deliverOrder, cancelOrder, getSales } from "../features/orders/orderApi.js";
import { LanguageContext } from "../context/languageContext.jsx"




export default function AdminDashboard() {

    const { logout } = useContext(AuthContext);
    const [active, setActive] = useState("dashboard");
    const [isOpen, setIsOpen] = useState(false);

    const [Orders,products,users,category] = useLoaderData()
    console.log(Orders,products,users,category)
    const { lang } = useContext(LanguageContext)

    // NEW STATE
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const data = await getOrders();
            setOrders(data);
        };
        const fetchSales = async () => {
            try {
                const data = await getSales();
                console.log("Sales Data:", data); // DEBUG
                setSalesData(data);
            } catch (err) {
                console.error("Sales fetch error:", err);
            }
        };

        fetchOrders();
        fetchSales();
    }, []);


    console.log(orders)
    const [salesData, setSalesData] = useState([]);

    const menu = [
        { name: "Dashboard", icon: Home, key: "dashboard" },
        { name: "Products", icon: Package, key: "products" },
        { name: "Orders", icon: ShoppingBag, key: "orders" },
        { name: "Sales", icon: BarChart, key: "sales" },
        { name: "Users", icon: Users, key: "users" },
        { name: "Settings", icon: Settings, key: "settings" },
    ];






    function DashboardHome() {
        return (
            <div>
                <h2 className="text-3xl font-semibold mb-6">Dashboard Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card title="Total Sales" value={salesData} />
                    <Card title="Total Orders" value={orders} />
                    <Card title="Users" value={users} />
                </div>
            </div>
        );
    }

    function Products() {
        const navigate = useNavigate();
        const [productList, setProductList] = useState(products);

        const handleDelete = async (id) => {
            const confirmDelete = window.confirm("Are you sure you want to delete this product?");
            if (!confirmDelete) return;

            try {
                await deleteProduct(id);
                setProductList((prev) => prev.filter((p) => p._id !== id));
                alert("Product deleted");
            } catch (err) {
                console.error(err);
                alert("Delete failed");
            }
        };

        return (
            <div>
                <h2 className="text-2xl font-semibold mb-4">Manage Products</h2>
                <div className="flex gap-2">
                    <button onClick={() => navigate("/addproducts")} className="mb-4 px-4 py-2 bg-black text-white rounded-xl">+ Add Product</button>
                    <button onClick={() => navigate("/addsubcategory")} className="mb-4 px-4 py-2 bg-black text-white rounded-xl">+ Add Subcategory</button>
                    <button onClick={() => navigate("/addcategory")} className="mb-4 px-4 py-2 bg-black text-white rounded-xl">+ Add Category</button>
                </div>

                {productList.map((product) => (
                    <ProductRow key={product._id} product={product} onDelete={handleDelete} />
                ))}
            </div>
        );
    }

    function OrdersPage() {
        // const { lang } = useContext(LanguageContext);

        const handleDeliver = async (order) => {
            await deliverOrder(order._id);
            setOrders((prev) => prev.filter((o) => o._id !== order._id));
        };

        const handleCancel = async (id) => {
            await cancelOrder(id);
            setOrders((prev) => prev.filter((o) => o._id !== id));
        };

        return (
            <div className="space-y-6">
                <h2 className="text-3xl font-semibold">Orders</h2>

                {orders.length === 0 && (
                    <div className="text-gray-500 text-center py-10">
                        No pending orders
                    </div>
                )}

                {orders.map((order) => (
                    <div
                        key={order._id}
                        className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-5 border border-gray-100"
                    >
                        {/* TOP SECTION */}
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">

                            {/* LEFT */}
                            <div className="flex-1 space-y-2">

                                {/* PRODUCTS */}
                                <p className="text-sm text-gray-500">Products</p>
                                <p className="font-semibold text-gray-800">
                                    {order.items
                                        .map(
                                            (i) =>
                                                i.name?.[lang] || i.name?.en ||
                                                i.name
                                        )
                                        .join(", ")}
                                </p>

                                {/* ADDRESS */}
                                <p className="text-sm text-gray-500 mt-2">Shipping</p>
                                <p className="text-sm text-gray-700">
                                    {order.shippingAddress?.fullName},{" "}
                                    {order.shippingAddress?.addressLine1},{" "}
                                    {order.shippingAddress?.city},{" "}
                                    {order.shippingAddress?.state} -{" "}
                                    {order.shippingAddress?.postalCode}
                                </p>

                                {/* PAYMENT */}
                                <p className="text-sm text-gray-500 mt-2">
                                    Payment:{" "}
                                    <span className="font-medium text-gray-800">
                                        {order.paymentMethod}
                                    </span>
                                </p>
                            </div>

                            {/* RIGHT */}
                            <div className="flex flex-col items-start md:items-end gap-3">

                                {/* PRICE */}
                                <div className="text-xl font-bold text-gray-900">
                                    ₹{order.pricing?.total}
                                </div>

                                {/* TIME */}
                                <div className="text-xs text-gray-500">
                                    {new Date(order.createdAt).toLocaleString()}
                                </div>

                                {/* STATUS BADGE */}
                                <span className="text-xs px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 font-medium">
                                    {order.orderStatus}
                                </span>
                            </div>
                        </div>

                        {/* DIVIDER */}
                        <div className="my-4 border-t" />

                        {/* ACTION BUTTONS */}
                        <div className="flex gap-3 justify-end">

                            <button
                                onClick={() => handleDeliver(order)}
                                className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg 
                            hover:bg-green-700 active:scale-95 transition"
                            >
                                Delivered
                            </button>

                            <button
                                onClick={() => handleCancel(order._id)}
                                className="px-4 py-2 bg-red-500 text-white text-sm rounded-lg 
                            hover:bg-red-600 active:scale-95 transition"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    // ✅ SALES SECTION
    function SalesPage() {
        const { lang } = useContext(LanguageContext);

        return (
            <div className="space-y-6">
                <h2 className="text-3xl font-semibold">Sales</h2>

                {salesData.length === 0 && (
                    <div className="text-gray-500 text-center py-10">
                        No completed sales
                    </div>
                )}

                {salesData.map((sale) => (
                    <div
                        key={sale._id}
                        className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-5 border border-gray-100"
                    >
                        <div className="flex flex-col md:flex-row justify-between gap-4">

                            {/* LEFT */}
                            <div className="flex-1 space-y-2">

                                {/* PRODUCTS */}
                                <p className="text-sm text-gray-500">Products</p>
                                <p className="font-semibold text-gray-800">
                                    {sale.items
                                        .map(
                                            (i) =>
                                                i.name?.[lang] ||
                                                i.name?.en ||
                                                i.name
                                        )
                                        .join(", ")}
                                </p>

                                {/* ADDRESS */}
                                <p className="text-sm text-gray-500 mt-2">Shipping</p>
                                <p className="text-sm text-gray-700">
                                    {sale.shippingAddress?.fullName},{" "}
                                    {sale.shippingAddress?.city},{" "}
                                    {sale.shippingAddress?.state}
                                </p>

                                {/* PAYMENT */}
                                <p className="text-sm text-gray-500 mt-2">
                                    Payment:{" "}
                                    <span className="font-medium text-gray-800">
                                        {sale.paymentMethod}
                                    </span>
                                </p>
                            </div>

                            {/* RIGHT */}
                            <div className="flex flex-col items-start md:items-end gap-3">

                                {/* TOTAL */}
                                <div className="text-xl font-bold text-gray-900">
                                    ₹{sale.pricing?.total}
                                </div>

                                {/* DELIVERY TIME */}
                                <div className="text-xs text-gray-500">
                                    {sale.deliveredAt
                                        ? new Date(sale.deliveredAt).toLocaleString()
                                        : "N/A"}
                                </div>

                                {/* STATUS */}
                                <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700 font-medium">
                                    {sale.orderStatus}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
    function UsersPage() {
        return (
            <div>
                <h2 className="text-2xl font-semibold mb-4">Users</h2>
                {users.map((user) => (
                    <div key={user._id} className="bg-white p-4 rounded-xl shadow mb-2">
                        <p>{user.name}</p>
                    </div>
                ))}
            </div>
        );
    }

    function SettingsPage() {
        return (
            <div>
                <h2 className="text-2xl font-semibold mb-4">Settings</h2>
                <div className="bg-white p-4 rounded-xl shadow">
                    <p>Settings options...</p>
                </div>
            </div>
        );
    }

    function Card({ title, value }) {
        return (
            <div className="bg-white p-6 rounded-2xl shadow">
                <h3 className="text-gray-500">{title}</h3>
                <p className="text-2xl font-bold mt-2">{value.length}</p>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-gray-100 relative">

            {!isOpen && (
                <button
                    className="md:hidden fixed left-2 top-1/2 -translate-y-1/2 bg-slate-800 text-white p-2 rounded-full z-50"
                    onClick={() => setIsOpen(true)}
                >
                    <ChevronRight />
                </button>
            )}

            <div className={`fixed md:static top-0 left-0 h-full w-64 bg-white shadow-lg p-4 flex flex-col z-40 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>

                {isOpen && (
                    <button
                        className="md:hidden absolute top-1/2 -translate-y-1/2 bg-black text-white p-2 rounded-full"
                        onClick={() => setIsOpen(false)}
                    >
                        <ChevronLeft />
                    </button>
                )}

                <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>

                <nav className="flex-1">
                    {menu.map((item) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={item.key}
                                onClick={() => setActive(item.key)}
                                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer mb-2 transition ${active === item.key ? "bg-black text-white" : "hover:bg-gray-200"}`}
                            >
                                <Icon size={20} />
                                <span>{item.name}</span>
                            </div>
                        );
                    })}
                </nav>

                <button
                    onClick={logout}
                    className="flex items-center gap-2 p-3 bg-red-500 text-white rounded-xl hover:bg-red-600"
                >
                    <LogOut size={18} /> Logout
                </button>
            </div>

            <div className="flex-1 p-6 overflow-auto w-full">
                {active === "dashboard" && <DashboardHome />}
                {active === "products" && <Products />}
                {active === "orders" && <OrdersPage />}
                {active === "sales" && <SalesPage />}
                {active === "users" && <UsersPage />}
                {active === "settings" && <SettingsPage />}
            </div>
        </div>
    );
}
