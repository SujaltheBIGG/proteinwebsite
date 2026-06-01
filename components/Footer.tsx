'use client'
import { ArrowUp } from 'lucide-react'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Footer info grid animations
      gsap.fromTo('.footer-info-grid button',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.05, scrollTrigger: { trigger: footerRef.current, start: 'top 90%' } }
      )

      // Logo and scroll to top animations
      gsap.fromTo('footer h2',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: footerRef.current, start: 'top 85%' } }
      )
      gsap.fromTo('footer button[aria-label="Scroll to top"]',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.2, scrollTrigger: { trigger: footerRef.current, start: 'top 85%' } }
      )

      // Bottom bar animations
      gsap.fromTo('footer > div:last-of-type span, footer > div:last-of-type button',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.1, scrollTrigger: { trigger: footerRef.current, start: 'top 80%' } }
      )
    }, footerRef)
    return () => ctx.revert()
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer ref={footerRef} style={{ background: 'var(--iron-bg)', position: 'relative' }}>
      {/* Footer Info Grid */}
      <div
        className="footer-info-grid"
        style={{
          position: 'relative',
          zIndex: 1,
          padding: 'clamp(48px, 6vw, 80px) clamp(28px, 5vw, 72px) clamp(40px, 5vw, 64px)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '24px',
        }}
      >
        <div>
          <button
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '15px',
              color: '#fff',
              lineHeight: '2.2',
              display: 'block',
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              textAlign: 'left',
              textDecoration: 'none',
              transition: 'color 0.25s ease, transform 0.25s ease',
              fontWeight: 600,
            }}
          >
            Home
          </button>
          <button
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '15px',
              color: 'rgba(255,255,255,0.65)',
              lineHeight: '2.2',
              display: 'block',
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              textAlign: 'left',
              textDecoration: 'none',
              transition: 'color 0.25s ease, transform 0.25s ease',
            }}
          >
            About Us
          </button>
          <button
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '15px',
              color: 'rgba(255,255,255,0.65)',
              lineHeight: '2.2',
              display: 'block',
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              textAlign: 'left',
              textDecoration: 'none',
              transition: 'color 0.25s ease, transform 0.25s ease',
            }}
          >
            Community
          </button>
          <button
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '15px',
              color: 'rgba(255,255,255,0.65)',
              lineHeight: '2.2',
              display: 'block',
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              textAlign: 'left',
              textDecoration: 'none',
              transition: 'color 0.25s ease, transform 0.25s ease',
            }}
          >
            Menu
          </button>
        </div>
        <div>
          <button
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '15px',
              color: 'rgba(255,255,255,0.65)',
              lineHeight: '2.2',
              display: 'block',
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              textAlign: 'left',
              textDecoration: 'none',
              transition: 'color 0.25s ease, transform 0.25s ease',
            }}
          >
            Login
          </button>
          <button
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '15px',
              color: 'rgba(255,255,255,0.65)',
              lineHeight: '2.2',
              display: 'block',
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              textAlign: 'left',
              textDecoration: 'none',
              transition: 'color 0.25s ease, transform 0.25s ease',
            }}
          >
            Register
          </button>
        </div>
        <div style={{ textAlign: 'right' }}>
          <button
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '15px',
              color: 'rgba(255,255,255,0.65)',
              lineHeight: '2.2',
              display: 'block',
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              textAlign: 'right',
              textDecoration: 'none',
              transition: 'color 0.25s ease, transform 0.25s ease',
              marginLeft: 'auto',
            }}
          >
            Facebook
          </button>
          <button
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '15px',
              color: 'rgba(255,255,255,0.65)',
              lineHeight: '2.2',
              display: 'block',
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              textAlign: 'right',
              textDecoration: 'none',
              transition: 'color 0.25s ease, transform 0.25s ease',
              marginLeft: 'auto',
            }}
          >
            Instagram
          </button>
          <button
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '15px',
              color: 'rgba(255,255,255,0.65)',
              lineHeight: '2.2',
              display: 'block',
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              textAlign: 'right',
              textDecoration: 'none',
              transition: 'color 0.25s ease, transform 0.25s ease',
              marginLeft: 'auto',
            }}
          >
            Tiktok
          </button>
        </div>
      </div>

      {/* Logo and Scroll to Top */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: '16px',
          padding: '0 clamp(28px, 5vw, 72px)',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(36px, 10vw, 240px)',
            lineHeight: 0.82,
            color: 'var(--iron-cream)',
            letterSpacing: '0.01em',
            fontWeight: 700,
            userSelect: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          IRON<span style={{ color: 'var(--iron-orange)' }}>PLATE</span>™
        </h2>
        <button
          aria-label="Scroll to top"
          onClick={scrollToTop}
          style={{
            width: 'clamp(48px, 8vw, 72px)',
            height: 'clamp(48px, 8vw, 72px)',
            borderRadius: '50%',
            background: '#E07A5F',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            marginBottom: '24px',
            transition: 'transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease',
            boxShadow: '0 4px 24px rgba(224,122,95,0.3)',
          }}
        >
          <ArrowUp size={22} color="white" strokeWidth={2.5} />
        </button>
      </div>

      {/* Bottom Bar */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          borderTop: '1px solid rgba(255,255,255,0.08)',
          padding: '20px clamp(28px, 5vw, 72px)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '13px',
            color: 'rgba(255,255,255,0.4)',
            letterSpacing: '0.02em',
          }}
        >
          © All rights reserved 2026
        </span>
        <div style={{ display: 'flex', gap: '32px' }}>
          <button
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              color: 'rgba(255,255,255,0.4)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              letterSpacing: '0.02em',
              transition: 'color 0.25s ease',
            }}
          >
            Terms and Conditions
          </button>
          <button
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              color: 'rgba(255,255,255,0.4)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              letterSpacing: '0.02em',
              transition: 'color 0.25s ease',
            }}
          >
            Privacy Policy
          </button>
        </div>
      </div>
    </footer>
  )
}
