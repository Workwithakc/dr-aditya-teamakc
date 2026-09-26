# Dr Aditya Nimbkar — frontend website

## Original problem statement and decisions
The supplied client brief requests a professional, non-generic frontend-only medical website for Dr Aditya Nimbkar (AKC-2198), Fetal & Reproductive Medicine expert and High-Risk Obstetrics specialist serving Thane, Mulund and Kalyan. The full brief supplies biography, qualifications, services, fees, contact information, social URLs, awards and many patient reviews; preferred colours are rose gold, light gold and baby pink with smooth minimal animation. It initially requests a demo before ten pages. Clarification explicitly approved: “Build the full ten-page frontend immediately instead” and “no just read and implmenent everything carefully and make the final website done tht's it”. Later design direction requests a distinctive editorial art direction, masked kinetic hero, real photography, numbered chapters, one slow marquee, Framer Motion, Lenis and subtle parallax. User asks for implementation, responsive and functional testing, not only a prompt.

## Architecture
- React 19 / React Router; ten full routes. Existing FastAPI/MongoDB starter is untouched and unused, per frontend-only requirement.
- Framer Motion animation; Lenis desktop smooth scrolling; reduced-motion support.
- Shadcn Button, Dialog, Accordion; custom cohesive editorial CSS using Cormorant Garamond and Manrope.
- Static practice content in `src/data/practice.js`; contact and social URL configuration comes from frontend `.env`. Protected environment values unchanged.
- Actual portrait from Ova Care and locally bundled illustrative Unsplash photography. No file upload/hosting feature.
- Appointment form keeps entries in component state only, validates Indian mobile number, service, city, optional future date and consent, then generates a WhatsApp message for user review. User must send message; team must confirm booking. No persistence or pretend booking, payment or calendar integration.

## Implemented
1. `/` — editorial hero, doctor portrait card, stats with correct team attribution, four care pathways, biography, animated manifesto, patient journey, review excerpts, FAQ, locations, CTA.
2. `/about` — biography, education timeline, clinical/academic credentials, publications and award accordions, image gallery dialogs.
3–6. `/fetal-medicine`, `/pregnancy-care`, `/fertility-care`, `/gynaecology` — detailed service care, tailored expectations and FAQs, related services, service-prefilled enquiry.
7. `/patient-stories` — category-filtered supplied review excerpts, accurate provenance, Google profile link.
8. `/resources` — six searchable/filterable educational resources with reading dialogs, downloadable consultation checklist, YouTube channel link, full FAQ.
9. `/locations` — accessible three-city tabs with keyboard navigation and URL selection, confirmed Thane clinic, actual Maps directions link, city-prefilled appointment enquiry. Mulund/Kalyan addresses and schedules explicitly require team confirmation.
10. `/contact` — in-page enquiry form, call/email/WhatsApp, transparent supplied consultation fees, emergency guidance.
- Sticky navigation with care dropdown, keyboard-accessible mobile menu, footer, social links, privacy dialog, back to top, unknown-route home redirect, route-specific metadata.

## Research / editorial constraints
Detailed design prompt and qualitative competitor review in `memory/DESIGN_PROMPT.md`; design tokens in `design_guidelines.json`.
Public Ova and Practo profiles reviewed. Instagram/Facebook crawling blocked. Do not claim comprehensive social/market research. Sejal reference cannot be confidently identified. Fees and experience use supplied client content rather than conflicting public Practo data. Hospital 24-hour operation is NOT presented as doctor availability. No invented outcome promises or Google star ratings. Stock maternity photos explicitly illustrative.

## Verification status
- Initial desktop screenshot and booking-dialog open/close passed. Initial Framer Motion scroll-container warning resolved with positioned document root.
- Production build passes: final bundle about 187 KB gzipped JS / 19 KB CSS.
- Testing agent report `/app/test_reports/iteration_1.json`: all ten routes, mobile/desktop navigation, enquiry handoffs, filters/search, dialogs/gallery/FAQ, download, location tabs/query/keyboard, outbound links, reduced motion and viewport widths 360/390/768/1024/1440/1920 checked. No broken images, horizontal overflow or application runtime exceptions observed.
- Addressed both reported issues: unknown paths now redirect home; forms now have complete custom inline validation, field-specific aria-invalid/aria-describedby, focus-first-invalid behaviour, required consent/service/city and current/future date checks. Added a defensive missing-service guard and same-route mobile-menu close.
- Focused post-fix public-preview tests passed: unknown route home redirect; empty form errors; invalid mobile; past date; correct WhatsApp preview/URL; edit preserving inputs; identical contact-form validation and successful preview; resource search/article regression. No message sent to actual practice.
- Final screenshots captured hero, enquiry preview, educational article and care cards. No backend/API tests apply: frontend-only by design.

## Prioritised backlog
- P0 content sign-off before public clinical use: doctor approval of medical resource content, confirm fees and qualifications, image rights and patient excerpt publication permission, exact Mulund/Kalyan addresses and consultation schedules.
- P1 optional next phase: genuinely connected appointment calendar, clinic-specific availability, secure clinical contact process. Requires separate integration scope.
- P2 optional later: approved patient videos/articles, managed content, actual review/social feeds, live chat or payment provider if needed.

## Next tasks
Implementation and verification complete. Next: client/doctor content sign-off and confirmation of remaining clinic details. Future feature recommendation: connected clinic-specific appointment availability to shorten the enquiry-to-confirmation process.