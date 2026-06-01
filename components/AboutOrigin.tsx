'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function AboutOrigin() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animations with enhanced reveal
      // Header reveal as one unit
      gsap.fromTo('.about-header-group',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } }
      )

      // Body text reveal as one unit
      gsap.fromTo('.about-body',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' } }
      )

      // Badges reveal together
      gsap.fromTo('.about-badges',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'back.out(1.7)', scrollTrigger: { trigger: sectionRef.current, start: 'top 55%' } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about-origin"
      className="about-origin"
      style={{
        background: 'var(--iron-bg)',
        paddingTop: '160px',
        paddingBottom: '100px',
        padding: 'clamp(48px, 6vw, 80px) clamp(28px, 5vw, 72px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '800px' }}>
        <div className="about-header-group">
          <p className="about-label section-label" style={{ marginBottom: '24px' }}>
            — WHO WE ARE —
          </p>
          <h2
            className="about-headline"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(56px, 7vw, 96px)',
              lineHeight: 0.88,
              color: 'var(--iron-cream)',
              marginBottom: '48px',
            }}
          >
            BUILT IN EAST LONDON.<br />
            FUELLED BY <span style={{ color: 'var(--iron-orange)' }}>OBSESSION.</span>
          </h2>
        </div>
        <div className="about-body" style={{ maxWidth: '640px' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '17px', color: 'var(--iron-muted)', lineHeight: 1.8, marginBottom: '24px' }}>
            IRONPLATE™ was born in 2021 in a 12-seat kitchen off Bethnal Green Road. Chef Marcus Webb spent three years testing smash techniques before serving a single burger to the public.
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '17px', color: 'var(--iron-muted)', lineHeight: 1.8 }}>
            The rule was simple: every item on the menu had to hit 40g of protein or it did not go on the board. No compromises on flavour. No shortcuts on sourcing. Just honest, high-performance food built for people who train hard. Today we serve over 3,800 meals a week across East London — and the rule has never changed.
          </p>
        </div>
        <div className="about-badges" style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '40px', flexWrap: 'wrap' }}>
          <span className="macro-pill">EST. 2021</span>
          <span className="macro-pill">SHOREDITCH, E1</span>
          <span className="macro-pill">40G+ EVERY ITEM</span>
        </div>
      </div>
    </section>
  )
}
