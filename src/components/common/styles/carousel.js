import styled from 'styled-components';

export const CarouselSection = styled.section`
  display:flex;
  flex-direction: column;
  align-items:center;
  justify-content:center;
  width: 100%;
  padding: 1rem 0 5rem;
  background: var(--bg-dark);
`;

export const CarouselContainer = styled.div`
  position: relative;
  width: 90%;
  max-width: 760px;
  margin: 0 auto;
  padding: 0 4rem;

  @media (max-width: 900px) {
    max-width: 100%;
    padding: 0 3.5rem;
  }

  @media (max-width: 600px) {
    padding: 0 3rem;
  }
`;

export const CarouselTrack = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  gap: 1.5rem;
  padding-bottom: 1rem;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar { display: none; }
`;

export const AddCartBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 0.85rem 2.4rem;
  background: transparent;
  border: 1px solid var(--gold);
  color: var(--gold);
  font-family: 'Jost', sans-serif;
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  transition: background 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    background: var(--gold);
    color: var(--bg-dark);
    box-shadow: 0 0 30px rgba(201, 168, 76, 0.3);

    &::after {
      transform: translateX(4px);
    }
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const CarouselCard = styled.div`
  flex: 0 0 calc(85% - 1rem);
  scroll-snap-align: start;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 2px;
  overflow: hidden;
  transition: border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  outline: none;

  &:hover, &:focus-visible {
    border-color: var(--gold-border);
    transform: translateY(-6px);
    box-shadow: var(--shadow-gold);
  }

  @media (max-width: 900px) {
    flex: 0 0 calc(50% - 0.75rem);
  }

  @media (max-width: 700px) {
    /* At narrow mid-range widths, show one full card + peek at next */
    flex: 0 0 calc(80% - 0.75rem);
  }

  @media (max-width: 560px) {
    flex: 0 0 85%;
  }
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;

  img {
    width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: contain;
    background: var(--bg-elevated);
    padding: 2rem;
    transition: transform 0.4s ease;
  }

  &:hover img {
    transform: scale(1.04);
  }

  h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.3rem;
    font-weight: 400;
    letter-spacing: 0.06em;
    color: var(--text);
    padding: 1.25rem 1.25rem 0.25rem;
  }

  p {
    font-family: 'Jost', sans-serif;
    font-size: 1rem;
    font-weight: 500;
    color: var(--gold);
    letter-spacing: 0.06em;
    padding: 0 1.25rem 1.25rem;

    &::before { content: '$'; }
  }
`;

export const CarouselBtn = styled.button`
  position: absolute;
  margin: .5rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  width: 36px;
  height: 36px;
  border: 1px solid var(--gold-border);
  background: rgba(10, 10, 10, 0.7);
  color: var(--gold);
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(8px);
  transition: background 0.25s ease, border-color 0.25s ease;

  &.prev { left: 0; }
  &.next { right: 0; }

  &:hover {
    background: var(--gold);
    border-color: var(--gold);
    color: var(--bg-dark);
  }
`;

export const Indicators = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 2rem;
`;

export const Dot = styled.button`
  width: ${({ $active }) => ($active ? '22px' : '6px')};
  height: 6px;
  border-radius: 3px;
  border: none;
  background: ${({ $active }) => ($active ? 'var(--gold)' : 'var(--text-muted)')};
  transition: width 0.3s ease, background 0.3s ease;
  padding: 0;
`;
