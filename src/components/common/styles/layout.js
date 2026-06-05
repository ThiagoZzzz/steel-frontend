import styled, { css } from 'styled-components'

export const Main = styled.main`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--bg-dark);
`

export const NavbarContainer = styled.header``

export const StyledNav = styled.nav`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: clamp(260px, 30%, 320px);
  padding: 0 1.25rem;
  background: var(--nav-bg);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--gold-border);
  border-radius: 6px;
  box-shadow: var(--nav-shadow);
  z-index: 1000;
  transition: all 0.4s ease-in-out;

  @media (max-width: 768px) {
    width: clamp(220px, 75vw, 320px);
  }
`

export const NavTop = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  img {
    width: 34px;
    filter: brightness(1.1);
  }
`

export const NavLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.15rem;
  flex: 1;
`

export const ThemeToggleBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  background: none;
  border: none;
  padding: 0;
  color: var(--text-dim);
  cursor: pointer;
  transition: color 0.2s ease;
  border-radius: 4px;

  &:hover {
    color: var(--gold);
  }
`

export const NavItem = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  cursor: pointer;
  color: var(--text);
  transition: color 0.2s ease;

  &:hover {
    color: var(--gold);
  }

  &.logo {
    justify-content: center;
  }

  &:last-child {
    justify-content: flex-end;
  }
`

export const MenuList = styled.ul`
  width: 100%;
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;
  transition: max-height 0.5s ease, opacity 0.35s ease, padding 0.3s ease, margin 0.3s ease;

  ${({ $isOpen }) => $isOpen && css`
    max-height: 300px;
    opacity: 1;
    padding-bottom: 20px;
    border-top: 1px solid var(--gold-border);
    margin-top: 10px;
  `}

  li {
    list-style: none;
    width: 100%;
  }

  li a {
    font-family: 'Jost', sans-serif;
    font-size: 0.8rem;
    font-weight: 400;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--text-dim);
    transition: color 0.2s ease, padding-left 0.2s ease;
    display: block;

    &:hover {
      color: var(--gold);
      padding-left: 6px;
    }
  }
`

export const CartBadge = styled.span`
  position: absolute;
  top: -6px;
  right: -8px;
  background: var(--gold);
  color: var(--bg-dark);
  font-family: 'Jost', sans-serif;
  font-size: 0.6rem;
  font-weight: 600;
  min-width: 17px;
  height: 17px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  letter-spacing: 0;
`

/* ── Footer ── */
export const Footer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 14vh;
  background-color: var(--bg-surface);
  border-top: 1px solid var(--gold-border);
`

export const FooterSection = styled.section`
  width: 100%;
  max-width: 900px;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;

  a {
    font-family: 'Jost', sans-serif;
    font-size: 0.75rem;
    font-weight: 400;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--text-muted);
    transition: color 0.25s ease;

    &:hover {
      color: var(--gold);
    }
  }

  @media (max-width: 480px) {
    justify-content: center;
    gap: 1.5rem;
  }
`

export const FooterCopyright = styled.p`
  font-family: 'Jost', sans-serif;
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  color: var(--text-muted);
  text-align: center;
  width: 100%;
  padding-top: 0.5rem;
`

/* ── Cart Drawer ── */
export const DrawerOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1999;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  pointer-events: ${({ $visible }) => ($visible ? 'auto' : 'none')};
  transition: opacity 0.3s ease;
`

export const CartDrawer = styled.aside`
  position: fixed;
  top: 0;
  right: 0;
  width: min(400px, 90vw);
  height: 100vh;
  background: var(--bg-surface);
  border-left: 1px solid var(--gold-border);
  z-index: 2000;
  display: flex;
  flex-direction: column;
  transform: translateX(${({ $open }) => ($open ? '0' : '100%')});
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${({ $open }) => ($open ? '-10px 0 50px rgba(0,0,0,0.5)' : 'none')};
`

export const DrawerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 1.5rem 1rem;
  border-bottom: 1px solid var(--border);

  h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.3rem;
    font-weight: 400;
    color: var(--text);
    letter-spacing: 0.04em;
  }
`

export const DrawerClose = styled.button`
  background: none;
  border: none;
  color: var(--text-dim);
  cursor: pointer;
  padding: 4px;
  transition: color 0.2s ease;

  &:hover { color: var(--text); }
`

export const DrawerBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--gold-border);
    border-radius: 2px;
  }
`

export const DrawerEmpty = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 3rem 1.5rem;

  p {
    font-family: 'Jost', sans-serif;
    color: var(--text-dim);
    font-size: 0.85rem;
    letter-spacing: 0.06em;
  }

  a {
    font-family: 'Jost', sans-serif;
    font-size: 0.72rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--gold);
    border-bottom: 1px solid var(--gold-border);
    padding-bottom: 2px;
    transition: border-color 0.2s ease;

    &:hover { border-color: var(--gold); }
  }
`

export const DrawerItem = styled.div`
  display: flex;
  gap: 1rem;
  padding: 0.75rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  transition: border-color 0.25s ease;
  align-items: flex-start;

  &:hover { border-color: var(--gold-border); }
`

export const DrawerItemImage = styled.div`
  width: 64px;
  height: 64px;
  background: var(--bg-elevated);
  flex-shrink: 0;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 0.35rem;
  }
`

export const DrawerItemInfo = styled.div`
  flex: 1;
  min-width: 0;
`

export const DrawerItemName = styled.h4`
  font-family: 'Cormorant Garamond', serif;
  font-size: 0.95rem;
  font-weight: 400;
  color: var(--text);
  letter-spacing: 0.04em;
  margin-bottom: 0.15rem;
`

export const DrawerItemDesc = styled.p`
  font-family: 'Jost', sans-serif;
  font-size: 0.7rem;
  color: var(--text-dim);
  letter-spacing: 0.03em;
  margin-bottom: 0.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const DrawerItemPrice = styled.p`
  font-family: 'Jost', sans-serif;
  font-size: 0.82rem;
  font-weight: 500;
  color: var(--gold);
  letter-spacing: 0.05em;
  margin-top: 0.35rem;
`

export const DrawerItemRemove = styled.button`
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  padding: 4px;
  transition: color 0.2s ease;
  flex-shrink: 0;

  &:hover { color: var(--gold); }
`

export const QuantityRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

export const QtyBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  color: var(--text-dim);
  cursor: pointer;
  transition: border-color 0.2s ease, color 0.2s ease;

  &:hover {
    border-color: var(--gold-border);
    color: var(--gold);
  }
`

export const QtyValue = styled.span`
  font-family: 'Jost', sans-serif;
  font-size: 0.8rem;
  color: var(--text);
  min-width: 20px;
  text-align: center;
  letter-spacing: 0.04em;
`

export const DrawerFooter = styled.div`
  padding: 1.25rem 1.5rem;
  border-top: 1px solid var(--border);
`

export const DrawerSummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;

  span {
    font-family: 'Jost', sans-serif;
    font-size: 0.85rem;
    letter-spacing: 0.06em;

    &:first-child { color: var(--text-dim); }
    &:last-child { color: var(--gold); font-weight: 500; }
  }
`

export const DrawerCheckoutBtn = styled.button`
  width: 100%;
  padding: 0.85rem;
  background: var(--gold);
  border: none;
  color: var(--bg-dark);
  font-family: 'Jost', sans-serif;
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    background: var(--gold-bright);
    box-shadow: 0 0 24px rgba(201, 168, 76, 0.28);
  }
`

export const DrawerClearBtn = styled.button`
  width: 100%;
  padding: 0.65rem;
  margin-top: 0.5rem;
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text-dim);
  font-family: 'Jost', sans-serif;
  font-size: 0.68rem;
  font-weight: 400;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  cursor: pointer;
  transition: border-color 0.25s ease, color 0.25s ease;

  &:hover {
    border-color: var(--gold-border);
    color: var(--text);
  }
`
