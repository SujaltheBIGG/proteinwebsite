'use client'

import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import PlateScrollSection from '@/components/PlateScrollSection'
import FullScreenImage from '@/components/FullScreenImage'
import MenuGrid from '@/components/MenuGrid'
import ImageSection from '@/components/ImageSection'
import AboutOrigin from '@/components/AboutOrigin'
import AboutPillars from '@/components/AboutPillars'
import GoalsSection from '@/components/GoalsSection'
import OrderCTA from '@/components/OrderCTA'
import Footer from '@/components/Footer'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const pageRef = useRef<HTMLDivElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const joinSectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // Join section text reveal animations
    const ctx = gsap.context(() => {
      if (joinSectionRef.current) {
        gsap.fromTo('.join-header__h3',
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: joinSectionRef.current, start: 'top 60%' } }
        )
        gsap.fromTo('.join-header__h2',
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.15, scrollTrigger: { trigger: joinSectionRef.current, start: 'top 55%' } }
        )
        gsap.fromTo('.join-header__p',
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 0.25, scrollTrigger: { trigger: joinSectionRef.current, start: 'top 50%' } }
        )
        gsap.fromTo('.join-slider__element',
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.15, scrollTrigger: { trigger: joinSectionRef.current, start: 'top 45%' } }
        )
      }
    }, joinSectionRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const slider = sliderRef.current
    const track = trackRef.current
    if (!slider || !track) return

    let isDown = false
    let startX: number
    let scrollLeft: number

    const handleMouseDown = (e: MouseEvent) => {
      isDown = true
      slider.classList.add('active')
      startX = e.pageX - slider.offsetLeft
      scrollLeft = slider.scrollLeft
    }

    const handleMouseLeave = () => {
      isDown = false
      slider.classList.remove('active')
    }

    const handleMouseUp = () => {
      isDown = false
      slider.classList.remove('active')
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDown) return
      e.preventDefault()
      const x = e.pageX - slider.offsetLeft
      const walk = (x - startX) * 2
      slider.scrollLeft = scrollLeft - walk
    }

    slider.addEventListener('mousedown', handleMouseDown)
    slider.addEventListener('mouseleave', handleMouseLeave)
    slider.addEventListener('mouseup', handleMouseUp)
    slider.addEventListener('mousemove', handleMouseMove)

    // Touch support
    const handleTouchStart = (e: TouchEvent) => {
      isDown = true
      startX = e.touches[0].pageX - slider.offsetLeft
      scrollLeft = slider.scrollLeft
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDown) return
      const x = e.touches[0].pageX - slider.offsetLeft
      const walk = (x - startX) * 2
      slider.scrollLeft = scrollLeft - walk
    }

    const handleTouchEnd = () => {
      isDown = false
    }

    slider.addEventListener('touchstart', handleTouchStart)
    slider.addEventListener('touchmove', handleTouchMove)
    slider.addEventListener('touchend', handleTouchEnd)

    return () => {
      slider.removeEventListener('mousedown', handleMouseDown)
      slider.removeEventListener('mouseleave', handleMouseLeave)
      slider.removeEventListener('mouseup', handleMouseUp)
      slider.removeEventListener('mousemove', handleMouseMove)
      slider.removeEventListener('touchstart', handleTouchStart)
      slider.removeEventListener('touchmove', handleTouchMove)
      slider.removeEventListener('touchend', handleTouchEnd)
    }
  }, [])

  return (
    <main ref={pageRef} style={{ background: 'var(--iron-bg)', color: 'var(--iron-cream)', overflow: 'hidden' }}>
      <Navbar />
      <HeroSection />
      <PlateScrollSection />
      <FullScreenImage />
      <MenuGrid />
      <ImageSection />
      <AboutOrigin />
      <AboutPillars />
      <GoalsSection />
      <OrderCTA />

      <section ref={joinSectionRef} className="join" data-marker-end="">
        <div className="join-container">
          <div className="join-header">
            <h3 className="join-header__h3">It's a Lifestyle</h3>
            <h2 className="join-header__h2">Are you ready For IRONPLATE™</h2>
            <p className="join-header__p">Customize Your Plan, or Let Us Choose For You.</p>
          </div>

          <div className="join-slider" data-drag-container="" ref={sliderRef}>
            <div className="join-slider__bounds" data-drag-bounds="">
              <div className="join-slider__track" data-drag-track="">
                <div className="join-slider__element">
                  <div className="join-slider__item is--one">
                    <div className="join-slider__inner">
                      <div className="join-slider__content">
                        <img loading="lazy" src="/assets/images/join-slider-1.png" alt="Join Slider" className="join-slider__img" />
                        <h4 className="join-slider__h4">
                          Jenn Flanders
                          <span className="join-slider__span">UCLA Campus Life/Recreation </span>
                        </h4>
                        <p className="join-slider__p">"IRONPLATE.LA provides a wide variety of healthy food options that are both delicious and nutritious. They offer catering services for meetings or events; the staff is friendly and professional. I recommend IRONPLATE.LA to anyone looking for great healthy food option and a no hassle catering experience!"</p>
                      </div>
                    </div>

                    <div className="join-slider__blur">
                      <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 102 102" fill="none">
                        <circle cx="51" cy="51" r="51" fill="#F4783E"></circle>
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="join-slider__element">
                  <div className="join-slider__item is--two">
                    <div className="join-slider__inner">
                      <div className="join-slider__content">
                        <img loading="lazy" src="/assets/images/join-slider-2.png" alt="Join Slider" className="join-slider__img" />
                        <h4 className="join-slider__h4">
                          Alexis Cantley
                          <span className="join-slider__span">UCLA Men's Volleyball Operations</span>
                        </h4>
                        <p className="join-slider__p">"As a D1 athletics program, finding a company that is flexible with our schedule and accommodating of our dietary needs is essential, and IRONPLATE has done just that. They help us to provide our players with good tasting meals that hit all of their protein and other macro needs."</p>
                      </div>
                    </div>

                    <div className="join-slider__blur">
                      <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 102 102" fill="none">
                        <circle cx="51" cy="51" r="51" fill="#F4783E"></circle>
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="join-slider__element">
                  <div className="join-slider__item is--three">
                    <div className="join-slider__inner">
                      <div className="join-slider__content">
                        <img loading="lazy" src="/assets/images/join-slider-3.png" alt="Join Slider" className="join-slider__img" />
                        <h4 className="join-slider__h4">
                          Sharon Kwak
                          <span className="join-slider__span">Equinox Group | Senior Recruiter, People Services - West Region</span>
                        </h4>
                        <p className="join-slider__p">
                          "IRONPLATE is an amazing and highly reputable business! From the high-quality food to the level of professionalism, they never disappoint. They have partnered with us for multiple employee events, as well as smaller team meetings. Personally, I am also a huge fan of the delicious and fresh foods. I have used them as a meal prep service myself, and consistently encourage friends/family looking for a healthy, fresh, and great meal prep that IRONPLATE is the best
                          option."
                        </p>
                      </div>
                    </div>

                    <div className="join-slider__blur">
                      <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 102 102" fill="none">
                        <circle cx="51" cy="51" r="51" fill="#F4783E"></circle>
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="join-slider__element">
                  <div className="join-slider__item is--four">
                    <div className="join-slider__inner">
                      <div className="join-slider__content">
                        <img loading="lazy" src="/assets/images/join-slider-4.png" alt="Join Slider" className="join-slider__img" />
                        <h4 className="join-slider__h4">
                          Mauricio Ramos
                          <span className="join-slider__span">Chapcare | Marketing and Outreach Director</span>
                        </h4>
                        <p className="join-slider__p">"We love collaborating with IRONPLATE because of what they believe and stand for: fresh, organic and locally sourced food and businesses. Healthy nutrition is very important for us and supporting a place like IRONPLATE means a lot to us!"</p>
                      </div>
                    </div>

                    <div className="join-slider__blur">
                      <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 102 102" fill="none">
                        <circle cx="51" cy="51" r="51" fill="#F4783E"></circle>
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="join-slider__element">
                  <div className="join-slider__item is--five">
                    <div className="join-slider__inner">
                      <div className="join-slider__content">
                        <img loading="lazy" src="/assets/images/join-slider-5.png" alt="Join Slider" className="join-slider__img" />
                        <h4 className="join-slider__h4">
                          Dr. Luis Felipe Restrepo
                          <span className="join-slider__span">California State University, Chico | Head Men's Soccer Coach Founder, Vision Navigator</span>
                        </h4>
                        <p className="join-slider__p">"We have enjoyed our partnership with IRONPLATE. Our focus is always the health and well being of our student athletes as well as providing that winning edge on and off the field."</p>
                      </div>
                    </div>

                    <div className="join-slider__blur">
                      <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 102 102" fill="none">
                        <circle cx="51" cy="51" r="51" fill="#F4783E"></circle>
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="join-slider__element">
                  <div className="join-slider__item is--six">
                    <div className="join-slider__inner">
                      <div className="join-slider__content">
                        <img loading="lazy" src="/assets/images/join-slider-6.png" alt="Join Slider" className="join-slider__img" />
                        <h4 className="join-slider__h4">
                          Corey Calliet
                          <span className="join-slider__span">Celebrity Trainer | Actor | Motivational Speaker</span>
                        </h4>
                        <p className="join-slider__p">"IRONPLATE.LA is my go to meal company for me and my clients."</p>
                      </div>
                    </div>

                    <div className="join-slider__blur">
                      <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 102 102" fill="none">
                        <circle cx="51" cy="51" r="51" fill="#F4783E"></circle>
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="join-slider__element">
                  <div className="join-slider__item is--six">
                    <div className="join-slider__inner">
                      <div className="join-slider__content">
                        <img loading="lazy" src="/assets/images/join-slider-6.png" alt="Join Slider" className="join-slider__img" />
                        <h4 className="join-slider__h4">
                          Andres Ochoa Baeza
                          <span className="join-slider__span">Men's Soccer Coach </span>
                        </h4>
                        <p className="join-slider__p">"IRONPLATE provides a great product through and through. Great meals, great variety, great service, great juices, and great leadership. Simply put, IRONPLATE is great! In addition to the product, every interaction with the IRONPLATE folks is always positive. You know it is a great product when everyone involved is bought into the process."</p>
                      </div>
                    </div>

                    <div className="join-slider__blur">
                      <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 102 102" fill="none">
                        <circle cx="51" cy="51" r="51" fill="#F4783E"></circle>
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="join-slider__element">
                  <div className="join-slider__item is--six">
                    <div className="join-slider__inner">
                      <div className="join-slider__content">
                        <img loading="lazy" src="/assets/images/join-slider-6.png" alt="Join Slider" className="join-slider__img" />
                        <h4 className="join-slider__h4">
                          Casey Thomas
                          <span className="join-slider__span">Registered Dietician </span>
                        </h4>
                        <p className="join-slider__p">"I've been leaning on IRONPLATE for years for both meal preps and catering events with the athletes I work with. They understand the flexibility and reliability required in athletics and have never given me a reason to switch away. My headaches are removed, the players love the food, and I can adjust the meals to hit my athletes' nutritional needs. I frequently find myself recommending them to other colleagues and clients."</p>
                      </div>
                    </div>

                    <div className="join-slider__blur">
                      <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 102 102" fill="none">
                        <circle cx="51" cy="51" r="51" fill="#F4783E"></circle>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  )
}
