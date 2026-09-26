import { useSearchParams } from 'react-router-dom';
import { MapPin, ArrowUpRight, Clock3, Phone, Check } from 'lucide-react';
import { PageIntro, Reveal, Chapter } from '../components/Shared';
import { BookButton } from '../components/Appointment';
import { clinicLocations } from '../data/practice';

export default function Locations() {
  const [params, setParams] = useSearchParams();
  const city = ['Thane', 'Mulund', 'Kalyan'].includes(params.get('city')) ? params.get('city') : 'Thane';
  const selectCity = value => setParams({ city: value }, { preventScrollReset: true });
  const current = clinicLocations[city] || clinicLocations.Thane;

  return (
    <>
      <PageIntro
        eyebrow="SPECIALIST CARE, CLOSER TO HOME"
        title="Three cities."
        emphasis="One familiar face."
        description="Consultations available across Thane, Mulund and Kalyan. Choose the location that works best for you to see clinic details, timings and directions."
      />
      <section className="container locations-page">
        <div className="location-tabs" role="tablist" aria-label="Clinic locations">
          {['Thane', 'Mulund', 'Kalyan'].map((c, i) => (
            <button
              role="tab"
              id={`tab-${c}`}
              aria-selected={city === c}
              aria-controls="location-panel"
              tabIndex={city === c ? 0 : -1}
              data-testid={`location-tab-${c.toLowerCase()}`}
              className={city === c ? 'selected' : ''}
              onClick={() => selectCity(c)}
              onKeyDown={e => {
                if (['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(e.key)) {
                  e.preventDefault();
                  const next = e.key === 'Home' ? 0 : e.key === 'End' ? 2 : (i + (e.key === 'ArrowRight' ? 1 : 2)) % 3;
                  const name = ['Thane', 'Mulund', 'Kalyan'][next];
                  selectCity(name);
                  document.getElementById(`tab-${name}`)?.focus();
                }
              }}
              key={c}
            >
              <span>0{i + 1}</span>
              <MapPin size={17} />
              {c}
              <ArrowUpRight size={20} />
            </button>
          ))}
        </div>

        <div className="location-panel" role="tabpanel" id="location-panel" aria-labelledby={`tab-${city}`} data-testid="location-panel">
          <div className="location-feature-card">
            <div className="location-feature-image-wrap">
              <img
                src={current.image}
                alt={`${current.clinicName} - ${city}`}
                className="location-feature-image"
                data-testid="location-clinic-image"
              />
              <span className="location-feature-badge">
                <MapPin size={14} />
                {city.toUpperCase()} CLINIC
              </span>
            </div>
            <div className="location-feature-caption">
              <strong>{current.clinicName}</strong>
              <span>{current.note}</span>
            </div>
          </div>

          <div className="location-details">
            <span className="eyebrow" data-testid="location-type">{current.type}</span>
            <h2 data-testid="location-name">{current.clinicName}</h2>
            <p data-testid="location-address">{current.address}</p>
            <div className="location-hours" data-testid="location-hours">
              <Clock3 size={17} />
              <span>{current.schedule}</span>
            </div>
            <div className="location-actions">
              <BookButton id="location-book" location={city}>Enquire for {city}</BookButton>
              <a className="text-link" href={current.mapsUrl} target="_blank" rel="noreferrer" data-testid="location-directions">
                Get directions
                <ArrowUpRight size={17} />
              </a>
            </div>
            <a className="location-phone" href={`tel:${current.phone}`} data-testid="location-call">
              <Phone size={15} />
              Contact for appointment: {current.phone}
            </a>
          </div>
        </div>

        <Reveal className="before-visit">
          <Chapter number="01">BEFORE YOU SET OFF</Chapter>
          <div>
            {[
              'Confirm your clinic address and appointment time.',
              'Bring earlier scans, reports and current prescriptions.',
              'Ask the team about preparation for your specific scan or test.'
            ].map((text, i) => (
              <p key={text} data-testid={`before-visit-${i}`}>
                <Check size={16} />
                {text}
              </p>
            ))}
          </div>
        </Reveal>
      </section>
    </>
  );
}