import React, { useMemo } from "react";
import { motion } from "framer-motion";

const generateRings = () =>
  Array.from({ length: 14 }).map((_, index) => ({
    id: index,
    scale: 0.24 + index * 0.12,
    delay: index * 0.18,
    opacity: Math.max(0.15, 1 - index * 0.06)
  }));

const generateFragments = () =>
  Array.from({ length: 36 }).map((_, index) => ({
    id: index,
    angle: (index / 36) * Math.PI * 2,
    distance: 24 + (index % 6) * 6,
    duration: 3.6 + (index % 5) * 0.8
  }));

const WormholeTransition = ({ duration = 10000 }) => {
  const rings = useMemo(generateRings, []);
  const shards = useMemo(generateFragments, []);
  const fadeDuration = Math.min(1.2, duration / 4000);

  return (
    <motion.div
      className="wormhole-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: fadeDuration, ease: "easeInOut" }}
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
            animate={{ scale: [ring.scale, ring.scale * 2.8, ring.scale * 6.4], opacity: [0, ring.opacity, 0] }}
            transition={{ duration: 7.6, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }}
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
              animationDelay: `${-fragment.duration * 0.75}s`
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default WormholeTransition;
