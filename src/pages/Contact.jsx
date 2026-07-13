import { useState } from 'react'
import { FaLocationDot, FaPhone, FaEnvelope, FaCircleCheck, FaPaperPlane, FaFacebookF, FaInstagram, FaXTwitter } from 'react-icons/fa6'
import PageHero from '../components/common/PageHero'
import SectionHeading from '../components/common/SectionHeading'
import Reveal from '../components/common/Reveal'
import { offices } from '../data/content'

function OfficeCard({ office, delay }) {
  return (
    <Reveal delay={delay}>
      <div className="bg-white rounded-2xl p-7 shadow-card h-full border border-purple-50">
        <h3 className="font-display font-semibold text-xl text-purple-900 mb-4">
          {office.country}
        </h3>
        <div className="space-y-3 text-sm text-ink/75">
          <p className="flex items-start gap-3">
            <FaLocationDot className="text-gold-500 mt-1 shrink-0" />
            {office.address}
          </p>
          <p className="flex items-center gap-3">
            <FaPhone className="text-gold-500 shrink-0" />
            <a href={`tel:${office.phone.replace(/[^+\d]/g, '')}`} className="hover:text-purple">
              {office.phone}
            </a>
          </p>
          <p className="flex items-center gap-3">
            <FaEnvelope className="text-gold-500 shrink-0" />
            <a href={`mailto:${office.email}`} className="hover:text-purple">
              {office.email}
            </a>
          </p>
        </div>
      </div>
    </Reveal>
  )
}

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Full name is required.'
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address.'
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required.'
    } else if (!/^[+\d][\d\s-]{6,}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Enter a valid phone number.'
    }
    if (!formData.message.trim()) newErrors.message = 'Please include a message.'
    return newErrors
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: undefined })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    // Placeholder: integrate with backend/email service here.
    setSubmitted(true)
    setFormData({ name: '', email: '', phone: '', message: '' })
    setErrors({})
  }

  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="We'd love to hear from you"
        description="Whether you have a question, a partnership idea, or want to volunteer — reach out to either of our offices below."
      />

      {/* Offices */}
      <section className="section-pad bg-beige">
        <div className="container-page grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {offices.map((office, i) => (
            <OfficeCard key={office.country} office={office} delay={i * 0.1} />
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section className="section-pad bg-white">
        <div className="container-page grid lg:grid-cols-2 gap-12">
          <Reveal className="flex flex-col h-full justify-between">
            <div>
              <SectionHeading eyebrow="Send a Message" title="Get in touch" />
              <p className="text-ink/70 leading-relaxed -mt-4 mb-6">
                Fill out the form and our team will respond within 2–3 business days.
              </p>
            </div>
            <div className="mt-6 md:mt-0 pt-6 border-t border-purple-100">
              <h4 className="font-display font-semibold text-purple-900 mb-3">Connect With Us</h4>
              <p className="text-sm text-ink/65 mb-4 font-body">Follow our journey and see the direct impact of your support.</p>
              <div className="flex gap-3">
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
          </Reveal>

          <Reveal delay={0.1}>
            {submitted ? (
              <div className="bg-purple-50 rounded-2xl p-8 flex flex-col items-center text-center">
                <FaCircleCheck className="text-gold-500 text-4xl mb-4" />
                <h3 className="font-display font-semibold text-xl text-purple-900 mb-2">
                  Message sent successfully
                </h3>
                <p className="text-ink/70 text-sm">
                  Thank you for reaching out. We'll get back to you as soon as possible.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-outline mt-6 !px-6 !py-2.5 text-sm"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-purple-900 mb-1.5">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.name ? 'border-red-400' : 'border-purple-100'
                    } focus:border-purple outline-none transition-colors`}
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p id="name-error" className="text-red-500 text-xs mt-1.5">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-purple-900 mb-1.5">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.email ? 'border-red-400' : 'border-purple-100'
                    } focus:border-purple outline-none transition-colors`}
                    placeholder="jane@example.com"
                  />
                  {errors.email && (
                    <p id="email-error" className="text-red-500 text-xs mt-1.5">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-purple-900 mb-1.5">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.phone ? 'border-red-400' : 'border-purple-100'
                    } focus:border-purple outline-none transition-colors`}
                    placeholder="+234 800 000 0000"
                  />
                  {errors.phone && (
                    <p id="phone-error" className="text-red-500 text-xs mt-1.5">
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-purple-900 mb-1.5">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.message ? 'border-red-400' : 'border-purple-100'
                    } focus:border-purple outline-none transition-colors resize-none`}
                    placeholder="How can we help you?"
                  />
                  {errors.message && (
                    <p id="message-error" className="text-red-500 text-xs mt-1.5">
                      {errors.message}
                    </p>
                  )}
                </div>

                <button type="submit" className="btn-primary w-full sm:w-auto">
                  Send Message <FaPaperPlane size={14} />
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </section>

      {/* Map */}
      <section className="pb-16 md:pb-24 bg-white">
        <div className="container-page">
          <Reveal>
            <div className="rounded-2xl overflow-hidden shadow-card h-80 md:h-96">
              <iframe
                title="Office location map"
                src="https://www.google.com/maps?q=Lagos,Nigeria&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
