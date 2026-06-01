"use client";
import React from "react";
import { motion } from "motion/react";

export interface Testimonial {
  text: string;
  highlight?: string;
  image: string;
  name: string;
  role: string;
}

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
        style={{
          background: 'var(--iron-bg)'
        }}
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, highlight, image, name, role }, i) => (
                <div
                  className="rounded-3xl border shadow-lg w-full"
                  key={i}
                  style={{
                    padding: '24px',
                    background: 'var(--iron-surface)',
                    borderColor: 'var(--iron-border)',
                    boxShadow: '0 4px 24px rgba(232, 80, 26, 0.08)',
                    width: '100%',
                    maxWidth: '320px',
                    minWidth: '280px',
                    height: 'auto',
                    minHeight: '180px'
                  }}
                >
                  <div style={{
                    fontSize: '14px',
                    lineHeight: '1.6',
                    fontFamily: 'var(--font-body)',
                    fontStyle: 'italic',
                    color: 'var(--iron-cream)',
                    marginBottom: '16px'
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
                  </div>
                  <div className="flex items-center gap-2 mt-5">
                    <img
                      width={40}
                      height={40}
                      src={image}
                      alt={name}
                      className="h-10 w-10 rounded-full"
                      style={{
                        border: '2px solid var(--iron-orange)'
                      }}
                    />
                    <div className="flex flex-col">
                      <div 
                        className="font-medium tracking-tight leading-5"
                        style={{
                          fontFamily: 'var(--font-body)',
                          color: 'var(--iron-cream)'
                        }}
                      >
                        {name}
                      </div>
                      <div 
                        className="leading-5 opacity-60 tracking-tight"
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '13px',
                          color: 'var(--iron-muted)',
                          letterSpacing: '0.5px'
                        }}
                      >
                        {role}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};
