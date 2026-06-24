import { FaShieldHalved, FaArrowRight } from 'react-icons/fa6'
import PageHero from '../components/common/PageHero'
import SectionHeading from '../components/common/SectionHeading'
import Reveal from '../components/common/Reveal'
import { IconCard, NumberedImpactCard } from '../components/common/Cards'
import { donationOptions, donationImpact } from '../data/content'
import DonationForm from '../components/donate/DonationForm'

export default function Donate() {
  return (
    <>
      <PageHero
        eyebrow="Donate"
        title="Make a Difference Today"
        description="Every donation — large or small — funds school fees, food packages, shelter projects, and empowerment training for women and families in need."
      />

      {/* Main Donation Area */}
      <section className="relative bg-beige section-pad overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/5 blur-[100px] rounded-full pointer-events-none" />
        <div className="container-page relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-start">
            
            {/* Left Column: Impact Cards */}
            <div className="lg:col-span-5 space-y-8">
              <Reveal>
                <span className="eyebrow">Where It Goes</span>
                <h2 className="font-display font-semibold text-3xl md:text-4xl text-purple-900 mt-2 leading-tight">
                  What your donation supports
                </h2>
                <p className="mt-4 text-ink/75 leading-relaxed text-lg">
                  Transparency matters to us. Here's a direct breakdown of where your contribution makes a lasting impact in our community.
                </p>
              </Reveal>
              
              <div className="space-y-4">
                {donationImpact.map((item, i) => (
                  <NumberedImpactCard
                    key={item.title}
                    number={String(i + 1).padStart(2, '0')}
                    {...item}
                    delay={i * 0.1}
                  />
                ))}
              </div>
            </div>

            {/* Right Column: Interactive Form */}
            <div className="lg:col-span-7 lg:pl-10">
              <Reveal delay={0.2}>
                <DonationForm />
              </Reveal>
            </div>
            
          </div>
        </div>
      </section>

      {/* Other Ways to Give */}
      <section className="section-pad bg-white">
        <div className="container-page">
          <SectionHeading
            eyebrow="Other Ways to Give"
            title="Alternative support methods"
            align="center"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {donationOptions.map((option, i) => (
              <IconCard key={option.title} {...option} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
