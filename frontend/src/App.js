import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { MotionConfig, useReducedMotion } from 'framer-motion';
import Lenis from 'lenis';
import { Toaster } from './components/ui/sonner';
import { AppointmentProvider } from './components/Appointment';
import { Header, Footer, FinalCta } from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Service from './pages/Service';
import Stories from './pages/Stories';
import Resources from './pages/Resources';
import Locations from './pages/Locations';
import Contact from './pages/Contact';
import { services } from './data/practice';
import Preloader from './components/Preloader';
import PageTransition from './components/PageTransition';
import './App.css';
import './pages.css';

const pageTitles = { '/': 'Fetal Medicine, Fertility & Pregnancy Care', '/about': 'Meet Your Doctor', '/patient-stories': 'Patient Experiences', '/resources': 'Patient Resources & FAQs', '/locations': 'Locations in Thane, Mulund & Kalyan', '/contact': 'Contact & Appointment Enquiries', ...Object.fromEntries(services.map(s => [`/${s.id}`, `${s.title} in Thane, Mulund & Kalyan`])) };
function Site() {
  const { pathname } = useLocation();
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({ autoRaf: true, duration: 1.12, smoothWheel: true, syncTouch: false, anchors: { offset: -95 } });
    return () => lenis.destroy();
  }, [reduced]);
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.title = `Dr Aditya Nimbkar | ${pageTitles[pathname] || 'Page Not Found'}`;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.content = `${pageTitles[pathname] || 'Specialist care'} — Dr Aditya Nimbkar. Personalised fetal medicine, fertility, pregnancy and gynaecology care. Enquire about a consultation in Thane, Mulund or Kalyan.`;
  }, [pathname]);
  return (
    <AppointmentProvider>
      <Preloader />
      <PageTransition />
      <Header />
      <main id="main" tabIndex={-1} key={pathname} data-testid="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          {services.map(s => <Route key={s.id} path={`/${s.id}`} element={<Service serviceId={s.id} />} />)}
          <Route path="/patient-stories" element={<Stories />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        {pathname !== '/contact' && <FinalCta />}
      </main>
      <Footer />
      <Toaster position="bottom-center" />
    </AppointmentProvider>
  );
}
export default function App() { return <BrowserRouter><MotionConfig reducedMotion="user"><Site /></MotionConfig></BrowserRouter>; }