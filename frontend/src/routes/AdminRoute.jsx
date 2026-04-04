import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function AdminRoute({ children }) {
    const token = localStorage.getItem("token");

    if (!token) return <Navigate to="/login" />;

    const user = jwtDecode(token);
    console.log(user)

    return user.role === "admin"
        ? children
        : <Navigate to="/" />;
}
export default AdminRoute;