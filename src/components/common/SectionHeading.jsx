import { ThreadDivider } from './ThreadMotif'

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  light = false,
}) {
  const alignClass = align === 'center' ? 'text-center mx-auto items-center' : 'text-left items-start'

  return (
    <div className={`flex flex-col ${alignClass} max-w-2xl mb-10 md:mb-14`}>
      {eyebrow && <span className="eyebrow mb-3">{eyebrow}</span>}
      <h2
        className={`font-display font-semibold text-3xl sm:text-4xl md:text-5xl leading-tight text-balance ${
          light ? 'text-white' : 'text-green-900'
        }`}
      >
        {title}
      </h2>
      <div className="mt-5 flex items-center gap-1.5">
        <div className="h-1 w-10 rounded-full bg-emerald-600" />
        <div className="h-1 w-5 rounded-full bg-gold" />
        <div className="h-1 w-2 rounded-full bg-emerald-300" />
      </div>
      {description && (
        <p className={`mt-5 text-base md:text-lg leading-relaxed ${light ? 'text-white/85' : 'text-ink/75'}`}>
          {description}
        </p>
      )}
    </div>
  )
}
