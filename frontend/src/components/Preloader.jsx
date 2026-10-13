import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Preloader — shown only ONCE per browser session (sessionStorage flag).
 * Design: full-screen ivory overlay → logo + name + animated terracotta bar → fade out.
 */
export default function Preloader() {
  const [visible, setVisible] = useState(() => {
    try {
      return !sessionStorage.getItem('agy_preloaded');
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (!visible) return;
    // Lock scroll while preloader is active
    document.documentElement.style.overflow = 'hidden';
    const timer = setTimeout(() => {
      setVisible(false);
      try {
        sessionStorage.setItem('agy_preloaded', 'true');
      } catch { /* silent */ }
      document.documentElement.style.overflow = '';
    }, 2800);
    return () => {
      clearTimeout(timer);
      document.documentElement.style.overflow = '';
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="preloader-root"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }}
          aria-hidden="true"
        >
          {/* Background curtain that lifts up */}
          <motion.div
            className="preloader-curtain"
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            transition={{ duration: 0.9, delay: 2.1, ease: [0.76, 0, 0.24, 1], origin: 'top' }}
          />

          {/* Central content */}
          <div className="preloader-content">
            {/* Monogram / Logo mark */}
            <motion.div
              className="preloader-monogram"
              initial={{ opacity: 0, scale: 0.82 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.85, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="preloader-initial">A</span>
              <span className="preloader-dot" />
            </motion.div>

            {/* Doctor name */}
            <motion.p
              className="preloader-name"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              Dr Aditya Nimbkar
            </motion.p>

            {/* Tagline */}
            <motion.p
              className="preloader-tagline"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              Fetal Medicine · Fertility · Women's Health
            </motion.p>

            {/* Loading bar */}
            <motion.div
              className="preloader-bar-wrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 1.0 }}
            >
              <motion.div
                className="preloader-bar"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.0, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
