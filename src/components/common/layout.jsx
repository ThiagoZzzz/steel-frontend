import { Link } from 'react-router-dom'
import {
    ListIcon,
    XIcon,
    ShoppingCartSimpleIcon,
    TrashIcon,
    MinusIcon,
    PlusIcon,
} from '@phosphor-icons/react'
import {
    Main,
    NavbarContainer,
    StyledNav,
    NavTop,
    NavItem,
    NavLeft,
    MenuList,
    Footer,
    FooterSection,
    FooterCopyright,
    CartBadge,
    DrawerOverlay,
    CartDrawer,
    DrawerHeader,
    DrawerClose,
    DrawerBody,
    DrawerEmpty,
    DrawerItem,
    DrawerItemImage,
    DrawerItemInfo,
    DrawerItemName,
    DrawerItemDesc,
    DrawerItemPrice,
    DrawerItemRemove,
    QuantityRow,
    QtyBtn,
    QtyValue,
    DrawerFooter,
    DrawerSummaryRow,
    DrawerCheckoutBtn,
    DrawerClearBtn,
} from './styles/layout'
import ThemeToggle from './ThemeToggle'


import { useMenu } from '../../contexts/MenuContext'
import { useCart } from '../../contexts/CartContext'
import { useCartActions } from '../../hooks/useCartActions'
import { useAuth } from '../../contexts/AuthContext'

const Layout = ({ children }) => {
    const { isMenuOpen, isDrawerOpen, navRef, setIsMenuOpen, toggleMenu, openDrawer, closeDrawer } = useMenu();
    const { cartCount, cartItems, subtotal, removeFromCart, changeQuantity } = useCart();
    const { handleCheckout, handleClearCart } = useCartActions();
    const { user, isAuthenticated } = useAuth();

    return (
        <>
            <NavbarContainer>
                <StyledNav ref={navRef}>
                    <NavTop>
                    <NavLeft>
                        <NavItem
                            as="button"
                            onClick={toggleMenu}
                            className="menu"
                            aria-expanded={isMenuOpen}
                            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                            style={{ background: 'none', border: 'none', padding: 0, flex: 'none' }}
                        >
                            {isMenuOpen
                                ? <XIcon size={24} color="currentColor" weight="bold" />
                                : <ListIcon size={24} color="currentColor" weight="bold" />
                            }
                        </NavItem>
                        <ThemeToggle />
                    </NavLeft>

                        <NavItem as={Link} to={'/'} className="logo" style={{ textDecoration: 'none' }}>
                            <img src="/logo.png" alt="STEEL" className="brand-logo" />
                        </NavItem>

                        <NavItem
                            as="button"
                            onClick={openDrawer}
                            className="cart"
                            aria-label="Open cart"
                            style={{ background: 'none', border: 'none', padding: 0 }}
                        >
                            <div style={{ position: 'relative', display: 'inline-flex' }}>
                                <ShoppingCartSimpleIcon size={24} color="currentColor" weight="bold" />
                                {cartCount > 0 && <CartBadge>{cartCount}</CartBadge>}
                            </div>
                        </NavItem>
                    </NavTop>

                    <MenuList $isOpen={isMenuOpen}>
                        <li><Link to="/products" onClick={() => setIsMenuOpen(false)}>Collection</Link></li>
                        <li><Link to="/about-us" onClick={() => setIsMenuOpen(false)}>About</Link></li>
                        <li><Link to="/contact-us" onClick={() => setIsMenuOpen(false)}>Contact</Link></li>
                        {user?.roles?.includes('admin') && <li><Link to="/admin" onClick={() => setIsMenuOpen(false)}>Admin</Link></li>}
                        {isAuthenticated && <li><Link to="/profile" onClick={() => setIsMenuOpen(false)}>Profile</Link></li>}
                        {!isAuthenticated && <li><Link to="/login" onClick={() => setIsMenuOpen(false)}>Access</Link></li>}
                    </MenuList>
                </StyledNav>
            </NavbarContainer>

            {/* Cart Drawer */}
            <DrawerOverlay $visible={isDrawerOpen} onClick={closeDrawer} />
            <CartDrawer $open={isDrawerOpen}>
                <DrawerHeader>
                    <h3>Your Cart</h3>
                    <DrawerClose onClick={closeDrawer} aria-label="Close cart">
                        <XIcon size={20} color="currentColor" weight="bold" />
                    </DrawerClose>
                </DrawerHeader>

                {cartItems.length === 0 ? (
                    <DrawerEmpty>
                        <ShoppingCartSimpleIcon size={42} color="var(--text-muted)" weight="thin" />
                        <p>Your cart is empty.</p>
                        <Link to="/products" onClick={closeDrawer}>Explore Collection →</Link>
                    </DrawerEmpty>
                ) : (
                    <>
                        <DrawerBody>
                            {cartItems.map((item) => (
                                <DrawerItem key={item.id}>
                                    <DrawerItemImage>
                                        <img src={item.image} alt={item.name} />
                                    </DrawerItemImage>
                                    <DrawerItemInfo>
                                        <DrawerItemName>{item.name}</DrawerItemName>
                                        <DrawerItemDesc>{item.description}</DrawerItemDesc>
                                        <QuantityRow>
                                            <QtyBtn
                                                onClick={() => changeQuantity(item.id, -1)}
                                                aria-label="Decrease quantity"
                                            >
                                                <MinusIcon size={14} weight="bold" />
                                            </QtyBtn>
                                            <QtyValue>{item.quantity}</QtyValue>
                                            <QtyBtn
                                                onClick={() => changeQuantity(item.id, 1)}
                                                aria-label="Increase quantity"
                                            >
                                                <PlusIcon size={14} weight="bold" />
                                            </QtyBtn>
                                        </QuantityRow>
                                        <DrawerItemPrice>${item.price * item.quantity}</DrawerItemPrice>
                                    </DrawerItemInfo>
                                    <DrawerItemRemove
                                        onClick={() => removeFromCart(item.id)}
                                        aria-label={`Remove ${item.name} from cart`}
                                    >
                                        <TrashIcon size={16} weight="regular" />
                                    </DrawerItemRemove>
                                </DrawerItem>
                            ))}
                        </DrawerBody>

                        <DrawerFooter>
                            <DrawerSummaryRow>
                                <span>Subtotal</span>
                                <span>${subtotal}</span>
                            </DrawerSummaryRow>
                            <DrawerCheckoutBtn onClick={() => { handleCheckout(); closeDrawer(); }}>
                                Proceed to Checkout
                            </DrawerCheckoutBtn>
                            <DrawerClearBtn onClick={handleClearCart}>
                                Clear Cart
                            </DrawerClearBtn>
                            <Link
                                to="/cart"
                                onClick={closeDrawer}
                                style={{
                                    display: 'block',
                                    textAlign: 'center',
                                    fontSize: '0.72rem',
                                    letterSpacing: '0.14em',
                                    textTransform: 'uppercase',
                                    color: 'var(--text-dim)',
                                    marginTop: '0.75rem',
                                }}
                            >
                                View full cart →
                            </Link>
                        </DrawerFooter>
                    </>
                )}
            </CartDrawer>

            <Main>
                {children}
            </Main>

            <Footer>
                <FooterSection>
                    <Link to={'/about-us'}>About Us</Link>
                    <Link to={'/products'}>Collection</Link>
                    <Link to={'/contact-us'}>Contact</Link>
                    <Link to={'/login'}>Access</Link>
                    <FooterCopyright>© 2024 STEEL — Precision Crafted</FooterCopyright>
                </FooterSection>
            </Footer>
        </>
    )
}

export default Layout
