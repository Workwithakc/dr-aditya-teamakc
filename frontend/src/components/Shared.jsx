import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight, Heart, ScanLine, Sprout, Flower2 } from 'lucide-react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './ui/accordion';

export const Reveal = ({ children, className = '', delay = 0, ...props }) => {
  const reduced = useReducedMotion();
  return <motion.div initial={reduced ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: .75, delay, ease: [0.22, 1, 0.36, 1] }} className={className} {...props}>{children}</motion.div>;
};
export const Chapter = ({ number, children, id }) => <div className="chapter" data-testid={id || `chapter-${number}`}><span>{number}</span><span>{children}</span></div>;
export const TextLink = ({ to, children, id, className = '' }) => <Link data-testid={id} className={`text-link ${className}`} to={to}>{children}<ArrowUpRight size={17} /></Link>;
export const CareIcon = ({ type, size = 32 }) => { const Icon = { scan: ScanLine, heart: Heart, sprout: Sprout, flower: Flower2 }[type] || Heart; return <Icon size={size} strokeWidth={1.25} />; };
export const BrandMark = ({ className = '' }) => <img src="/images/dr-aditya-logo.jpg" alt="Dr. Aditya Nimbkar Monogram Logo" className={`brand-mark-img ${className}`} />;
export const Starburst = ({ className = '' }) => <svg className={className} width="60" height="60" viewBox="0 0 60 60" fill="none" aria-hidden="true">{Array.from({ length: 12 }, (_, i) => <path key={i} d="M30 5V24" stroke="currentColor" strokeWidth="1" transform={`rotate(${i * 30} 30 30)`} />)}</svg>;
export const PageIntro = ({ eyebrow, title, emphasis, description, children }) => <section className="page-intro container"><Reveal><div className="eyebrow" data-testid="page-eyebrow">{eyebrow}</div><h1 className="page-title" data-testid="page-title">{title}<br /><em>{emphasis}</em></h1>{description && <p className="intro-description" data-testid="page-description">{description}</p>}{children}</Reveal></section>;
export const FaqList = ({ items, prefix = 'faq' }) => <Accordion type="single" collapsible className="faq-list" data-testid={`${prefix}-list`}>{items.map(([q, a], i) => <AccordionItem value={`${i}`} key={q}><AccordionTrigger data-testid={`${prefix}-question-${i}`}>{q}</AccordionTrigger><AccordionContent data-testid={`${prefix}-answer-${i}`}>{a}</AccordionContent></AccordionItem>)}</Accordion>;
export const NextArrow = () => <ArrowRight size={18} />;