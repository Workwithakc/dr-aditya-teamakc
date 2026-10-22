import { Link } from 'react-router-dom';
import { ArrowUpRight, Check, MapPin, Play, Instagram } from 'lucide-react';
import { Reveal, Chapter, CareIcon, TextLink, FaqList } from './Shared';
import { BookButton } from './Appointment';
import { images, services, reviews, generalFaqs, clinicLocations } from '../data/practice';

export const EvidenceStrip = () => <section className="evidence-strip container" data-testid="experience-strip">{[['7+', 'Years of clinical experience'], ['2,000+', 'Sonographies performed'], ['3,500+', 'Deliveries as part of hospital teams'], ['20', 'Research publications']].map(([n, label]) => <div key={n}><strong>{n}</strong><span>{label}</span></div>)}</section>;
export const CareSection = () => <section className="section-padding container" id="our-care"><Reveal><Chapter number="01">CARE THAT GROWS WITH YOU</Chapter><div className="section-head"><h2 className="display-heading" data-testid="care-heading">Different chapters.<br /><em>The same thoughtful care.</em></h2><p data-testid="care-description">Wherever you are in your journey,<br />you don’t have to navigate it alone.</p></div></Reveal><div className="care-grid">{services.map((s, i) => <Reveal key={s.id} delay={i * .07}><Link to={`/${s.id}`} className={`care-card care-card-${i}`} data-testid={`care-card-${s.id}`}><div className="care-card-top"><CareIcon type={s.icon} /><span>{s.number}</span></div><div><h3>{s.title}</h3><p>{s.short}</p></div><span className="care-card-link">Explore care<ArrowUpRight size={18} /></span></Link></Reveal>)}</div></section>;
export const DoctorSection = () => <section className="doctor-section"><div className="container doctor-grid"><Reveal className="doctor-visual"><div className="doctor-credentials-feature"><div className="credential-seal"><img src="/images/dr-aditya-logo.jpg" alt="AN Monogram" className="credential-logo" /><span className="credential-stamp">CLINICAL EXCELLENCE</span></div><h3 className="credential-card-title">Academic & Clinical Pedigree</h3><div className="credential-list"><div className="credential-item"><span className="credential-dot" /><div><strong>Seth GS Medical College & KEM Hospital</strong><p>MBBS (Graduated) · Mumbai</p></div></div><div className="credential-item"><span className="credential-dot" /><div><strong>Lokmanya Tilak Municipal Medical College (LTMMC)</strong><p>MS Obstetrics & Gynaecology (Graduated) · Mumbai</p></div></div><div className="credential-item"><span className="credential-dot" /><div><strong>Fellowship in Fetal Medicine (FFM)</strong><p>Krishna Fetal Medicine Centre</p></div></div><div className="credential-item"><span className="credential-dot" /><div><strong>Fellowship in Reproductive Medicine (FRM)</strong><p>Nadkarni’s Medical Training Academy</p></div></div><div className="credential-item"><span className="credential-dot" /><div><strong>Fellowship in Minimal Access Surgery (FMAS)</strong><p>Association of Minimal Access Surgeons of India (AMASI)</p></div></div><div className="credential-item"><span className="credential-dot" /><div><strong>Diplomate of National Board (DNB)</strong><p>Obstetrics &amp; Gynaecology · NBEMS, New Delhi</p></div></div></div><div className="credential-quote-badge"><span>THE SCIENCE OF MEDICINE.</span><strong>The art of listening.</strong></div></div></Reveal><Reveal className="doctor-content"><Chapter number="02">YOUR DOCTOR. YOUR PARTNER IN CARE.</Chapter><h2 className="display-heading" data-testid="doctor-heading">Expertise you can trust.<br /><em>A person you can talk to.</em></h2><p data-testid="doctor-intro">“Every pregnancy and every fertility journey is different. Good care begins with listening.”</p><p className="body-copy" data-testid="doctor-summary">Meet Dr Aditya Nimbkar—a specialist in fetal medicine, reproductive medicine and high-risk pregnancies who brings clinical rigour and a deeply human approach to every consultation. Graduated from KEM and LTMMC Hospital, Mumbai, followed by specialised fellowships, his journey has always been about one thing: compassionate, evidence-based care for you.</p><div className="doctor-signoff" data-testid="doctor-credentials"><strong>Dr. Aditya Nimbkar</strong><span className="doctor-degrees">MS Obs & Gyn, FFM, FRM, FMAS, DNB</span><small className="doctor-specialties">Fetal & Reproductive Medicine · High Risk Pregnancies Specialist</small></div><div className="doctor-tags" data-testid="doctor-tags"><span><Check size={13} />KEM & LTMMC, Mumbai graduated</span><span><Check size={13} />Clinician. Teacher. Researcher.</span></div><TextLink to="/about" id="meet-doctor-link">The person behind the practice</TextLink></Reveal></div></section>;
export const JourneySection = () => <><div className="editorial-marquee" aria-label="Science-led. Heartfelt. Always personal." data-testid="care-manifesto"><div aria-hidden="true">{[0, 1, 2, 3].map(i => <span key={i}>Science-led. <em>Heartfelt.</em> Always personal. <span className="marquee-star">✳</span> </span>)}</div></div><section className="section-padding container"><Reveal><Chapter number="03">A LITTLE CLARITY GOES A LONG WAY</Chapter><div className="section-head"><h2 className="display-heading" data-testid="journey-heading">Care that feels<br /><em>a little less overwhelming.</em></h2><BookButton id="journey-book" className="outline-button">Take your first step</BookButton></div></Reveal><div className="journey-grid">{[['We listen first.', 'Your story, your concerns, your questions. There’s space for all of them.'], ['We make it clear.', 'Understand your scans, your options and the “why” behind every recommendation.'], ['We move forward, together.', 'A personalised plan, thoughtful follow-ups and a doctor who knows your journey.']].map(([title, text], i) => <Reveal className="journey-step" key={title} delay={i * .1}><span className="step-number">0{i + 1}</span><h3 data-testid={`journey-title-${i}`}>{title}</h3><p data-testid={`journey-text-${i}`}>{text}</p></Reveal>)}</div></section></>;

export const ClinicalMediaPreview = () => (
  <section className="section-padding container clinical-media-preview" data-testid="clinical-media-preview">
    <Reveal>
      <Chapter number="04">SURGICAL DOCUMENTATION & ACADEMIC REPUTATION</Chapter>
      <div className="section-head">
        <div>
          <h2 className="display-heading" data-testid="media-preview-heading">
            Clinical excellence.<br />
            <em>Openly documented.</em>
          </h2>
          <p className="body-copy">
            Authentic surgical case studies, 3D fetal sonography, reproductive science and playable academic masterclasses by Dr. Aditya Nimbkar across Thane, Mulund &amp; Kalyan.
          </p>
        </div>
        <div className="media-preview-head-actions">
          <Link to="/gallery" className="text-link" data-testid="view-full-gallery-link">
            Explore complete gallery (28 cases &amp; lectures) <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </Reveal>
    <div className="preview-media-grid">
      <Reveal delay={0.05} className="preview-media-card-wrapper">
        <Link to="/gallery?tab=videos" className="preview-media-card" data-testid="home-preview-video">
          <div className="preview-media-visual">
            <img src="https://img.youtube.com/vi/9x66XjQAd4g/hqdefault.jpg" alt="Fetal Growth Restriction Masterclass" loading="lazy" />
            <span className="preview-badge video-badge"><Play size={12} fill="currentColor" /> Playable Masterclass</span>
          </div>
          <div className="preview-media-info">
            <span className="preview-kicker">FETAL MEDICINE LECTURE</span>
            <h4>Fetal Growth Restriction (FGR) Simplified</h4>
            <p>Comprehensive Doppler &amp; ISUOG management guidelines explained by Dr. Aditya.</p>
          </div>
        </Link>
      </Reveal>
      <Reveal delay={0.1} className="preview-media-card-wrapper">
        <Link to="/gallery?tab=gynaecology" className="preview-media-card" data-testid="home-preview-gyn">
          <div className="preview-media-visual">
            <img src="/images/sacrospinous-fixation-prolapse.jpg" alt="Sacrospinous Fixation Surgery" loading="lazy" />
            <span className="preview-badge case-badge">Gynaecological Surgery</span>
          </div>
          <div className="preview-media-info">
            <span className="preview-kicker">PELVIC ORGAN PROLAPSE</span>
            <h4>Sacrospinous Fixation &amp; AP Repair in 80yo Patient</h4>
            <p>Complete surgical restoration in failed previous prolapse surgery.</p>
          </div>
        </Link>
      </Reveal>
      <Reveal delay={0.15} className="preview-media-card-wrapper">
        <Link to="/gallery?tab=pregnancy" className="preview-media-card" data-testid="home-preview-obs">
          <div className="preview-media-visual">
            <img src="/images/b-lynch-postpartum-suture.jpg" alt="B-Lynch Postpartum Suture" loading="lazy" />
            <span className="preview-badge emergency-badge">Obstetric Emergency</span>
          </div>
          <div className="preview-media-info">
            <span className="preview-kicker">HIGH-RISK PREGNANCY</span>
            <h4>B-Lynch Compression Suture for Uterine Salvage</h4>
            <p>Critical intervention arresting hemorrhage and saving uterus for next pregnancy.</p>
          </div>
        </Link>
      </Reveal>
    </div>
    <div className="preview-media-footer">
      <Link to="/gallery" className="pill-button" data-testid="explore-gallery-button">
        View all clinical cases &amp; masterclasses <ArrowUpRight size={17} />
      </Link>
      <a href="https://www.instagram.com/dradityanimbkar/" target="_blank" rel="noreferrer" className="instagram-pill-link" aria-label="Visit Dr. Aditya on Instagram" data-testid="home-instagram-link">
        <Instagram size={15} />
        <span>Follow @dradityanimbkar on Instagram</span>
      </a>
    </div>
  </section>
);

export const StoriesPreview = () => <section className="stories-preview"><div className="container"><Reveal><Chapter number="05">THE WORDS THAT MATTER MOST</Chapter><div className="section-head"><h2 className="display-heading" data-testid="stories-preview-heading">Care, in <em>their words.</em></h2><TextLink to="/patient-stories" id="all-stories-link">More patient experiences</TextLink></div></Reveal><div className="review-grid">{reviews.slice(0, 3).map((r, i) => <Reveal className="review-card" key={r.name} delay={i * .08}><span className="quote-mark" aria-hidden="true">“</span><blockquote data-testid={`preview-review-${i}`}>{r.quote}</blockquote><div className="review-person"><span className="review-initials" aria-hidden="true">{r.name.split(' ').map(w => w[0]).slice(0, 2).join('')}</span><span><strong data-testid={`preview-review-name-${i}`}>{r.name}</strong><small data-testid={`preview-review-category-${i}`}>{r.category} care</small></span></div></Reveal>)}</div><p className="tiny review-note" data-testid="review-source-note">Excerpts from patient feedback supplied to the practice. Individual experiences are not a guarantee of outcomes.</p></div></section>;
export const FaqPreview = () => <section className="section-padding container faq-section"><Reveal><Chapter number="06">A FEW THINGS YOU MIGHT BE WONDERING</Chapter><h2 className="display-heading" data-testid="faq-preview-heading">Questions are<br /><em>always welcome.</em></h2><p className="body-copy" data-testid="faq-invitation">No question is too small. Let’s start with a few of the most common ones.</p><TextLink to="/contact" id="faq-contact-link">Ask us something else</TextLink></Reveal><Reveal><FaqList items={generalFaqs.slice(0, 5)} prefix="home-faq" /></Reveal></section>;
export const LocationsPreview = () => <section className="locations-preview"><div className="container"><Reveal><Chapter number="07">SPECIALIST CARE, CLOSER TO HOME</Chapter><div className="section-head"><h2 className="display-heading" data-testid="locations-preview-heading">Three cities.<br /><em>One personal connection.</em></h2><TextLink to="/locations" id="find-location-link">Find your location</TextLink></div></Reveal><div className="location-links">{['Thane', 'Mulund', 'Kalyan'].map((city, i) => <Link to={`/locations?city=${city}`} key={city} data-testid={`home-location-${city.toLowerCase()}`}><span className="location-number">0{i + 1}</span><MapPin size={22} strokeWidth={1.2} /><div className="location-link-text"><strong>{city}</strong><small>{clinicLocations[city]?.clinicName}</small></div><ArrowUpRight size={24} /></Link>)}</div></div></section>;