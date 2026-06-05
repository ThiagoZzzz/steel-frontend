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
  transition: background 0.25s ease, color 0.25s ease;

  &:hover {
    background: var(--gold);
    color: var(--bg-dark);
    border-color: var(--gold);
  }
`
