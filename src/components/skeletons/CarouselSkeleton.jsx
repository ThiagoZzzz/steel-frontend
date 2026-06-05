import {
  CarouselSection,
  CarouselContainer,
  CarouselTrack,
  CarouselCard,
  CardContent,
  Indicators,
  Dot,
} from '../common/styles/carousel'
import { SkeletonBlock, SkeletonText } from '../common/styles/skeleton'

const CarouselCardSkeleton = () => (
  <CarouselCard style={{ pointerEvents: 'none' }}>
    <CardContent>
      {/* Image area */}
      <SkeletonBlock
        $height="0"
        style={{ paddingBottom: '100%', width: '100%' }}
      />
      {/* Name */}
      <div style={{ padding: '1.25rem 1.25rem 0.25rem' }}>
        <SkeletonBlock $height="1.3rem" $width="65%" />
      </div>
      {/* Price */}
      <div style={{ padding: '0.5rem 1.25rem 1.25rem' }}>
        <SkeletonBlock $height="1rem" $width="4rem" />
      </div>
    </CardContent>
  </CarouselCard>
)

const CarouselSkeleton = ({ count = 4 }) => (
  <CarouselSection>
    <CarouselContainer>
      <CarouselTrack>
        {Array.from({ length: count }, (_, i) => (
          <CarouselCardSkeleton key={i} />
        ))}
      </CarouselTrack>
    </CarouselContainer>

    <Indicators>
      {Array.from({ length: count }, (_, i) => (
        <Dot key={i} $active={i === 0} style={{ pointerEvents: 'none' }} />
      ))}
    </Indicators>
  </CarouselSection>
)

export default CarouselSkeleton
