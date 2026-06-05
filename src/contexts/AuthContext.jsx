// contexts/AuthContext.jsx
import { createContext, useState, useContext } from 'react'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    // estado con datos del usuario
    const [user, setUser] = useState(() => {
        // si recarga la página, recupera de localStorage
        const saved = localStorage.getItem('steel_user')
        return saved ? JSON.parse(saved) : null
    })

    const isAuthenticated = !!user

    const saveLoginData = (userData) => {
        setUser(userData.user)
        localStorage.setItem('steel_user', JSON.stringify(userData.user))
        localStorage.setItem('steel_token', userData.token)
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('steel_user')
        localStorage.removeItem('steel_token')
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, saveLoginData, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;

export const useAuth = () => useContext(AuthContext)
