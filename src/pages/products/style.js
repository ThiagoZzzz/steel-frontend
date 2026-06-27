import styled, { css } from 'styled-components'
import { Main } from '../../components/common/styles/layout'

export const ProductsContainer = styled(Main)`
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  padding: 120px 6vw 6rem;
  background: var(--bg-dark);
  min-height: 100vh;
`

export const ProductsHeader = styled.header`
  margin-bottom: 2.5rem;
  max-width: 520px;

  h1 {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2.8rem, 5vw, 4.5rem);
    font-weight: 300;
    color: var(--text);
    line-height: 1.05;
    margin: 0.5rem 0 1rem;
  }

  p {
    font-family: 'Jost', sans-serif;
    font-size: 0.8rem;
    letter-spacing: 0.12em;
    color: var(--text-muted);
    text-transform: uppercase;
  }
`

export const ProductsEyebrow = styled.span`
  font-family: 'Jost', sans-serif;
  font-size: 0.7rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--gold);
  display: block;
  margin-bottom: 0.5rem;
`

export const FilterBar = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
`

export const FilterBtn = styled.button`
  padding: 0.55rem 1.4rem;
  background: ${({ $active }) => ($active ? 'var(--gold)' : 'transparent')};
  color: ${({ $active }) => ($active ? 'var(--bg-dark)' : 'var(--text-dim)')};
  border: 1px solid ${({ $active }) => ($active ? 'var(--gold)' : 'var(--border)')};
  font-family: 'Jost', sans-serif;
  font-size: 0.7rem;
  font-weight: 400;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    border-color: var(--gold-border);
    color: ${({ $active }) => ($active ? 'var(--bg-dark)' : 'var(--gold)')};
  }
`

export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`

export const ProductCard = styled.article`
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 2px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-width: 0; /* Fix para evitar que el aspect-ratio rompa el grid y fuerce 1 sola columna */
  transition: border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    border-color: var(--gold-border);
    transform: translateY(-5px);
    box-shadow: var(--shadow-gold);
  }
`

export const CardImage = styled.div`
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
    padding: 2rem;
    transition: transform 0.5s ease;
  }

  ${ProductCard}:hover & img {
    transform: scale(1.06);
  }
`

export const CardInfo = styled.div`
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
  flex: 1;
`

export const CardName = styled.h3`
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.25rem;
  font-weight: 400;
  color: var(--text);
  letter-spacing: 0.05em;
  margin-bottom: 0.3rem;
`

export const CardDesc = styled.p`
  font-family: 'Jost', sans-serif;
  font-size: 0.78rem;
  color: var(--text-dim);
  letter-spacing: 0.04em;
  line-height: 1.5;
  /* Limit description to 3 lines max */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  max-width: 100%;
`

export const CategoryBadge = styled.span`
  display: inline-block;
  margin-top: 0.5rem;
  padding: 0.2rem 0.7rem;
  background: var(--badge-bg);
  color: var(--gold);
  font-family: 'Jost', sans-serif;
  font-size: 0.62rem;
  font-weight: 400;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  border: 1px solid var(--gold-border);
`

export const CardMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-top: auto;

  .price {
    font-family: 'Jost', sans-serif;
    font-size: 1.1rem;
    font-weight: 500;
    color: var(--gold);
    letter-spacing: 0.06em;
  }
`

export const AddCartBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  background: transparent;
  border: 1px solid var(--gold-border);
  color: var(--gold);
  font-family: 'Jost', sans-serif;
  font-size: 0.7rem;
  font-weight: 400;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  transition: all 0.25s ease;

  &:hover {
    background: var(--gold);
    color: var(--bg-dark);
    border-color: var(--gold);
  }

  &:disabled {
    background: var(--bg-elevated);
    color: var(--text-muted);
    border-color: var(--border);
    cursor: not-allowed;
    pointer-events: none;
  }
`

// ── Search & Filters toolbar ──────────────────────────────
export const FiltersToolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 1.25rem;
  margin-bottom: 2.5rem;
`

export const SearchField = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  max-width: 20vw;
  flex: 1 1 220px;
  padding: 0.55rem 1rem;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  transition: border-color 0.25s;

  &:focus-within {
    border-color: var(--gold-border);
  }

  svg { color: var(--text-muted); flex-shrink: 0; }

  input {
    background: none;
    border: none;
    outline: none;
    width: 100%;
    font-family: 'Jost', sans-serif;
    font-size: 0.8rem;
    color: var(--text);
    letter-spacing: 0.06em;

    &::placeholder { color: var(--text-muted); }
  }

  @media (max-width: 640px) {
    max-width: 90vw;
  }
`

// ── Price range slider ────────────────────────────────────
export const SliderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  min-width: 200px;
`

export const SliderLabel = styled.span`
  font-family: 'Jost', sans-serif;
  font-size: 0.65rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--text-muted);
`

export const SliderRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
`

export const RangeInput = styled.input.attrs({ type: 'range' })`
  flex: 1;
  accent-color: var(--gold);
  cursor: pointer;
  height: 2px;
`

export const SliderValue = styled.span`
  font-family: 'Jost', sans-serif;
  font-size: 0.7rem;
  color: var(--gold);
  min-width: 52px;
  text-align: right;
`

// ── Sort selector ─────────────────────────────────────────
export const SortSelect = styled.select`
  padding: 0.55rem 1rem;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  color: var(--text);
  font-family: 'Jost', sans-serif;
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  outline: none;
  cursor: pointer;
  transition: border-color 0.25s;

  &:focus { border-color: var(--gold-border); }
`

// ── Infinite scroll sentinel & spinner ───────────────────
export const ScrollSentinel = styled.div`
  height: 1px;
  margin-top: 2rem;
`

export const LoadingRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  padding: 2rem 0;
  font-family: 'Jost', sans-serif;
  font-size: 0.75rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--text-muted);
`

export const Spinner = styled.span`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid var(--border);
  border-top-color: var(--gold);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;

  @keyframes spin { to { transform: rotate(360deg); } }
`

export const EndMessage = styled.p`
  text-align: center;
  padding: 1.5rem 0 3rem;
  font-family: 'Jost', sans-serif;
  font-size: 0.7rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--text-muted);
`
