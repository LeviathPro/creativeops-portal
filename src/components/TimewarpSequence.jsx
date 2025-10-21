import React, { useEffect } from "react";
import { motion } from "framer-motion";

const TimewarpSequence = ({ duration, onComplete }) => {
  useEffect(() => {
    if (duration <= 0) {
      onComplete?.();
      return undefined;
    }

    const timer = setTimeout(() => {
      onComplete?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onComplete]);

  const seconds = duration / 1000;

  return (
    <motion.div
      className="timewarp-shell"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.6, ease: "easeInOut" } }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
    >
      <div className="timewarp-veil" aria-hidden="true" />
      <div className="timewarp-spiral" style={{ animationDuration: `${seconds}s` }} aria-hidden="true" />
      <div className="timewarp-tunnel" aria-hidden="true">
        {Array.from({ length: 6 }).map((_, index) => (
          <span
            key={`ring-${index}`}
            className="timewarp-ring"
            style={{ animationDelay: `${index * -1.6}s`, animationDuration: `${seconds}s` }}
          />
        ))}
      </div>
      <p className="timewarp-caption">Traversing the luminous continuum...</p>
    </motion.div>
  );
};

export default TimewarpSequence;
