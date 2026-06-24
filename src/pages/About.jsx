import PageHero from '../components/common/PageHero'
import SectionHeading from '../components/common/SectionHeading'
import Reveal from '../components/common/Reveal'
import imgVictoria from '../assets/victoria_main.jpg'

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="A story rooted in compassion, built for lasting change"
        description="Learn about the journey, purpose, and people behind Victoria Alabaster International Women Ministry."
      />

      {/* Introduction */}
      <section className="section-pad bg-white">
        <div className="container-page grid md:grid-cols-2 gap-12 items-center">
          <Reveal>
            <span className="eyebrow">Victoria-Alabaster International Women Ministry</span>
            <h2 className="font-display font-semibold text-3xl md:text-4xl text-purple-900 mt-3 leading-tight">
              A Ministry Beyond the Walls
            </h2>
            <div className="mt-5 space-y-4 text-ink/75 leading-relaxed">
              <p className="font-medium text-purple-900">
                Victoria-Alabaster International Women Ministry is not a church—it is a call to the field.
              </p>
              <p>
                The vision was birthed in Lagos, Nigeria, in 2007. Prior to my ordination, during an interview with my spiritual father in ministry, I shared a conviction that has remained the foundation of this work: “I am a field worker, not just for the church.” That calling shaped the mission and purpose of this ministry.
              </p>
              <p>
                Although the work paused in 2009 following my relocation to the United States, the call never faded. On February 8, 2022, the ministry was relaunched in Akure, Ondo State, Nigeria, with eight women gathered in faith, hope, and purpose. What began as a small gathering has continued to grow into a ministry of empowerment, compassion, and transformation.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="h-80 md:h-[420px] rounded-2xl overflow-hidden shadow-lg border border-purple-100">
              <img src={imgVictoria} alt="Victoria" className="w-full h-full object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* What We Do */}
      <section className="section-pad bg-beige">
        <div className="container-page">
          <SectionHeading
            eyebrow="Our Work"
            title="What We Do"
            align="center"
          />
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <Reveal>
              <div className="bg-white rounded-2xl p-8 shadow-card h-full flex flex-col">
                <h3 className="font-display font-semibold text-xl text-purple-900 mb-3">
                  Women’s Empowerment
                </h3>
                <p className="text-ink/75 leading-relaxed mb-4">
                  We empower women who possess valuable skills but lack the resources to establish sustainable businesses. Through practical support, we provide tools and equipment such as:
                </p>
                <ul className="space-y-2 text-ink/75 text-sm list-disc list-inside mb-6 flex-grow">
                  <li>Sewing machines for tailoring businesses</li>
                  <li>Ovens and catering equipment for food entrepreneurs</li>
                  <li>Grinding and processing machines</li>
                  <li>Support for small-scale business development</li>
                </ul>
                <p className="text-purple-900 font-medium text-sm mt-auto">
                  Our goal is to help women achieve financial independence, restore dignity, and create lasting opportunities for their families.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="bg-white rounded-2xl p-8 shadow-card h-full flex flex-col">
                <h3 className="font-display font-semibold text-xl text-purple-900 mb-3">
                  Education Support
                </h3>
                <p className="text-ink/75 leading-relaxed flex-grow">
                  We believe education is one of the most powerful tools for breaking the cycle of poverty. Through our scholarship program, we currently support children from primary school through university, giving them access to opportunities that can transform their futures.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="bg-white rounded-2xl p-8 shadow-card h-full flex flex-col">
                <h3 className="font-display font-semibold text-xl text-purple-900 mb-3">
                  Care and Compassion
                </h3>
                <p className="text-ink/75 leading-relaxed mb-4">
                  We extend practical care to those facing difficult circumstances by providing:
                </p>
                <ul className="space-y-2 text-ink/75 text-sm list-disc list-inside mb-6 flex-grow">
                  <li>Food assistance for families in need</li>
                  <li>Support for widows and single parents</li>
                  <li>Medical assistance for the sick and vulnerable</li>
                  <li>Ongoing encouragement and community support</li>
                </ul>
                <p className="text-purple-900 font-medium text-sm mt-auto">
                  We are committed to standing alongside those who need hope, help, and a helping hand.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Our Inspiration & Mission */}
      <section className="section-pad bg-white">
        <div className="container-page">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <Reveal>
              <div className="bg-purple-50/50 rounded-3xl p-8 md:p-10 h-full border border-purple-100/50">
                <SectionHeading eyebrow="The Heart Behind It" title="Our Inspiration" />
                <div className="space-y-4 text-ink/75 leading-relaxed mt-6">
                  <p>
                    Like the woman with the alabaster jar in Luke 7:37–38, we believe every person carries priceless value and purpose. Each life has the potential to pour out God’s glory and make a meaningful impact in the world.
                  </p>
                  <p>
                    For this reason, we meet people where they are—in markets, homes, hospitals, schools, and communities—bringing practical help, encouragement, and the love of Christ.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="bg-gold-50/50 rounded-3xl p-8 md:p-10 h-full border border-gold-200/50">
                <SectionHeading eyebrow="Our Calling" title="Our Mission" />
                <div className="space-y-4 text-ink/75 leading-relaxed mt-6 font-medium">
                  <p className="text-purple-900">From Lagos to Akure.<br />From pause to purpose.<br />The field remains our altar.</p>
                  <p>
                    We are raising women, educating children, supporting families, and transforming lives—one person, one family, and one community at a time.
                  </p>
                  <div className="pt-4 mt-2 border-t border-gold-200/80 text-purple-900 font-semibold italic text-lg leading-snug">
                    Victoria-Alabaster International Women Ministry: Empowering Women. Educating Children. Transforming Communities.
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
