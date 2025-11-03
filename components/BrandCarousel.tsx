'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import styles from './BrandCarousel.module.css'

interface Brand {
  id: number
  name: string
  logo: string
  description?: string
}

interface BrandCarouselProps {
  brands: Brand[]
  autoplay?: boolean
  autoplayInterval?: number
  visibleCount?: {
    desktop?: number
    tablet?: number
    mobile?: number
  }
}

export default function BrandCarousel({
  brands,
  autoplay = true,
  autoplayInterval = 3000,
  visibleCount = { desktop: 5, tablet: 3, mobile: 2 }
}: BrandCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [activeDescription, setActiveDescription] = useState<number | null>(null)
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set())
  const [visibleBrands, setVisibleBrands] = useState(visibleCount.desktop || 5)
  const carouselRef = useRef<HTMLDivElement>(null)
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null)

  const maxIndex = Math.max(0, brands.length - visibleBrands)

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 640) {
        setVisibleBrands(visibleCount.mobile || 2)
      } else if (width < 1024) {
        setVisibleBrands(visibleCount.tablet || 3)
      } else {
        setVisibleBrands(visibleCount.desktop || 5)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [visibleCount])

  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex)
    }
  }, [maxIndex, currentIndex])

  const startAutoplay = useCallback(() => {
    if (autoplay && !isPaused && brands.length > visibleBrands) {
      autoplayTimerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
      }, autoplayInterval)
    }
  }, [autoplay, isPaused, autoplayInterval, maxIndex, brands.length, visibleBrands])

  const stopAutoplay = useCallback(() => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current)
      autoplayTimerRef.current = null
    }
  }, [])

  useEffect(() => {
    startAutoplay()
    return () => stopAutoplay()
  }, [startAutoplay, stopAutoplay])

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1))
    stopAutoplay()
  }

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1))
    stopAutoplay()
  }

  const handleMouseEnter = () => {
    setIsPaused(true)
    stopAutoplay()
  }

  const handleMouseLeave = () => {
    setIsPaused(false)
    setActiveDescription(null)
    startAutoplay()
  }

  const handleKeyDown = (e: React.KeyboardEvent, brandId: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setActiveDescription(activeDescription === brandId ? null : brandId)
    } else if (e.key === 'Escape') {
      setActiveDescription(null)
    }
  }

  const handleImageLoad = (brandId: number) => {
    setLoadedImages((prev) => new Set(prev).add(brandId))
  }

  const translateX = -(currentIndex * (100 / visibleBrands))

  return (
    <div
      className={styles.carouselContainer}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={carouselRef}
      role="region"
      aria-label="Brand showcase carousel"
    >
      <button
        className={`${styles.navButton} ${styles.navButtonPrev}`}
        onClick={handlePrevious}
        disabled={currentIndex === 0}
        aria-label="Previous brands"
        style={{ opacity: currentIndex === 0 ? 0.3 : 1 }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>

      <div className={styles.carouselViewport}>
        <div
          className={styles.carouselTrack}
          style={{
            transform: `translateX(${translateX}%)`,
            width: `${(brands.length / visibleBrands) * 100}%`
          }}
          role="list"
        >
          {brands.map((brand) => (
            <div
              key={brand.id}
              className={styles.brandItem}
              style={{ width: `${100 / brands.length}%` }}
              role="listitem"
            >
              <div
                className={styles.brandCard}
                onMouseEnter={() => brand.description && setActiveDescription(brand.id)}
                onMouseLeave={() => setActiveDescription(null)}
                onClick={() => brand.description && setActiveDescription(activeDescription === brand.id ? null : brand.id)}
                onKeyDown={(e) => brand.description && handleKeyDown(e, brand.id)}
                tabIndex={0}
                role="button"
                aria-label={`${brand.name}${brand.description ? ': Click for description' : ''}`}
                aria-expanded={brand.description ? activeDescription === brand.id : undefined}
              >
                <div className={styles.logoWrapper}>
                  {!loadedImages.has(brand.id) && (
                    <div className={styles.logoSkeleton} aria-hidden="true" />
                  )}
                  <img
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    className={styles.logo}
                    loading="lazy"
                    onLoad={() => handleImageLoad(brand.id)}
                    style={{ opacity: loadedImages.has(brand.id) ? 1 : 0 }}
                  />
                  {brand.description && (
                    <div
                      className={`${styles.descriptionOverlay} ${
                        activeDescription === brand.id ? styles.descriptionVisible : ''
                      }`}
                      role="tooltip"
                      aria-hidden={activeDescription !== brand.id}
                    >
                      <p className={styles.descriptionText}>{brand.description}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        className={`${styles.navButton} ${styles.navButtonNext}`}
        onClick={handleNext}
        disabled={currentIndex >= maxIndex}
        aria-label="Next brands"
        style={{ opacity: currentIndex >= maxIndex ? 0.3 : 1 }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>

      <div className={styles.indicators} role="tablist" aria-label="Carousel position">
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <button
            key={index}
            className={`${styles.indicator} ${index === currentIndex ? styles.indicatorActive : ''}`}
            onClick={() => {
              setCurrentIndex(index)
              stopAutoplay()
            }}
            aria-label={`Go to slide ${index + 1}`}
            aria-selected={index === currentIndex}
            role="tab"
          />
        ))}
      </div>
    </div>
  )
}
