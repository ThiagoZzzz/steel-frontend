import styled from 'styled-components'

/* ─── Admin-specific styles (extend shared components) ─── */

export const AdminGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

export const StatCard = styled.div`
  background: var(--bg-card);
  border: 1px solid var(--border);
  padding: 1.5rem;
  transition: border-color 0.3s ease;

  &:hover { border-color: var(--gold-border); }

  span {
    font-family: 'Jost', sans-serif;
    font-size: 0.65rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--text-muted);
    display: block;
    margin-bottom: 0.5rem;
  }

  h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.4rem;
    font-weight: 300;
    color: var(--gold);
    line-height: 1;
  }
`

export const ToolbarRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  gap: 1rem;
  flex-wrap: wrap;
`

export const SearchInput = styled.input`
  background: var(--bg-card);
  border: 1px solid var(--border);
  color: var(--text);
  padding: 0.6rem 1rem;
  font-family: 'Jost', sans-serif;
  font-size: 0.82rem;
  outline: none;
  width: 260px;
  max-width: 100%;
  transition: border-color 0.25s ease;

  &::placeholder { color: var(--text-muted); }
  &:focus { border-color: var(--gold-border); }

  @media (max-width: 600px) {
    width: 100%;
  }
`

export const TableResponsive = styled.div`
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar { height: 4px; }
  &::-webkit-scrollbar-thumb { background: var(--gold-border); border-radius: 2px; }
`

/* Product card grid for products section */
export const AdminProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1.25rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
  }

  @media (max-width: 400px) {
    grid-template-columns: 1fr;
  }
`

export const AdminProductCard = styled.div`
  background: var(--bg-card);
  border: 1px solid var(--border);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: border-color 0.3s ease;

  &:hover { border-color: var(--gold-border); }
`

export const AdminCardImage = styled.div`
  background: var(--bg-elevated);
  aspect-ratio: 1 / 1;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 1.5rem;
  }
`

export const AdminCardBody = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;

  h4 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.1rem;
    font-weight: 400;
    color: var(--text);
    letter-spacing: 0.04em;
  }

  p {
    font-family: 'Jost', sans-serif;
    font-size: 0.75rem;
    color: var(--text-dim);
    letter-spacing: 0.03em;
  }

  .price {
    font-family: 'Jost', sans-serif;
    font-size: 0.95rem;
    font-weight: 500;
    color: var(--gold);
    letter-spacing: 0.06em;
  }
`

export const AdminCardActions = styled.div`
  display: flex;
  gap: 0.4rem;
  padding: 0.75rem 1rem;
  border-top: 1px solid var(--border);
`

/* Status select inline */
export const StatusSelect = styled.select`
  background: var(--bg-card);
  border: 1px solid var(--border);
  color: var(--text);
  padding: 0.35rem 2rem 0.35rem 0.6rem;
  font-family: 'Jost', sans-serif;
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  outline: none;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%238a8070' stroke-width='1.5' fill='none' /%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.6rem center;
  transition: border-color 0.25s ease;

  &:focus { border-color: var(--gold-border); }
`
