import { useRef, useState, useEffect, useCallback } from 'react';
import { CaretLeftIcon, CaretRightIcon, PlusIcon } from '@phosphor-icons/react';
import {
  CarouselSection,
  CarouselContainer,
  CarouselTrack,
  CarouselCard,
  CardContent,
  CarouselBtn,
  AddCartBtn,
  Indicators,
  Dot
} from './styles/carousel';

import { useCartActions } from '../../hooks/useCartActions';

const Carousel = ({ products = [] }) => {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);
  const { handleAddToCart } = useCartActions();

  const updateActive = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const maxScroll = track.scrollWidth - track.clientWidth;
    let newIndex = 0;

    if (maxScroll > 0) {
      const scrollRatio = track.scrollLeft / maxScroll; // Esto da entre 0.0 y 1.0 EXACTOS
      newIndex = Math.round(scrollRatio * (products.length - 1));
    }
    setActive(newIndex);
  }, [products.length]);


  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => {
      requestAnimationFrame(updateActive);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [updateActive]);

  const scrollByPage = (dir = 1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollLeft += dir * el.offsetWidth;
  };

  useEffect(() => {
    const onKey = (e) => {
      if (document.activeElement?.closest('[data-carousel-track]')) {
        if (e.key === 'ArrowLeft') scrollByPage(-1);
        if (e.key === 'ArrowRight') scrollByPage(1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const goTo = (index) => {
    const el = trackRef.current;
    if (!el) return;
    const x = index * el.offsetWidth;
    el.scrollTo({ left: x, behavior: 'smooth' });
  };

  return (
    <CarouselSection>
      <CarouselContainer aria-roledescription="carousel">
        <CarouselBtn
          className="prev"
          aria-label="Previous"
          onClick={() => scrollByPage(-1)}
        >
          <CaretLeftIcon size={22} weight="bold" />
        </CarouselBtn>

        <CarouselTrack ref={trackRef} role="list" data-carousel-track>
          {products.map((p) => (
            <CarouselCard key={p.id} role="listitem" tabIndex={0} aria-label={p.name}>
              <CardContent>
                <img src={p.image} alt={p.name} loading="lazy" />
                <h3>{p.name}</h3>
                <p>{p.price}</p>
                <AddCartBtn
                  onClick={() => handleAddToCart(p)}
                  aria-label={`Add ${p.name} to cart`}
                >
                  <PlusIcon size={24} />
                  Add to Cart
                </AddCartBtn>
              </CardContent>
            </CarouselCard>
          ))}
        </CarouselTrack>

        <CarouselBtn
          className="next"
          aria-label="Next"
          onClick={() => scrollByPage(1)}
        >
          <CaretRightIcon size={22} weight="bold" />
        </CarouselBtn>
      </CarouselContainer>

      <Indicators aria-hidden={products.length <= 1 ? true.toString() : undefined}>
        {products.map((_, i) => (
          <Dot
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            $active={i === active}
            onClick={() => goTo(i)}
          />
        ))}
      </Indicators>
    </CarouselSection>
  );
};

export default Carousel;