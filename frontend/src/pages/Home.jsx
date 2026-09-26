import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Check, MessageCircle } from 'lucide-react';
import { BookButton } from '../components/Appointment';
import { Starburst } from '../components/Shared';
import { EvidenceStrip, CareSection, DoctorSection, JourneySection, StoriesPreview, FaqPreview, LocationsPreview } from '../components/HomeSections';
import { contact, images } from '../data/practice';

const Hero = () => {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 45]);

  return (
    <section className="hero" ref={ref}>
      <div className="container hero-grid">
        <motion.div
          className="hero-visual"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <div className="hero-arch-container">
            <div className="hero-arch-outline" />
            <div className="hero-photo hero-photo-doctor">
              <motion.img
                src={images.doctor}
                alt="Dr Aditya Nimbkar, Fetal & Reproductive Medicine and High Risk Pregnancies Specialist"
                style={{ y: reduced ? 0 : y }}
                fetchPriority="high"
                data-testid="hero-doctor-portrait-image"
              />
            </div>
            <div className="care-seal" aria-label="For every new beginning">
              <svg viewBox="0 0 120 120" className="seal-text" aria-hidden="true">
                <defs>
                  <path id="seal-circle" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
                </defs>
                <text>
                  <textPath href="#seal-circle" textLength="272">FOR EVERY NEW BEGINNING · WITH YOU · </textPath>
                </text>
              </svg>
              <Starburst />
            </div>
            <span className="hero-side-note" data-testid="hero-locations">THANE · MULUND · KALYAN</span>
          </div>

          <Link to="/about" className="hero-doctor-card" data-testid="hero-doctor-link">
            <img src="/images/dr-aditya-logo.jpg" alt="Dr. Aditya Nimbkar Monogram" className="hero-doctor-badge-logo" />
            <div className="doctor-card-info">
              <span className="doctor-card-eyebrow">YOUR PARTNER IN CARE</span>
              <strong>Dr. Aditya Nimbkar</strong>
              <span className="doctor-card-degrees">MS Obs & Gyn, FFM, FRM, FMAS, DNB</span>
              <small>Fetal & Reproductive Medicine · High Risk Pregnancies Specialist</small>
            </div>
            <span className="doctor-card-arrow" aria-hidden="true"><ArrowUpRight size={20} /></span>
          </Link>
        </motion.div>

        <div className="hero-copy">
          <motion.div
            className="eyebrow hero-eyebrow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            data-testid="hero-eyebrow"
          >
            <span className="small-line" />
            SCIENCE-LED. HEARTFELT. ALWAYS PERSONAL.
          </motion.div>

          <h1 data-testid="hero-heading" className="hero-heading">
            {['For every', 'little heartbeat.', 'And you.'].map((line, i) => (
              <span className="masked-line" key={line}>
                <motion.span
                  initial={reduced ? false : { y: '110%', rotate: 2 }}
                  animate={{ y: 0, rotate: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                >
                  {i === 1 ? <em>{line}</em> : line}
                  {i === 2 && (
                    <svg className="hand-drawn-heart" width="57" height="55" viewBox="0 0 60 60" fill="none" aria-hidden="true">
                      <path d="M29 50C13 37 4 27 9 17c5-9 16-5 20 4C33 8 47 7 51 17c4 12-7 22-22 33Z" stroke="currentColor" strokeWidth="1.3" />
                      <path d="M30 49C19 35 15 26 20 23" stroke="currentColor" strokeWidth="0.6" />
                    </svg>
                  )}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <p className="hero-description" data-testid="hero-description">
              From the first hope of parenthood to the first hello.<br className="desktop-break" />
              Specialised fertility, fetal medicine, pregnancy and gynaecology care,<br className="desktop-break" />
              with you at the heart of it all.
            </p>

            <div className="hero-actions">
              <BookButton id="hero-book">Book an appointment</BookButton>
              <a className="whatsapp-link" href={contact.whatsapp} target="_blank" rel="noreferrer" data-testid="hero-whatsapp">
                <MessageCircle size={17} />
                Let’s talk
                <ArrowUpRight size={15} />
              </a>
            </div>

            <div className="hero-trust" data-testid="hero-trust">
              <span><Check size={14} />KEM & LTMMC, Mumbai graduated</span>
              <span className="trust-divider" />
              <span>7+ years of dedicated care</span>
            </div>
          </motion.div>

          <a href="#our-care" className="hero-scroll" data-testid="hero-explore">
            <span><ArrowDown size={15} /></span>
            EVERY JOURNEY BEGINS WITH TRUST
          </a>
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  return (
    <>
      <Hero />
      <EvidenceStrip />
      <CareSection />
      <DoctorSection />
      <JourneySection />
      <StoriesPreview />
      <FaqPreview />
      <LocationsPreview />
    </>
  );
}