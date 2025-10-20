import React from "react";
import { motion } from "framer-motion";

const glowVariants = {
  pulse: {
    scale: [0.92, 1.08, 0.92],
    opacity: [0.6, 1, 0.6],
    transition: { duration: 5.4, repeat: Infinity }
  }
};

const Mandala = () => (
  <svg className="portal-mandala" viewBox="0 0 200 200" role="presentation" aria-hidden="true">
    <defs>
      <radialGradient id="mandala-core" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(255,255,255,0.85)" />
        <stop offset="60%" stopColor="rgba(255,255,255,0.35)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
      </radialGradient>
    </defs>
    <circle className="mandala-orbit mandala-orbit--outer" cx="100" cy="100" r="86" />
    <circle className="mandala-orbit mandala-orbit--mid" cx="100" cy="100" r="68" />
    <circle className="mandala-orbit mandala-orbit--inner" cx="100" cy="100" r="48" />
    <polygon
      className="mandala-polygon mandala-polygon--hex"
      points="100,22 164,60 164,140 100,178 36,140 36,60"
    />
    <polygon
      className="mandala-polygon mandala-polygon--tri"
      points="100,40 155,160 45,160"
    />
    <polygon
      className="mandala-polygon mandala-polygon--diamond"
      points="100,30 170,100 100,170 30,100"
    />
    <path
      className="mandala-suture mandala-suture--clockwise"
      d="M100 16 Q150 40 184 100 Q150 160 100 184 Q50 160 16 100 Q50 40 100 16Z"
    />
    <path
      className="mandala-suture mandala-suture--counter"
      d="M100 28 C138 44 168 76 172 116 C168 156 138 188 100 172 C62 188 32 156 28 116 C32 76 62 44 100 28Z"
    />
    <line className="mandala-ray" x1="100" y1="14" x2="100" y2="186" />
    <line className="mandala-ray" x1="14" y1="100" x2="186" y2="100" />
    <line className="mandala-ray" x1="36" y1="36" x2="164" y2="164" />
    <line className="mandala-ray" x1="164" y1="36" x2="36" y2="164" />
    <circle className="mandala-core" cx="100" cy="100" r="34" fill="url(#mandala-core)" />
  </svg>
);

const BlackHoleButton = ({ onClick, disabled = false }) => (
  <motion.button
    onClick={disabled ? undefined : onClick}
    disabled={disabled}
    className={`portal-button relative flex h-56 w-56 items-center justify-center overflow-hidden rounded-full transition-opacity duration-500 ${
      disabled ? "cursor-wait opacity-80" : ""
    }`}
    whileHover={disabled ? undefined : { scale: 1.06 }}
    whileTap={disabled ? undefined : { scale: 0.97 }}
  >
    <motion.span className="portal-button__outer-glow" variants={glowVariants} animate="pulse" />
    <span className="portal-button__halo" />
    <span className="portal-button__inner-shadow" />
    <Mandala />
    <span className="portal-button__label">Enter Portal</span>
  </motion.button>
);

export default BlackHoleButton;
