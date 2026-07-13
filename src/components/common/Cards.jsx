import * as Fa6 from 'react-icons/fa6'
import Reveal from './Reveal'

export function IconCard({ icon, title, description, delay = 0 }) {
  const Icon = Fa6[icon] || Fa6.FaHeart
  return (
    <Reveal delay={delay}>
      <div className="group bg-white border border-purple-100 rounded-2xl p-7 h-full shadow-card hover:shadow-soft hover:-translate-y-1.5 transition-all duration-300 hover:border-emerald-200">
        <div className="w-14 h-14 rounded-xl bg-purple-50 flex items-center justify-center mb-5 group-hover:bg-emerald-700 group-hover:text-white text-purple transition-colors duration-300">
          <Icon size={26} />
        </div>
        <h3 className="font-display font-semibold text-xl text-purple-900 mb-2">{title}</h3>
        <p className="text-ink/70 text-sm leading-relaxed">{description}</p>
      </div>
    </Reveal>
  )
}

export function NumberedImpactCard({ number, title, description, delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <div className="flex gap-4 items-start bg-beige rounded-2xl p-6 h-full border border-purple-100/50">
        <span className="font-display text-3xl text-gold-500 font-semibold shrink-0">{number}</span>
        <div>
          <h4 className="font-display font-semibold text-lg text-purple-900 mb-1.5">{title}</h4>
          <p className="text-sm text-ink/70 leading-relaxed">{description}</p>
        </div>
      </div>
    </Reveal>
  )
}

export function SimpleNeedCard({ title, description, image, delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <div className="bg-white rounded-2xl p-6 h-full shadow-card border border-purple-50 hover:border-gold-200 transition-colors duration-300 flex flex-col">
        {image && (
          <div className="w-full h-48 mb-5 rounded-xl overflow-hidden shrink-0 shadow-sm border border-purple-50">
            <img src={image} alt={title} className="w-full h-full object-cover" />
          </div>
        )}
        <h4 className="font-display font-semibold text-lg text-purple-900 mb-2">{title}</h4>
        <p className="text-sm text-ink/70 leading-relaxed flex-grow">{description}</p>
      </div>
    </Reveal>
  )
}

export function ProfileCard({ name, role, delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <div className="bg-white rounded-2xl shadow-card border border-purple-50 overflow-hidden text-center hover:shadow-soft transition-shadow duration-300">
        <div className="aspect-square bg-purple-50 flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-2/3 h-2/3 text-purple-200">
            <circle cx="50" cy="38" r="20" fill="currentColor" />
            <path d="M15 95 Q50 60 85 95 Z" fill="currentColor" />
          </svg>
        </div>
        <div className="p-5">
          <h4 className="font-display font-semibold text-purple-900">{name}</h4>
          <p className="text-xs uppercase tracking-wide text-gold-600 font-medium mt-1">{role}</p>
        </div>
      </div>
    </Reveal>
  )
}
