import GlobalStyle from "../components/common/styles/global-style"
import Layout from '../components/common/layout'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoute from '../components/common/protectedRoute'
import AuthProvider from "../contexts/AuthContext"
import MenuProvider from "../contexts/MenuContext"
import CartProvider from '../contexts/CartContext'
import ToastProvider from "../contexts/ToastContext"
import ThemeProvider from "../contexts/ThemeContext"
// data
import dataRoutes from './dataRoutes'

const AppRouter = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <MenuProvider>
            <CartProvider>
              <ToastProvider>
                <GlobalStyle />
                <Layout>
                  <Routes>
                    {dataRoutes.map((item) => {
                      const { id, path, pageComponent: Component } = item;

                      // Protegida por rol (admin, etc.)
                      if (item.isProtected && item.requiredRole) {
                        return (
                          <Route key={id} path={path} element={
                            <ProtectedRoute requiredRole={item.requiredRole}>
                              <Component />
                            </ProtectedRoute>
                          } />
                        )
                      }

                      // Protegida (solo requiere sesión)
                      if (item.isProtected) {
                        return (
                          <Route key={id} path={path} element={
                            <ProtectedRoute>
                              <Component />
                            </ProtectedRoute>
                          } />
                        )
                      }

                      // Publica
                      return <Route key={id} path={path} element={<Component />} />
                    })}

                    <Route path='*' element={<h1>404 - Not found</h1>} />
                  </Routes>
                </Layout>
              </ToastProvider>
            </CartProvider>
          </MenuProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default AppRouter