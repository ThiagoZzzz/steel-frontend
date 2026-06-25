import styled, { keyframes } from 'styled-components'
import { Main } from '../../components/common/styles/layout'

/* ── Keyframes ─────────────────────────────────────────────────────────── */

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
`

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`

const revealScale = keyframes`
  from { opacity: 0; transform: scale(0.96); }
  to   { opacity: 1; transform: scale(1); }
`

const shimmer = keyframes`
  0%   { opacity: 0.4; }
  50%  { opacity: 0.8; }
  100% { opacity: 0.4; }
`

const goldPulse = keyframes`
  0%, 100% { opacity: 0.15; }
  50%      { opacity: 0.3; }
`

/* ── Layout ────────────────────────────────────────────────────────────── */

export const DetailContainer = styled(Main)`
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  padding: 110px 8vw 8rem;
  background: var(--bg-dark);
  min-height: 100vh;
  position: relative;

  /* Subtle atmospheric gradient — depth without noise */
  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 50vh;
    background: radial-gradient(
      ellipse 80% 50% at 25% 0%,
      rgba(201, 168, 76, 0.04) 0%,
      transparent 70%
    );
    pointer-events: none;
    z-index: 0;
  }

  & > * {
    position: relative;
    z-index: 1;
  }
`

export const BackLink = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  padding: 0;
  font-family: 'Jost', sans-serif;
  font-size: 0.7rem;
  font-weight: 400;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--text-muted);
  cursor: pointer;
  transition: color 0.3s ease, gap 0.3s ease;
  margin-bottom: 3.5rem;
  animation: ${fadeIn} 0.5s ease both;

  svg {
    transition: transform 0.3s ease;
  }

  &:hover {
    color: var(--gold);
    gap: 0.7rem;

    svg {
      transform: translateX(-2px);
    }
  }
`

/* Asymmetric golden-ratio-inspired grid: image gets more breathing room */
export const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  gap: clamp(3rem, 6vw, 7rem);
  align-items: start;
  max-width: 1280px;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    gap: 3rem;
    max-width: 600px;
  }
`

/* ── Image ──────────────────────────────────────────────────────────────── */

export const ImagePanel = styled.div`
  position: sticky;
  top: 100px;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  aspect-ratio: 4 / 5;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${revealScale} 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;

  /* Radial gold glow behind the product — cinematic depth */
  &::after {
    content: '';
    position: absolute;
    inset: 15%;
    background: radial-gradient(
      circle at center,
      rgba(201, 168, 76, 0.06) 0%,
      transparent 70%
    );
    pointer-events: none;
    animation: ${goldPulse} 4s ease-in-out infinite;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: clamp(1.5rem, 4vw, 3.5rem);
    transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    position: relative;
    z-index: 1;
  }

  &:hover img {
    transform: scale(1.06);
  }

  @media (max-width: 960px) {
    position: static;
    aspect-ratio: 1 / 1;
    max-height: 420px;
  }
`

/* ── Info ───────────────────────────────────────────────────────────────── */

export const InfoPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  padding-top: 0.5rem;
  animation: ${fadeUp} 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.15s both;
`

export const Eyebrow = styled.span`
  font-family: 'Jost', sans-serif;
  font-size: 0.65rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--gold);
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 0.75rem;

  &::before {
    content: '';
    display: inline-block;
    width: 20px;
    height: 1px;
    background: var(--gold);
  }
`

export const ProductTitle = styled.h1`
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2rem, 3.5vw, 3rem);
  font-weight: 300;
  color: var(--text);
  line-height: 1.12;
  letter-spacing: 0.02em;
`

export const PriceTag = styled.p`
  font-family: 'Jost', sans-serif;
  font-size: clamp(1.5rem, 2.5vw, 1.8rem);
  font-weight: 300;
  color: var(--gold);
  letter-spacing: 0.08em;
`

export const Divider = styled.hr`
  border: none;
  height: 1px;
  background: linear-gradient(
    90deg,
    var(--gold-border) 0%,
    var(--border) 40%,
    transparent 100%
  );
  margin: 0.25rem 0;
`

export const Description = styled.p`
  font-family: 'Jost', sans-serif;
  font-size: 0.88rem;
  font-weight: 300;
  color: var(--text-dim);
  letter-spacing: 0.03em;
  line-height: 1.85;
  max-width: 460px;
  /* Graceful cap at 8 lines — avoids runaway long descriptions */
  display: -webkit-box;
  -webkit-line-clamp: 8;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

export const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.85rem;
  flex-wrap: wrap;
`

export const Badge = styled.span`
  display: inline-block;
  padding: 0.28rem 0.9rem;
  background: var(--badge-bg);
  color: var(--gold);
  font-family: 'Jost', sans-serif;
  font-size: 0.6rem;
  font-weight: 400;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  border: 1px solid var(--gold-border);
`

export const StockInfo = styled.span`
  font-family: 'Jost', sans-serif;
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ $available }) => ($available ? 'var(--text-dim)' : '#e06c75')};

  /* Availability dot indicator */
  &::before {
    content: '';
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    margin-right: 6px;
    vertical-align: middle;
    background: ${({ $available }) => ($available ? '#48bb78' : '#e06c75')};
    box-shadow: ${({ $available }) =>
      $available
        ? '0 0 8px rgba(72, 187, 120, 0.4)'
        : '0 0 8px rgba(224, 108, 117, 0.4)'};
  }
`

export const AddCartBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  width: 100%;
  padding: 1.05rem 2rem;
  background: var(--gold);
  border: none;
  color: var(--bg-dark);
  font-family: 'Jost', sans-serif;
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  transition: background 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease;
  margin-top: 0.5rem;

  &:hover {
    background: var(--gold-bright);
    box-shadow: 0 0 40px rgba(201, 168, 76, 0.3);
    transform: translateY(-1px);
  }

  &:active {
    transform: scale(0.985);
  }

  &:disabled {
    background: var(--bg-elevated);
    color: var(--text-muted);
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
    border: 1px solid var(--border);
  }
`

/* ── Error state ───────────────────────────────────────────────────────── */

export const ErrorState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 55vh;
  gap: 1.25rem;
  text-align: center;
  animation: ${fadeUp} 0.6s ease both;

  h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(1.8rem, 3vw, 2.4rem);
    font-weight: 300;
    color: var(--text);
  }

  p {
    font-family: 'Jost', sans-serif;
    font-size: 0.82rem;
    color: var(--text-dim);
    letter-spacing: 0.06em;
    max-width: 400px;
    line-height: 1.7;
  }
`

/* ── Skeleton ──────────────────────────────────────────────────────────── */

export const SkeletonBox = styled.div`
  background: var(--bg-elevated);
  border-radius: 2px;
  animation: ${shimmer} 1.8s ease-in-out infinite;
`
