import React, { useMemo } from "react";
import { motion } from "framer-motion";

const generateRings = () =>
  Array.from({ length: 14 }).map((_, index) => ({
    id: index,
    scale: 0.24 + index * 0.12,
    delay: index * 0.08,
    opacity: Math.max(0.15, 1 - index * 0.06)
  }));

const generateFragments = () =>
  Array.from({ length: 36 }).map((_, index) => ({
    id: index,
    angle: (index / 36) * Math.PI * 2,
    distance: 24 + (index % 6) * 6,
    duration: 1.2 + (index % 5) * 0.18
  }));

const WormholeTransition = () => {
  const rings = useMemo(generateRings, []);
  const shards = useMemo(generateFragments, []);

  return (
    <motion.div
      className="wormhole-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: "easeInOut" }}
    >
      <div className="wormhole-stars" />
      <div className="wormhole-tunnel">
        {rings.map((ring) => (
          <motion.span
            key={ring.id}
            className="wormhole-ring"
            style={{
              animationDelay: `${ring.delay}s`,
              opacity: ring.opacity
            }}
            initial={{ scale: ring.scale, opacity: 0 }}
            animate={{ scale: ring.scale * 6, opacity: [0, 1, 0] }}
            transition={{ duration: 2.4, ease: "easeInOut" }}
          />
        ))}
      </div>
      <div className="wormhole-fractals">
        {shards.map((fragment) => (
          <span
            key={fragment.id}
            className="wormhole-fractal"
            style={{
              "--fragment-angle": `${fragment.angle}rad`,
              "--fragment-distance": `${fragment.distance}vmin`,
              animationDuration: `${fragment.duration}s`,
              animationDelay: `${-fragment.duration * 0.6}s`
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default WormholeTransition;
