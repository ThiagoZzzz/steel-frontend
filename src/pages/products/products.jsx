import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { PlusIcon, MagnifyingGlassIcon } from '@phosphor-icons/react'
import { useCartActions } from '../../hooks/useCartActions'
import { useProductsInfinite } from '../../hooks/queries/useProducts'
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
  FiltersToolbar,
  SearchField,
  SliderWrapper,
  SliderLabel,
  SliderRow,
  RangeInput,
  SliderValue,
  SortSelect,
  ScrollSentinel,
  LoadingRow,
  Spinner,
  EndMessage,
} from './style'

// ─── Debounce hook ──────────────────────────────────────────
function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(t)
  }, [value, delay])
  return debounced
}

// Categorías
const PRODUCT_CATEGORIES = ['all', 'classic', 'luxury', 'sport'];

// Precio máximo de referencia para el slider
const MAX_PRICE = 12000

// ─── Component ─────────────────────────────────────────────
const Products = () => {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchInput, setSearchInput] = useState('')
  const [priceMin, setPriceMin] = useState(0)
  const [priceMax, setPriceMax] = useState(MAX_PRICE)
  // valor commiteado al API (solo cambia en onPointerUp para evitar requests en cada px del drag)
  const [committedPrice, setCommittedPrice] = useState({ min: 0, max: MAX_PRICE })
  const [sort, setSort] = useState('')
  const [discountFilter, setDiscountFilter] = useState(false)
  const [featuredFilter, setFeaturedFilter] = useState(false)

  const debouncedSearch = useDebounce(searchInput, 300)
  const { handleAddToCart } = useCartActions()
  const sentinelRef = useRef(null)

  // ── Construir filtros para la API ──
  const filters = {}
  if (activeCategory !== 'all') filters.category = activeCategory
  if (debouncedSearch) filters.search = debouncedSearch
  if (committedPrice.min > 0) filters['price[gte]'] = committedPrice.min
  if (committedPrice.max < MAX_PRICE) filters['price[lte]'] = committedPrice.max
  if (discountFilter) filters.discount = true
  if (featuredFilter) filters.featured = true
  if (sort) filters.sort = sort

  // ── Infinite query ──
  const {
    data,
    isPending,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useProductsInfinite(filters)

  // Aplanar todas las páginas en un único array (cada página tiene { products, meta })
  const products = data?.pages.flatMap((p) => p.products) ?? []
  const totalCount = data?.pages[0]?.meta?.total ?? 0

  // ── IntersectionObserver para infinite scroll ──
  const handleObserver = useCallback(
    (entries) => {
      const [entry] = entries
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage()
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  )

  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return
    const observer = new IntersectionObserver(handleObserver, { threshold: 0.1 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [handleObserver])

  // ── Helpers de filtros ──
  const handleCategoryChange = (cat) => {
    setActiveCategory(cat.toLowerCase())
  }

  const handlePriceCommit = () => {
    setCommittedPrice({ min: priceMin, max: priceMax })
  }

  if (isError) return <p>Error: {error.message}</p>

  return (
    <ProductsContainer>
      <ProductsHeader>
        <ProductsEyebrow>— The Collection</ProductsEyebrow>
        <h1>Every Watch<br />A Statement.</h1>
        {!isPending && (
          <p>{totalCount} timepiece{totalCount !== 1 ? 's' : ''} available</p>
        )}
      </ProductsHeader>

      {/* ── Filtros de categoría ── */}
      <FilterBar>
        {PRODUCT_CATEGORIES.map((cat) => (
          <FilterBtn
            key={cat}
            $active={cat.toLowerCase() === activeCategory}
            aria-pressed={cat.toLowerCase() === activeCategory}
            onClick={() => handleCategoryChange(cat)}
            disabled={isPending}
          >
            {cat}
          </FilterBtn>
        ))}
      </FilterBar>

      {/* ── búsqueda + slider + sort ── */}
      <FiltersToolbar>
        {/* Búsqueda por nombre */}
        <SearchField>
          <MagnifyingGlassIcon size={16} />
          <input
            id="product-search"
            type="text"
            placeholder="Search timepieces…"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </SearchField>

        {/* Slider de rango de precio */}
        <SliderWrapper>
          <SliderLabel>Price Range</SliderLabel>
          <SliderRow>
            <RangeInput
              id="price-min"
              min={0}
              max={MAX_PRICE}
              step={200}
              value={priceMin}
              onChange={(e) => {
                const v = Number(e.target.value)
                if (v <= priceMax) setPriceMin(v)
              }}
              onPointerUp={handlePriceCommit}
              onMouseUp={handlePriceCommit}
            />
            <SliderRow style={{ gap: '0.25rem' }}>
              <RangeInput
                id="price-max"
                min={0}
                max={MAX_PRICE}
                step={200}
                value={priceMax}
                onChange={(e) => {
                  const v = Number(e.target.value)
                  if (v >= priceMin) setPriceMax(v)
                }}
                onPointerUp={handlePriceCommit}
                onMouseUp={handlePriceCommit}
              />
            </SliderRow>
            <SliderValue>
              {priceMin > 0 ? `$${priceMin.toLocaleString()} – ` : ''}
              ${priceMax === MAX_PRICE ? '∞' : priceMax.toLocaleString()}
            </SliderValue>
          </SliderRow>
        </SliderWrapper>

        {/* Filtros booleanos */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <FilterBtn
            $active={discountFilter}
            aria-pressed={discountFilter}
            onClick={() => setDiscountFilter(!discountFilter)}
            disabled={isPending}
            style={{ padding: '0.55rem 0.85rem', fontSize: '0.65rem' }}
            title="Toggle products with discount"
          >
            Discount
          </FilterBtn>
          <FilterBtn
            $active={featuredFilter}
            aria-pressed={featuredFilter}
            onClick={() => setFeaturedFilter(!featuredFilter)}
            disabled={isPending}
            style={{ padding: '0.55rem 0.85rem', fontSize: '0.65rem' }}
            title="Toggle featured products"
          >
            Featured
          </FilterBtn>
        </div>

        {/* Ordenamiento */}
        <SortSelect
          id="product-sort"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          aria-label="Sort products"
        >
          <option value="">Latest first</option>
          <option value="price">Price: Low → High</option>
          <option value="-price">Price: High → Low</option>
          <option value="name">Name A → Z</option>
          <option value="-name">Name Z → A</option>
        </SortSelect>
      </FiltersToolbar>

      {/* ── Grid de productos ── */}
      <ProductGrid>
        {isPending ? (
          <ProductSkeleton count={12} />
        ) : (
          products.map((product) => (
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
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginTop: '0.5rem' }}>
                    <CategoryBadge style={{ marginTop: 0 }}>{product.category}</CategoryBadge>
                    {Number(product.stock) === 0 && (
                      <span style={{ color: '#e53e3e', fontSize: '0.62rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                        • Out of Stock
                      </span>
                    )}
                  </div>
                </div>
                <CardMeta>
                  <span className="price">${product.price}</span>
                  <AddCartBtn
                    onClick={() => handleAddToCart(product)}
                    aria-label={`Add ${product.name} to cart`}
                    disabled={Number(product.stock) === 0}
                  >
                    {Number(product.stock) === 0 ? (
                      'Out of Stock'
                    ) : (
                      <>
                        <PlusIcon size={24} />
                        Add to Cart
                      </>
                    )}
                  </AddCartBtn>
                </CardMeta>
              </CardInfo>
            </ProductCard>
          ))
        )}
      </ProductGrid>

      {/* infinite scroll */}
      {isFetchingNextPage && (
        <LoadingRow>
          <Spinner />
          Loading more…
        </LoadingRow>
      )}

      {!hasNextPage && products.length > 0 && (
        <EndMessage>— End of Collection —</EndMessage>
      )}

      {/* Elemento observado por IntersectionObserver */}
      <ScrollSentinel ref={sentinelRef} />
    </ProductsContainer>
  )
}

export default Products
