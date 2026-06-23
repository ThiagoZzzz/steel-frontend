import styled, { css } from 'styled-components'
import { Main } from './layout'

/* ─── Page wrapper (used by admin, profile, checkout) ─── */
export const PageWrapper = styled(Main)`
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  padding: 120px 6vw 6rem;
  background: var(--bg-dark);
  min-height: 100vh;
`

export const PageHeader = styled.header`
  margin-bottom: 2.5rem;

  h1 {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 300;
    color: var(--text);
    line-height: 1.05;
    margin: 0.5rem 0 0.75rem;
  }

  p {
    font-family: 'Jost', sans-serif;
    font-size: 0.8rem;
    letter-spacing: 0.12em;
    color: var(--text-muted);
    text-transform: uppercase;
  }
`

export const Eyebrow = styled.span`
  font-family: 'Jost', sans-serif;
  font-size: 0.7rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--gold);
  display: block;
  margin-bottom: 0.5rem;
`

/* ─── Tab navigation ─── */
export const TabBar = styled.nav`
  display: flex;
  justify-content: space-between;
  margin-bottom: 3rem;
  border-bottom: 1px solid var(--border);
  overflow-x: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
`

export const TabButton = styled.button`
  position: relative;
  padding: 0.85rem 1.6rem;
  background: transparent;
  border: none;
  font-family: 'Jost', sans-serif;
  font-size: 0.72rem;
  font-weight: 400;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${({ $active }) => ($active ? 'var(--gold)' : 'var(--text-dim)')};
  cursor: pointer;
  transition: color 0.25s ease;
  white-space: nowrap;

  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--gold);
    transform: scaleX(${({ $active }) => ($active ? 1 : 0)});
    transition: transform 0.3s ease;
  }

  &:hover {
    color: var(--gold);
  }
`

/* ─── Status badge ─── */
const statusColors = {
  pending: { bg: 'rgba(255,255,255,0.06)', color: 'var(--text-dim)', border: 'var(--border)' },
  ready: { bg: 'rgba(72,187,120,0.10)', color: '#48bb78', border: 'rgba(72,187,120,0.25)' },
  cancel: { bg: 'rgba(229,62,62,0.10)', color: '#e53e3e', border: 'rgba(229,62,62,0.25)' },
  admin: { bg: 'rgba(201,168,76,0.12)', color: 'var(--gold)', border: 'var(--gold-border)' },
  user: { bg: 'rgba(255,255,255,0.06)', color: 'var(--text-dim)', border: 'var(--border)' },
  instock: { bg: 'rgba(72,187,120,0.10)', color: '#48bb78', border: 'rgba(72,187,120,0.25)' },
  lowstock: { bg: 'rgba(237,137,54,0.10)', color: '#ed8936', border: 'rgba(237,137,54,0.25)' },
  outofstock: { bg: 'rgba(229,62,62,0.10)', color: '#e53e3e', border: 'rgba(229,62,62,0.25)' },
}

export const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.2rem 0.75rem;
  font-family: 'Jost', sans-serif;
  font-size: 0.62rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  border-radius: 2px;
  ${({ $status }) => {
    const s = statusColors[$status] || statusColors.pending
    return css`
      background: ${s.bg};
      color: ${s.color};
      border: 1px solid ${s.border};
    `
  }}
`

/* ─── Data table ─── */
export const DataTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`

export const TableHead = styled.thead`
  th {
    font-family: 'Jost', sans-serif;
    font-size: 0.65rem;
    font-weight: 500;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--text-muted);
    text-align: left;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid var(--gold-border);
  }
`

export const TableBody = styled.tbody`
  tr {
    border-bottom: 1px solid var(--border);
    transition: background 0.2s ease;

    &:hover {
      background: var(--bg-card);
    }
  }

  td {
    font-family: 'Jost', sans-serif;
    font-size: 0.82rem;
    font-weight: 300;
    color: var(--text);
    padding: 0.85rem 1rem;
    letter-spacing: 0.03em;
    vertical-align: middle;
  }
`

/* ─── Action buttons (for table rows) ─── */
export const ActionBtn = styled.button`
  padding: 0.4rem 0.9rem;
  background: transparent;
  font-family: 'Jost', sans-serif;
  font-size: 0.65rem;
  font-weight: 400;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.25s ease;

  ${({ $variant }) => {
    if ($variant === 'danger') return css`
      border: 1px solid rgba(229,62,62,0.3);
      color: #e53e3e;
      &:hover {
        background: rgba(229,62,62,0.12);
        border-color: #e53e3e;
      }
    `
    return css`
      border: 1px solid var(--gold-border);
      color: var(--gold);
      &:hover {
        background: var(--gold);
        color: var(--bg-dark);
        border-color: var(--gold);
      }
    `
  }}
`

export const ActionGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`

/* ─── Modal ─── */
export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 3000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  animation: fadeIn 0.2s ease;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`

export const ModalBox = styled.div`
  background: var(--bg-surface);
  border: 1px solid var(--gold-border);
  width: 100%;
  max-width: ${({ $size }) => ($size === 'lg' ? '640px' : '440px')};
  max-height: 85vh;
  overflow-y: auto;
  padding: 2.5rem 2rem 2rem;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
  }

  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-thumb { background: var(--gold-border); border-radius: 2px; }

  @media (max-width: 480px) {
    padding: 2rem 1.25rem 1.5rem;
  }
`

export const ModalTitle = styled.h3`
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.5rem;
  font-weight: 400;
  color: var(--text);
  margin-bottom: 1.5rem;
  letter-spacing: 0.03em;
`

export const ModalCloseBtn = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  padding: 4px;
  transition: color 0.2s ease;

  &:hover { color: var(--text); }
`

export const ModalActions = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 2rem;
  justify-content: flex-end;
`

/* ─── Form primitives (unified across all pages) ─── */
export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-bottom: 1.25rem;

  label {
    font-family: 'Jost', sans-serif;
    font-size: 0.7rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--text-dim);
  }

  input, textarea, select {
    background: var(--bg-card);
    border: 1px solid ${({ $hasError, $isValid }) =>
      $hasError ? '#e53e3e' : $isValid ? 'var(--gold-dim)' : 'var(--border)'};
    color: var(--text);
    padding: 0.8rem 1rem;
    font-family: 'Jost', sans-serif;
    font-size: 0.88rem;
    outline: none;
    transition: border-color 0.25s ease;

    &::placeholder { color: var(--text-muted); }

    &:focus {
      border-color: ${({ $hasError }) =>
        $hasError ? '#e53e3e' : 'var(--gold-border)'};
    }
  }

  select {
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='7' viewBox='0 0 12 7'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%238a8070' stroke-width='1.5' fill='none' /%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 1rem center;
    padding-right: 2.5rem;
    cursor: pointer;
  }

  textarea {
    min-height: 120px;
    resize: vertical;
  }
`

// Backward-compatible alias — admin/checkout pages use FormGroup without validation props
export const FormGroup = InputGroup

export const InputError = styled.span`
  font-family: 'Jost', sans-serif;
  font-size: 0.7rem;
  color: #e53e3e;
  letter-spacing: 0.04em;
  margin-top: 0.1rem;
`

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`

export const FormRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;

  @media (max-width: 600px) {
    flex-direction: column;
  }

  & > ${InputGroup} {
    flex: 1;
    margin-bottom: 0;
  }
`

export const SuccessBanner = styled.div`
  text-align: center;
  padding: 2rem 1rem;
  background: var(--bg-card);
  border: 1px solid var(--gold-border);

  h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.4rem;
    font-weight: 400;
    color: var(--gold);
    margin-bottom: 0.4rem;
  }

  p {
    font-family: 'Jost', sans-serif;
    font-size: 0.82rem;
    color: var(--text-dim);
    letter-spacing: 0.04em;
  }
`

export const BtnPrimary = styled.button`
  padding: 0.85rem 2rem;
  background: var(--gold);
  border: none;
  color: var(--bg-dark);
  font-family: 'Jost', sans-serif;
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    background: var(--gold-bright);
    box-shadow: 0 0 24px rgba(201, 168, 76, 0.28);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export const BtnPrimaryFull = styled(BtnPrimary)`
  width: 100%;
`

export const BtnSecondary = styled.button`
  padding: 0.85rem 2rem;
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text-dim);
  font-family: 'Jost', sans-serif;
  font-size: 0.72rem;
  font-weight: 400;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  cursor: pointer;
  transition: border-color 0.25s ease, color 0.25s ease;

  &:hover {
    border-color: var(--gold-border);
    color: var(--text);
  }
`

/* ─── Avatar circle ─── */
export const AvatarCircle = styled.div`
  width: ${({ $size }) => $size || '40px'};
  height: ${({ $size }) => $size || '40px'};
  border-radius: 50%;
  background: var(--badge-bg);
  border: 1px solid var(--gold-border);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  span {
    font-family: 'Cormorant Garamond', serif;
    font-size: ${({ $size }) => $size ? `calc(${$size} * 0.4)` : '0.9rem'};
    font-weight: 600;
    color: var(--gold);
    text-transform: uppercase;
  }
`

/* ─── Empty state ─── */
export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 5rem 2rem;
  text-align: center;

  h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.3rem;
    font-weight: 400;
    color: var(--text);
  }

  p {
    font-family: 'Jost', sans-serif;
    font-size: 0.82rem;
    color: var(--text-dim);
    letter-spacing: 0.04em;
    max-width: 360px;
  }
`
