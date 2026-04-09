import { useState, useContext } from "react";
import { Home, Package, Users, Settings, LogOut, ChevronRight, ChevronLeft, User } from "lucide-react";
import { useNavigate, useLoaderData } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";



export default function AdminDashboard() {
    const { logout } = useContext(AuthContext);
    const [active, setActive] = useState("dashboard");
    const [isOpen, setIsOpen] = useState(false);
    const [sales, products, users] = useLoaderData()
    console.log(sales, products, users)
    console.log(typeof (sales), typeof (products), typeof (users))

    const menu = [
        { name: "Dashboard", icon: Home, key: "dashboard" },
        { name: "Products", icon: Package, key: "products" },
        { name: "Users", icon: Users, key: "users" },
        { name: "Settings", icon: Settings, key: "settings" },
    ];




    function DashboardHome() {

        return (
            <div>
                <h2 className="text-3xl font-semibold mb-6">Dashboard Overview</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card title="Total Sales" value={sales} />
                    <Card title="Total Orders" value={sales} />
                    <Card title="Users" value={users} />
                </div>
            </div>
        );
    }

    function Products() {
        const navigate = useNavigate();
        return (
            <div>
                <h2 className="text-2xl font-semibold mb-4">Manage Products</h2>
                <div className="flex gap-2">
                    <button
                        className="mb-4 px-4 py-2 bg-black text-white rounded-xl"
                        onClick={() => navigate("/addproducts")}
                    >
                        + Add Product
                    </button>
                    <button
                        className="mb-4 px-4 py-2 bg-black text-white rounded-xl"
                        onClick={() => navigate("/addcategory")}
                    >
                        + Add Category
                    </button>
                </div>

                {products.map((product) => (
                    <div className="bg-white p-4 flex flex-col gap-4 rounded-xl shadow">
                        <p>{product?.name}</p>
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
                    <div>
                        <div className="bg-white p-4 rounded-xl shadow">
                            <p>{user.name}</p>
                        </div>
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

            {/* Open Button (Mobile/Tablet) */}
            {!isOpen && (
                <button
                    className="md:hidden fixed left-2 top-1/2 -translate-y-1/2 bg-slate-800 text-white p-2 rounded-full z-50"
                    onClick={() => setIsOpen(true)}
                >
                    <ChevronRight />
                </button>
            )}

            {/* Sidebar */}
            <div
                className={`
                    fixed md:static top-0 left-0 h-full w-64 bg-white shadow-lg p-4 flex flex-col z-40
                    transform transition-transform duration-300
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}
                    md:translate-x-0
                `}
            >
                {/* Close Button (only mobile/tablet) */}
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
                                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer mb-2 transition ${active === item.key
                                    ? "bg-black text-white"
                                    : "hover:bg-gray-200"
                                    }`}
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

            {/* Main Content */}
            <div className="flex-1 p-6 overflow-auto w-full">
                {active === "dashboard" && <DashboardHome />}
                {active === "products" && <Products />}
                {active === "users" && <UsersPage />}
                {active === "settings" && <SettingsPage />}
            </div>
        </div>
    );
}
