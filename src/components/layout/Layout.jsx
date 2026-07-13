import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function ScrollReveal() {
  const { pathname } = useLocation()
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('section-reveal-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    const observeSections = () => {
      const sections = document.querySelectorAll('section:not(.section-reveal-observed)')
      sections.forEach((section) => {
        // Prevent first section on page load from popping awkwardly by checking if it's already in viewport
        const rect = section.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          section.classList.add('section-reveal-visible')
        } else {
          section.classList.add('section-reveal-hidden')
        }
        section.classList.add('section-reveal-observed')
        observer.observe(section)
      })
    }

    // Small timeout to allow React to flush DOM
    const timeoutId = setTimeout(observeSections, 50)

    // MutationObserver to catch dynamically rendered sections
    const mutationObserver = new MutationObserver(observeSections)
    const main = document.querySelector('main')
    if (main) {
      mutationObserver.observe(main, { childList: true, subtree: true })
    }

    return () => {
      clearTimeout(timeoutId)
      observer.disconnect()
      mutationObserver.disconnect()
    }
  }, [pathname])

  return null
}

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <ScrollReveal />
      <Navbar />
      <main className="flex-grow pt-26">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
