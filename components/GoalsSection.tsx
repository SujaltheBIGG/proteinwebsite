'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function GoalsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeItem, setActiveItem] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animations with enhanced reveal
      gsap.fromTo('.goals-content h3',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 60%' } }
      )
      gsap.fromTo('.goals-content p',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 0.15, scrollTrigger: { trigger: sectionRef.current, start: 'top 55%' } }
      )

      // Accordion items animations with enhanced reveal
      gsap.fromTo('.accordion-css__item',
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.2, scrollTrigger: { trigger: sectionRef.current, start: 'top 50%' } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const toggleAccordion = (index: number) => {
    setActiveItem(activeItem === index ? -1 : index)
  }

  const goals = [
    {
      title: 'Gain Muscle',
      kcalNow: '2,400',
      kcalIdeal: '2,800',
      percentage: 23,
      tag: 'Enhance Performance',
      meals: [
        { type: 'Breakfast', name: 'Quiche & Protein Pancakes' },
        { type: 'Lunch', name: 'Grilled Mango-Lime Chicken' },
        { type: 'Dinner', name: 'Miso Glazed Salmon' }
      ]
    },
    {
      title: 'Lose Weight',
      kcalNow: '2,200',
      kcalIdeal: '1,900',
      percentage: 78,
      tag: 'Clean Eating',
      meals: [
        { type: 'Breakfast', name: 'Overnight Oats' },
        { type: 'Lunch', name: 'Cranberry Walnut Spinach Salad' },
        { type: 'Dinner', name: 'Lemon & Herb Garlic Chicken' }
      ]
    },
    {
      title: 'Maintain',
      kcalNow: '2,500',
      kcalIdeal: '2,500',
      percentage: 0,
      tag: 'Stay Balanced',
      meals: [
        { type: 'Breakfast', name: 'Avocado Toast & Eggs' },
        { type: 'Lunch', name: 'Turkey Club Wrap' },
        { type: 'Dinner', name: 'Beef Stir Fry' }
      ]
    }
  ]

  return (
    <section
      ref={sectionRef}
      id="goals-section"
      className="goals-section"
      style={{
        background: 'var(--iron-bg)',
        borderBottom: '1px solid var(--iron-border)',
        padding: 'clamp(80px, 10vw, 140px) clamp(28px, 5vw, 72px)',
      }}
    >
      <div className="goals-content" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto', marginBottom: '60px' }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(48px, 6vw, 80px)', lineHeight: 0.9, color: 'var(--iron-cream)', marginBottom: '24px' }}>
          Whatever Your Goals
        </h3>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(18px, 2vw, 24px)', color: 'var(--iron-muted)', lineHeight: 1.6 }}>
          High quality meals for any lifestyle.
        </p>
      </div>

      <div className="accordion-css__inner">
        {goals.map((goal, index) => (
          <div key={index} data-accordion-status={activeItem === index ? 'active' : 'inactive'} className="accordion-css__item">
            {/* item blur */}
            <div className="accordion-css__item-blur">
              <img src="/assets/images/goals-item-blur.avif" alt="decorative gradient" loading="lazy" />
            </div>

            {/* top spacer */}
            <div className="accordion-css__item-top-spacer">
              <div className="accordion-css__item-top-spacer-wrap">
                <div className="accordion-css__item-top-spacer-content"></div>
              </div>
            </div>

            {/* top content */}
            <div onClick={() => toggleAccordion(index)} className="accordion-css__item-top">
              <div className="accordion-css__top-flex">
                <svg width="100%" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.3564 21.5C13.2627 18.2188 16.4314 15.875 20.0814 16.2625C23.5564 16.6313 26.3189 19.5625 26.4939 23.05C26.5377 23.9688 26.4127 24.85 26.1439 25.6688C25.9814 26.1688 25.4939 26.5 24.9627 26.5H6.34895C3.19395 26.5 0.827697 23.6131 1.44645 20.5194L5.2502 1.5H12.7502L15.2502 5.875L9.89395 9.70625L8.3752 7.75" fill="#8D8D8D"></path>
                  <path d="M12.3564 21.5C13.2627 18.2188 16.4314 15.875 20.0814 16.2625C23.5564 16.6313 26.3189 19.5625 26.4939 23.05C26.5377 23.9688 26.4127 24.85 26.1439 25.6688C25.9814 26.1688 25.4939 26.5 24.9627 26.5H6.34895C3.19395 26.5 0.827697 23.6131 1.44645 20.5194L5.2502 1.5H12.7502L15.2502 5.875L9.89395 9.70625L8.3752 7.75M9.9002 9.70625L12.7502 20.25" stroke="#8D8D8D" strokeWidth="2" strokeMiterlimit="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>

                <span>{goal.title}</span>
              </div>

              <div className="accordion-css__top-percentage">
                <svg width="100%" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle opacity="0.2" cx="40" cy="40" r="35" stroke="white" strokeWidth="4"></circle>
                  <circle 
                    cx="40" 
                    cy="40" 
                    r="35" 
                    stroke="var(--iron-orange)" 
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 35}`}
                    strokeDashoffset={`${2 * Math.PI * 35 * (1 - goal.percentage / 100)}`}
                    transform="rotate(-90 40 40)"
                  ></circle>
                </svg>
                <span className="percentage-text">{goal.percentage}%</span>
              </div>

              <div className="accordion-css__top-tag">
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 4 4" fill="none">
                  <circle cx="2" cy="2" r="2" fill="white"></circle>
                </svg>

                <span>{goal.tag}</span>
              </div>
            </div>

            {/* bottom content */}
            <div className="accordion-css__item-bottom">
              <div className="accordion-css__item-bottom-wrap">
                <div className="accordion-css__item-bottom-content">
                  <div className="accordion-css__item-block">
                    <span>Your Kcal now</span>
                    <span>Your ideal Kcal</span>
                  </div>

                  <div className="accordion-css__item-block">
                    <strong>{goal.kcalNow}</strong>
                    <strong>{goal.kcalIdeal}</strong>
                  </div>

                  <div className="accordion-css__item-bottom-loader">
                    <div className="accordion-css__item-bottom-loader-bar" style={{ width: `${100 - goal.percentage}%` }}>
                      <div className="accordion-css__item-bottom-loader-circle">
                        <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle data-figma-bg-blur-radius="40" cx="16.2966" cy="16.7039" r="16.2829" fill="white" fillOpacity="0.79"></circle>
                          <defs>
                            <clipPath id={`bgblur_${index}_clip_path`} transform="translate(39.9863 39.579)">
                              <circle cx="16.2966" cy="16.7039" r="16.2829"></circle>
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="accordion-css__item-info">
                    <div className="accordion-css__item-bar"></div>

                    <div className="accordion-css__item-grid">
                      {goal.meals.map((meal, mealIndex) => (
                        <div key={mealIndex} className="accordion-css__item-grid-group">
                          <span>{meal.type}</span>
                          <strong>{meal.name}</strong>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
