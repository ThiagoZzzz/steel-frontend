import Home from "../pages/home/home"
import AboutUs from "../pages/about-us/about-us"
import ContactUs from "../pages/contact-us/contact-us"
import Login from "../pages/login/login"
import Cart from "../pages/cart/cart"
import SignUp from "../pages/sign-up/sign-up"
import Products from "../pages/products/products"
import ProductDetail from "../pages/product-detail/product-detail"
import Admin from "../pages/admin/admin"
import UserProfile from "../pages/user-profile/user-profile"
import Checkout from "../pages/checkout/checkout"

const dataRoutes = [
    {
        id: 1,
        tag: "Home",
        path: "/",
        isProtected: false,
        requiredRole: null,
        pageComponent: Home
    },
    {
        id: 2,
        tag: "About-us",
        path: "/about-us",
        isProtected: false,
        requiredRole: null,
        pageComponent: AboutUs
    },
    {
        id: 3,
        tag: "Contact-us",
        path: "/contact-us",
        isProtected: false,
        requiredRole: null,
        pageComponent: ContactUs
    },
    {
        id: 4,
        tag: "Login",
        path: "/login",
        isProtected: false,
        requiredRole: null,
        pageComponent: Login
    },
    {
        id: 5,
        tag: "Sign-up",
        path: "/sign-up",
        isProtected: false,
        requiredRole: null,
        pageComponent: SignUp
    },
    {
        id: 6,
        tag: "Products",
        path: "/products",
        isProtected: false,
        requiredRole: null,
        pageComponent: Products
    },
    {
        id: 7,
        tag: "Cart",
        path: "/cart",
        isProtected: true,
        requiredRole: null,
        pageComponent: Cart
    },
    {
        id: 8,
        tag: "Admin",
        path: "/admin",
        isProtected: true,
        requiredRole: "admin",
        pageComponent: Admin
    },
    {
        id: 9,
        tag: "Profile",
        path: "/profile",
        isProtected: true,
        requiredRole: null,
        pageComponent: UserProfile
    },
    {
        id: 10,
        tag: "Checkout",
        path: "/checkout",
        isProtected: true,
        requiredRole: null,
        pageComponent: Checkout
    },
    {
        id: 11,
        tag: "ProductDetail",
        path: "/products/:slug",
        isProtected: false,
        requiredRole: null,
        pageComponent: ProductDetail
    },
]

export default dataRoutes
