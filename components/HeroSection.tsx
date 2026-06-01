'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [currentFrame, setCurrentFrame] = useState(0)
  const totalFrames = 307
  const imagesRef = useRef<HTMLImageElement[]>([])
  const [imagesLoaded, setImagesLoaded] = useState(false)

  useEffect(() => {
    const loadImages = async () => {
      const imagePromises: Promise<void>[] = []
      const loadedImages: HTMLImageElement[] = []
      
      for (let i = 0; i < totalFrames; i++) {
        const img = new Image()
        const frameNumber = 86400 + i
        // Pad with leading zeros to match file naming convention (8 digits)
        const paddedNumber = frameNumber.toString().padStart(8, '0')
        img.src = `/burger-frames/Timeline 1_${paddedNumber}.jpg`
        imagePromises.push(
          new Promise<void>((resolve) => {
            img.onload = () => resolve()
            img.onerror = () => {
              console.error(`Failed to load image: ${img.src}`)
              resolve() // Resolve even on error to not block the loading process entirely
            }
          })
        )
        loadedImages.push(img)
      }
      
      await Promise.all(imagePromises)
      imagesRef.current = loadedImages
      setImagesLoaded(true)
    }

    loadImages()
  }, [totalFrames])

  useEffect(() => {
    if (!imagesLoaded) return

    const ctx = gsap.context(() => {
      // Set up canvas for frame drawing
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx2d = canvas.getContext('2d')
      if (!ctx2d) return

      // Set canvas size
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      // Draw a frame onto the canvas with cover-fit scaling
      const drawFrame = (frameIndex: number) => {
        const img = imagesRef.current[frameIndex]
        if (img && img.complete && img.naturalWidth > 0 && ctx2d) {
          try {
            const imgRatio = img.width / img.height
            const canvasRatio = canvas.width / canvas.height

            let drawWidth, drawHeight, offsetX, offsetY

            if (imgRatio > canvasRatio) {
              drawHeight = canvas.height
              drawWidth = canvas.height * imgRatio
              offsetX = (canvas.width - drawWidth) / 2
              offsetY = 0
            } else {
              drawWidth = canvas.width
              drawHeight = canvas.width / imgRatio
              offsetX = 0
              offsetY = (canvas.height - drawHeight) / 2
            }

            ctx2d.clearRect(0, 0, canvas.width, canvas.height)
            ctx2d.drawImage(img, offsetX, offsetY, drawWidth, drawHeight)
          } catch (e) {
            console.error('Failed to draw frame', e)
          }
        }
      }

      // Draw initial frame
      drawFrame(0)

      // Content animations with enhanced easing and stagger
      gsap.set(['.hero-badge', '.hero-h1', '.hero-macros', '.hero-sub', '.hero-cta'], { opacity: 0, y: 40 })
      gsap.set('.hero-text-2', { opacity: 0, y: 40 })
      gsap.to('.hero-badge',   { opacity: 1, y: 0, duration: 0.6, delay: 0.1,  ease: 'power3.out' })
      gsap.to('.hero-h1',      { opacity: 1, y: 0, duration: 1.0, delay: 0.25, ease: 'power4.out' })
      gsap.to('.hero-macros',  { opacity: 1, y: 0, duration: 0.6, delay: 0.5,  ease: 'back.out(1.7)', stagger: 0.08 })
      gsap.to('.hero-sub',     { opacity: 1, y: 0, duration: 0.6, delay: 0.7, ease: 'power3.out' })
      gsap.to('.hero-cta',     { opacity: 1, y: 0, duration: 0.6, delay: 0.85, ease: 'back.out(1.7)' })

      // Single ScrollTrigger to handle pinning, frames, and all text/label fades
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=400%', // Animation plays over 4x viewport height
        scrub: 0.5,
        pin: true,
        onUpdate: (self) => {
          // --- TEXT FADES ---
          const fade1Start = 0.1
          const fade1End = 0.3
          let opacity1 = 1
          
          if (self.progress >= fade1Start) {
            const fadeProgress = (self.progress - fade1Start) / (fade1End - fade1Start)
            opacity1 = Math.max(0, 1 - fadeProgress)
          }
          
          gsap.set('.hero-text-1', { opacity: opacity1 })

          const fade2InStart = 0.85
          const fade2InEnd = 1.0
          let opacity2 = 0
          
          if (self.progress >= fade2InStart && self.progress <= fade2InEnd) {
            opacity2 = (self.progress - fade2InStart) / (fade2InEnd - fade2InStart)
          } else if (self.progress > fade2InEnd) {
            opacity2 = 1
          }
          
          gsap.set('.hero-text-2', { opacity: opacity2 })

          // --- INGREDIENT LABELS ---
          const showStart = 0.4
          const showEnd = 0.6
          let labelOpacity = 0
          
          if (self.progress >= showStart && self.progress <= showEnd) {
            const rangeDuration = showEnd - showStart
            const fadeInDuration = rangeDuration * 0.2
            const fadeOutDuration = rangeDuration * 0.2
            
            if (self.progress < showStart + fadeInDuration) {
              labelOpacity = (self.progress - showStart) / fadeInDuration
            } else if (self.progress > showEnd - fadeOutDuration) {
              labelOpacity = (showEnd - self.progress) / fadeOutDuration
            } else {
              labelOpacity = 1
            }
          }
          gsap.set('.ingredient-label', { opacity: labelOpacity })

          // --- FRAMES ---
          const frameIndex = Math.floor(self.progress * (totalFrames - 1))
          setCurrentFrame(frameIndex)
          drawFrame(frameIndex)
        }
      })

      // Handle resize
      const handleResize = () => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        drawFrame(currentFrame)
      }

      window.addEventListener('resize', handleResize)

      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [imagesLoaded])

  const scrollToOrder = () =>
    document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{
        position: 'relative',
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
        background: 'var(--iron-bg)',
      }}
    >
      {/* Loading Indicator */}
      {!imagesLoaded && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--iron-bg)',
            zIndex: 100,
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                border: '3px solid var(--iron-orange)',
                borderTop: '3px solid transparent',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '0 auto 16px',
              }}
            />
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                color: 'var(--iron-muted)',
                letterSpacing: '2px',
              }}
            >
              LOADING ANIMATION...
            </p>
          </div>
        </div>
      )}

      {/* Canvas Background for Scroll Animation */}
      {imagesLoaded && (
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
          }}
        />
      )}

      {/* Dark Overlay - removed for full frame visibility */}
      {/* <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.65)',
        }}
      /> */}

      {/* Bottom Gradient Fade */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '200px',
          background: 'linear-gradient(to top, var(--iron-bg), transparent)',
        }}
      />

      {/* Ingredient Labels */}
      <div className="ingredient-labels" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div className="ingredient-label ingredient-bun-1 left macro-pill" style={{ position: 'absolute', left: '20%', top: '20%', opacity: 0, fontSize: '20px', padding: '10px 24px' }}>
          BUN
        </div>
        <div className="ingredient-label ingredient-lettuce right macro-pill" style={{ position: 'absolute', right: '20%', top: '20%', opacity: 0, fontSize: '20px', padding: '10px 24px' }}>
          LETTUCE
        </div>
        <div className="ingredient-label ingredient-cheese left macro-pill" style={{ position: 'absolute', left: '20%', top: '40%', opacity: 0, fontSize: '20px', padding: '10px 24px' }}>
          CHEESE
        </div>
        <div className="ingredient-label ingredient-onion right macro-pill" style={{ position: 'absolute', right: '20%', top: '40%', opacity: 0, fontSize: '20px', padding: '10px 24px' }}>
          ONION
        </div>
        <div className="ingredient-label ingredient-cucumber left macro-pill" style={{ position: 'absolute', left: '20%', top: '60%', opacity: 0, fontSize: '20px', padding: '10px 24px' }}>
          CUCUMBER
        </div>
        <div className="ingredient-label ingredient-tomato right macro-pill" style={{ position: 'absolute', right: '20%', top: '60%', opacity: 0, fontSize: '20px', padding: '10px 24px' }}>
          TOMATO
        </div>
        <div className="ingredient-label ingredient-beef left macro-pill" style={{ position: 'absolute', left: '20%', top: '80%', opacity: 0, fontSize: '20px', padding: '10px 24px' }}>
          BEEF PATTY
        </div>
        <div className="ingredient-label ingredient-bun-2 right macro-pill" style={{ position: 'absolute', right: '20%', top: '80%', opacity: 0, fontSize: '20px', padding: '10px 24px' }}>
          BUN
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: 'clamp(48px, 8vw, 120px)',
          paddingRight: 'clamp(24px, 4vw, 80px)',
        }}
      >
        <div className="hero-text-1" style={{ maxWidth: '700px' }}>
          {/* Tag Badge */}
          <div className="hero-badge" style={{ marginBottom: '24px' }}>
            <span className="macro-pill">#1 HIGH PROTEIN BURGER · SHOREDITCH, LONDON</span>
          </div>

          {/* Headline */}
          <h1
            className="hero-h1"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(80px, 13vw, 156px)',
              lineHeight: 0.88,
              letterSpacing: '2px',
              marginBottom: '24px',
            }}
          >
            THE <span style={{ color: 'var(--iron-orange)' }}>BEAST</span> SMASH
          </h1>

          {/* Macro Strip */}
          <div className="hero-macros" style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
            <span className="macro-pill">52G PROTEIN</span>
            <span className="macro-pill">680 KCAL</span>
            <span className="macro-pill">£12.50</span>
          </div>

          {/* Sub-copy */}
          <p
            className="hero-sub"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '18px',
              color: 'var(--iron-muted)',
              marginBottom: '32px',
              lineHeight: 1.6,
            }}
          >
            Double smash patty. Aged cheddar. Sriracha aioli. Hand-pressed daily.
          </p>

          {/* CTA */}
          <button className="hero-cta btn-order" onClick={scrollToOrder}>
            ORDER NOW →
          </button>
        </div>
        <div style={{ maxWidth: '700px' }} className="hero-text-2">
          {/* Headline */}
          <h1
            className="hero-h1-2"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(80px, 13vw, 156px)',
              lineHeight: 0.88,
              letterSpacing: '2px',
              marginBottom: '24px',
            }}
          >
            THE <span style={{ color: 'var(--iron-orange)' }}>MUSCLE</span> FUEL
          </h1>

          {/* Macro Strip */}
          <div className="hero-macros-2" style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
            <span className="macro-pill">55G PROTEIN</span>
            <span className="macro-pill">620 KCAL</span>
            <span className="macro-pill">£12.80</span>
          </div>

          {/* Sub-copy */}
          <p
            className="hero-sub-2"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '18px',
              color: 'var(--iron-muted)',
              marginBottom: '32px',
              lineHeight: 1.6,
            }}
          >
            Ultra-lean beef. Sharp cheddar. Light house relish. Zero compromise on growth.
          </p>

          {/* CTA */}
          <button className="hero-cta-2 btn-order" onClick={scrollToOrder}>
            ORDER NOW →
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '40px',
          right: '40px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          opacity: 0.4,
        }}
      >
        <div
          style={{
            width: '1px',
            height: '60px',
            background: 'var(--iron-cream)',
            animation: 'pulse 2s ease-in-out infinite',
          }}
        />
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '12px',
            letterSpacing: '2px',
            transform: 'rotate(90deg)',
            transformOrigin: 'center',
          }}
        >
          SCROLL
        </span>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  )
}
