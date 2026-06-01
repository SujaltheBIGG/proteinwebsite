'use client'
import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronLeft, ChevronRight, Play, Utensils, ThumbsUp, ThumbsDown, Star } from 'lucide-react'
import { MENU } from '@/lib/data'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

export default function DishShowcase() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [activeTab, setActiveTab] = useState<'overview' | 'ingredients'>('overview')
  const sectionRef = useRef<HTMLElement>(null)
  const leftColRef = useRef<HTMLDivElement>(null)
  const rightColRef = useRef<HTMLDivElement>(null)

  const dish = MENU[activeIndex]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(leftColRef.current, 
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } }
      )
      gsap.fromTo(rightColRef.current,
        { x: 40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: 'power2.out', delay: 0.1, scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const handlePrev = () => setActiveIndex((prev) => (prev === 0 ? MENU.length - 1 : prev - 1))
  const handleNext = () => setActiveIndex((prev) => (prev === MENU.length - 1 ? 0 : prev + 1))

  return (
    <section ref={sectionRef} id="dishes" style={{ minHeight: '100vh', background: 'var(--iron-bg)', padding: '80px 48px', display: 'flex', alignItems: 'center' }}>
      <div style={{ display: 'flex', width: '100%', maxWidth: '1400px', margin: '0 auto', gap: '48px', flexDirection: 'row' }}>
        {/* Left Column - 58% */}
        <div ref={leftColRef} style={{ flex: '0 0 58%', display: 'flex', flexDirection: 'column' }}>
          <span className="section-label" style={{ marginBottom: '24px' }}>{dish.tag}</span>
          
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(56px, 7vw, 100px)', lineHeight: 0.9, marginBottom: '40px' }}>
            {dish.name.split(' ').slice(0, -1).join(' ')} <span style={{ color: 'var(--iron-orange)' }}>{dish.name.split(' ').pop()}</span>
          </h2>

          {/* Circular Dish Image */}
          <div style={{ position: 'relative', width: '420px', height: '420px', margin: '0 auto 32px' }}>
            <div style={{ width: '100%', height: '100%', borderRadius: '50%', border: '4px solid var(--iron-orange)', boxShadow: '0 0 60px var(--iron-orange-glow)', overflow: 'hidden', background: 'var(--iron-surface)', position: 'relative' }}>
              <img
                src={dish.image}
                alt={dish.name}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                }}
              />
            </div>
          </div>

          {/* Action Row */}
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '32px' }}>
            <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: 'transparent', border: '1px solid var(--iron-border)', color: 'var(--iron-cream)', fontFamily: 'var(--font-body)', fontSize: '14px', cursor: 'pointer', transition: 'all 0.2s ease' }}>
              <Play size={16} /> Play video
            </button>
            <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: 'transparent', border: '1px solid var(--iron-border)', color: 'var(--iron-cream)', fontFamily: 'var(--font-body)', fontSize: '14px', cursor: 'pointer', transition: 'all 0.2s ease' }}>
              <Utensils size={16} /> Order food
            </button>
          </div>

          {/* Thumbnail Strip */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', justifyContent: 'center' }}>
            <button onClick={handlePrev} style={{ background: 'transparent', border: 'none', color: 'var(--iron-cream)', cursor: 'pointer', padding: '8px' }}>
              <ChevronLeft size={24} />
            </button>
            <div style={{ display: 'flex', gap: '12px' }}>
              {MENU.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => setActiveIndex(idx)}
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    border: activeIndex === idx ? '3px solid var(--iron-orange)' : '2px solid var(--iron-border)',
                    opacity: activeIndex === idx ? 1 : 0.5,
                    background: 'var(--iron-surface)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = 'none'
                    }}
                  />
                </button>
              ))}
            </div>
            <button onClick={handleNext} style={{ background: 'transparent', border: 'none', color: 'var(--iron-cream)', cursor: 'pointer', padding: '8px' }}>
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Right Column - 42% */}
        <div ref={rightColRef} style={{ flex: '0 0 42%' }}>
          <div style={{ background: 'var(--iron-surface)', border: '1px solid var(--iron-border)', padding: '32px', borderRadius: '16px' }}>
            {/* Tab Row */}
            <div style={{ display: 'flex', gap: '24px', marginBottom: '32px', borderBottom: '1px solid var(--iron-border)', paddingBottom: '16px' }}>
              <button
                onClick={() => setActiveTab('overview')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: activeTab === 'overview' ? 'var(--iron-cream)' : 'var(--iron-muted)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '16px',
                  cursor: 'pointer',
                  borderBottom: activeTab === 'overview' ? '2px solid var(--iron-orange)' : '2px solid transparent',
                  paddingBottom: '8px',
                }}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('ingredients')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: activeTab === 'ingredients' ? 'var(--iron-cream)' : 'var(--iron-muted)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '16px',
                  cursor: 'pointer',
                  borderBottom: activeTab === 'ingredients' ? '2px solid var(--iron-orange)' : '2px solid transparent',
                  paddingBottom: '8px',
                }}
              >
                Ingredients
              </button>
            </div>

            {activeTab === 'overview' ? (
              <>
                {/* Rating Block */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '32px' }}>
                  <div style={{ background: 'var(--iron-orange)', borderRadius: '12px', padding: '16px 24px', minWidth: '100px', textAlign: 'center' }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '48px', color: 'var(--iron-cream)', lineHeight: 1 }}>{dish.rating}</span>
                  </div>
                  <div>
                    <div style={{ display: 'flex', gap: '4px', marginBottom: '8px' }}>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} fill={i < Math.floor(dish.rating) ? 'var(--iron-orange)' : 'none'} color={i < Math.floor(dish.rating) ? 'var(--iron-orange)' : 'var(--iron-muted)'} />
                      ))}
                    </div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--iron-muted)' }}>{dish.likes} likes</span>
                  </div>
                </div>

                {/* Chef Info */}
                <div style={{ marginBottom: '24px' }}>
                  <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '20px', fontWeight: 'bold', color: 'var(--iron-cream)', marginBottom: '4px' }}>{dish.chef}</h3>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--iron-muted)' }}>{dish.kitchen} · Shoreditch</p>
                </div>

                {/* Chef Quote */}
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', fontStyle: 'italic', color: 'var(--iron-muted)', lineHeight: 1.6, marginBottom: '32px' }}>
                  {dish.quote}
                </p>

                {/* Protein Display */}
                <div style={{ marginBottom: '24px' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '64px', color: 'var(--iron-orange)', lineHeight: 1 }}>{dish.protein}G</span>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--iron-muted)', marginTop: '4px' }}>PROTEIN</p>
                </div>

                {/* Like Row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                  <button style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'transparent', border: 'none', color: 'var(--iron-muted)', cursor: 'pointer' }}>
                    <ThumbsUp size={18} />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px' }}>{dish.likes}</span>
                  </button>
                  <button style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'transparent', border: 'none', color: 'var(--iron-muted)', cursor: 'pointer' }}>
                    <ThumbsDown size={18} />
                  </button>
                </div>
              </>
            ) : (
              <div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--iron-muted)', lineHeight: 1.8 }}>
                  {dish.desc}
                </p>
                <div style={{ marginTop: '24px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  <span className="macro-pill">{dish.protein}G PROTEIN</span>
                  <span className="macro-pill">{dish.kcal} KCAL</span>
                  <span className="macro-pill">{dish.price}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
