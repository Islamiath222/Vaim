import { Link } from 'react-router-dom'
import { FaHeart, FaFacebookF, FaInstagram, FaXTwitter, FaLocationDot, FaPhone, FaEnvelope, FaWhatsapp } from 'react-icons/fa6'
import { navLinks, offices } from '../../data/content'
import Logo from './Logo'
export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-green-900 text-white/85">
      {/* Green accent strip */}
      <div className="h-1 w-full bg-gradient-to-r from-emerald-700 via-emerald-500 to-emerald-700" />
      <div className="container-page py-14 md:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Logo & blurb */}
        <div>
          <Link to="/" className="flex items-center mb-4">
            <div className="shrink-0 bg-white/95 p-1.5 rounded-xl shadow-sm">
              <Logo className="!h-14 sm:!h-16 !w-auto" />
            </div>
          </Link>
          <p className="text-sm leading-relaxed text-white/65">
            Empowering women, widows, single mothers, and youth through education, food
            assistance, shelter, and community outreach.
          </p>
          <div className="flex gap-3 mt-5">
            {[
              { Icon: FaFacebookF, href: 'https://www.facebook.com/VAIWM' },
              { Icon: FaInstagram, href: 'https://www.instagram.com/victoriaalabaster007/' },
              { Icon: FaXTwitter, href: 'https://x.com/VictoriaAlabast' }
            ].map(({ Icon, href }, i) => (
            <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Social media link"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-emerald-600 hover:text-white flex items-center justify-center transition-colors"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-display text-lg text-white mb-4">Quick Links</h4>
          <ul className="space-y-2.5 text-sm">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link to={link.path} className="hover:text-gold transition-colors">
                  {link.name}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/donate" className="hover:text-gold transition-colors">
                Donate Now
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="sm:col-span-2 lg:col-span-2">
          <h4 className="font-display text-lg text-white mb-4">Contact Us</h4>
          <div className="grid sm:grid-cols-2 gap-6">
            {offices.map((office) => (
              <div key={office.country} className="text-sm space-y-2">
                <p className="font-semibold text-gold-200">{office.country}</p>
                <p className="flex items-start gap-2 text-white/65">
                  <FaLocationDot className="mt-1 shrink-0" /> {office.address}
                </p>
                <p className="flex items-center gap-2 text-white/65">
                  <a href={`https://wa.me/${office.phone.replace(/[^\d]/g, '')}`} className="flex items-center gap-1 hover:text-green-200">
                    <FaWhatsapp className="shrink-0" /> Contact us on WhatsApp
                  </a>
                </p>
                <p className="flex items-center gap-2 text-white/65">
                  <FaEnvelope className="shrink-0" /> {office.email}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-emerald-700/40">
        <div className="container-page py-5 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-white/55">
          <p>&copy; {year} Victoria-Alabaster International Women Ministry. All rights reserved.</p>
          <p>Built with compassion, for communities.</p>
        </div>
      </div>
    </footer>
  )
}
