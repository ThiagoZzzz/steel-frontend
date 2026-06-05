import { useNavigate } from 'react-router-dom'
import Carousel from '../../components/common/carousel'
import CarouselSkeleton from '../../components/skeletons/CarouselSkeleton'

import {
  HomeContainer,
  HeroSection,
  HeroOverlay,
  HeroData,
  HeroEyebrow,
  HeroMedia,
  HeroProduct,
  CTAButton,
  FeaturedBlock,
  FeaturedLabel,
  FeaturedDivider,
} from './style'

// TODO: reemplazar con un hook de API para productos destacados
// Ejemplo: const { data: featuredProducts, isPending } = useFeaturedProducts()
import { getFeaturedProducts } from '../../data/products'
const featuredProducts = getFeaturedProducts()
const isPending = false // ← cambiar a isPending del hook cuando se implemente

const Home = () => {
  const navigate = useNavigate()

  return (
    <HomeContainer>
      <HeroSection>
        <HeroMedia>
          <img
            src="/bg-hero.jpeg"
            alt="STEEL luxury backdrop"
            loading="eager"
          />
        </HeroMedia>

        <HeroOverlay />

        <HeroData>
          <HeroEyebrow>EST. 2010 — Luxury Timepieces</HeroEyebrow>
          <h1 style={{ color: '#f0ede8' }}>Elegance &<br />Precision.</h1>
          <p>
            If you want a watch that matches your attitude,
            your outfit, and your potential — you're in the right place.
          </p>
          <CTAButton onClick={() => navigate('/products')}>
            Explore Collection
          </CTAButton>
        </HeroData>

        <HeroProduct
          src="/reloj1.png"
          alt="Featured STEEL timepiece"
        />
      </HeroSection>

      <FeaturedBlock>
        <FeaturedDivider />
        <FeaturedLabel>Featured Timepieces</FeaturedLabel>
        <FeaturedDivider />
      </FeaturedBlock>

      {isPending ? (
        <CarouselSkeleton count={4} />
      ) : (
        <Carousel products={featuredProducts} />
      )}

    </HomeContainer>
  )
}

export default Home
