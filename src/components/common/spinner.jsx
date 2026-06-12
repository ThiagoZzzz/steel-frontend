import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`

const SpinnerElement = styled.div`
  width: ${({ $size }) => $size || '30px'};
  height: ${({ $size }) => $size || '30px'};
  border: ${({ $thickness }) => $thickness || '3px'} solid var(--border);
  border-top-color: ${({ $color }) => $color || 'var(--gold)'};
  border-radius: 50%;
  animation: ${spin} ${({ $speed }) => $speed || '0.8s'} linear infinite;
  flex-shrink: 0;
`

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ $padding }) => $padding || '2rem 0'};
  width: 100%;
`

/**
 * A reusable luxury spinner component for loading states.
 * 
 * Props:
 * - size: CSS width/height (default: '30px')
 * - color: CSS color for the active spinner track (default: 'var(--gold)')
 * - thickness: CSS border width (default: '3px')
 * - speed: Animation duration (default: '0.8s')
 * - center: If true, wraps the spinner in a centered flex container (default: false)
 * - padding: Padding for the centered container (default: '2rem 0')
 */
const Spinner = ({ 
  size, 
  color, 
  thickness, 
  speed, 
  center = false, 
  padding,
  ...props 
}) => {
  const spinner = (
    <SpinnerElement 
      $size={size} 
      $color={color} 
      $thickness={thickness} 
      $speed={speed} 
      {...props} 
    />
  )

  if (center) {
    return <CenteredContainer $padding={padding}>{spinner}</CenteredContainer>
  }

  return spinner
}

export default Spinner
