import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * PageTransition — renders a slim terracotta progress bar at the top of the
 * viewport whenever the route changes. Under 400ms, non-intrusive, medical-brand.
 */
export default function PageTransition() {
  const { pathname } = useLocation();
  const [active, setActive] = useState(false);
  const [key, setKey] = useState(0);
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return; // skip transition on first mount
    }
    setActive(true);
    setKey(k => k + 1);
    const t = setTimeout(() => setActive(false), 450);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key={key}
          className="page-progress-bar"
          initial={{ scaleX: 0, opacity: 1 }}
          animate={{ scaleX: 1, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        />
      )}
    </AnimatePresence>
  );
}
