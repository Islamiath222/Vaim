import { motion } from 'framer-motion'
import { ThreadDivider } from './ThreadMotif'

export default function PageHero({ eyebrow, title, description }) {
  return (
    <section className="relative bg-purple-900 pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden">
      <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-purple-600/40 blur-3xl" />
      <div className="absolute bottom-0 -left-20 w-64 h-64 rounded-full bg-gold/10 blur-3xl" />
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
            <p className="mt-6 text-white/80 text-base md:text-lg max-w-xl leading-relaxed">
              {description}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  )
}
