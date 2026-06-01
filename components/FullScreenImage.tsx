'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function FullScreenImage() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax effect on image
      gsap.to('.fullscreen-image', {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      })

      gsap.fromTo('.fullscreen-image',
        { opacity: 0, scale: 1.1 },
        { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } }
      )

      gsap.fromTo('.fullscreen-content',
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="fullscreen-image"
      style={{
        position: 'relative',
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
        background: 'var(--iron-bg)',
      }}
    >
      <img
        src="/Final ironplate image/magnific__the-backgrouns-which-has-a-glow-on-the-right-corne__32661.png"
        alt="Ironplate"
        className="fullscreen-image"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
      
      {/* Dark Overlay - 65% opacity */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.65)',
          pointerEvents: 'none',
        }}
      />

      {/* Text Content */}
      <div
        className="fullscreen-content"
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          padding: '0 24px',
          zIndex: 1,
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(60px, 10vw, 120px)',
            lineHeight: 0.9,
            letterSpacing: '2px',
            marginBottom: '24px',
            color: 'var(--iron-cream)',
          }}
        >
          THE<br />
          <span style={{ color: 'var(--iron-orange)' }}>ALPHA</span><br />
          SALMON
        </h1>

        <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <span className="macro-pill">45G PROTEIN</span>
          <span className="macro-pill">480 KCAL</span>
          <span className="macro-pill">£13.50</span>
        </div>

        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(18px, 2.5vw, 24px)',
            color: 'var(--iron-muted)',
            maxWidth: '600px',
            lineHeight: 1.6,
          }}
        >
          Oak-smoked Scottish salmon. Diced capers & dill. Lean protein, elite fats.
        </p>
      </div>
    </section>
  )
}
