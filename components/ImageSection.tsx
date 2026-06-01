'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ImageSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial state - no scaling, just fade out
      gsap.set(imageRef.current, {
        scale: 1,
        opacity: 0
      })

      // Animate in when section enters
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom-=100',
        onEnter: () => {
          gsap.to(imageRef.current, {
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: 'power2.out'
          })
        },
        onLeaveBack: () => {
          gsap.to(imageRef.current, {
            scale: 1,
            opacity: 0,
            duration: 0.5,
            ease: 'power2.in'
          })
        }
      })

      // Parallax effect on image - subtle movement
      gsap.to(imageRef.current, {
        yPercent: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="image"
      style={{
        position: 'relative',
        width: '100%',
        height: 'auto',
        overflow: 'visible',
        maxWidth: '100vw',
        margin: '0 auto',
        padding: '40px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div 
        ref={imageRef} 
        style={{ 
          position: 'relative',
          width: '100%',
          maxWidth: '1600px',
          height: 'auto',
          margin: '0 auto',
        }}
      >
        <img
          src="/media-section.png"
          alt="IRONPLATE"
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            maxWidth: '100%',
          }}
        />
      </div>
    </section>
  )
}
