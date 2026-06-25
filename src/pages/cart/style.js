import styled from 'styled-components'
import { Main } from '../../components/common/styles/layout'

export const CartContainer = styled(Main)`
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  padding: 120px 6vw 6rem;
  background: var(--bg-dark);
  min-height: 100vh;
`

export const CartHeader = styled.header`
  margin-bottom: 3rem;

  h1 {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2.5rem, 4vw, 4rem);
    font-weight: 300;
    color: var(--text);
    line-height: 1.05;
    margin-top: 0.5rem;
  }
`

export const CartEyebrow = styled.span`
  font-family: 'Jost', sans-serif;
  font-size: 0.7rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--gold);
`

export const CartEmpty = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;
  padding: 5rem 0;
  text-align: center;

  p {
    font-family: 'Jost', sans-serif;
    color: var(--text-dim);
    font-size: 0.9rem;
    letter-spacing: 0.06em;
  }

  a {
    font-family: 'Jost', sans-serif;
    font-size: 0.75rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--gold);
    border-bottom: 1px solid var(--gold-border);
    padding-bottom: 2px;
    transition: border-color 0.2s ease;

    &:hover { border-color: var(--gold); }
  }
`

export const EmptyIcon = styled.div`
  opacity: 0.4;
`

export const CartLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 3rem;
  align-items: flex-start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`

export const CartItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const CartItem = styled.div`
  display: flex;
  gap: 1.25rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  padding: 1rem;
  transition: border-color 0.25s ease;
  align-items: center;

  &:hover { border-color: var(--gold-border); }
`

export const ItemImage = styled.div`
  width: 80px;
  height: 80px;
  background: var(--bg-elevated);
  flex-shrink: 0;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 0.5rem;
  }
`

export const ItemInfo = styled.div`
  flex: 1;
`

export const ItemName = styled.h4`
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.1rem;
  font-weight: 400;
  color: var(--text);
  letter-spacing: 0.05em;
  margin-bottom: 0.2rem;
`

export const ItemDesc = styled.p`
  font-family: 'Jost', sans-serif;
  font-size: 0.75rem;
  color: var(--text-dim);
  letter-spacing: 0.04em;
  /* Limit description to 2 lines max */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  max-width: 360px;
`

export const ItemPrice = styled.p`
  font-family: 'Jost', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--gold);
  margin-top: 0.5rem;
  letter-spacing: 0.06em;
`

export const ItemRemove = styled.button`
  background: none;
  border: none;
  color: var(--text-muted);
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
  transition: color 0.2s ease;
  align-self: flex-start;

  &:hover { color: var(--gold); }
`

export const ItemQuantityRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
`

export const ItemQtyBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
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

export const ItemQtyValue = styled.span`
  font-family: 'Jost', sans-serif;
  font-size: 0.85rem;
  color: var(--text);
  min-width: 24px;
  text-align: center;
  letter-spacing: 0.04em;
`

export const CartSummary = styled.div`
  background: var(--bg-card);
  border: 1px solid var(--border);
  padding: 2rem;
  position: sticky;
  top: 100px;

  h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.4rem;
    font-weight: 400;
    color: var(--text);
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--border);
  }
`

export const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;

  span {
    font-family: 'Jost', sans-serif;
    font-size: 0.82rem;
    color: var(--text-dim);
    letter-spacing: 0.06em;
  }
`

export const SummaryTotal = styled(SummaryRow)`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border);

  span {
    color: var(--text);
    font-size: 0.9rem;
    font-weight: 500;

    &:last-child { color: var(--gold); }
  }
`

export const CheckoutBtn = styled.button`
  width: 100%;
  padding: 1rem;
  margin-top: 1.5rem;
  background: var(--gold);
  border: none;
  color: var(--bg-dark);
  font-family: 'Jost', sans-serif;
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    background: var(--gold-bright);
    box-shadow: 0 0 30px rgba(201, 168, 76, 0.3);
  }
`

export const ClearCartBtn = styled.button`
  width: 100%;
  padding: 0.75rem;
  margin-top: 0.5rem;
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text-dim);
  font-family: 'Jost', sans-serif;
  font-size: 0.7rem;
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
