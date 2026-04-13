import axios from "axios"

console.log("API URL:", import.meta.env.VITE_API_URL);
// const api = axios.create({
//     baseURL: "http://localhost:5000/"

// })
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL 

})

api.interceptors.request.use((conf) => {
    const token = localStorage.getItem("token");

    if (token) {
        conf.headers.Authorization = `Bearer ${token}`
    }
    return conf;
})

export default api;