import styled, { keyframes } from 'styled-components';
import { Main } from '../../components/common/styles/layout';

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const floatWatch = keyframes`
  0%, 100% { transform: translateY(-50%) rotate(-8deg); }
  50%       { transform: translateY(-52%) rotate(-8deg); }
`;

export const HomeContainer = styled(Main)`
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  padding: 0;
  background-color: var(--bg-dark);
`

/* ─── Hero ─── */
export const HeroSection = styled.section`
  width: 100%;
  height: 100vh;
  height: 100svh;
  min-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  @media (max-width: 900px) {
    position: relative;
  }

  @media (max-width: 768px) {
    height: 100vh;
    height: 100svh;
    min-height: 560px;
  }
`;

export const HeroMedia = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 30%;
    filter: brightness(0.45) saturate(0.6);
  }
`;

export const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(
    120deg,
    rgba(10, 10, 10, 0.92) 0%,
    rgba(10, 10, 10, 0.6)  50%,
    rgba(10, 10, 10, 0.15) 100%
  );

  @media (max-width: 768px) {
    background: linear-gradient(
      180deg,
      rgba(10, 10, 10, 0.3) 0%,
      rgba(10, 10, 10, 0.88) 60%
    );
  }
`;

export const HeroData = styled.div`
  z-index: 10;
  max-width: 620px;
  padding: 0 3vw;
  animation: ${fadeUp} 0.9s ease both;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(3.5rem, 7vw, 6.5rem);
    font-weight: 300;
    color: var(--text);
    line-height: 1.0;
    margin: 0.5rem 0 1.25rem;
    letter-spacing: -0.01em;
  }

  p {
    font-family: 'Jost', sans-serif;
    font-size: clamp(0.85rem, 1.5vw, 1rem);
    font-weight: 300;
    color: var(--text-dim);
    max-width: 400px;
    line-height: 1.75;
    margin-bottom: 2.5rem;
    letter-spacing: 0.02em;
  }

  @media (max-width: 900px) {
    max-width: 100%;
  }

  @media (max-width: 768px) {
    padding: 0 6vw 10vh 6vw;
    max-width: 100%;

    p { max-width: 100%; }
  }
`;

export const HeroEyebrow = styled.p`
  font-family: 'Jost', sans-serif !important;
  font-size: 0.7rem !important;
  font-weight: 500 !important;
  letter-spacing: 0.22em !important;
  text-transform: uppercase;
  color: var(--gold) !important;
  margin-bottom: 0 !important;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &::before, &::after {
    content: '';
    display: inline-block;
    width: 24px;
    height: 1px;
    background: var(--gold);
  }
`;

export const CTAButton = styled.button`
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

  &::after {
    content: '→';
    transition: transform 0.25s ease;
  }

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

/* ─── Featured separator ─── */
export const FeaturedBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 4rem 6vw 2rem;
  width: 100%;
`;

export const FeaturedLabel = styled.span`
  font-family: 'Jost', sans-serif;
  font-size: 0.7rem;
  font-weight: 400;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--gold);
  white-space: nowrap;
`;

export const FeaturedDivider = styled.div`
  flex: 1;
  height: 1px;
  background: var(--gold-border);
`;
