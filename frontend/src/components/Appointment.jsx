import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  ArrowUpRight,
  Check,
  MessageCircle,
  ShieldCheck,
  ArrowLeft,
  Calendar,
  Clock3,
  MapPin,
  Sparkles,
  Building2,
  Info,
  User,
  Phone as PhoneIcon,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';
import { contact, services, clinicLocations } from '../data/practice';

const AppointmentContext = createContext(null);
export const useAppointment = () => useContext(AppointmentContext);

export const BookButton = ({ children = 'Book an appointment', id, className = '', service = '', location = '' }) => {
  const { openBooking } = useAppointment();
  return (
    <Button
      id={id}
      data-testid={id}
      className={`pill-button ${className}`}
      onClick={() => openBooking({ service, location, mode: 'calendar' })}
    >
      {children}
      <ArrowUpRight size={17} />
    </Button>
  );
};

const CLINIC_SCHEDULE_DATA = {
  Mulund: {
    city: 'Mulund',
    clinicName: 'Maher Maternity and Nursing Home',
    address: 'Mulund West, Mumbai',
    ruleBadge: 'EVERYDAY APPOINTMENT BASIS',
    ruleHeadline: 'Consultations available everyday on appointment basis',
    ruleDescription: 'Dr. Aditya is available at Maher Maternity daily for obstetric scans, fetal consultations, and high-risk pregnancy evaluations. Morning and evening OPD slots can be confirmed.',
    timings: [
      'Morning OPD (10:00 AM – 1:00 PM)',
      'Evening OPD (5:00 PM – 8:00 PM)',
      'Everyday on Appointment Basis'
    ],
    highlightDays: 'Monday through Sunday'
  },
  Thane: {
    city: 'Thane',
    clinicName: 'Ova Fertility & Women Care',
    address: '1st Floor, Tieten Medicity Hospital, Ghodbunder Rd, Thane West',
    ruleBadge: 'PRIOR APPOINTMENT BASIS',
    ruleHeadline: 'Consultations by prior appointment',
    ruleDescription: 'Specialised fetal medicine, reproductive assessments, and fertility evaluations at Tieten Medicity Hospital. Book your slot for personalized, unhurried care.',
    timings: [
      'Morning Specialist Slot (By Appointment)',
      'Evening Specialist Slot (By Appointment)',
      'Flexible Consultation (By Prior Appointment)'
    ],
    highlightDays: 'Scheduled Appointment Days'
  },
  Kalyan: {
    city: 'Kalyan',
    clinicName: 'Alfi Diagnostics and Smart Clinics',
    address: 'Kalyan West, Mumbai MMR',
    ruleBadge: 'TUE · THU · SAT MORNINGS',
    ruleHeadline: 'Tuesday, Thursday & Saturday: 9:00 AM – 2:00 PM',
    ruleDescription: 'Specialist Kalyan consultations operate exclusively on Tuesday, Thursday and Saturday mornings (9:00 AM – 2:00 PM). When booking on the calendar below, please pick a Tuesday, Thursday, or Saturday date.',
    timings: [
      'Tuesday Morning (9:00 AM – 2:00 PM)',
      'Thursday Morning (9:00 AM – 2:00 PM)',
      'Saturday Morning (9:00 AM – 2:00 PM)'
    ],
    highlightDays: 'Tuesday, Thursday & Saturday'
  }
};

const CARE_OPTIONS = [
  'Fetal Medicine & Advanced Sonography',
  'Fertility & Reproductive Medicine (IVF / IUI)',
  'High-Risk Pregnancy Care',
  'Advanced Laparoscopy & Gynaecology',
  'General Consultation & Second Opinion'
];

export const CalendlyBooking = ({ initialLocation = '', initialService = '', prefix = 'booking' }) => {
  const normalizeLoc = (loc) => {
    if (!loc) return 'Mulund';
    const l = loc.toLowerCase();
    if (l.includes('kalyan')) return 'Kalyan';
    if (l.includes('thane')) return 'Thane';
    return 'Mulund';
  };

  const defaultLoc = normalizeLoc(initialLocation);
  const [location, setLocation] = useState(defaultLoc);
  const [service, setService] = useState(initialService || CARE_OPTIONS[0]);
  const [timing, setTiming] = useState(CLINIC_SCHEDULE_DATA[defaultLoc].timings[0]);
  
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientNote, setPatientNote] = useState('');
  
  const [debouncedName, setDebouncedName] = useState('');
  const [debouncedPhone, setDebouncedPhone] = useState('');
  const [debouncedNote, setDebouncedNote] = useState('');
  
  const [loading, setLoading] = useState(true);
  const [showPatientFields, setShowPatientFields] = useState(false);

  // Debounce text inputs to avoid reloading iframe on every keystroke
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedName(patientName);
      setDebouncedPhone(patientPhone);
      setDebouncedNote(patientNote);
    }, 450);
    return () => clearTimeout(timer);
  }, [patientName, patientPhone, patientNote]);

  const handleLocationChange = (newLoc) => {
    setLocation(newLoc);
    setTiming(CLINIC_SCHEDULE_DATA[newLoc].timings[0]);
    setLoading(true);
  };

  const handleTimingChange = (e) => {
    setTiming(e.target.value);
    setLoading(true);
  };

  const handleServiceChange = (e) => {
    setService(e.target.value);
    setLoading(true);
  };

  const activeClinic = CLINIC_SCHEDULE_DATA[location] || CLINIC_SCHEDULE_DATA.Mulund;

  // Rich formatted clinical briefing string transmitted directly to the doctor upon booking
  const doctorDescription = [
    `🏥 HOSPITAL: ${activeClinic.clinicName} (${location})`,
    `📋 CARE NEEDED: ${service}`,
    `⏰ SCHEDULE RULE: ${activeClinic.ruleHeadline}`,
    `🕒 PREFERRED TIMING: ${timing}`,
    debouncedName.trim() ? `👤 PATIENT: ${debouncedName.trim()}` : '',
    debouncedPhone.trim() ? `📞 MOBILE: ${debouncedPhone.trim()}` : '',
    debouncedNote.trim() ? `📝 CONCERN: ${debouncedNote.trim()}` : ''
  ].filter(Boolean).join(' | ');

  const embedUrl = useMemo(() => {
    try {
      const url = new URL(contact.calendly);
      url.searchParams.set('hide_landing_page_details', '1');
      url.searchParams.set('hide_gdpr_banner', '1');
      url.searchParams.set('background_color', 'fcf8f4');
      url.searchParams.set('text_color', '3b2d26');
      url.searchParams.set('primary_color', 'a0523f');
      if (debouncedName.trim()) {
        url.searchParams.set('name', debouncedName.trim());
      }
      url.searchParams.set('a1', doctorDescription);
      if (debouncedPhone.trim()) {
        url.searchParams.set('a2', debouncedPhone.trim());
      }
      if (debouncedNote.trim()) {
        url.searchParams.set('a3', debouncedNote.trim());
      }
      url.searchParams.set('utm_source', 'DrAditya_Website');
      url.searchParams.set(
        'utm_medium',
        `${location}_${activeClinic.clinicName.replace(/[^a-zA-Z0-9]/g, '_')}`
      );
      url.searchParams.set('utm_campaign', service.replace(/[^a-zA-Z0-9]/g, '_'));
      url.searchParams.set('utm_content', timing.replace(/[^a-zA-Z0-9]/g, '_'));
      if (debouncedNote.trim()) {
        url.searchParams.set('utm_term', debouncedNote.slice(0, 45).replace(/[^a-zA-Z0-9]/g, '_'));
      }
      return url.toString();
    } catch {
      return contact.calendlyEmbed;
    }
  }, [activeClinic.clinicName, debouncedName, debouncedNote, debouncedPhone, doctorDescription, location, service, timing]);

  const directUrl = useMemo(() => {
    try {
      const url = new URL(contact.calendly);
      if (debouncedName.trim()) {
        url.searchParams.set('name', debouncedName.trim());
      }
      url.searchParams.set('a1', doctorDescription);
      if (debouncedPhone.trim()) {
        url.searchParams.set('a2', debouncedPhone.trim());
      }
      if (debouncedNote.trim()) {
        url.searchParams.set('a3', debouncedNote.trim());
      }
      url.searchParams.set('utm_source', 'DrAditya_Website');
      url.searchParams.set(
        'utm_medium',
        `${location}_${activeClinic.clinicName.replace(/[^a-zA-Z0-9]/g, '_')}`
      );
      url.searchParams.set('utm_campaign', service.replace(/[^a-zA-Z0-9]/g, '_'));
      url.searchParams.set('utm_content', timing.replace(/[^a-zA-Z0-9]/g, '_'));
      if (debouncedNote.trim()) {
        url.searchParams.set('utm_term', debouncedNote.slice(0, 45).replace(/[^a-zA-Z0-9]/g, '_'));
      }
      return url.toString();
    } catch {
      return contact.calendly;
    }
  }, [activeClinic.clinicName, debouncedName, debouncedNote, debouncedPhone, doctorDescription, location, service, timing]);

  return (
    <div className="calendly-booking-section" data-testid={`${prefix}-calendly-section`}>
      <div className="calendly-header-meta">
        <div className="calendly-badge-strip">
          <span className="calendly-live-badge">
            <span className="pulse-dot" />
            LIVE ONLINE CALENDAR
          </span>
          <span className="calendly-context-pill" data-testid={`${prefix}-context-location`}>
            <MapPin size={13} />
            {location} · {activeClinic.clinicName}
          </span>
          <span className="calendly-context-pill" data-testid={`${prefix}-context-service`}>
            <Sparkles size={13} />
            {service}
          </span>
        </div>
        <p className="calendly-instruction">
          Select your hospital location and preferred timing slot below. Your preferences and clinical details will be automatically prefilled into Dr. Aditya's calendar description upon booking.
        </p>
      </div>

      {/* Interactive Hospital & Timing Prefill Customizer */}
      <div className="calendly-prefill-card" data-testid={`${prefix}-prefill-card`}>
        <div className="prefill-section-title">
          <Building2 size={16} />
          <span>1. Select Hospital / Consultation Clinic</span>
        </div>
        
        <div className="prefill-location-grid" role="radiogroup" aria-label="Select hospital location">
          {Object.entries(CLINIC_SCHEDULE_DATA).map(([cityKey, clinic]) => {
            const isActive = location === cityKey;
            return (
              <button
                key={cityKey}
                type="button"
                role="radio"
                aria-checked={isActive}
                onClick={() => handleLocationChange(cityKey)}
                className={`prefill-loc-btn ${isActive ? 'active' : ''}`}
                data-testid={`${prefix}-loc-select-${cityKey.toLowerCase()}`}
              >
                <div className="prefill-loc-head">
                  <strong>{clinic.city}</strong>
                  {isActive ? <Check size={14} className="active-check" /> : <MapPin size={13} className="inactive-pin" />}
                </div>
                <span className="prefill-loc-clinic">{clinic.clinicName}</span>
                <span className="prefill-loc-badge">{clinic.ruleBadge}</span>
              </button>
            );
          })}
        </div>

        {/* Schedule Guidance Callout Banner */}
        <div className={`calendly-schedule-notice schedule-${location.toLowerCase()}`} data-testid={`${prefix}-schedule-notice`}>
          <div className="notice-icon">
            <Info size={16} />
          </div>
          <div className="notice-content">
            <div className="notice-heading">
              <strong>{activeClinic.ruleHeadline}</strong>
            </div>
            <p>{activeClinic.ruleDescription}</p>
          </div>
        </div>

        {/* Care & Timing Selectors */}
        <div className="prefill-grid-2">
          <label className="prefill-field-label" htmlFor={`${prefix}-care-select`}>
            <span className="label-text">
              <Sparkles size={14} /> Care Category
            </span>
            <select
              id={`${prefix}-care-select`}
              value={service}
              onChange={handleServiceChange}
              className="prefill-select"
              data-testid={`${prefix}-prefill-care-select`}
            >
              {CARE_OPTIONS.map((care) => (
                <option key={care} value={care}>
                  {care}
                </option>
              ))}
            </select>
          </label>

          <label className="prefill-field-label" htmlFor={`${prefix}-timing-select`}>
            <span className="label-text">
              <Clock3 size={14} /> Timing Preference
            </span>
            <select
              id={`${prefix}-timing-select`}
              value={timing}
              onChange={handleTimingChange}
              className="prefill-select"
              data-testid={`${prefix}-prefill-timing-select`}
            >
              {activeClinic.timings.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* Collapsible Quick Patient Details */}
        <div className="prefill-patient-section">
          <button
            type="button"
            className="prefill-patient-toggle-btn"
            onClick={() => setShowPatientFields(!showPatientFields)}
            data-testid={`${prefix}-patient-fields-toggle`}
            aria-expanded={showPatientFields}
          >
            <User size={14} />
            <span>Pre-fill your contact details (Optional)</span>
            {showPatientFields ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>

          {showPatientFields && (
            <div className="prefill-patient-inputs-grid">
              <label className="prefill-subfield-label">
                <span>Patient Full Name</span>
                <input
                  type="text"
                  placeholder="e.g. Ananya Sharma"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="prefill-text-input"
                  data-testid={`${prefix}-prefill-name-input`}
                  maxLength={70}
                />
              </label>

              <label className="prefill-subfield-label">
                <span>Mobile Number</span>
                <input
                  type="tel"
                  placeholder="10-digit mobile number"
                  value={patientPhone}
                  onChange={(e) => setPatientPhone(e.target.value)}
                  className="prefill-text-input"
                  data-testid={`${prefix}-prefill-phone-input`}
                  maxLength={10}
                />
              </label>

              <label className="prefill-subfield-label full-span">
                <span>Specific Concern / Medical Query (Optional)</span>
                <input
                  type="text"
                  placeholder="e.g. 20-week anomaly scan review, second opinion on fibroid..."
                  value={patientNote}
                  onChange={(e) => setPatientNote(e.target.value)}
                  className="prefill-text-input"
                  data-testid={`${prefix}-prefill-note-input`}
                  maxLength={100}
                />
              </label>
            </div>
          )}
        </div>

        {/* Doctor Description Live Sync Pill */}
        <div className="calendly-prefill-status" data-testid={`${prefix}-doctor-briefing-pill`}>
          <div className="status-dot-wrap">
            <span className="pulse-dot-green" />
          </div>
          <div className="status-text-wrap">
            <span className="status-title">Prefilled into Dr. Aditya's Calendar Description:</span>
            <span className="status-preview">{doctorDescription}</span>
          </div>
        </div>
      </div>

      {/* Embedded Live Calendly Calendar */}
      <div className="calendly-frame-wrap" data-testid={`${prefix}-calendly-wrap`}>
        {loading && (
          <div className="calendly-loading-skeleton" aria-label="Loading booking calendar...">
            <div className="skeleton-spinner" />
            <span>Updating Dr. Aditya's consultation calendar with your preferences...</span>
          </div>
        )}
        <iframe
          key={embedUrl}
          src={embedUrl}
          width="100%"
          height="650"
          frameBorder="0"
          title="Dr. Aditya Nimbkar Consultation Calendar"
          className={`calendly-iframe ${loading ? 'hidden' : 'visible'}`}
          onLoad={() => setLoading(false)}
          data-testid={`${prefix}-calendly-iframe`}
        />
      </div>

      <div className="calendly-footer-bar">
        <div className="calendly-trust-strip">
          <span><Check size={14} /> Instant calendar confirmation</span>
          <span><Clock3 size={14} /> Real-time availability</span>
          <span><ShieldCheck size={14} /> Confidential &amp; secure</span>
        </div>
        <a
          href={directUrl}
          target="_blank"
          rel="noreferrer"
          className="calendly-open-link"
          data-testid={`${prefix}-calendly-external-link`}
        >
          Open prefilled calendar in full window
          <ArrowUpRight size={14} />
        </a>
      </div>
    </div>
  );
};

export const AppointmentForm = ({ initialService = '', initialLocation = '', prefix = 'booking', defaultMode = 'calendar' }) => {
  const [bookingMode, setBookingMode] = useState(defaultMode);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    service: initialService,
    location: initialLocation,
    date: '',
    consent: false
  });
  const [review, setReview] = useState(false);
  const [errors, setErrors] = useState({});

  const update = e => {
    const { name, type, checked, value } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
    setErrors(current => {
      const next = { ...current };
      delete next[name];
      return next;
    });
  };

  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

  const accessibility = field => ({
    'aria-invalid': Boolean(errors[field]),
    'aria-describedby': errors[field] ? `${prefix}-${field}-error` : undefined
  });

  const fieldError = field =>
    errors[field] ? (
      <span className="field-error" id={`${prefix}-${field}-error`} data-testid={`${prefix}-${field}-error`}>
        {errors[field]}
      </span>
    ) : null;

  const message = `Hello Dr Aditya Nimbkar's team, I would like to enquire about an appointment.\n\nName: ${form.name.trim()}\nPhone: ${form.phone}\nCare: ${form.service}\nPreferred location: ${form.location}${form.date ? `\nPreferred date: ${form.date}` : ''}\n\nPlease let me know the available clinic and time. Thank you.`;

  function submit(e) {
    e.preventDefault();
    const next = {};
    if (!form.name.trim()) next.name = 'Please enter your name.';
    if (!/^[6-9]\d{9}$/.test(form.phone)) next.phone = 'Enter a 10-digit Indian mobile number starting with 6–9.';
    if (![...services.map(s => s.title), 'General consultation'].includes(form.service))
      next.service = 'Please choose the care you need.';
    if (!['Thane', 'Mulund', 'Kalyan'].includes(form.location)) next.location = 'Please choose a location.';
    if (form.date && form.date < today) next.date = 'Choose today or a future date.';
    if (!form.consent) next.consent = 'Please agree to share these details before continuing.';
    setErrors(next);
    if (Object.keys(next).length) {
      e.currentTarget.elements[Object.keys(next)[0]]?.focus();
      return;
    }
    setReview(true);
  }

  return (
    <div className="booking-form-wrapper" data-testid={`${prefix}-wrapper`}>
      {/* Segmented Booking Mode Tabs */}
      <div className="booking-tabs-nav" role="tablist" aria-label="Appointment booking methods">
        <button
          type="button"
          role="tab"
          id={`${prefix}-tab-btn-calendar`}
          aria-selected={bookingMode === 'calendar'}
          aria-controls={`${prefix}-panel-calendar`}
          className={`booking-tab-btn ${bookingMode === 'calendar' ? 'active' : ''}`}
          onClick={() => setBookingMode('calendar')}
          data-testid={`${prefix}-tab-calendar`}
        >
          <Calendar size={16} />
          <span>Book Online Calendar</span>
        </button>
        <button
          type="button"
          role="tab"
          id={`${prefix}-tab-btn-whatsapp`}
          aria-selected={bookingMode === 'whatsapp'}
          aria-controls={`${prefix}-panel-whatsapp`}
          className={`booking-tab-btn ${bookingMode === 'whatsapp' ? 'active' : ''}`}
          onClick={() => setBookingMode('whatsapp')}
          data-testid={`${prefix}-tab-whatsapp`}
        >
          <MessageCircle size={16} />
          <span>WhatsApp Direct Enquiry</span>
        </button>
      </div>

      {/* Tab 1: Calendly Online Booking */}
      {bookingMode === 'calendar' && (
        <div id={`${prefix}-panel-calendar`} role="tabpanel" aria-labelledby={`${prefix}-tab-btn-calendar`}>
          <CalendlyBooking
            initialLocation={initialLocation || form.location}
            initialService={initialService || form.service}
            prefix={prefix}
          />
        </div>
      )}

      {/* Tab 2: WhatsApp Enquiry Form */}
      {bookingMode === 'whatsapp' && (
        <div id={`${prefix}-panel-whatsapp`} role="tabpanel" aria-labelledby={`${prefix}-tab-btn-whatsapp`}>
          {review ? (
            <div className="enquiry-review" data-testid={`${prefix}-review`} aria-live="polite">
              <span className="success-icon">
                <Check size={24} />
              </span>
              <h3 data-testid={`${prefix}-review-heading`}>Your next chapter starts here.</h3>
              <p data-testid={`${prefix}-review-notice`}>
                Your message is ready—not sent yet. Review it below, then send it in WhatsApp. The team will confirm your
                appointment.
              </p>
              <pre data-testid={`${prefix}-message-preview`}>{message}</pre>
              <a
                className="pill-button"
                data-testid={`${prefix}-send-whatsapp`}
                href={`${contact.whatsapp}?text=${encodeURIComponent(message)}`}
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle size={18} />
                Continue to WhatsApp
                <ArrowUpRight size={16} />
              </a>
              <button
                type="button"
                className="text-link"
                data-testid={`${prefix}-edit-details`}
                onClick={() => setReview(false)}
              >
                <ArrowLeft size={16} />
                Edit my details
              </button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="appointment-form" data-testid={`${prefix}-form`}>
              <div className="form-grid">
                <label htmlFor={`${prefix}-name`}>
                  Your name
                  <input
                    data-testid={`${prefix}-name-input`}
                    id={`${prefix}-name`}
                    name="name"
                    autoComplete="name"
                    placeholder="Full name"
                    maxLength={80}
                    required
                    value={form.name}
                    onChange={update}
                    {...accessibility('name')}
                  />
                  {fieldError('name')}
                </label>
                <label htmlFor={`${prefix}-phone`}>
                  Mobile number
                  <input
                    data-testid={`${prefix}-phone-input`}
                    id={`${prefix}-phone`}
                    name="phone"
                    autoComplete="tel-national"
                    inputMode="tel"
                    placeholder="10-digit mobile number"
                    maxLength={10}
                    pattern="[6-9][0-9]{9}"
                    required
                    value={form.phone}
                    onChange={update}
                    {...accessibility('phone')}
                  />
                  {fieldError('phone')}
                </label>
              </div>

              <div className="form-grid">
                <label htmlFor={`${prefix}-service`}>
                  How can we help?
                  <select
                    data-testid={`${prefix}-service-select`}
                    id={`${prefix}-service`}
                    name="service"
                    required
                    value={form.service}
                    onChange={update}
                    {...accessibility('service')}
                  >
                    <option value="">Select care</option>
                    {services.map(s => (
                      <option key={s.id}>{s.title}</option>
                    ))}
                    <option>General consultation</option>
                  </select>
                  {fieldError('service')}
                </label>
                <label htmlFor={`${prefix}-location`}>
                  Preferred location
                  <select
                    data-testid={`${prefix}-location-select`}
                    id={`${prefix}-location`}
                    name="location"
                    required
                    value={form.location}
                    onChange={update}
                    {...accessibility('location')}
                  >
                    <option value="">Select location</option>
                    {['Thane', 'Mulund', 'Kalyan'].map(l => (
                      <option key={l}>{l}</option>
                    ))}
                  </select>
                  {fieldError('location')}
                </label>
              </div>

              <label htmlFor={`${prefix}-date`}>
                <span>
                  Preferred date <span className="muted">(optional)</span>
                </span>
                <input
                  data-testid={`${prefix}-date-input`}
                  type="date"
                  id={`${prefix}-date`}
                  name="date"
                  min={today}
                  value={form.date}
                  onChange={update}
                  {...accessibility('date')}
                />
                {fieldError('date')}
              </label>

              <div>
                <label className="consent-label" htmlFor={`${prefix}-consent`}>
                  <input
                    data-testid={`${prefix}-consent-checkbox`}
                    type="checkbox"
                    id={`${prefix}-consent`}
                    name="consent"
                    required
                    checked={form.consent}
                    onChange={update}
                    {...accessibility('consent')}
                  />
                  <span>
                    I agree to share these details with the practice through WhatsApp to arrange my appointment.
                  </span>
                </label>
                {fieldError('consent')}
              </div>

              {Object.keys(errors).length > 0 && (
                <p className="form-error" role="alert" data-testid={`${prefix}-error`}>
                  Please review the highlighted fields before continuing.
                </p>
              )}

              <Button className="pill-button" type="submit" data-testid={`${prefix}-review-button`}>
                Prepare my enquiry
                <ArrowUpRight size={17} />
              </Button>

              <p className="form-note" data-testid={`${prefix}-privacy-note`}>
                <ShieldCheck size={15} />
                Nothing is stored on this website. You choose when to send.
              </p>
              <p className="tiny" data-testid={`${prefix}-confirmation-note`}>
                This is an appointment enquiry, not a confirmed booking. Availability and fees will be confirmed by the team.
                Please do not share medical records here.
              </p>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export const AppointmentProvider = ({ children }) => {
  const [booking, setBooking] = useState(null);

  return (
    <AppointmentContext.Provider value={{ openBooking: setBooking }}>
      {children}
      <Dialog open={Boolean(booking)} onOpenChange={open => !open && setBooking(null)}>
        <DialogContent className="booking-dialog" data-testid="booking-dialog" data-lenis-prevent>
          <div className="eyebrow">LET’S TAKE THE FIRST STEP</div>
          <DialogTitle className="dialog-heading" data-testid="booking-title">
            A conversation.<br />
            <em>A little clarity.</em>
          </DialogTitle>
          <DialogDescription data-testid="booking-description">
            Choose your preferred booking method: schedule directly via our live online calendar or prepare a personal WhatsApp enquiry for the team.
          </DialogDescription>
          {booking && (
            <AppointmentForm
              initialLocation={booking.location}
              initialService={booking.service}
              defaultMode={booking.mode || 'calendar'}
              prefix="booking"
            />
          )}
        </DialogContent>
      </Dialog>
    </AppointmentContext.Provider>
  );
};