import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FaXmark, FaPlay, FaPenToSquare } from 'react-icons/fa6'
import PageHero from '../components/common/PageHero'
import SectionHeading from '../components/common/SectionHeading'
import Reveal from '../components/common/Reveal'
import ImageLightbox from '../components/common/ImageLightbox'
import { galleryCategories, galleryItems, testimonials } from '../data/content'
import heroMedia from '../assets/hero_media_1783098706556.png'

export default function Media() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightboxItem, setLightboxItem] = useState(null)

  const filteredItems =
    activeCategory === 'All'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory)

  const [localTestimonials, setLocalTestimonials] = useState(() => {
    // Load user-submitted testimonials from localStorage on mount
    const saved = localStorage.getItem('vaiwm_user_testimonials')
    const userTestimonials = saved ? JSON.parse(saved) : []
    const defaults = testimonials.map(t => ({ ...t, editable: false }))
    return [...userTestimonials, ...defaults]
  })
  const [formData, setFormData] = useState({ name: '', role: '', quote: '' })
  const [submitted, setSubmitted] = useState(false)
  const [editingIndex, setEditingIndex] = useState(null)
  const [showAllTestimonials, setShowAllTestimonials] = useState(false)

  // Save user-submitted testimonials to localStorage whenever they change
  const persistUserTestimonials = (allTestimonials) => {
    const userOnly = allTestimonials.filter(t => t.editable)
    localStorage.setItem('vaiwm_user_testimonials', JSON.stringify(userOnly))
  }

  const handleTestimonialSubmit = (e) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.quote.trim()) return

    const testimonialData = {
      quote: formData.quote.trim(),
      name: formData.name.trim(),
      role: formData.role.trim() || 'Community Beneficiary',
      editable: true
    }

    let updated
    if (editingIndex !== null) {
      // Update existing testimony
      updated = [...localTestimonials]
      updated[editingIndex] = testimonialData
      setEditingIndex(null)
    } else {
      // Add new testimony
      updated = [testimonialData, ...localTestimonials]
    }

    setLocalTestimonials(updated)
    persistUserTestimonials(updated)
    setFormData({ name: '', role: '', quote: '' })
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
  }

  const startEditing = (index) => {
    const t = localTestimonials[index]
    setFormData({ name: t.name, role: t.role, quote: t.quote })
    setEditingIndex(index)
    setSubmitted(false)
    // Scroll the form into view
    document.getElementById('testimony-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  const cancelEditing = () => {
    setEditingIndex(null)
    setFormData({ name: '', role: '', quote: '' })
  }

  return (
    <>
      <PageHero
        eyebrow="Media"
        title="Moments from the field"
        description="Photos from our outreach programs, events, and the communities we walk alongside."
        image={heroMedia}
      />

      {/* Photo Gallery */}
      <section className="section-pad bg-white">
        <div className="container-page">
          <SectionHeading eyebrow="Photo Gallery" title="Our Work in Pictures" />

          <div className="flex flex-wrap gap-3 mb-10">
            {galleryCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? 'bg-purple text-white'
                    : 'bg-purple-50 text-purple-900/70 hover:bg-purple-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-5">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.button
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  onClick={() => setLightboxItem(item)}
                  className="relative aspect-square rounded-2xl overflow-hidden group text-left"
                  aria-label={`View image: ${item.title}`}
                >
                  <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-purple-900/20 group-hover:bg-purple-900/50 transition-colors duration-300 flex items-end p-4">
                    <p className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {item.title}
                    </p>
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <ImageLightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />


      {/* Testimonials */}
      <section className="section-pad bg-white border-t border-purple-50">
        <div className="container-page max-w-6xl">
          <SectionHeading eyebrow="In Their Words" title="Testimonials & Stories" align="center" />
          
          <div className="grid lg:grid-cols-3 gap-10 mt-12">
            {/* Left Column: Testimonial List (spans 2 columns on large screens) */}
            <div className="lg:col-span-2 space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {(showAllTestimonials ? localTestimonials : localTestimonials.slice(0, 4)).map((t, i) => (
                  <Reveal key={`${t.name}-${i}`} delay={(i % 2) * 0.1}>
                    <div className={`bg-purple-50/40 rounded-2xl p-8 h-full flex flex-col justify-between border transition-all duration-300 ${
                      editingIndex === i
                        ? 'border-gold-500 shadow-lg ring-2 ring-gold-500/20'
                        : 'border-purple-50 hover:border-purple-100 hover:shadow-soft'
                    }`}>
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <FaPlay className="text-gold-500 transform rotate-90 scale-75 opacity-80" />
                          {t.editable && (
                            <button
                              onClick={() => startEditing(i)}
                              className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full transition-all duration-200 ${
                                editingIndex === i
                                  ? 'bg-gold-500 text-purple-900'
                                  : 'text-purple-600 hover:bg-purple-100 hover:text-purple-900'
                              }`}
                              aria-label={`Edit testimony by ${t.name}`}
                            >
                              <FaPenToSquare size={11} />
                              {editingIndex === i ? 'Editing…' : 'Edit'}
                            </button>
                          )}
                        </div>
                        <p className="font-display text-lg text-purple-900 leading-relaxed italic">
                          "{t.quote}"
                        </p>
                      </div>
                      <div className="mt-6 border-t border-purple-100/30 pt-4">
                        <p className="font-semibold text-purple-900 text-sm">{t.name}</p>
                        <p className="text-xs text-ink/60">{t.role}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>

              {localTestimonials.length > 4 && (
                <div className="text-center mt-6">
                  <button
                    onClick={() => setShowAllTestimonials(!showAllTestimonials)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium border border-purple-200 text-purple-900 hover:bg-purple-50 hover:border-purple-300 transition-all duration-200"
                  >
                    {showAllTestimonials
                      ? 'Show Less'
                      : `View All Testimonials (${localTestimonials.length})`
                    }
                    <svg
                      className={`w-4 h-4 transition-transform duration-300 ${showAllTestimonials ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            {/* Right Column: Submit Testimony Form */}
            <div className="lg:col-span-1">
              <Reveal delay={0.2}>
                <div id="testimony-form" className={`border rounded-3xl p-8 shadow-card relative overflow-hidden transition-all duration-300 ${
                  editingIndex !== null
                    ? 'bg-gold-50 border-gold-500/40'
                    : 'bg-beige border-purple-100/40'
                }`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/5 rounded-full blur-2xl pointer-events-none" />
                  
                  <h3 className="font-display font-semibold text-2xl text-purple-900 mb-2">
                    {editingIndex !== null ? 'Edit Your Testimony' : 'Share Your Story'}
                  </h3>
                  <p className="text-sm text-ink/75 mb-6">
                    {editingIndex !== null
                      ? 'Update your testimony below. Your changes will appear immediately.'
                      : 'Has Victoria Alabaster impacted your life or community? We would love to hear from you.'
                    }
                  </p>

                  {submitted && editingIndex === null ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-purple-900 text-white rounded-2xl p-6 text-center shadow-lg"
                    >
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gold-500 text-purple-900 mb-4">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h4 className="font-semibold text-lg text-gold mb-1">Thank You!</h4>
                      <p className="text-xs text-white/95 leading-relaxed">
                        Your testimony has been saved successfully and is now appearing on the page.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleTestimonialSubmit} className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-purple-900 mb-1.5 uppercase tracking-wider">Full Name</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Your name"
                          className="w-full rounded-xl border border-purple-200/60 bg-white px-4 py-3 text-sm text-purple-950 placeholder-ink/40 focus:outline-none focus:ring-2 focus:ring-purple-600/20 focus:border-purple-600 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-purple-900 mb-1.5 uppercase tracking-wider">Your Role / Relationship</label>
                        <input
                          type="text"
                          value={formData.role}
                          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                          placeholder="e.g. Beneficiary, Volunteer, Partner"
                          className="w-full rounded-xl border border-purple-200/60 bg-white px-4 py-3 text-sm text-purple-950 placeholder-ink/40 focus:outline-none focus:ring-2 focus:ring-purple-600/20 focus:border-purple-600 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-purple-900 mb-1.5 uppercase tracking-wider">Your Testimony</label>
                        <textarea
                          required
                          rows={4}
                          value={formData.quote}
                          onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                          placeholder="How did the ministry help you?"
                          className="w-full rounded-xl border border-purple-200/60 bg-white px-4 py-3 text-sm text-purple-950 placeholder-ink/40 focus:outline-none focus:ring-2 focus:ring-purple-600/20 focus:border-purple-600 transition-all resize-none"
                        />
                      </div>

                      <div className={`flex gap-3 mt-2 ${editingIndex !== null ? '' : 'flex-col'}`}>
                        <button
                          type="submit"
                          className="flex-1 btn-primary justify-center text-center hover:scale-[1.01] active:scale-[0.99] transition-transform duration-200"
                        >
                          {editingIndex !== null ? 'Save Changes' : 'Submit Testimony'}
                        </button>
                        {editingIndex !== null && (
                          <button
                            type="button"
                            onClick={cancelEditing}
                            className="px-5 py-3 rounded-xl border border-purple-200 text-purple-900 text-sm font-medium hover:bg-purple-50 transition-colors"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </form>
                  )}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
