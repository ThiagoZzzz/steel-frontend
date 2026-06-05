import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PlusIcon } from '@phosphor-icons/react'
import { PRODUCT_CATEGORIES } from '../../data/products'
import { useCartActions } from '../../hooks/useCartActions'
import { useProducts } from '../../hooks/queries/useProducts'
import ProductSkeleton from '../../components/skeletons/ProductSkeleton'

import {
  ProductsContainer,
  ProductsHeader,
  ProductsEyebrow,
  FilterBar,
  FilterBtn,
  ProductGrid,
  ProductCard,
  CardImage,
  CardInfo,
  CardName,
  CardDesc,
  CategoryBadge,
  CardMeta,
  AddCartBtn,
} from './style'

const Products = () => {
  const [activeCategory, setActiveCategory] = useState('all')
  const { handleAddToCart } = useCartActions()

  // queries
  const { data, isPending, isError, error } = useProducts();

  if (isError) return <p>Error: {error.message}</p>

  const filtered = !data
    ? []
    : activeCategory === 'all'
      ? data
      : data.filter((p) => p.category === activeCategory)

  return (
    <ProductsContainer>
      <ProductsHeader>
        <ProductsEyebrow>— The Collection</ProductsEyebrow>
        <h1>Every Watch<br />A Statement.</h1>
        {!isPending && data && (
          <p>
            {filtered.length} timepiece{filtered.length !== 1 ? 's' : ''} available
          </p>
        )}
      </ProductsHeader>

      <FilterBar>
        {PRODUCT_CATEGORIES.map((cat) => (
          <FilterBtn
            key={cat}
            $active={cat === activeCategory}
            aria-pressed={cat === activeCategory}
            onClick={() => setActiveCategory(cat.toLocaleLowerCase())}
            disabled={isPending}
          >
            {cat}
          </FilterBtn>
        ))}
      </FilterBar>

      <ProductGrid>
        {isPending ? (
          <ProductSkeleton count={10} />
        ) : (
          filtered.map((product) => (
          <ProductCard key={product.id}>
              <Link to={`/products/${product.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <CardImage>
                  <img src={product.image} alt={product.name} loading="lazy" />
                </CardImage>
              </Link>
              <CardInfo>
                <div>
                  <Link to={`/products/${product.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <CardName>{product.name}</CardName>
                  </Link>
                  <CardDesc>{product.description}</CardDesc>
                  <CategoryBadge>{product.category}</CategoryBadge>
                </div>
                <CardMeta>
                  <span className="price">${product.price}</span>
                  <AddCartBtn
                    onClick={() => handleAddToCart(product)}
                    aria-label={`Add ${product.name} to cart`}
                  >
                    <PlusIcon size={24} />
                    Add to Cart
                  </AddCartBtn>
                </CardMeta>
              </CardInfo>
            </ProductCard>
          ))
        )}
      </ProductGrid>
    </ProductsContainer>
  )
}

export default Products
