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
          light ? 'text-white' : 'text-purple-900'
        }`}
      >
        {title}
      </h2>
      <ThreadDivider className="w-24 h-4 mt-5" color={light ? '#D4AF37' : '#D4AF37'} />
      {description && (
        <p className={`mt-5 text-base md:text-lg leading-relaxed ${light ? 'text-white/85' : 'text-ink/75'}`}>
          {description}
        </p>
      )}
    </div>
  )
}
