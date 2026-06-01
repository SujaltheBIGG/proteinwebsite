'use client'
import { useRef, useEffect, ReactNode, forwardRef, useImperativeHandle } from 'react'
import gsap from 'gsap'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  strength?: number
  style?: React.CSSProperties
}

const MagneticButton = forwardRef<HTMLButtonElement, MagneticButtonProps>(({ children, className = '', onClick, strength = 0.3, style }, forwardedRef) => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const boundsRef = useRef<DOMRect | null>(null)

  // Expose the ref to parent
  useImperativeHandle(forwardedRef, () => buttonRef.current!)

  useEffect(() => {
    const button = buttonRef.current
    if (!button) return

    boundsRef.current = button.getBoundingClientRect()

    const handleMouseMove = (e: MouseEvent) => {
      const bounds = boundsRef.current
      if (!bounds) return

      const mouseX = e.clientX
      const mouseY = e.clientY

      const centerX = bounds.left + bounds.width / 2
      const centerY = bounds.top + bounds.height / 2

      const deltaX = (mouseX - centerX) * strength
      const deltaY = (mouseY - centerY) * strength

      gsap.to(button, {
        x: deltaX,
        y: deltaY,
        duration: 0.3,
        ease: 'power2.out'
      })
    }

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)'
      })
    }

    button.addEventListener('mousemove', handleMouseMove)
    button.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      button.removeEventListener('mousemove', handleMouseMove)
      button.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [strength])

  return (
    <button
      ref={buttonRef}
      className={className}
      onClick={onClick}
      style={{ ...style, transform: 'translate3d(0, 0, 0)' }}
    >
      {children}
    </button>
  )
})

MagneticButton.displayName = 'MagneticButton'

export default MagneticButton
