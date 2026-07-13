import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FaBars, FaXmark, FaFacebookF, FaInstagram, FaXTwitter } from 'react-icons/fa6'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from './Logo';
import { navLinks } from '../../data/content';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-card h-20' : 'bg-white/90 backdrop-blur-sm h-26'
      }`}
    >
      <nav className="w-full flex items-center justify-between h-full py-1 pl-0 pr-5 sm:pr-8 lg:pr-12">
        <Link to="/" className="flex items-center group w-50 sm:w-44 shrink-0 justify-start -ml-5 sm:-ml-7 lg:-ml-9" onClick={() => setIsOpen(false)}>
          <Logo className="h-20 object-left" />
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
              { Icon: FaFacebookF, label: 'Facebook', href: 'https://www.facebook.com/VAIWM' },
              { Icon: FaInstagram, label: 'Instagram', href: 'https://www.instagram.com/victoriaalabaster007/' },
              { Icon: FaXTwitter, label: 'Twitter', href: 'https://x.com/VictoriaAlabast' }
            ].map(({ Icon, label, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Connect with us on ${label}`}
                className="w-8 h-8 rounded-full bg-purple-50 text-purple hover:bg-gold hover:text-purple-900 flex items-center justify-center transition-colors duration-300"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
          <Link to="/donate" className="btn-gold !px-6 !py-2.5 text-sm">
            Donate Here
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

              <div className="mt-4 px-2">
                <Link to="/donate" className="btn-gold w-full justify-center !py-3" onClick={() => setIsOpen(false)}>
                  Donate Here
                </Link>
              </div>

              <div className="flex justify-center gap-4 mt-6 pt-5 border-t border-purple-100">
                {[
                  { Icon: FaFacebookF, label: 'Facebook', href: 'https://www.facebook.com/VAIWM' },
                  { Icon: FaInstagram, label: 'Instagram', href: 'https://www.instagram.com/victoriaalabaster007/' },
                  { Icon: FaXTwitter, label: 'Twitter', href: 'https://x.com/VictoriaAlabast' }
                ].map(({ Icon, label, href }, i) => (
                  <a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
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
