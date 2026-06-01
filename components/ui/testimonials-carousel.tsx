"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";

export interface Testimonial {
  text: string;
  highlight?: string;
  image: string;
  name: string;
  role: string;
}

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
  speed?: number; // Duration in seconds for one full scroll
  direction?: "left" | "right"; // Scroll direction
  cardHeight?: number; // Height of the testimonial card
  className?: string;
}

export const TestimonialsCarousel: React.FC<TestimonialsCarouselProps> = ({
  testimonials,
  speed = 20,
  direction = "left",
  cardHeight = 200,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [carouselWidth, setCarouselWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      setCarouselWidth(containerRef.current.scrollWidth / 2);
    }
  }, [testimonials]);

  const loopTestimonials = [...testimonials, ...testimonials];

  return (
    <div className={`overflow-hidden w-full ${className}`} ref={containerRef}>
      <motion.div
        animate={{
          x:
            direction === "left"
              ? [0, -carouselWidth]
              : [-carouselWidth, 0],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex gap-6"
      >
        {loopTestimonials.map(({ text, highlight, image, name, role }, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02, rotate: 0.5 }}
            className="my-3 border-2 shadow-md rounded-3xl p-4 shadow-lg flex-shrink-0 w-[320px]"
            style={{
              height: cardHeight,
              background: 'var(--iron-surface)',
              borderColor: 'var(--iron-border)',
              boxShadow: '0 4px 24px rgba(232, 80, 26, 0.08)'
            }}
          >
            <p style={{
              fontSize: '14px',
              lineHeight: '1.6',
              textAlign: 'justify',
              wordBreak: 'break-word',
              whiteSpace: 'normal',
              overflow: 'hidden',
              fontFamily: 'var(--font-body)',
              fontStyle: 'italic',
              color: 'var(--iron-cream)'
            }}>
              {highlight
                ? text.split(highlight).map((part, idx, arr) => (
                    <React.Fragment key={idx}>
                      {part}
                      {idx !== arr.length - 1 && (
                        <span style={{
                          color: 'var(--iron-orange)',
                          fontWeight: '600'
                        }}>
                          {highlight}
                        </span>
                      )}
                    </React.Fragment>
                  ))
                : text}
            </p>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginTop: '16px'
            }}>
              <img
                src={image}
                alt={name}
                width={50}
                height={50}
                style={{
                  height: '48px',
                  width: '48px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid var(--iron-orange)'
                }}
              />
              <div style={{
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div style={{
                  fontWeight: '500',
                  lineHeight: '1.2',
                  fontFamily: 'var(--font-body)',
                  color: 'var(--iron-cream)'
                }}>
                  {name}
                </div>
                <div style={{
                  opacity: 0.6,
                  fontSize: '13px',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--iron-muted)',
                  letterSpacing: '0.5px'
                }}>
                  {role}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
