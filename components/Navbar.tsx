'use client'
import { useEffect, useState, useRef } from 'react'
import { Menu, X } from 'lucide-react'
import gsap from 'gsap'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // Add scroll-based background blur effect
    const handleScroll = () => {
      const scrollY = window.scrollY
      const nav = navRef.current
      if (nav) {
        if (scrollY > 50) {
          nav.style.background = 'rgba(13, 13, 13, 0.8)'
          nav.style.backdropFilter = 'blur(12px)'
          nav.style.borderBottom = '1px solid rgba(255, 255, 255, 0.07)'
        } else {
          nav.style.background = 'transparent'
          nav.style.backdropFilter = 'none'
          nav.style.borderBottom = '1px solid transparent'
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMobileMenuOpen(false)
  }

  const menuItems = [
    { label: 'Home', id: 'hero' },
    { label: 'Dishes', id: 'dishes' },
    { label: 'Build', id: 'build' },
    { label: 'Menu', id: 'menu' },
    { label: 'About', id: 'about-origin' },
    { label: 'Order', id: 'order' },
  ]

  return (
    <div>
      <nav ref={navRef} style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '20px 48px',
        background: 'transparent',
        backdropFilter: 'none',
        borderBottom: '1px solid transparent',
        transition: 'all 0.3s ease',
      }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 28, letterSpacing: 6 }}>
          IRON<span style={{ color: 'var(--iron-orange)' }}>PLATE</span>™
        </span>
        
        {/* Desktop Button */}
        <button
          className="btn-order desktop-only"
          style={{ fontSize: 16, padding: '14px 36px' }}
          onClick={() => scrollToSection('order')}
        >
          ORDER NOW
        </button>

        {/* Mobile Hamburger */}
        <button
          className="mobile-only"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--iron-cream)',
            cursor: 'pointer',
            padding: '8px',
          }}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(13, 13, 13, 0.98)',
          backdropFilter: 'blur(12px)',
          zIndex: 49,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '24px',
          padding: '24px',
          animation: 'fadeIn 0.3s ease-out',
        }}>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '32px',
                letterSpacing: 2,
                color: 'var(--iron-cream)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--iron-orange)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--iron-cream)'}
            >
              {item.label}
            </button>
          ))}
          <button
            className="btn-order"
            style={{ fontSize: 16, padding: '14px 36px', marginTop: '16px' }}
            onClick={() => scrollToSection('order')}
          >
            ORDER NOW
          </button>
        </div>
      )}
    </div>
  )
}
