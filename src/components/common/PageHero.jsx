import { motion } from 'framer-motion'
import { ThreadDivider } from './ThreadMotif'

export default function PageHero({ eyebrow, title, description, image }) {
  return (
    <section className="relative bg-purple-900 pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {image ? (
        <div className="absolute inset-0 z-0">
          <img src={image} alt={title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-purple-900/75 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 to-purple-900/40" />
        </div>
      ) : (
        <>
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-purple-600/40 blur-3xl" />
          <div className="absolute bottom-0 -left-20 w-64 h-64 rounded-full bg-gold/10 blur-3xl" />
        </>
      )}
      <div className="container-page relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {eyebrow && <span className="eyebrow text-gold-200 mb-3 block">{eyebrow}</span>}
          <h1 className="font-display font-semibold text-4xl md:text-6xl text-white max-w-3xl text-balance">
            {title}
          </h1>
          <ThreadDivider className="w-28 h-5 mt-6" />
          {description && (
            <p className="mt-6 text-white/90 text-base md:text-lg max-w-xl leading-relaxed">
              {description}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  )
}
