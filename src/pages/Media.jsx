import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FaXmark, FaPlay, FaPenToSquare, FaTrash, FaEllipsisVertical, FaCircleExclamation } from 'react-icons/fa6'
import PageHero from '../components/common/PageHero'
import SectionHeading from '../components/common/SectionHeading'
import Reveal from '../components/common/Reveal'
import ImageLightbox from '../components/common/ImageLightbox'
import { galleryCategories, galleryItems, testimonials } from '../data/content'
import heroMedia from '../assets/hero_media_objects.png'
import { collection, onSnapshot, addDoc, doc, updateDoc, deleteDoc, serverTimestamp, query, orderBy } from 'firebase/firestore'
import { db, auth, signInAnonymouslyIfNeeded } from '../lib/firebase';
export default function Media() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightboxItem, setLightboxItem] = useState(null)

  const filteredItems =
    activeCategory === 'All'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory)

  const [localTestimonials, setLocalTestimonials] = useState(() =>
    testimonials.map((t, i) => ({ ...t, id: 'default_' + i, editable: false }))
  )
  const [formData, setFormData] = useState({ name: '', role: '', quote: '' })
  const [submitted, setSubmitted] = useState(false)

  const [editingId, setEditingId] = useState(null)
  const [openDropdown, setOpenDropdown] = useState(null)
  const [testimonialToDelete, setTestimonialToDelete] = useState(null)
  const [showAllTestimonials, setShowAllTestimonials] = useState(false)

  // Authentication state is handled above. No device ID needed.
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  // Initialize anonymous auth on component mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        await signInAnonymouslyIfNeeded();
      } catch (e) {
        console.error('Anonymous auth failed:', e);
        setAuthError(e);
      } finally {
        setAuthLoading(false);
      }
    };
    initAuth();
  }, []);


  // Listen to Firestore for testimonials
  useEffect(() => {
    if (authLoading) return; // wait for auth
    const q = query(collection(db, 'testimonials'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fbTestimonials = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        editable: doc.data().ownerUid === auth?.currentUser?.uid,
      }));
      const defaults = testimonials.map((t, i) => ({ ...t, id: 'default_' + i, editable: false }));
      setLocalTestimonials([...fbTestimonials, ...defaults]);
    }, (error) => {
      console.error('Error fetching testimonials:', error);
      const defaults = testimonials.map((t, i) => ({ ...t, id: 'default_' + i, editable: false }));
      setLocalTestimonials(defaults);
    });
    return () => unsubscribe();
  }, [authLoading, auth?.currentUser?.uid]);


  const handleTestimonialSubmit = (e) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.quote.trim()) return

    const testimonialData = {
      quote: formData.quote.trim(),
      name: formData.name.trim(),
      role: formData.role.trim() || 'Community Beneficiary',
      ownerUid: auth?.currentUser?.uid,
      updatedAt: serverTimestamp(),
    };

    if (editingId !== null) {
      const docRef = doc(db, 'testimonials', editingId);
      updateDoc(docRef, testimonialData).catch(err => console.error('Error updating:', err));
      setEditingId(null);
    } else {
      testimonialData.createdAt = serverTimestamp();
      addDoc(collection(db, 'testimonials'), testimonialData).catch(err => console.error('Error adding:', err));
    }


    setFormData({ name: '', role: '', quote: '' })
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
  }

  const confirmDelete = (id) => {
    setTestimonialToDelete(id)
    setOpenDropdown(null)
  }

  const handleDelete = async () => {
    const idToDelete = testimonialToDelete
    setTestimonialToDelete(null)
    if (idToDelete) {
      try {
        await deleteDoc(doc(db, 'testimonials', idToDelete))
      } catch (error) {
        console.error("Error deleting testimonial:", error)
        alert("Failed to delete.")
      }
    }
  }

  const startEditing = (t) => {
    setFormData({ name: t.name, role: t.role, quote: t.quote })
    setEditingId(t.id)
    setSubmitted(false)
    document.getElementById('testimony-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  const cancelEditing = () => {
    setEditingId(null)
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
                    ? 'bg-green text-white'
                    : 'bg-green-50 text-green-900/70 hover:bg-green-100'
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
                  <div className="absolute inset-0 bg-green-900/20 group-hover:bg-green-900/50 transition-colors duration-300 flex items-end p-4">
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
      <section className="section-pad bg-white border-t border-green-50">
        <div className="container-page max-w-6xl">
          <SectionHeading eyebrow="In Their Words" title="Testimonials & Stories" align="center" />
          
          <div className="grid lg:grid-cols-3 gap-10 mt-12">
            {/* Left Column: Testimonial List (spans 2 columns on large screens) */}
            <div className="lg:col-span-2 space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {(showAllTestimonials ? localTestimonials : localTestimonials.slice(0, 4)).map((t, i) => (
                  <Reveal key={t.id || `${t.name}-${i}`} delay={(i % 2) * 0.1}>
                    <div className={`bg-green-50/40 rounded-2xl p-8 h-full flex flex-col justify-between border transition-all duration-300 ${
                      editingId === t.id
                        ? 'border-gold-500 shadow-lg ring-2 ring-gold-500/20'
                        : 'border-green-50 hover:border-green-100 hover:shadow-soft'
                    }`}>
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <FaPlay className="text-gold-500 transform rotate-90 scale-75 opacity-80" />
                          {t.editable && (
                            <div className="relative">
                              <button
                                onClick={() => setOpenDropdown(openDropdown === t.id ? null : t.id)}
                                className="p-2 text-ink/40 hover:text-green-900 transition-colors"
                                aria-label="Options"
                              >
                                <FaEllipsisVertical size={16} />
                              </button>
                              
                              <AnimatePresence>
                                {openDropdown === t.id && (
                                  <motion.div
                                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                    className="absolute right-0 top-full mt-1 w-32 bg-white rounded-xl shadow-lg border border-green-50 py-1.5 z-10"
                                  >
                                    <button
                                      onClick={() => { startEditing(t); setOpenDropdown(null); }}
                                      className="w-full text-left px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-50 flex items-center gap-2.5 transition-colors"
                                    >
                                      <FaPenToSquare size={13} className="text-gold-600" /> Edit
                                    </button>
                                    <button
                                      onClick={() => confirmDelete(t.id)}
                                      className="w-full text-left px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 flex items-center gap-2.5 transition-colors"
                                    >
                                      <FaTrash size={13} /> Delete
                                    </button>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          )}
                        </div>
                        <p className="font-display text-lg text-green-900 leading-relaxed italic">
                          "{t.quote}"
                        </p>
                      </div>
                      <div className="mt-6 border-t border-green-100/30 pt-4">
                        <p className="font-semibold text-green-900 text-sm">{t.name}</p>
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
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium border border-green-200 text-green-900 hover:bg-green-50 hover:border-green-300 transition-all duration-200"
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
                  editingId !== null
                    ? 'bg-gold-50 border-gold-500/40'
                    : 'bg-beige border-green-100/40'
                }`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-green-600/5 rounded-full blur-2xl pointer-events-none" />
                  
                  <h3 className="font-display font-semibold text-2xl text-green-900 mb-2">
                    {editingId !== null ? 'Edit Your Testimony' : 'Share Your Story'}
                  </h3>
                  <p className="text-sm text-ink/75 mb-6">
                    {editingId !== null
                      ? 'Update your testimony below. Your changes will appear immediately.'
                      : 'Has Victoria Alabaster impacted your life or community? We would love to hear from you.'
                    }
                  </p>

                  {submitted && editingId === null ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-green-900 text-white rounded-2xl p-6 text-center shadow-lg"
                    >
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gold-500 text-green-900 mb-4">
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
                        <label className="block text-xs font-semibold text-green-900 mb-1.5 uppercase tracking-wider">Full Name</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Your name"
                          className="w-full rounded-xl border border-green-200/60 bg-white px-4 py-3 text-sm text-green-900 placeholder-ink/40 focus:outline-none focus:ring-2 focus:ring-green-600/20 focus:border-green-600 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-green-900 mb-1.5 uppercase tracking-wider">Your Role / Relationship</label>
                        <input
                          type="text"
                          value={formData.role}
                          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                          placeholder="e.g. Beneficiary, Volunteer, Partner"
                          className="w-full rounded-xl border border-green-200/60 bg-white px-4 py-3 text-sm text-green-900 placeholder-ink/40 focus:outline-none focus:ring-2 focus:ring-green-600/20 focus:border-green-600 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-green-900 mb-1.5 uppercase tracking-wider">Your Testimony</label>
                        <textarea
                          required
                          rows={4}
                          value={formData.quote}
                          onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                          placeholder="How did the ministry help you?"
                          className="w-full rounded-xl border border-green-200/60 bg-white px-4 py-3 text-sm text-green-900 placeholder-ink/40 focus:outline-none focus:ring-2 focus:ring-green-600/20 focus:border-green-600 transition-all resize-none"
                        />
                      </div>

                      <div className={`flex gap-3 mt-2 ${editingId !== null ? '' : 'flex-col'}`}>
                        <button
                          type="submit"
                          className="flex-1 btn-primary justify-center text-center hover:scale-[1.01] active:scale-[0.99] transition-transform duration-200"
                        >
                          {editingId !== null ? 'Save Changes' : 'Submit Testimony'}
                        </button>
                        {editingId !== null && (
                          <button
                            type="button"
                            onClick={cancelEditing}
                            className="px-5 py-3 rounded-xl border border-green-200 text-green-900 text-sm font-medium hover:bg-green-50 transition-colors"
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
      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {testimonialToDelete && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl p-6 shadow-xl max-w-sm w-full border border-green-50"
            >
              <div className="flex items-center gap-3 mb-4 text-red-600">
                <FaCircleExclamation size={24} />
                <h3 className="font-semibold text-lg text-green-900">Delete Testimonial</h3>
              </div>
              <p className="text-sm text-ink/75 mb-6">
                Are you sure you want to delete this? This action cannot be undone.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-green-900 hover:bg-green-50 transition-colors"
                >
                  Yes
                </button>
                <button
                  onClick={() => setTestimonialToDelete(null)}
                  className="px-4 py-2 rounded-xl text-sm font-medium bg-red-600 text-white hover:bg-red-700 transition-colors shadow-sm"
                >
                  No
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
