'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Mail, X } from 'lucide-react'

export default function OrderCTA() {
  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const ctaRef = useRef<HTMLButtonElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section label animation with enhanced reveal
      gsap.fromTo('.section-label',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 60%' } }
      )

      // Headline animation with enhanced reveal
      gsap.fromTo(headlineRef.current,
        { y: 80, scale: 0.9, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 55%' } }
      )

      // Subtext animation with enhanced reveal
      gsap.fromTo('.order-subtext',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.1, scrollTrigger: { trigger: sectionRef.current, start: 'top 50%' } }
      )

      // CTA button animation with enhanced reveal
      gsap.fromTo(ctaRef.current,
        { y: 40, scale: 0.9, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.7)', scrollTrigger: { trigger: sectionRef.current, start: 'top 45%' } }
      )

      // Pulse animation for CTA
      gsap.to(ctaRef.current, {
        scale: 1.04,
        duration: 0.2,
        ease: 'power2.out',
        delay: 1.0,
        yoyo: true,
        repeat: 1,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 45%' }
      })

      // Set video playback speed
      if (videoRef.current) {
        videoRef.current.playbackRate = 2.0
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="order"
      ref={sectionRef}
      style={{
        minHeight: '85vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '80px 48px',
        position: 'relative',
      }}
    >
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          zIndex: 0,
        }}
      >
        <source src="/video/order-bg.mp4" type="video/mp4" />
      </video>

      {/* Overlay - 30% opacity for 70% video visibility */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(8,8,8,0.3)',
          zIndex: 1,
        }}
      />
      {/* Top Rule */}
      <hr className="rule-hot" style={{ width: '100%', marginBottom: '64px', zIndex: 2, position: 'relative' }} />

      {/* Centered Content */}
      <div style={{ maxWidth: '700px', textAlign: 'center', zIndex: 2, position: 'relative' }}>
        <span className="section-label" style={{ display: 'block', marginBottom: '24px' }}>
          READY TO FUEL UP?
        </span>

        <h1
          ref={headlineRef}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(80px, 15vw, 180px)',
            color: 'var(--iron-cream)',
            letterSpacing: '8px',
            lineHeight: 0.9,
            marginBottom: '24px',
          }}
        >
          ORDER NOW
        </h1>

        <p
          className="order-subtext"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '18px',
            color: 'var(--iron-muted)',
            marginBottom: '32px',
          }}
        >
          Delivering to Shoreditch · Dalston · Hackney · Bethnal Green · Aldgate
        </p>

        <div
          className="order-subtext"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            color: 'var(--iron-muted)',
            marginBottom: '40px',
            display: 'flex',
            justifyContent: 'center',
            gap: '24px',
            flexWrap: 'wrap',
          }}
        >
          <span>Min. 40G PROTEIN ON EVERY ITEM</span>
          <span>·</span>
          <span>Ready in 25 min</span>
          <span>·</span>
          <span>£1.99 delivery</span>
        </div>

        <button
          ref={ctaRef}
          className="btn-order"
          style={{ fontSize: 26, padding: '24px 80px' }}
        >
          ORDER NOW →
        </button>

        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            color: 'var(--iron-muted)',
            marginTop: '32px',
          }}
        >
          Mon–Sun · 11:00 AM – 11:30 PM
        </p>
      </div>

      {/* Footer Strip */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: '#080808',
          borderTop: '1px solid var(--iron-border)',
          padding: '24px 48px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 2,
        }}
      >
        <span style={{ fontFamily: 'var(--font-display)', fontSize: '18px' }}>
          IRON<span style={{ color: 'var(--iron-orange)' }}>PLATE</span>™
        </span>

        <div style={{ display: 'flex', gap: '16px' }}>
          <a
            href="#"
            style={{ color: 'var(--iron-cream)', opacity: 0.6, transition: 'opacity 0.2s ease' }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '0.6'}
          >
            <Mail size={20} />
          </a>
          <a
            href="#"
            style={{ color: 'var(--iron-cream)', opacity: 0.6, transition: 'opacity 0.2s ease' }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '0.6'}
          >
            <X size={20} />
          </a>
        </div>
      </div>
    </section>
  )
}
