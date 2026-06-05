import styled, { keyframes } from 'styled-components'

/* ── Shimmer animation ──────────────────────────── */
const shimmer = keyframes`
  0%   { background-position: -400px 0; }
  100% { background-position: 400px 0; }
`

/* ── Base skeleton block ────────────────────────── */
export const SkeletonBlock = styled.div`
  background: linear-gradient(
    90deg,
    var(--bg-elevated) 0%,
    rgba(201, 168, 76, 0.06) 50%,
    var(--bg-elevated) 100%
  );
  background-size: 800px 100%;
  animation: ${shimmer} 1.8s ease-in-out infinite;
  border-radius: ${({ $radius }) => $radius || '2px'};
  width: ${({ $width }) => $width || '100%'};
  height: ${({ $height }) => $height || '1rem'};
`

/* ── Text line skeleton ─────────────────────────── */
export const SkeletonText = styled(SkeletonBlock)`
  height: 0.75rem;
  margin-bottom: 0.5rem;

  &:last-child {
    width: 60%;
  }
`
