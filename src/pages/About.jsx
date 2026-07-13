import PageHero from '../components/common/PageHero'
import Reveal from '../components/common/Reveal'
import imgVictoria from '../assets/victoria_main.jpg'
import heroAbout from '../assets/hero_about_1783098676286.png'

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="A story rooted in compassion, built for lasting change"
        description="Learn about the journey, purpose, and people behind Victoria Alabaster International Women Ministry."
        image={heroAbout}
      />

      {/* Introduction */}
      <section className="section-pad bg-white text-purple-900">
        <div className="container-page grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <span className="eyebrow !text-purple-900">Victoria-Alabaster International Women Ministry</span>
            <h2 className="font-body font-bold text-3xl md:text-4xl text-purple-900 mt-3 leading-tight">
              A Ministry Beyond the Walls
            </h2>
            <div className="mt-5 space-y-4 text-purple-900 leading-relaxed text-base">
              <p className="font-bold text-purple-900">
                Victoria-Alabaster International Women Ministry is not a church—it is a call to the field.
              </p>
              <p className="text-purple-900">
                The vision was birthed in Lagos, Nigeria, in 2007. Prior to my ordination, during an interview with my spiritual father in ministry, I shared a conviction that has remained the foundation of this work: “I am a field worker, not just for the church.” That calling shaped the mission and purpose of this ministry.
              </p>
              <p className="text-purple-900">
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
      <section className="section-pad bg-beige text-purple-900">
        <div className="container-page">
          <div className="flex flex-col text-center mx-auto items-center max-w-2xl mb-10 md:mb-14">
            <span className="eyebrow mb-3 !text-purple-900">Our Work</span>
            <h2 className="font-body font-bold text-3xl sm:text-4xl md:text-5xl leading-tight text-balance text-purple-900">
              What We Do
            </h2>
            <div className="mt-5 flex items-center gap-1.5">
              <div className="h-1 w-10 rounded-full bg-emerald-600" />
              <div className="h-1 w-5 rounded-full bg-gold" />
              <div className="h-1 w-2 rounded-full bg-emerald-300" />
            </div>
          </div>
          <div className="grid lg:grid-cols-3 gap-8 mt-12">
            <Reveal>
              <div className="bg-white rounded-2xl p-8 shadow-card h-full flex flex-col text-purple-900">
                <h3 className="font-body font-bold text-2xl text-purple-900 mb-3">
                  Women’s Empowerment
                </h3>
                <p className="text-purple-900 leading-relaxed mb-4 text-base">
                  We empower women who possess valuable skills but lack the resources to establish sustainable businesses. Through practical support, we provide tools and equipment such as:
                </p>
                <ul className="space-y-2 text-purple-900 text-base list-disc list-inside mb-6 flex-grow">
                  <li>Sewing machines for tailoring businesses</li>
                  <li>Ovens and catering equipment for food entrepreneurs</li>
                  <li>Grinding and processing machines</li>
                  <li>Support for small-scale business development</li>
                </ul>
                <p className="text-purple-900 font-bold text-base mt-auto">
                  Our goal is to help women achieve financial independence, restore dignity, and create lasting opportunities for their families.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="bg-white rounded-2xl p-8 shadow-card h-full flex flex-col text-purple-900">
                <h3 className="font-body font-bold text-2xl text-purple-900 mb-3">
                  Education Support
                </h3>
                <p className="text-purple-900 leading-relaxed flex-grow text-base">
                  We believe education is one of the most powerful tools for breaking the cycle of poverty. Through our scholarship program, we currently support children from primary school through university, giving them access to opportunities that can transform their futures.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="bg-white rounded-2xl p-8 shadow-card h-full flex flex-col text-purple-900">
                <h3 className="font-body font-bold text-2xl text-purple-900 mb-3">
                  Care and Compassion
                </h3>
                <p className="text-purple-900 leading-relaxed mb-4 text-base">
                  We extend practical care to those facing difficult circumstances by providing:
                </p>
                <ul className="space-y-2 text-purple-900 text-base list-disc list-inside mb-6 flex-grow">
                  <li>Food assistance for families in need</li>
                  <li>Support for widows and single parents</li>
                  <li>Medical assistance for the sick and vulnerable</li>
                  <li>Ongoing encouragement and community support</li>
                </ul>
                <p className="text-purple-900 font-bold text-base mt-auto">
                  We are committed to standing alongside those who need hope, help, and a helping hand.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Our Inspiration & Mission */}
      <section className="section-pad bg-white text-purple-900">
        <div className="container-page">
          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <Reveal>
              <div className="bg-purple-50/50 rounded-3xl p-8 md:p-10 h-full border border-purple-100/50 flex flex-col text-purple-900">
                <div className="mb-3">
                  <span className="eyebrow !text-purple-900">The Heart Behind It</span>
                </div>
                <h3 className="font-body font-bold text-2xl text-purple-900 mb-3">
                  Our Inspiration
                </h3>
                <div className="space-y-4 text-purple-900 leading-relaxed text-base flex-grow mt-3">
                  <p className="text-purple-900">
                    Like the woman with the alabaster jar in Luke 7:37–38, we believe every person carries priceless value and purpose. Each life has the potential to pour out God’s glory and make a meaningful impact in the world.
                  </p>
                  <p className="text-purple-900">
                    For this reason, we meet people where they are—in markets, homes, hospitals, schools, and communities—bringing practical help, encouragement, and the love of Christ.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="bg-gold-50/50 rounded-3xl p-8 md:p-10 h-full border border-gold-200/50 flex flex-col text-purple-900">
                <div className="mb-3">
                  <span className="eyebrow !text-purple-900">Our Calling</span>
                </div>
                <h3 className="font-body font-bold text-2xl text-purple-900 mb-3">
                  Our Mission
                </h3>
                <div className="space-y-4 text-purple-900 leading-relaxed text-base flex-grow mt-3">
                  <p className="text-purple-900 font-bold">From Lagos to Akure.<br />From pause to purpose.<br />The field remains our altar.</p>
                  <p className="text-purple-900">
                    We are raising women, educating children, supporting families, and transforming lives—one person, one family, and one community at a time.
                  </p>
                  <div className="pt-4 mt-2 border-t border-gold-200/80 text-purple-900 font-bold text-base">
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
