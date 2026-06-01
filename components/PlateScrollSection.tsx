'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function PlateScrollSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [currentFrame, setCurrentFrame] = useState(0)
  const totalFrames = 166
  const imagesRef = useRef<HTMLImageElement[]>([])
  const [imagesLoaded, setImagesLoaded] = useState(false)

  useEffect(() => {
    const loadImages = async () => {
      const imagePromises: Promise<void>[] = []
      const loadedImages: HTMLImageElement[] = []
      
      for (let i = 0; i < totalFrames; i++) {
        const img = new Image()
        const paddedNumber = i.toString().padStart(8, '0')
        img.src = `/plate-frames/Plate_slides_left_to_right_202606010154_${paddedNumber}.jpg`
        imagePromises.push(
          new Promise<void>((resolve) => {
            img.onload = () => resolve()
            img.onerror = () => {
              console.error(`Failed to load image: ${img.src}`)
              resolve()
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
      // Content animations
      gsap.set('.plate-text-1', { opacity: 0, y: 30 })
      gsap.set('.plate-text-2', { opacity: 0, y: 30 })
      gsap.to('.plate-text-1', { opacity: 1, y: 0, duration: 0.8, delay: 0.25, ease: 'power3.out' })

      // Scroll-based frame animation
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx2d = canvas.getContext('2d')
      if (!ctx2d) return

      // Set canvas size
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      // Draw initial frame
      const drawFrame = (frameIndex: number) => {
        const img = imagesRef.current[frameIndex]
        if (img && img.complete && img.naturalWidth > 0 && ctx2d) {
          try {
            // Calculate aspect ratio to contain the image within the canvas
            const imgRatio = img.width / img.height
            const canvasRatio = canvas.width / canvas.height

            let drawWidth, drawHeight, offsetX, offsetY

            // If image is wider than canvas, fit by width
            if (imgRatio > canvasRatio) {
              drawWidth = canvas.width
              drawHeight = canvas.width / imgRatio
              offsetX = 0
              offsetY = (canvas.height - drawHeight) / 2 // Center vertically
            } else { // If image is taller than canvas, fit by height
              drawHeight = canvas.height
              drawWidth = canvas.height * imgRatio
              offsetX = (canvas.width - drawWidth) / 2 // Center horizontally
              offsetY = 0
            }

            ctx2d.clearRect(0, 0, canvas.width, canvas.height)
            ctx2d.drawImage(img, offsetX, offsetY, drawWidth, drawHeight)
          } catch (e) {
            console.error('Failed to draw frame', e)
          }
        }
      }

      // Initial draw
      drawFrame(0)

      // Single consolidated ScrollTrigger for pinning, frames, and text fades
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=400%',
        scrub: 0.5,
        pin: true,
        onUpdate: (self) => {
          // --- FRAME ANIMATION ---
          const frameIndex = Math.floor(self.progress * (totalFrames - 1))
          setCurrentFrame(frameIndex)
          drawFrame(frameIndex)

          // --- TEXT FADES ---
          // Right text: fade out from 10% to 30% progress
          const fade1Start = 0.1
          const fade1End = 0.3
          let opacity1 = 1
          
          if (self.progress >= fade1Start) {
            const fadeProgress = (self.progress - fade1Start) / (fade1End - fade1Start)
            opacity1 = Math.max(0, 1 - fadeProgress)
          }
          
          gsap.set('.plate-text-1', { opacity: opacity1 })

          // Left text: fade in from 40% to 55% and stay visible
          const fade2InStart = 0.4
          const fade2InEnd = 0.55
          let opacity2 = 0
          
          if (self.progress >= fade2InStart && self.progress <= fade2InEnd) {
            opacity2 = (self.progress - fade2InStart) / (fade2InEnd - fade2InStart)
          } else if (self.progress > fade2InEnd) {
            opacity2 = 1
          }
          
          gsap.set('.plate-text-2', { opacity: opacity2 })
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

  return (
    <section
      ref={sectionRef}
      id="plate"
      style={{
        position: 'relative',
        height: '100dvh',
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

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingLeft: 'clamp(80px, 12vw, 180px)',
          paddingRight: 'clamp(80px, 12vw, 180px)',
          paddingTop: 'clamp(40px, 8vh, 100px)',
          paddingBottom: 'clamp(40px, 8vh, 100px)',
        }}
        className="plate-content"
      >
        {/* Left side text */}
        <div style={{ maxWidth: '700px' }} className="plate-text-2">
          {/* Headline */}
          <h1
            className="plate-h1-2"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(80px, 13vw, 156px)',
              lineHeight: 0.88,
              letterSpacing: '2px',
              marginBottom: '24px',
            }}
          >
            THE <span style={{ color: 'var(--iron-orange)' }}>SHRED</span> STACK
          </h1>

          {/* Macro Strip */}
          <div className="plate-macros-2" style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
            <span className="macro-pill">48G PROTEIN</span>
            <span className="macro-pill">490 KCAL</span>
            <span className="macro-pill">£11.90</span>
          </div>

          {/* Sub-copy */}
          <p
            className="plate-sub-2"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '18px',
              color: 'var(--iron-muted)',
              marginBottom: '32px',
              lineHeight: 1.6,
            }}
          >
            Flame-grilled chicken thigh. Light avocado crema. House chimichurri. Maximum protein, zero filler.
          </p>
        </div>

        {/* Right side text */}
        <div className="plate-text-1" style={{ maxWidth: '700px' }}>
          {/* Headline */}
          <h1
            className="plate-h1"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(80px, 13vw, 156px)',
              lineHeight: 0.88,
              letterSpacing: '2px',
              marginBottom: '24px',
            }}
          >
            THE <span style={{ color: 'var(--iron-orange)' }}>APEX</span> CHICKEN
          </h1>

          {/* Macro Strip */}
          <div className="plate-macros" style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
            <span className="macro-pill">48G PROTEIN</span>
            <span className="macro-pill">520 KCAL</span>
            <span className="macro-pill">£11.90</span>
          </div>

          {/* Sub-copy */}
          <p
            className="plate-sub"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '18px',
              color: 'var(--iron-muted)',
              marginBottom: '32px',
              lineHeight: 1.6,
            }}
          >
            Flame-grilled chicken thigh. Crisp seasonal greens. House chimichurri. Built to rebuild.
          </p>
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
        @media (max-width: 768px) {
          .plate-content {
            flex-direction: column !important;
            justify-content: center !important;
            gap: 40px;
            padding-left: 20px !important;
            padding-right: 20px !important;
            paddingTop: 60px !important;
            paddingBottom: 60px !important;
          }
          .plate-text-2 {
            text-align: center;
            order: 2;
          }
          .plate-h1-2 {
            font-size: clamp(40px, 10vw, 80px) !important;
          }
          .plate-macros-2 {
            justify-content: center;
          }
        }
      `}</style>
    </section>
  )
}
