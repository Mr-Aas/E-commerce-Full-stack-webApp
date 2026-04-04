import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useLoaderData, Link } from "react-router-dom";



export default function MyProfile() {

    const { User, logout } = useContext(AuthContext);
    const user = useLoaderData()


    // console.log(user)
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-6">
                {/* Header */}
                <div className="flex items-center gap-6 border-b pb-6">
                    <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold">
                        {user?.name ? user.name[0].toUpperCase() : "U"}
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold">{user?.name || "user"}</h2>
                        <p className="text-gray-500">{user?.email || "user@example.com"}</p>
                    </div>
                </div>

                {/* Details Section */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-4 rounded-xl">
                        <p className="text-sm text-gray-500">Full Name</p>
                        <p className="font-medium">{user?.name || "Not Available"}</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-xl">
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">{user?.email || "Not Available"}</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-xl">
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-medium">{user?.phone || "Not Added"}</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-xl">
                        <p className="text-sm text-gray-500">Role</p>
                        <p className="font-medium">{user?.isAdmin ? "Admin" : "user"}</p>
                    </div>
                </div>

                {/* Actions */}
                <div className="mt-8 flex flex-col gap-4">
                    <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                        Edit Profile
                    </button>
                    <button className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition">
                        <Link to="/" onClick={logout} className="inline">
                            Logout

                        </Link>
                    </button>
                </div>
            </div>
        </div>
    );
}
