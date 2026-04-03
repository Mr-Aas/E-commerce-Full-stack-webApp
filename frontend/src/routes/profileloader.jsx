import api from "../api/axios"
import { redirect } from "react-router-dom"

const profileLoader = async () => {
    const token = localStorage.getItem("token")


    if (!token) {
        return redirect("/login")
    }

    try {
        const res = await api.get("/auth/profile")
        return res.data
    } catch (err) {

        if (err.response?.status === 401 || err.response?.status === 400) {
            localStorage.removeItem("token")
            return redirect("/login")
        }

        throw err
    }
}
export default profileLoader;