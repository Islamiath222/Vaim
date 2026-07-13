import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FaXmark } from 'react-icons/fa6'

/**
 * ImageLightbox – renders a full-screen overlay for a single gallery item.
 *
 * Props:
 *   item     – { image, title, category? } | null
 *   onClose  – function called when the user closes the lightbox
 */
export default function ImageLightbox({ item, onClose }) {
  // Close on Escape key
  useEffect(() => {
    if (!item) return
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [item, onClose])

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = item ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [item])

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4 md:p-8"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={item.title}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close image preview"
            className="absolute top-5 right-5 z-10 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-gold hover:text-purple-900 transition-colors duration-200"
          >
            <FaXmark size={22} />
          </button>

          {/* Image container */}
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-contain max-h-[85vh]"
            />
            {/* Caption bar */}
            {item.title && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-6 py-5">
                <p className="text-white font-semibold text-lg leading-snug">{item.title}</p>
                {item.category && (
                  <p className="text-gold-300 text-xs uppercase tracking-widest font-medium mt-1">{item.category}</p>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
