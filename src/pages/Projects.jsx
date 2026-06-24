import PageHero from '../components/common/PageHero'
import SectionHeading from '../components/common/SectionHeading'
import Reveal from '../components/common/Reveal'
import VisualPlaceholder from '../components/common/VisualPlaceholder'
import { FaCircleCheck } from 'react-icons/fa6'
import { projects, futureInitiatives } from '../data/content'

function ProgressBar({ value }) {
  return (
    <div>
      <div className="flex justify-between text-xs font-medium text-purple-900/70 mb-2">
        <span>Funding Progress</span>
        <span>{value}%</span>
      </div>
      <div className="h-2.5 w-full bg-purple-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-gold-400 to-gold-600 rounded-full transition-all duration-1000"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}

export default function Projects() {
  return (
    <>
      <PageHero
        eyebrow="Our Projects"
        title="Building the infrastructure of lasting change"
        description="Two flagship projects are underway right now — each addressing a critical, long-term gap in the safety net for the women and families we serve."
      />

      <section className="section-pad bg-white">
        <div className="container-page space-y-16">
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={i * 0.1}>
              <div
                className={`grid md:grid-cols-2 gap-10 items-center ${
                  i % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''
                }`}
              >
                <div className="h-72 md:h-[420px] rounded-3xl overflow-hidden shadow-soft">
                  <VisualPlaceholder variant={project.image} rounded="rounded-none" className="h-full" />
                </div>
                <div>
                  <span className="eyebrow">Ongoing Project</span>
                  <h2 className="font-display font-semibold text-3xl text-purple-900 mt-3 mb-4">
                    {project.title}
                  </h2>
                  <p className="text-ink/75 leading-relaxed mb-6">{project.description}</p>

                  <h4 className="font-semibold text-purple-900 mb-3 text-sm uppercase tracking-wide">
                    Goals
                  </h4>
                  <ul className="space-y-2.5 mb-6">
                    {project.goals.map((goal) => (
                      <li key={goal} className="flex items-start gap-3 text-sm text-ink/75">
                        <FaCircleCheck className="text-gold-500 mt-0.5 shrink-0" />
                        {goal}
                      </li>
                    ))}
                  </ul>

                  <h4 className="font-semibold text-purple-900 mb-2 text-sm uppercase tracking-wide">
                    Expected Impact
                  </h4>
                  <p className="text-sm text-ink/75 leading-relaxed mb-6">{project.impact}</p>

                  <ProgressBar value={project.progress} />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Future Initiatives */}
      <section className="section-pad bg-beige">
        <div className="container-page">
          <SectionHeading
            eyebrow="Looking Ahead"
            title="Future Initiatives"
            description="Programs on our roadmap as funding and partnerships allow."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {futureInitiatives.map((initiative, i) => (
              <Reveal key={initiative.title} delay={i * 0.08}>
                <div className="bg-white rounded-2xl p-7 h-full shadow-card border-t-4 border-gold">
                  <h3 className="font-display font-semibold text-lg text-purple-900 mb-2">
                    {initiative.title}
                  </h3>
                  <p className="text-sm text-ink/70 leading-relaxed">{initiative.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
