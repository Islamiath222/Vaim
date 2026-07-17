import PageHero from '../components/common/PageHero'
import SectionHeading from '../components/common/SectionHeading'
import Reveal from '../components/common/Reveal'
import DonationForm from '../components/donate/DonationForm'
import heroDonate from '../assets/donate_hero_v3.jpg'
import { FaPaypal } from 'react-icons/fa6'

export default function Donate() {
  return (
    <>
      <PageHero
        eyebrow="Donate"
        title="Support the Mission"
        description="Your generosity transforms lives, strengthens communities, and spreads hope across Nigeria and beyond."
        image={heroDonate}
      />

      {/* Welcoming message + form */}
      <section className="section-pad bg-beige relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-green-600/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gold/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="container-page relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">

            {/* Left: message */}
            <Reveal className="flex flex-col justify-center">
              <span className="eyebrow">Give Generously</span>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-green-900 mt-3 leading-tight">
                Every gift makes a difference
              </h2>
              <p className="mt-5 text-ink/75 leading-relaxed text-lg font-body">
                Your generous support enables Victoria Alabaster International Women Ministry to empower women,
                reach communities, and share the love of Christ. Every donation helps us continue this mission
                and make a lasting impact.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  { icon: '🎓', text: 'School fees for children in need' },
                  { icon: '🍚', text: 'Food packages for families' },
                  { icon: '🏠', text: 'Shelter and empowerment projects' },
                  { icon: '🙏', text: 'Community outreach and ministry' },
                ].map(({ icon, text }) => (
                  <div key={text} className="flex items-center gap-3">
                    <span className="text-xl">{icon}</span>
                    <p className="text-ink/70 font-body text-sm">{text}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Right: form */}
            <Reveal delay={0.15}>
              <DonationForm />
            </Reveal>

          </div>
        </div>
      </section>

      {/* PayPal Coming Soon */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-page max-w-2xl mx-auto">
          <Reveal>
            <div className="bg-white rounded-2xl border-2 border-dashed border-blue-200 p-8 md:p-10 text-center shadow-sm">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-5">
                <FaPaypal className="text-3xl text-[#003087]" />
              </div>
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest rounded-full mb-4">
                Coming Soon
              </span>
              <h3 className="font-display font-bold text-xl text-green-900 mb-3">PayPal Donations</h3>
              <p className="text-ink/65 text-sm leading-relaxed font-body max-w-md mx-auto">
                We are currently completing our U.S. registration process. Once finalized, we will activate
                PayPal donations to make giving easier for our international supporters. Thank you for your patience!
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Bible Verse */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-green-900 to-green-800 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 50%, white 1px, transparent 1px)', backgroundSize: '60px 60px' }}
        />
        <div className="container-page max-w-3xl mx-auto text-center relative z-10">
          <Reveal>
            <svg className="w-10 h-10 text-gold mx-auto mb-6 opacity-80" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.192 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16-.95.1-1.956.76-3.022.66-1.065 1.515-1.867 2.558-2.403L9.373 5c-.8.396-1.56.898-2.26 1.505-.71.607-1.34 1.305-1.9 2.094s-.98 1.68-1.25 2.69-.346 2.04-.217 3.1c.168 1.4.62 2.52 1.356 3.35.735.84 1.652 1.26 2.748 1.26.965 0 1.766-.29 2.4-.878.628-.576.94-1.365.94-2.368l.002-.004zm9.124 0c0-.88-.23-1.618-.69-2.217-.326-.42-.77-.692-1.327-.817-.56-.124-1.074-.13-1.54-.022-.16-.94.09-1.95.75-3.02.66-1.06 1.514-1.86 2.557-2.4L18.49 5c-.8.396-1.555.898-2.26 1.505-.708.607-1.34 1.305-1.894 2.094-.556.79-.97 1.68-1.24 2.69-.273 1.012-.345 2.04-.217 3.1.168 1.4.62 2.52 1.356 3.35.735.84 1.652 1.26 2.748 1.26.965 0 1.766-.29 2.4-.878.628-.576.942-1.365.942-2.368l-.01-.004z"/>
            </svg>
            <blockquote className="font-display font-semibold text-xl md:text-2xl text-white leading-relaxed mb-6">
              "Each one must give as he has decided in his heart, not reluctantly or under compulsion,
              for God loves a cheerful giver."
            </blockquote>
            <cite className="text-gold font-body font-semibold text-base not-italic">
              — 2 Corinthians 9:7
            </cite>
          </Reveal>
        </div>
      </section>
    </>
  )
}
