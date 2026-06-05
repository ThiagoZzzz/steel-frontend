import styled from 'styled-components';
import { Main } from '../../components/common/styles/layout';

export const ContactUsContainer = styled(Main)`
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  padding: 120px 6vw 6rem;
  background: var(--bg-dark);
  min-height: 100vh;
  gap: 3rem;
  max-width: 900px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 120px 5vw 4rem;
  }
`;

export const ContactCard = styled.div`
  display: flex;
  gap: 3rem;
  padding-bottom: 2.5rem;
  border-bottom: 1px solid var(--gold-border);
  flex-wrap: wrap;

  @media (max-width: 600px) {
    gap: 2rem;
  }
`;

export const InfoColumn = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
`;

export const InfoIcon = styled.div`
  flex-shrink: 0;
  margin-top: 2px;
`;

export const InfoTitle = styled.h4`
  font-family: 'Jost', sans-serif;
  font-size: 0.7rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--gold);
`;

export const InfoText = styled.p`
  font-family: 'Jost', sans-serif;
  font-size: 0.9rem;
  color: var(--text-dim);
  letter-spacing: 0.04em;
`;

export const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const BrandName = styled.h2`
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.4rem;
  font-weight: 400;
  color: var(--text);
  letter-spacing: 0.04em;
  margin-bottom: 0.25rem;
`;

export const ContactSubtitle = styled.p`
  font-family: 'Jost', sans-serif;
  font-size: 0.8rem;
  color: var(--text-dim);
  letter-spacing: 0.04em;
  margin-bottom: 1.5rem;
`;

export const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

