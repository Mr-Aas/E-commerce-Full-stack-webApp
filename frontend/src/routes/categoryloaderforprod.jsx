import api from "../api/axios"
import { redirect } from "react-router-dom"

const categoriesData = async () => {

    try {
        const res = await api.get("/categories")
        return res.data
    } catch (err) {

        if (err.response?.status === 401 || err.response?.status === 400) {
            return redirect(-1)
        }

        throw err
    }
}
export default categoriesData;