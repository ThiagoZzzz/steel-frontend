// components/common/ProtectedRoute.jsx

import { Navigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'  // tu futuro contexto

const ProtectedRoute = ({ children, requiredRole }) => {
    const { user, isAuthenticated } = useAuth()

    // 1. ¿Está logueado?
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    // 2. ¿Tiene el rol requerido? (solo si la ruta lo exige)
    if (requiredRole && !user.roles.includes(requiredRole)) {
        return <Navigate to="/unauthorized" replace />
    }

    // 3. Todo OK → renderiza la página
    return children
}

export default ProtectedRoute
