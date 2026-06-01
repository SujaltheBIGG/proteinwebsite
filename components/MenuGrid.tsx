'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MENU } from '@/lib/data'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

export default function MenuGrid() {
  const sectionRef = useRef<HTMLElement>(null)
  const [imageLoaded, setImageLoaded] = useState<{ [key: number]: boolean }>({})

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section header reveal
      gsap.fromTo('.menu-header-content',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } }
      )

      // Menu cards staggered reveal
      gsap.fromTo('.menu-card',
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.1, scrollTrigger: { trigger: '.menu-grid', start: 'top 80%' } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const scrollToOrder = () =>
    document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="menu" ref={sectionRef} style={{ padding: 'clamp(64px, 8vw, 120px) clamp(16px, 4vw, 80px)', background: 'var(--iron-bg)' }}>
      {/* Section Header */}
      <div className="menu-header-content" style={{ textAlign: 'center', marginBottom: '64px' }}>
        <span className="section-label" style={{ display: 'block', marginBottom: '16px' }}>— FULL MENU —</span>
        <h2 className="menu-headline" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(48px, 8vw, 80px)', color: 'var(--iron-cream)', letterSpacing: '4px', lineHeight: 1 }}>
          PICK YOUR <span style={{ color: 'var(--iron-orange)' }}>FUEL</span>
        </h2>
      </div>

      {/* Responsive Grid */}
      <div className="menu-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2px', maxWidth: '1200px', margin: '0 auto' }}>
        {MENU.map((item) => (
          <div
            key={item.id}
            className="menu-card"
            style={{
              background: 'var(--iron-surface)',
              borderLeft: '3px solid transparent',
              overflow: 'hidden',
              cursor: 'pointer',
              transform: 'translate(0)',
              transition: 'transform 0.3s, border-left 0.3s',
              display: 'flex',
              flexDirection: 'column',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.borderLeft = '3px solid var(--iron-orange)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.borderLeft = '3px solid transparent'
            }}
            onClick={scrollToOrder}
          >
            {/* Image with aspect ratio */}
            <div style={{ position: 'relative', paddingTop: '86.67%', overflow: 'hidden', flexShrink: 0 }}>
              {/* Fallback text */}
              <div style={{ position: 'absolute', inset: 0, background: 'var(--iron-elevated)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '20px', color: 'var(--iron-muted)', letterSpacing: '2px', textAlign: 'center', padding: '0 16px' }}>
                  {item.name}
                </span>
              </div>

              <Image
                src={item.image}
                alt={item.name}
                fill
                style={{ objectFit: 'cover', transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)', zIndex: 1 }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.08)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'
                }}
                onLoad={() => setImageLoaded(prev => ({ ...prev, [item.id]: true }))}
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                }}
              />
              
              {/* Tag badge */}
              <div style={{ position: 'absolute', top: '14px', left: '14px', zIndex: 2 }}>
                <span className="macro-pill" style={{ fontSize: '10px', padding: '4px 10px' }}>{item.tag}</span>
              </div>
            </div>

            {/* Content */}
            <div style={{ padding: '20px 24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', color: 'var(--iron-cream)', letterSpacing: '1px', lineHeight: 1 }}>
                {item.name}
              </h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--iron-muted)', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', marginBottom: '4px' }}>
                {item.desc}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span className="macro-pill">{item.protein}G PROTEIN</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--iron-muted)', letterSpacing: '1px' }}>{item.kcal} KCAL</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '8px' }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '22px', fontWeight: 700, color: 'var(--iron-cream)' }}>
                  {item.price}
                </span>
                <button style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--iron-orange)', background: 'transparent', border: 'none', cursor: 'pointer', letterSpacing: '1px', padding: 0, transition: 'opacity 0.2s ease' }}>
                  ORDER →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
