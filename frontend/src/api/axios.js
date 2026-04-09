import axios from "axios"

const api = axios.create({
    baseURL: "http://10.218.153.234:5000/"

})

api.interceptors.request.use((conf) => {
    const token = localStorage.getItem("token");

    if (token) {
        conf.headers.Authorization = `Bearer ${token}`
    }
    return conf;
})

export default api;