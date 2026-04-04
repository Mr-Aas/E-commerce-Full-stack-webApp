import { useState } from "react";
import { Home, Package, Users, Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";


export default function AdminDashboard() {
    const [active, setActive] = useState("dashboard");

    const menu = [
        { name: "Dashboard", icon: Home, key: "dashboard" },
        { name: "Products", icon: Package, key: "products" },
        { name: "Users", icon: Users, key: "users" },
        { name: "Settings", icon: Settings, key: "settings" },
    ];

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-white shadow-lg p-4 flex flex-col">
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

                <button className="flex items-center gap-2 p-3 bg-red-500 text-white rounded-xl hover:bg-red-600">
                    <LogOut size={18} /> Logout
                </button>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 overflow-auto">
                {active === "dashboard" && <DashboardHome />}
                {active === "products" && <Products />}
                {active === "users" && <UsersPage />}
                {active === "settings" && <SettingsPage />}
            </div>
        </div>
    );
}

function DashboardHome() {
    return (
        <div>
            <h2 className="text-3xl font-semibold mb-6">Dashboard Overview</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card title="Total Sales" value="₹45,000" />
                <Card title="Total Orders" value="120" />
                <Card title="Users" value="350" />
            </div>
        </div>
    );
}

function Products() {
    const navigate = useNavigate();
    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Manage Products</h2>

            <button className="mb-4 px-4 py-2 bg-black text-white rounded-xl" onClick={() => navigate("/addproducts")}>
                + Add Product
            </button>

            <div className="bg-white p-4 rounded-xl shadow">
                <p>No products yet...</p>
            </div>
        </div>
    );
}

function UsersPage() {
    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Users</h2>
            <div className="bg-white p-4 rounded-xl shadow">
                <p>No users data...</p>
            </div>
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
            <p className="text-2xl font-bold mt-2">{value}</p>
        </div>
    );
}
