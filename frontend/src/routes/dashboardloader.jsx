import api from "../api/axios"

const Dashboardloader = async () => {

    try {
        const sales = await api.get("/dashboard/sales")
        const products = await api.get("/dashboard/products")
        const users = await api.get("/dashboard/users")
        const data = [sales.data, products.data, users.data]
        console.log(data)
        return data

    } catch (err) {

        if (err.response?.status === 401 || err.response?.status === 400) {
            alert("failed to fetch data")
        }

        throw err
    }
}
export default Dashboardloader;