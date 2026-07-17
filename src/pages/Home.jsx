import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaArrowRight, FaCircleCheck, FaChevronLeft, FaChevronRight } from 'react-icons/fa6'
import Reveal from '../components/common/Reveal'
import SectionHeading from '../components/common/SectionHeading'
import { ThreadFlourish } from '../components/common/ThreadMotif'
import { IconCard } from '../components/common/Cards'
import ImageLightbox from '../components/common/ImageLightbox'
import { supportAreas, projects, galleryItems } from '../data/content';
import heroBg from '../assets/hero_bg.png';
import heroSlide2 from '../assets/hero_slide_2_new.jpg';
import heroSlide3 from '../assets/hero_slide_3_new.jpg';
import womanImg from '../assets/victoria_main.jpg';
import whoWeAreImg from '../assets/who_we_are.jpg';
import projectOfficeImg from '../assets/project_community_center.jpg';
import projectShelterImg from '../assets/project_empowerment.jpg';

const projectImages = {
  office: projectOfficeImg,
  shelter: projectShelterImg
};


export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [lightboxItem, setLightboxItem] = useState(null);
  const [projectLightbox, setProjectLightbox] = useState(null);

  const slides = [
    {
      bgImage: heroBg,
      fgImage: womanImg,
      title: "Empowering Women, Transforming Communities",
      description: "We walk alongside women, widows, single mothers, and youth with education, food assistance, shelter, and skills training — restoring dignity, one family at a time.",
    },
    {
      bgImage: heroSlide2,
      fgImage: heroSlide2,
      title: "A Sisterhood of Strength and Support",
      description: "Our community is built on compassion and shared experiences. Together, we create a safe space where every woman's voice is heard and valued.",
    },
    {
      bgImage: heroSlide3,
      fgImage: heroSlide3,
      title: "Leadership and Growth Through Faith",
      description: "We believe in nurturing the potential of every individual. Through mentorship and spiritual guidance, we empower women to become leaders in their own communities.",
    }
  ];

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [currentSlide, isPaused, slides.length]);

  const handlePrev = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const handleNext = () => setCurrentSlide((prev) => (prev + 1) % slides.length);

  return (
    <>
      {/* HERO */}
      <section 
        className="relative overflow-hidden group min-h-[640px] md:min-h-[720px]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
            style={{ backgroundImage: `url(${slides[currentSlide].bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'blur(8px)' }}
          />
        </AnimatePresence>

        <div className="container-page grid lg:grid-cols-2 gap-10 items-start lg:items-center min-h-[640px] md:min-h-[720px] pt-24 pb-12 md:pt-28 lg:py-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 mt-16 sm:mt-20 lg:mt-0"
            >
              <span className="eyebrow drop-shadow-md" style={{ color: '#ffffff' }}>Victoria-Alabaster International Women Ministry</span>
              <h1 className="font-display font-semibold text-4xl sm:text-5xl md:text-6xl text-white mt-4 leading-[1.08] text-balance drop-shadow-md">
                {slides[currentSlide].title}
              </h1>
              <p className="mt-6 text-white/90 font-medium text-base md:text-lg max-w-md leading-relaxed drop-shadow-md">
                {slides[currentSlide].description}
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <Link to="/about" className="btn-outline-light">
                  Learn More
                </Link>
                <Link to="/donate" className="btn-gold">
                  Donate Here
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="relative h-72 md:h-[480px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className={`absolute inset-0 rounded-[2.5rem] overflow-hidden shadow-2xl ${currentSlide === 0 ? '' : 'bg-black/20'}`}
              >
                <img 
                  src={slides[currentSlide].fgImage} 
                  alt="Happy Black women in church" 
                  className={`h-full w-full ${currentSlide === 0 ? 'object-cover' : 'object-contain'}`} 
                />
              </motion.div>
            </AnimatePresence>
            <ThreadFlourish className="hidden md:block absolute z-20 -bottom-6 -left-10 w-24 h-24" />
          </div>
        </div>
        
        {/* Navigation Arrows */}
        <button 
          onClick={handlePrev}
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm transition-all z-20 opacity-100 md:opacity-0 group-hover:opacity-100 focus:opacity-100"
          aria-label="Previous slide"
        >
          <FaChevronLeft size={18} />
        </button>
        <button 
          onClick={handleNext}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm transition-all z-20 opacity-100 md:opacity-0 group-hover:opacity-100 focus:opacity-100"
          aria-label="Next slide"
        >
          <FaChevronRight size={18} />
        </button>

        {/* Carousel Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-3 rounded-full transition-all duration-300 ${
                currentSlide === idx ? 'bg-gold w-8' : 'bg-white/50 hover:bg-white/80 w-3'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-green-600/30 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-emerald-700/20 blur-3xl pointer-events-none" />
      </section>

      {/* ABOUT PREVIEW */}
      <section className="section-pad bg-white">
        <div className="container-page grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div className="relative h-72 md:h-96">
              <img src={whoWeAreImg} alt="Community hands joined together" className="w-full h-full object-cover rounded-3xl shadow-card" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <span className="eyebrow">Who We Are</span>
            <h2 className="font-display font-semibold text-3xl md:text-4xl text-green-900 mt-3 leading-tight">
              A community of compassion, built for lasting impact
            </h2>
            <p className="mt-5 text-ink/75 leading-relaxed text-lg">
              At Victoria Alabaster International Women Ministry, we believe that every woman deserves a chance to build a better life for herself and her family. We are a dedicated organization focused on uplifting widows, single mothers, and vulnerable youth.
            </p>
            <p className="mt-4 text-ink/75 leading-relaxed text-lg">
              Whether it is through providing basic needs like food and shelter, or empowering them with education and skills training, we step in to offer real, practical support. Our goal is simple: to help those facing hardship regain their confidence and become fully independent.
            </p>
            <Link to="/about" className="btn-primary mt-8">
              Read More <FaArrowRight />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* CORE SUPPORT AREAS */}
      <section className="section-pad bg-beige">
        <div className="container-page">
          <SectionHeading
            eyebrow="What We Do"
            title="Core areas of support"
            description="Every program is built around a single, simple conviction — that vulnerable families deserve consistent, dignified support."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {supportAreas.map((area, i) => (
              <IconCard key={area.title} {...area} delay={i * 0.08} />
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS PREVIEW */}
      <section className="section-pad bg-white">
        <div className="container-page">
          <SectionHeading
            eyebrow="Ongoing Projects"
            title="Building toward a lasting future"
            description="Two flagship initiatives are currently underway, each addressing a critical, long-term gap in our community's safety net."
          />
          <div className="grid lg:grid-cols-2 gap-8">
            {projects.map((project, i) => (
              <Reveal key={project.id} delay={i * 0.1}>
                <div className="group bg-beige rounded-2xl overflow-hidden shadow-card hover:shadow-soft transition-shadow duration-300 h-full flex flex-col">
                  {/* Clickable image */}
                  <button
                    className="w-full overflow-hidden cursor-zoom-in focus:outline-none"
                    style={{ height: '14rem' }}
                    onClick={() => setProjectLightbox({ image: projectImages[project.image], title: project.title })}
                    aria-label={`View full image: ${project.title}`}
                  >
                    <img
                      src={projectImages[project.image]}
                      alt={project.title}
                      className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter contrast-[1.03] brightness-[1.01] saturate-[1.02] ${
                        i === 1 ? 'object-top' : ''
                      }`}
                      style={{ imageRendering: 'high-quality' }}
                    />
                  </button>
                  <div className="p-7 flex flex-col flex-grow">
                    <h3 className="font-display font-semibold text-xl text-green-900 mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-ink/70 leading-relaxed flex-grow">{project.summary}</p>
                    <Link
                      to="/projects"
                      className="inline-flex items-center gap-2 text-green font-medium mt-5 text-sm hover:gap-3 transition-all"
                    >
                      Learn More <FaArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Project image lightbox */}
      <ImageLightbox item={projectLightbox} onClose={() => setProjectLightbox(null)} />

      {/* RECENT ACTIVITIES */}
      <section className="section-pad bg-beige">
        <div className="container-page">
          <SectionHeading
            eyebrow="In The Field"
            title="Recent activities"
            description="A glimpse into the outreach programs, trainings, and community moments shaping our work this year."
          />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
            {galleryItems.slice(0, 6).map((item, i) => (
              <Reveal key={item.id} delay={(i % 3) * 0.08}>
                <button
                  onClick={() => setLightboxItem(item)}
                  className="relative aspect-square rounded-2xl overflow-hidden group cursor-pointer w-full text-left"
                  aria-label={`View image: ${item.title}`}
                >
                  <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-green-900/20 group-hover:bg-green-900/50 transition-colors duration-300 flex items-end p-4">
                    <p className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                      {item.title}
                    </p>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/media" className="btn-outline">
              View Full Gallery <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      <ImageLightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />

      {/* DONATION CTA */}
      <section className="relative bg-green-900 section-pad overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gold/10 blur-3xl rounded-full" />
        <div className="container-page relative z-10 text-center max-w-2xl mx-auto">
          <Reveal>
            <span className="eyebrow text-gold-200">Join Us</span>
            <h2 className="font-display font-semibold text-3xl md:text-5xl text-white mt-4 leading-tight text-balance">
              Help Us Make a Difference
            </h2>
            <p className="mt-5 text-white/80 leading-relaxed">
              Your generosity directly funds school fees, food packages, shelter projects,
              and empowerment programs for women and families who need it most.
            </p>
            <Link to="/donate" className="btn-gold mt-8 inline-flex">
              Donate Here <FaArrowRight />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
