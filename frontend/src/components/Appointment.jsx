import { createContext, useContext, useState } from 'react';
import { ArrowUpRight, Check, MessageCircle, ShieldCheck, ArrowLeft, Calendar, Clock3, MapPin, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';
import { contact, services } from '../data/practice';

const AppointmentContext = createContext(null);
export const useAppointment = () => useContext(AppointmentContext);

export const BookButton = ({ children = 'Book an appointment', id, className = '', service = '', location = '' }) => {
  const { openBooking } = useAppointment();
  return (
    <Button
      data-testid={id}
      className={`pill-button ${className}`}
      onClick={() => openBooking({ service, location, mode: 'calendar' })}
    >
      {children}
      <ArrowUpRight size={17} />
    </Button>
  );
};

export const CalendlyBooking = ({ initialLocation = '', initialService = '', prefix = 'booking' }) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="calendly-booking-section" data-testid={`${prefix}-calendly-section`}>
      <div className="calendly-header-meta">
        <div className="calendly-badge-strip">
          <span className="calendly-live-badge">
            <span className="pulse-dot" />
            LIVE ONLINE CALENDAR
          </span>
          {initialLocation && (
            <span className="calendly-context-pill" data-testid={`${prefix}-context-location`}>
              <MapPin size={13} />
              {initialLocation} Consultation
            </span>
          )}
          {initialService && (
            <span className="calendly-context-pill" data-testid={`${prefix}-context-service`}>
              <Sparkles size={13} />
              {initialService}
            </span>
          )}
        </div>
        <p className="calendly-instruction">
          Select an available date and time slot from the schedule below for direct, guaranteed appointment booking.
        </p>
      </div>

      <div className="calendly-frame-wrap" data-testid={`${prefix}-calendly-wrap`}>
        {loading && (
          <div className="calendly-loading-skeleton" aria-label="Loading booking calendar...">
            <div className="skeleton-spinner" />
            <span>Loading Dr. Aditya's real-time consultation calendar...</span>
          </div>
        )}
        <iframe
          src={contact.calendlyEmbed}
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
          <span><ShieldCheck size={14} /> Confidential & secure</span>
        </div>
        <a
          href={contact.calendly}
          target="_blank"
          rel="noreferrer"
          className="calendly-open-link"
          data-testid={`${prefix}-calendly-external-link`}
        >
          Open calendar in full window
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