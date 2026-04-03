
import { createContext, useState } from "react";



export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {



    const [User, setUser] = useState(() => {
        const token = localStorage.getItem("token")
        return token ? { token } : null
    })

    const login = (token) => {
        localStorage.setItem("token", token)
        setUser({ token })
    }

    const logout = () => {
        localStorage.removeItem("token")
        alert("you logged out")
        setUser(null);
    }
    return (
        <AuthContext.Provider value={{ User, login, logout }}>
            {children}
        </AuthContext.Provider>

    )
}