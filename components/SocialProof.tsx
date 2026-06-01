'use client'
import React from 'react'
import { motion } from 'motion/react'
import { TestimonialsColumn } from '@/components/ui/testimonials-columns-1'

const testimonials = [
  {
    text: "The Beast Smash is genuinely the best burger in East London. 52g of protein and it actually tastes unreal. I order after every leg day.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    name: "Jamie Holloway",
    role: "Fitness Coach",
  },
  {
    text: "Finally a place in Shoreditch that takes macros seriously without sacrificing flavour. The Powerhouse Bowl is my post-training ritual.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    name: "Priya Osei",
    role: "Nutritionist",
  },
  {
    text: "Iron Stack is dangerous. Three patties and I still hit my protein goals for the day. Best thing to happen to Bethnal Green. Full stop.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    name: "Tom McAllister",
    role: "Personal Trainer",
  },
  {
    text: "I've tried every high-protein meal prep service in London. Nothing compares to eating at IRONPLATE fresh, hot, and loaded with flavour.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    name: "Sofia Chen",
    role: "CrossFit Athlete",
  },
  {
    text: "The Midnight Burn hit different. Ghost pepper sauce had me sweating but I couldn't stop eating. Absolute banger of a burger.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    name: "Marcus Adebayo",
    role: "Food Blogger",
  },
  {
    text: "Brought my entire rugby squad here after a match. Every single one of them is now a regular. The protein numbers are insane.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face",
    name: "Liam Gallagher",
    role: "Rugby Captain",
  },
  {
    text: "As a dietitian, I'm usually skeptical of 'high-protein' claims. IRONPLATE actually delivers. Real food, real macros, no gimmicks.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
    name: "Hannah Reeves",
    role: "Registered Dietitian",
  },
  {
    text: "Best late-night food in East London, hands down. The fact that it's protein-packed is just a bonus. The taste alone would bring me back.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face",
    name: "Daniel Okonkwo",
    role: "Night Shift Worker",
  },
  {
    text: "The protein shakes here are actually good. Not chalky, not watery. Perfect post-workout fuel that actually tastes like something you'd choose to drink.",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop&crop=face",
    name: "Alex Turner",
    role: "Bodybuilder",
  },
]

const firstColumn = testimonials.slice(0, 3)
const secondColumn = testimonials.slice(3, 6)
const thirdColumn = testimonials.slice(6, 9)

export default function SocialProof() {
  return (
    <section className="bg-background my-20 relative" style={{ background: 'var(--iron-bg)' }}>
      <div className="container z-10 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
        >
          <div className="flex justify-center">
            <div className="border py-1 px-4 rounded-lg" style={{ borderColor: 'var(--iron-orange)', color: 'var(--iron-orange)' }}>WHAT THEY SAY</div>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter mt-5" style={{ color: 'var(--iron-cream)' }}>
            REAL REVIEWS FROM <span style={{ color: 'var(--iron-orange)' }}>REAL LIFTERS</span>
          </h2>
          <p className="text-center mt-5 opacity-75" style={{ color: 'var(--iron-muted)' }}>
            Don't just take our word for it. Hear from the people who fuel their gains at IRONPLATE every week.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  )
}
