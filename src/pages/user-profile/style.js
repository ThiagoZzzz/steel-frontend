import styled from 'styled-components'

/* ─── Profile-specific styles ─── */

export const ProfileHeaderCard = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  margin-bottom: 2.5rem;

  @media (max-width: 600px) {
    flex-direction: column;
    text-align: center;
  }
`

export const LogoutBtn = styled.button`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.55rem 1.1rem;
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text-muted);
  font-family: 'Jost', sans-serif;
  font-size: 0.68rem;
  font-weight: 400;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  cursor: pointer;
  transition: border-color 0.25s ease, color 0.25s ease;
  flex-shrink: 0;

  &:hover {
    border-color: rgba(229, 62, 62, 0.4);
    color: #e53e3e;
  }

  @media (max-width: 600px) {
    margin-left: 0;
    width: 100%;
    justify-content: center;
  }
`

export const ProfileInfo = styled.div`
  h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.6rem;
    font-weight: 400;
    color: var(--text);
    letter-spacing: 0.03em;
    margin-bottom: 0.2rem;
  }

  p {
    font-family: 'Jost', sans-serif;
    font-size: 0.82rem;
    color: var(--text-dim);
    letter-spacing: 0.04em;
  }
`

export const SectionCard = styled.div`
  background: var(--bg-card);
  border: 1px solid var(--border);
  padding: 2rem;
  max-width: 600px;

  @media (max-width: 600px) {
    padding: 1.5rem;
  }
`

export const SectionTitle = styled.h3`
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.3rem;
  font-weight: 400;
  color: var(--text);
  letter-spacing: 0.03em;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border);
`

/* ─── Order history ─── */
export const OrdersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const OrderCard = styled.div`
  background: var(--bg-card);
  border: 1px solid var(--border);
  overflow: hidden;
  transition: border-color 0.3s ease;

  &:hover { border-color: var(--gold-border); }
`

export const OrderSummary = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  cursor: pointer;
  gap: 1rem;
  flex-wrap: wrap;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`

export const OrderId = styled.span`
  font-family: 'Jost', sans-serif;
  font-size: 0.82rem;
  font-weight: 500;
  color: var(--gold);
  letter-spacing: 0.06em;
`

export const OrderDate = styled.span`
  font-family: 'Jost', sans-serif;
  font-size: 0.78rem;
  color: var(--text-dim);
  letter-spacing: 0.04em;
`

export const OrderTotal = styled.span`
  font-family: 'Jost', sans-serif;
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--text);
  letter-spacing: 0.04em;
`

export const OrderChevron = styled.span`
  color: var(--text-muted);
  transition: transform 0.3s ease;
  transform: ${({ $open }) => ($open ? 'rotate(180deg)' : 'rotate(0)')};
  display: flex;
  align-items: center;
`

export const OrderDetails = styled.div`
  max-height: ${({ $open }) => ($open ? '500px' : '0')};
  overflow: hidden;
  transition: max-height 0.4s ease;
  border-top: ${({ $open }) => ($open ? '1px solid var(--border)' : 'none')};
`

export const OrderItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1.5rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--border);
  }
`

export const OrderItemName = styled.span`
  font-family: 'Jost', sans-serif;
  font-size: 0.82rem;
  color: var(--text);
  letter-spacing: 0.03em;
`

export const OrderItemMeta = styled.span`
  font-family: 'Jost', sans-serif;
  font-size: 0.78rem;
  color: var(--text-dim);
  letter-spacing: 0.04em;
`
