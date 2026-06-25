import styled from 'styled-components'

/* ─── Checkout-specific styles ─── */

export const CheckoutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 420px;
  gap: 3rem;
  align-items: flex-start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`

export const CheckoutColumn = styled.div`
  display: flex;
  flex-direction: column;
`

export const ColumnTitle = styled.h2`
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.4rem;
  font-weight: 400;
  color: var(--text);
  letter-spacing: 0.03em;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border);
`

/* ─── Cart items in checkout ─── */
export const CheckoutItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 2rem;
  max-height: 420px;
  overflow-y: auto;

  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-thumb { background: var(--gold-border); border-radius: 2px; }
`

export const CheckoutItem = styled.div`
  display: flex;
  gap: 1rem;
  padding: 0.75rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  align-items: center;
  transition: border-color 0.2s ease;

  &:hover { border-color: var(--gold-border); }
`

export const CheckoutItemImage = styled.div`
  width: 64px;
  height: 64px;
  background: var(--bg-elevated);
  flex-shrink: 0;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 0.3rem;
  }
`

export const CheckoutItemInfo = styled.div`
  flex: 1;
  min-width: 0;

  h4 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 0.95rem;
    font-weight: 400;
    color: var(--text);
    letter-spacing: 0.04em;
    margin-bottom: 0.15rem;
  }

  p {
    display: none; /* Description omitted in checkout row — name + image are sufficient */
  }
`

export const CheckoutItemPrice = styled.span`
  font-family: 'Jost', sans-serif;
  font-size: 0.88rem;
  font-weight: 500;
  color: var(--gold);
  letter-spacing: 0.05em;
  flex-shrink: 0;
`

export const CheckoutItemRemove = styled.button`
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  padding: 4px;
  transition: color 0.2s ease;
  flex-shrink: 0;

  &:hover { color: var(--gold); }
`

/* ─── Totals block ─── */
export const TotalsBlock = styled.div`
  padding-top: 1.5rem;
  border-top: 1px solid var(--gold-border);
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`

export const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;

  span {
    font-family: 'Jost', sans-serif;
    font-size: 0.82rem;
    letter-spacing: 0.06em;

    &:first-child { color: var(--text-dim); }
    &:last-child { color: var(--text); }
  }

  ${({ $isTotal }) => $isTotal && `
    margin-top: 0.75rem;
    padding-top: 0.75rem;
    border-top: 1px solid var(--border);

    span {
      font-size: 1rem;
      font-weight: 500;

      &:last-child { color: var(--gold); }
    }
  `}
`

/* ─── Billing form card ─── */
export const BillingCard = styled.div`
  background: var(--bg-card);
  border: 1px solid var(--border);
  padding: 2rem;
  position: sticky;
  top: 100px;

  @media (max-width: 900px) {
    position: static;
  }

  @media (max-width: 480px) {
    padding: 1.5rem;
  }
`

export const SubmitBtn = styled.button`
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

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export const SecureNotice = styled.p`
  font-family: 'Jost', sans-serif;
  font-size: 0.68rem;
  color: var(--text-muted);
  letter-spacing: 0.06em;
  text-align: center;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
`
