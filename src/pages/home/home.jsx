import { useNavigate } from 'react-router-dom'
import Carousel from '../../components/common/carousel'
import CarouselSkeleton from '../../components/skeletons/CarouselSkeleton'
import { useProducts } from '../../hooks/queries/useProducts'

import {
  HomeContainer,
  HeroSection,
  HeroOverlay,
  HeroData,
  HeroEyebrow,
  HeroMedia,
  CTAButton,
  FeaturedBlock,
  FeaturedLabel,
  FeaturedDivider,
} from './style'

const Home = () => {
  const navigate = useNavigate()
  const { data: featuredProducts, isPending } = useProducts({ featured: true, limit: 10 })

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

      </HeroSection>

      <FeaturedBlock>
        <FeaturedDivider />
        <FeaturedLabel>Featured Timepieces</FeaturedLabel>
        <FeaturedDivider />
      </FeaturedBlock>

      {isPending ? (
        <CarouselSkeleton count={4} />
      ) : (
        <Carousel products={featuredProducts?.products} />
      )}

    </HomeContainer>
  )
}

export default Home
