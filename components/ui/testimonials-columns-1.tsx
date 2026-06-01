"use client";
import React from "react";
import { motion } from "motion/react";

export interface Testimonial {
  text: string;
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
        className="flex flex-col gap-8 pb-8"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div 
                  className="p-8 rounded-2xl border max-w-xs w-full"
                  style={{
                    background: 'var(--iron-surface)',
                    borderColor: 'var(--iron-border)',
                    boxShadow: '0 4px 20px rgba(232, 80, 26, 0.1)',
                  }}
                  key={i}
                >
                  <div style={{ 
                    fontFamily: 'var(--font-body)', 
                    fontSize: '14px', 
                    color: 'var(--iron-cream)', 
                    lineHeight: 1.6,
                    marginBottom: '20px'
                  }}>
                    {text}
                  </div>
                  <div className="flex items-center gap-3 mt-5">
                    <img
                      width={40}
                      height={40}
                      src={image}
                      alt={name}
                      className="h-10 w-10 rounded-full"
                      style={{ border: '2px solid var(--iron-orange)' }}
                    />
                    <div className="flex flex-col">
                      <div style={{ 
                        fontFamily: 'var(--font-body)', 
                        fontWeight: 600, 
                        fontSize: '14px', 
                        color: 'var(--iron-cream)',
                        letterSpacing: '0.5px'
                      }}>
                        {name}
                      </div>
                      <div style={{ 
                        fontFamily: 'var(--font-mono)', 
                        fontSize: '12px', 
                        color: 'var(--iron-muted)',
                        letterSpacing: '0.5px',
                        opacity: 0.7
                      }}>
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
