import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeftIcon, ShoppingCartIcon } from '@phosphor-icons/react'
import { useProductBySlug } from '../../hooks/queries/useProducts'
import { useCartActions } from '../../hooks/useCartActions'

import {
  DetailContainer,
  BackLink,
  DetailGrid,
  ImagePanel,
  InfoPanel,
  Eyebrow,
  ProductTitle,
  PriceTag,
  Divider,
  Description,
  MetaRow,
  Badge,
  StockInfo,
  AddCartBtn,
  ErrorState,
  SkeletonBox,
} from './style'

// ── Skeleton ────────────────────────────────────────────────────────────────
const DetailSkeleton = () => (
  <DetailGrid>
    <SkeletonBox style={{ aspectRatio: '4/5' }} />
    <InfoPanel style={{ animation: 'none', gap: '1.5rem', paddingTop: '0.5rem' }}>
      <SkeletonBox style={{ height: '12px', width: '90px' }} />
      <SkeletonBox style={{ height: '48px', width: '80%' }} />
      <SkeletonBox style={{ height: '28px', width: '110px' }} />
      <SkeletonBox style={{ height: '1px', width: '100%' }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <SkeletonBox style={{ height: '14px', width: '100%' }} />
        <SkeletonBox style={{ height: '14px', width: '85%' }} />
        <SkeletonBox style={{ height: '14px', width: '60%' }} />
      </div>
      <SkeletonBox style={{ height: '50px', width: '100%' }} />
    </InfoPanel>
  </DetailGrid>
)

// ── Page ─────────────────────────────────────────────────────────────────────
const ProductDetail = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { handleAddToCart } = useCartActions()

  const { data: product, isPending, isError, error } = useProductBySlug(slug)

  const inStock = Number(product?.stock) > 0

  if (isError) {
    return (
      <DetailContainer>
        <ErrorState>
          <h2>Product not found</h2>
          <p>{error?.message ?? 'The product you are looking for does not exist.'}</p>
          <BackLink onClick={() => navigate('/products')}>
            <ArrowLeftIcon size={14} />
            Back to collection
          </BackLink>
        </ErrorState>
      </DetailContainer>
    )
  }

  return (
    <DetailContainer>
      <BackLink onClick={() => navigate('/products')}>
        <ArrowLeftIcon size={14} />
        Back to collection
      </BackLink>

      {isPending ? (
        <DetailSkeleton />
      ) : (
        <DetailGrid>
          {/* ── Image ── */}
          <ImagePanel>
            <img src={product.image} alt={product.name} />
          </ImagePanel>

          {/* ── Info ── */}
          <InfoPanel>
            <div>
              <Eyebrow>{product.category ?? 'Timepiece'}</Eyebrow>
              <ProductTitle>{product.name}</ProductTitle>
            </div>

            <PriceTag>${product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</PriceTag>

            <Divider />

            {product.description && (
              <Description>{product.description}</Description>
            )}

            <MetaRow>
              {product.category && <Badge>{product.category}</Badge>}
              <StockInfo $available={inStock}>
                {inStock ? `${product.stock} in stock` : 'Out of stock'}
              </StockInfo>
            </MetaRow>

            <AddCartBtn
              onClick={() => handleAddToCart(product)}
              disabled={!inStock}
              id={`add-to-cart-${product.slug}`}
              aria-label={`Add ${product.name} to cart`}
            >
              <ShoppingCartIcon size={18} />
              {inStock ? 'Add to Cart' : 'Out of Stock'}
            </AddCartBtn>
          </InfoPanel>
        </DetailGrid>
      )}
    </DetailContainer>
  )
}

export default ProductDetail
