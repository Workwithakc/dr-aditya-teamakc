import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { ArrowUpRight, Check, ShieldCheck, Plus, MapPin, Activity, Stethoscope } from 'lucide-react';
import { PageIntro, Reveal, Chapter, FaqList, CareIcon } from '../components/Shared';
import { BookButton } from '../components/Appointment';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '../components/ui/dialog';
import {
  services,
  images,
  fetalClinicalShowcase,
  pregnancyEmergencyCase,
  clinicalCasesGallery
} from '../data/practice';

export default function Service({ serviceId }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [fetalFacilityFilter, setFetalFacilityFilter] = useState('all');

  const service = services.find(s => s.id === serviceId);
  if (!service) return <Navigate to="/" replace />;

  const allFetalShowcase = [
    ...fetalClinicalShowcase.kalyan,
    ...fetalClinicalShowcase.thane
  ];

  const filteredFetalShowcase = fetalFacilityFilter === 'all'
    ? allFetalShowcase
    : fetalFacilityFilter === 'kalyan'
      ? fetalClinicalShowcase.kalyan
      : fetalClinicalShowcase.thane;

  return (
    <>
      <section className={`service-hero container service-hero-${service.id}`}>
        <PageIntro
          eyebrow={`${service.title.toUpperCase()} · THANE, MULUND & KALYAN`}
          title={service.heading}
          emphasis={service.emphasis}
          description={service.intro}
        >
          <BookButton id={`${service.id}-book`} service={service.title}>
            Let’s talk about your care
          </BookButton>
        </PageIntro>
        <Reveal className="service-hero-image">
          <img
            src={images[service.image]}
            alt={service.image === 'doctor' ? 'Dr Aditya Nimbkar' : 'Dr Aditya Nimbkar Clinical Practice'}
            data-testid="service-hero-image"
          />
          <div className="service-image-caption" data-testid="service-tag">
            <CareIcon type={service.icon} size={22} />
            <span>{service.tag}</span>
          </div>
        </Reveal>
      </section>

      {/* CORE OFFERINGS */}
      <section className="service-offerings">
        <div className="container">
          <Reveal>
            <Chapter number="01">THOUGHTFUL CARE, CLEARLY EXPLAINED</Chapter>
            <div className="section-head">
              <h2 className="display-heading" data-testid="service-offerings-heading">
                Specialised expertise.<br />
                <em>A personal approach.</em>
              </h2>
              <span className="service-number" aria-hidden="true">{service.number}</span>
            </div>
          </Reveal>

          <div className="offerings-grid">
            {service.items.map(([title, description], i) => (
              <Reveal className="offering" key={title} delay={i % 2 * 0.1}>
                <span className="offering-number">0{i + 1}</span>
                <div>
                  <h3 data-testid={`offering-title-${i}`}>{title}</h3>
                  <p data-testid={`offering-description-${i}`}>{description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FETAL MEDICINE CLINICAL SHOWCASE */}
      {serviceId === 'fetal-medicine' && (
        <section className="section-padding container clinical-showcase-section" data-testid="fetal-clinical-showcase">
          <Reveal>
            <Chapter number="02">AUTHENTIC CLINICAL SONOGRAPHY & FACILITIES</Chapter>
            <div className="section-head">
              <h2 className="display-heading">
                Detailed precision.<br />
                <em>Kalyan & Thane clinical facilities.</em>
              </h2>
              <p className="body-copy">
                High-definition 3D ultrasound scans, detailed fetal anomaly evaluations, and specialist prenatal procedures conducted personally by Dr. Aditya Nimbkar.
              </p>
            </div>

            <div className="clinical-filter-bar" role="tablist" aria-label="Filter clinical facilities">
              {[
                { key: 'all', label: 'All Facilities' },
                { key: 'kalyan', label: 'Kalyan (Alfi Diagnostics)' },
                { key: 'thane', label: 'Thane (Tieten Medicity / Ova)' }
              ].map(f => (
                <button
                  key={f.key}
                  role="tab"
                  aria-selected={fetalFacilityFilter === f.key}
                  className={`filter-chip ${fetalFacilityFilter === f.key ? 'selected' : ''}`}
                  onClick={() => setFetalFacilityFilter(f.key)}
                >
                  <MapPin size={14} />
                  {f.label}
                </button>
              ))}
            </div>
          </Reveal>

          <div className="clinical-grid">
            {filteredFetalShowcase.map((item, i) => (
              <Reveal key={item.id} delay={i * 0.06} className="clinical-card-wrapper">
                <div
                  className="clinical-card"
                  onClick={() => setSelectedPhoto(item)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedPhoto(item); } }}
                  data-testid={`fetal-card-${item.id}`}
                >
                  <div className="clinical-card-media">
                    <img src={item.image} alt={item.title} loading="lazy" />
                    <span className="clinical-badge">{item.badge}</span>
                    <span className="clinical-zoom-hint" aria-hidden="true"><Plus size={18} /></span>
                  </div>
                  <div className="clinical-card-body">
                    <h4>{item.title}</h4>
                    <p className="clinical-caption-text">{item.caption}</p>
                    <span className="clinical-facility-label"><MapPin size={13} />{item.facility}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* PREGNANCY CARE: CRITICAL EMERGENCY CASE & CLINICAL CASES */}
      {serviceId === 'pregnancy-care' && (
        <>
          <section className="section-padding container emergency-case-section" data-testid="emergency-obstetric-case">
            <Reveal>
              <Chapter number="02">HIGH-RISK OBSTETRICS & SURGICAL EXCELLENCE</Chapter>
              <div className="section-head">
                <h2 className="display-heading">
                  When every second counts.<br />
                  <em>Salvaging mother & twins.</em>
                </h2>
                <span className="emergency-alert-pill"><Activity size={16} />Critical Obstetric Surgery</span>
              </div>
            </Reveal>

            <div className="emergency-case-grid">
              <Reveal className="emergency-case-visual">
                <div
                  className="emergency-image-container"
                  onClick={() => setSelectedPhoto({
                    image: pregnancyEmergencyCase.image,
                    title: pregnancyEmergencyCase.title,
                    caption: pregnancyEmergencyCase.story
                  })}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedPhoto({ image: pregnancyEmergencyCase.image, title: pregnancyEmergencyCase.title, caption: pregnancyEmergencyCase.story }); } }}
                >
                  <img src={pregnancyEmergencyCase.image} alt="Dr. Aditya Nimbkar Emergency Surgery" loading="lazy" />
                  <span className="emergency-photo-badge"><Stethoscope size={14} />Emergency Operation Theatre</span>
                  <span className="clinical-zoom-hint" aria-hidden="true"><Plus size={18} /></span>
                </div>
                <p className="tiny emergency-photo-note">Authentic clinical record following emergency obstetric hysterectomy.</p>
              </Reveal>

              <Reveal className="emergency-case-content">
                <div className="emergency-quote-card">
                  <span className="quote-mark" aria-hidden="true">“</span>
                  <blockquote className="emergency-quote">
                    {pregnancyEmergencyCase.story}
                  </blockquote>
                  <div className="emergency-author">
                    <strong>{pregnancyEmergencyCase.doctorName}</strong>
                    <span>MS Obs & Gyn, FFM, FRM, FMAS, DNB · {pregnancyEmergencyCase.doctorRole}</span>
                  </div>
                </div>

                <div className="emergency-stats-grid">
                  {pregnancyEmergencyCase.stats.map(s => (
                    <div className="emergency-stat-box" key={s.label}>
                      <strong>{s.value}</strong>
                      <span>{s.label}</span>
                    </div>
                  ))}
                </div>

                <p className="emergency-takeaway">
                  <ShieldCheck size={20} />
                  <span>{pregnancyEmergencyCase.takeaway}</span>
                </p>
              </Reveal>
            </div>
          </section>

          {/* REAL OBSTETRIC CLINICAL CASES GALLERY */}
          <section className="section-padding container clinical-gallery-section" data-testid="pregnancy-cases-gallery">
            <Reveal>
              <Chapter number="03">OPERATIVE EXPERIENCES & CRITICAL MILESTONES</Chapter>
              <div className="section-head">
                <h2 className="display-heading">
                  Complex clinical cases.<br />
                  <em>Decisive outcomes.</em>
                </h2>
                <p className="body-copy">
                  From high-risk cerclage to urgent late-night operative deliveries, Dr. Aditya provides 24/7 dedicated surgical and obstetric care.
                </p>
              </div>
            </Reveal>

            <div className="clinical-cases-grid">
              {clinicalCasesGallery.filter(c => c.category !== 'Reproductive Medicine & IVF').map((c, i) => (
                <Reveal key={c.id} delay={i * 0.08} className="clinical-case-card-wrapper">
                  <div
                    className="clinical-case-card"
                    onClick={() => setSelectedPhoto(c)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedPhoto(c); } }}
                    data-testid={`case-${c.id}`}
                  >
                    <div className="clinical-case-media">
                      <img src={c.image} alt={c.title} loading="lazy" />
                      <span className="clinical-case-badge">{c.badge}</span>
                      <span className="clinical-zoom-hint" aria-hidden="true"><Plus size={18} /></span>
                    </div>
                    <div className="clinical-case-body">
                      <h4>{c.title}</h4>
                      <p className="clinical-case-caption">“{c.caption}”</p>
                      <span className="clinical-outcome-pill"><Check size={14} />{c.outcome}</span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        </>
      )}

      {/* FERTILITY & IVF CLINICAL SUCCESS */}
      {serviceId === 'fertility-care' && (
        <section className="section-padding container ivf-milestone-section" data-testid="ivf-milestone-showcase">
          <Reveal>
            <Chapter number="02">REPRODUCTIVE MEDICINE & IVF IN PRACTICE</Chapter>
            <div className="section-head">
              <h2 className="display-heading">
                From science to new life.<br />
                <em>Twins delivered with IVF, PGT-A & ERA.</em>
              </h2>
            </div>
          </Reveal>

          <div className="ivf-milestone-grid">
            <Reveal className="ivf-milestone-visual">
              <div
                className="ivf-image-container"
                onClick={() => setSelectedPhoto({
                  image: '/images/ivf-pgta-era-twins-delivery.jpg',
                  title: 'Successful delivery of twins with IVF, PGT A and ERA',
                  caption: 'Successful delivery of twins with IVF, PGT A and ERA. Personalized embryo transfer timing and pre-implantation genetic testing delivering healthy babies.'
                })}
                role="button"
                tabIndex={0}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedPhoto({ image: '/images/ivf-pgta-era-twins-delivery.jpg', title: 'Successful delivery of twins with IVF, PGT A and ERA', caption: 'Successful delivery of twins with IVF, PGT A and ERA.' }); } }}
              >
                <img src="/images/ivf-pgta-era-twins-delivery.jpg" alt="Dr Aditya Nimbkar with newborn twins" loading="lazy" />
                <span className="ivf-badge">IVF, PGT-A & ERA Success</span>
                <span className="clinical-zoom-hint" aria-hidden="true"><Plus size={18} /></span>
              </div>
              <p className="tiny emergency-photo-note">Dr. Aditya Nimbkar holding healthy newborn twins following successful IVF journey.</p>
            </Reveal>

            <Reveal className="ivf-milestone-content">
              <div className="ivf-highlight-box">
                <span className="ivf-tag">CLINICAL EXCELLENCE IN REPRODUCTIVE MEDICINE</span>
                <h3>Personalised Possibilities. Evidence-Led Science.</h3>
                <p>
                  Every fertility journey requires precision. Combining Endometrial Receptivity Analysis (ERA) to accurately identify the implantation window with Pre-implantation Genetic Testing for Aneuploidies (PGT-A) ensures the highest likelihood of healthy, viable full-term delivery.
                </p>
                <div className="ivf-points">
                  <div><Check size={16} /><span><strong>PGT-A:</strong> Chromosomal screening for healthy embryo transfer.</span></div>
                  <div><Check size={16} /><span><strong>ERA:</strong> Personalized timing for optimal endometrial receptivity.</span></div>
                  <div><Check size={16} /><span><strong>Continuum:</strong> Complete care from conception through safe twin delivery.</span></div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* WHAT TO EXPECT */}
      <section className="section-padding container service-expect">
        <Reveal>
          <Chapter number={serviceId === 'fetal-medicine' || serviceId === 'fertility-care' ? '03' : serviceId === 'pregnancy-care' ? '04' : '02'}>
            WHAT YOUR VISIT CAN LOOK LIKE
          </Chapter>
          <h2 className="display-heading" data-testid="service-expect-heading">
            More understanding.<br />
            <em>Less uncertainty.</em>
          </h2>
          <p className="body-copy" data-testid="service-expect-description">
            Every consultation starts with you. Here’s how we approach your care, one thoughtful step at a time.
          </p>
        </Reveal>

        <Reveal>
          <ol className="expect-list">
            {service.expect.map((text, i) => (
              <li key={text} data-testid={`service-expect-${i}`}>
                <span>0{i + 1}</span>
                {text}
                <Check size={16} />
              </li>
            ))}
          </ol>
          <div className="care-note" data-testid="service-medical-note">
            <ShieldCheck size={21} />
            <p>
              Recommendations depend on your individual circumstances. We’ll discuss benefits, limitations and alternatives so you can make an informed decision.
            </p>
          </div>
        </Reveal>
      </section>

      {/* FAQS */}
      <section className="service-faq-band">
        <div className="container faq-section">
          <Reveal>
            <Chapter number={serviceId === 'fetal-medicine' || serviceId === 'fertility-care' ? '04' : serviceId === 'pregnancy-care' ? '05' : '03'}>
              YOUR QUESTIONS, ANSWERED
            </Chapter>
            <h2 className="display-heading" data-testid="service-faq-heading">
              Let’s make<br />
              <em>things clearer.</em>
            </h2>
          </Reveal>
          <Reveal>
            <FaqList items={service.faqs} prefix="service-faq" />
          </Reveal>
        </div>
      </section>

      {/* RELATED CARE */}
      <section className="container related-care">
        <span className="eyebrow" data-testid="related-care-heading">CARE FOR YOUR NEXT CHAPTER</span>
        <div>
          {services.filter(s => s.id !== serviceId).map(s => (
            <Link key={s.id} data-testid={`related-${s.id}`} to={`/${s.id}`}>
              <CareIcon type={s.icon} size={21} />
              {s.title}
              <ArrowUpRight size={17} />
            </Link>
          ))}
        </div>
      </section>

      {/* CLINICAL LIGHTBOX MODAL */}
      <Dialog open={!!selectedPhoto} onOpenChange={open => !open && setSelectedPhoto(null)}>
        <DialogContent className="clinical-dialog" data-testid="clinical-dialog" data-lenis-prevent>
          <DialogTitle className="dialog-heading" data-testid="clinical-dialog-title">
            {selectedPhoto?.title}
          </DialogTitle>
          <DialogDescription data-testid="clinical-dialog-caption" className="clinical-dialog-caption">
            {selectedPhoto?.caption}
          </DialogDescription>
          {selectedPhoto && (
            <div className="clinical-dialog-media">
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                className="clinical-dialog-image"
                data-testid="clinical-dialog-image"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}