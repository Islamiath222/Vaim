import { Link } from 'react-router-dom'
import PageHero from '../components/common/PageHero'
import SectionHeading from '../components/common/SectionHeading'
import Reveal from '../components/common/Reveal'
import { SimpleNeedCard, NumberedImpactCard } from '../components/common/Cards'
import { FaArrowRight } from 'react-icons/fa6'
import { needsCategories, donationImpact } from '../data/content'
import heroNeeds from '../assets/needs_illustration_hero.jpg'

export default function Needs() {
  return (
    <>
      <PageHero
        eyebrow="Our Needs"
        title="What our communities need most right now"
        description="Every gift, large or small, goes directly toward one of the urgent needs below. Here's exactly how supporters can help."
        image={heroNeeds}
      />

      {/* Education Support */}
      <section className="section-pad bg-white">
        <div className="container-page">
          <SectionHeading eyebrow="Category 01" title="Education Support" />
          <div className="grid sm:grid-cols-2 gap-6">
            {needsCategories.education.map((item, i) => (
              <SimpleNeedCard key={item.title} {...item} delay={i * 0.08} />
            ))}
          </div>
        </div>
      </section>

      {/* Community Support */}
      <section className="section-pad bg-beige">
        <div className="container-page">
          <SectionHeading eyebrow="Category 02" title="Community Support" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {needsCategories.community.map((item, i) => (
              <SimpleNeedCard key={item.title} {...item} delay={i * 0.08} />
            ))}
          </div>
        </div>
      </section>

      {/* Empowerment Programs */}
      <section className="section-pad bg-white">
        <div className="container-page">
          <SectionHeading eyebrow="Category 03" title="Empowerment Programs" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {needsCategories.empowerment.map((item, i) => (
              <SimpleNeedCard key={item.title} {...item} delay={i * 0.08} />
            ))}
          </div>
        </div>
      </section>

      {/* How Donations Help - infographic style */}
      <section className="section-pad bg-green-900">
        <div className="container-page">
          <SectionHeading
            eyebrow="Transparency"
            title="How your donations help"
            description="A direct line from your gift to real, measurable impact."
            light
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {donationImpact.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08}>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-full backdrop-blur-sm">
                  <span className="font-display text-2xl text-gold font-semibold">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h4 className="font-display text-lg text-white mt-3 mb-2">{item.title}</h4>
                  <p className="text-sm text-white/70 leading-relaxed">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.3}>
            <div className="text-center mt-12">
              <Link to="/donate" className="btn-gold">
                Support a Need Today <FaArrowRight />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
