'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function AboutPillars() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animations with enhanced reveal
      gsap.fromTo('.pillars-header .section-label',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 60%' } }
      )
      gsap.fromTo('.pillars-header h3',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power4.out', delay: 0.15, scrollTrigger: { trigger: sectionRef.current, start: 'top 55%' } }
      )

      // Card animations with enhanced reveal and scale effect
      gsap.fromTo('.pillar-card',
        { y: 80, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)', stagger: 0.15, scrollTrigger: { trigger: sectionRef.current, start: 'top 50%' } }
      )

      // Add hover effect enhancement for cards
      const cards = sectionRef.current?.querySelectorAll('.pillar-card')
      cards?.forEach(card => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y: -8,
            duration: 0.3,
            ease: 'power2.out'
          })
        })
        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y: 0,
            duration: 0.3,
            ease: 'power2.out'
          })
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about-pillars"
      className="about-pillars"
      style={{
        background: 'var(--iron-bg)',
        borderBottom: '1px solid var(--iron-border)',
        paddingTop: '100px',
        paddingBottom: '120px',
        padding: 'clamp(48px, 6vw, 80px) clamp(28px, 5vw, 72px)',
      }}
    >
      {/* Header */}
      <div className="pillars-header" style={{ textAlign: 'center', marginBottom: '56px' }}>
        <p className="section-label" style={{ marginBottom: '16px' }}>— WHAT WE STAND FOR —</p>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(48px, 6vw, 80px)', lineHeight: 0.9, color: 'var(--iron-cream)' }}>
          THREE RULES. <span style={{ color: 'var(--iron-orange)' }}>NO EXCEPTIONS.</span>
        </h3>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px]" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1px', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Pillar 1 */}
        <div
          className="pillar-card"
          style={{
            background: 'var(--iron-surface)',
            borderTop: '3px solid var(--iron-orange)',
            padding: '40px 36px',
          }}
        >
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '72px', color: 'var(--iron-orange)', lineHeight: 1, marginBottom: '16px' }}>
            01
          </p>
          <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', color: 'var(--iron-cream)', lineHeight: 1, marginBottom: '16px' }}>
            PROTEIN FIRST. ALWAYS.
          </h4>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--iron-muted)', lineHeight: 1.7, maxWidth: '320px' }}>
            Every dish on our menu is engineered around a minimum of 40g of protein. We calculate macros before we finalise flavour. Performance is the brief — taste is the craft.
          </p>
          <span className="macro-pill" style={{ display: 'inline-block', marginTop: '24px' }}>
            40G MINIMUM
          </span>
        </div>

        {/* Pillar 2 */}
        <div
          className="pillar-card"
          style={{
            background: 'var(--iron-surface)',
            borderTop: '3px solid var(--iron-orange)',
            padding: '40px 36px',
          }}
        >
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '72px', color: 'var(--iron-orange)', lineHeight: 1, marginBottom: '16px' }}>
            02
          </p>
          <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', color: 'var(--iron-cream)', lineHeight: 1, marginBottom: '16px' }}>
            NO SHORTCUTS. EVER.
          </h4>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--iron-muted)', lineHeight: 1.7, maxWidth: '320px' }}>
            Our patties are hand-smashed to order. Our sauces are made fresh daily. We source British beef from farms within 100 miles of the restaurant. If it can be done properly, we do it properly.
          </p>
          <span className="macro-pill" style={{ display: 'inline-block', marginTop: '24px' }}>
            BRITISH BEEF
          </span>
        </div>

        {/* Pillar 3 */}
        <div
          className="pillar-card md:col-span-2 lg:col-span-1"
          style={{
            background: 'var(--iron-surface)',
            borderTop: '3px solid var(--iron-orange)',
            padding: '40px 36px',
          }}
        >
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '72px', color: 'var(--iron-orange)', lineHeight: 1, marginBottom: '16px' }}>
            03
          </p>
          <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', color: 'var(--iron-cream)', lineHeight: 1, marginBottom: '16px' }}>
            BUILT FOR THE GRIND.
          </h4>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--iron-muted)', lineHeight: 1.7, maxWidth: '320px' }}>
            IRONPLATE was designed around people who train hard and eat with purpose. Whether it is post-leg day or pre-shift, every meal is built to fuel whatever comes next.
          </p>
          <span className="macro-pill" style={{ display: 'inline-block', marginTop: '24px' }}>
            EAST LONDON
          </span>
        </div>
      </div>
    </section>
  )
}
