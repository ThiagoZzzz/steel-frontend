import styled from 'styled-components'
import { Main } from '../../components/common/styles/layout'

export const LoginContainer = styled(Main)`
  background: var(--bg-dark);
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 0 1rem;
`

export const LoginCard = styled.div`
  width: 100%;
  max-width: 500px;
  background: var(--bg-card);
  border: 1px solid var(--gold-border);
  padding: 3rem 2.5rem 2rem;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
  }

  @media (max-width: 480px) {
    padding: 2.5rem 1.5rem 1.5rem;
    margin: 6rem 0 1rem 0;
  }
`

export const CardBodyWrapper = styled.div``

export const CardBody = styled.div`
  display: flex;
  flex-direction: column;
`

export const BrandName = styled.div`
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.6rem;
  font-weight: 400;
  letter-spacing: 0.25em;
  color: var(--gold);
  text-align: center;
  margin-bottom: 2rem;
`

export const LoginTitle = styled.h2`
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.6rem;
  font-weight: 400;
  color: var(--text);
  margin-bottom: 0.4rem;
  letter-spacing: 0.02em;
`

export const LoginSubtitle = styled.p`
  font-family: 'Jost', sans-serif;
  font-size: 0.8rem;
  color: var(--text-dim);
  letter-spacing: 0.04em;
  margin-bottom: 2rem;
`

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`
export const CardFooter = styled.div`
  margin-top: 1.75rem;
  text-align: center;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border);

  p {
    font-family: 'Jost', sans-serif;
    font-size: 0.8rem;
    color: var(--text-dim);
    letter-spacing: 0.04em;
  }
`

export const LinkSignup = styled.span`
  font-family: 'Jost', sans-serif;
  color: var(--gold);
  border-bottom: 1px solid var(--gold-border);
  padding-bottom: 1px;
  transition: border-color 0.2s ease;

  &:hover { border-color: var(--gold); }
`

