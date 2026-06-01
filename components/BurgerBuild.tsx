'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { INGREDIENTS } from '@/lib/data'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

export default function BurgerBuild() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [imagesExist, setImagesExist] = useState(true)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true })

      INGREDIENTS.forEach((_, i) => {
        tl.fromTo(
          `.ingredient-layer-${i}`,
          { y: -100, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'bounce.out' },
          i * 0.7
        )
      })

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.8,
        animation: tl,
        onUpdate: (self) => {
          const idx = Math.min(
            Math.floor(self.progress * INGREDIENTS.length),
            INGREDIENTS.length - 1
          )
          setActiveIndex(idx)
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const cumulativeProtein = INGREDIENTS.slice(0, activeIndex + 1).reduce((sum, ing) => sum + ing.protein, 0)

  return (
    <section
      ref={sectionRef}
      id="build"
      style={{
        minHeight: '100vh',
        background: 'var(--iron-bg)',
        position: 'relative',
      }}
    >
      {/* Sticky Container */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          background: 'radial-gradient(ellipse 60% 40% at 50% 100%, rgba(232,80,26,0.12) 0%, transparent 70%), var(--iron-bg)',
        }}
      >
        {/* Protein Counter - Top Right */}
        <div
          style={{
            position: 'absolute',
            top: '40px',
            right: '48px',
            textAlign: 'right',
            zIndex: 10,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '72px',
              color: 'var(--iron-orange)',
              lineHeight: 1,
            }}
          >
            {cumulativeProtein}G
          </span>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--iron-muted)', marginTop: '4px' }}>
            PROTEIN BUILT
          </p>
        </div>

        {/* Main Content */}
        <div
          style={{
            display: 'flex',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '80px',
            padding: '0 48px',
          }}
        >
          {/* Ingredient Stack - Center */}
          <div
            style={{
              width: '600px',
              height: '500px',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column-reverse',
              alignItems: 'center',
            }}
          >
            {INGREDIENTS.map((ingredient, i) => (
              <div
                key={i}
                className={`ingredient-layer-${i}`}
                style={{
                  position: 'absolute',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  zIndex: i,
                }}
              >
                {imagesExist ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <Image
                      className={`ingredient-image-${i}`}
                      src={ingredient.src}
                      alt={ingredient.label}
                      width={420}
                      height={80}
                      style={{
                        objectFit: 'fill',
                        maxWidth: '100%',
                        display: 'block',
                      }}
                      onError={() => setImagesExist(false)}
                    />
                    <span
                      className={`ingredient-label-${i}`}
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '14px',
                        color: 'var(--iron-orange)',
                        whiteSpace: 'nowrap',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                      }}
                    >
                      {ingredient.label}
                    </span>
                  </div>
                ) : (
                  <div
                    style={{
                      width: '100%',
                      height: `${30 + (i % 5) * 10}px`,
                      background: 'var(--iron-elevated)',
                      border: '1px solid var(--iron-border)',
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-body)',
                      fontSize: '12px',
                      color: 'var(--iron-muted)',
                    }}
                  >
                    {ingredient.label}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Panel - Ingredient Info */}
          <div
            style={{
              width: '300px',
              position: 'relative',
            }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '36px',
                color: 'var(--iron-cream)',
                marginBottom: '8px',
                lineHeight: 1,
              }}
            >
              {INGREDIENTS[activeIndex]?.label}
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '18px',
                color: 'var(--iron-orange)',
                marginBottom: '24px',
              }}
            >
              +{INGREDIENTS[activeIndex]?.protein}g
            </p>

            {/* Progress Bar */}
            <div
              style={{
                width: '100%',
                height: '4px',
                background: 'var(--iron-elevated)',
                borderRadius: '2px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${((activeIndex + 1) / INGREDIENTS.length) * 100}%`,
                  height: '100%',
                  background: 'var(--iron-orange)',
                  transition: 'width 0.3s ease',
                }}
              />
            </div>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                color: 'var(--iron-muted)',
                marginTop: '8px',
              }}
            >
              {activeIndex + 1} / {INGREDIENTS.length} layers
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
