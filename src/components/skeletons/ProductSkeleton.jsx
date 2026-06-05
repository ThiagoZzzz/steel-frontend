import styled from 'styled-components'
import {
  ProductCard,
  CardInfo,
  CardMeta,
} from '../../pages/products/style'
import { SkeletonBlock, SkeletonText } from '../common/styles/skeleton'

/* Contenedor propio para la imagen skeleton.
   Usa position: relative + aspect-ratio para definir el espacio,
   y el SkeletonBlock se posiciona absolute adentro para no afectar
   el cálculo de tamaño intrínseco del grid item. */
const SkeletonImage = styled.div`
  position: relative;
  aspect-ratio: 1 / 1;
  min-width: 0;
  width: 100%;
  background: var(--bg-elevated);
  overflow: hidden;
`

const SkeletonImageFill = styled(SkeletonBlock)`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
`

const ProductCardSkeleton = () => (
  <ProductCard style={{ pointerEvents: 'none' }}>
    <SkeletonImage>
      <SkeletonImageFill />
    </SkeletonImage>

    <CardInfo>
      <div>
        {/* Name */}
        <SkeletonBlock $height="1.25rem" $width="70%" style={{ marginBottom: '0.5rem' }} />
        {/* Description lines */}
        <SkeletonText />
        <SkeletonText />
        {/* Category badge */}
        <SkeletonBlock $height="1.2rem" $width="5rem" style={{ marginTop: '0.5rem' }} />
      </div>

      <CardMeta>
        {/* Price */}
        <SkeletonBlock $height="1.1rem" $width="4rem" />
        {/* Add to Cart button */}
        <SkeletonBlock $height="2.4rem" $width="8rem" />
      </CardMeta>
    </CardInfo>
  </ProductCard>
)

const ProductSkeleton = ({ count = 6 }) => (
  <>
    {Array.from({ length: count }, (_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </>
)

export default ProductSkeleton
