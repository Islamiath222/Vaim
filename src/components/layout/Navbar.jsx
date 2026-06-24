import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FaBars, FaXmark, FaFacebookF, FaInstagram, FaXTwitter, FaYoutube } from 'react-icons/fa6'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from './Logo';
import { navLinks } from '../../data/content';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-card' : 'bg-white/90 backdrop-blur-sm'
      }`}
    >
      <nav className="container-page flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-2.5 group" onClick={() => setIsOpen(false)}>
          <Logo />
          <span className="font-display font-semibold text-purple-900 leading-tight text-base sm:text-lg">
            Victoria Alabaster
            <span className="block text-[10px] sm:text-xs font-body font-medium text-purple-600 tracking-wide uppercase">
              International Women Ministry
            </span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  isActive ? 'text-purple bg-purple-50' : 'text-ink/75 hover:text-purple hover:bg-purple-50'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-5">
          <div className="flex gap-2">
            {[
              { Icon: FaFacebookF, label: 'Facebook' },
              { Icon: FaInstagram, label: 'Instagram' },
              { Icon: FaXTwitter, label: 'Twitter' },
              { Icon: FaYoutube, label: 'YouTube' }
            ].map(({ Icon, label }, i) => (
              <a
                key={i}
                href="#"
                aria-label={`Connect with us on ${label}`}
                className="w-8 h-8 rounded-full bg-purple-50 text-purple hover:bg-gold hover:text-purple-900 flex items-center justify-center transition-colors duration-300"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
          <Link to="/donate" className="btn-gold !px-6 !py-2.5 text-sm">
            Donate Now
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2 text-purple-900 transition-transform active:scale-95"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          {isOpen ? <FaXmark size={24} /> : <FaBars size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t border-purple-100 overflow-hidden"
          >
            <div className="flex flex-col px-5 py-4 gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                      isActive ? 'text-purple bg-purple-50' : 'text-ink/80 hover:bg-purple-50'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}

              <div className="flex justify-center gap-4 mt-6 pt-5 border-t border-purple-100">
                {[
                  { Icon: FaFacebookF, label: 'Facebook' },
                  { Icon: FaInstagram, label: 'Instagram' },
                  { Icon: FaXTwitter, label: 'Twitter' },
                  { Icon: FaYoutube, label: 'YouTube' }
                ].map(({ Icon, label }, i) => (
                  <a
                    key={i}
                    href="#"
                    aria-label={`Connect with us on ${label}`}
                    className="w-10 h-10 rounded-full bg-purple-50 text-purple hover:bg-gold hover:text-purple-900 flex items-center justify-center transition-colors duration-300"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
