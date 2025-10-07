import React from "react";
import { motion } from "framer-motion";

const glowVariants = {
  pulse: {
    scale: [0.92, 1.08, 0.92],
    opacity: [0.5, 1, 0.5],
    transition: { duration: 4.5, repeat: Infinity }
  }
};

const BlackHoleButton = ({ onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      className="relative flex h-56 w-56 items-center justify-center overflow-hidden rounded-full"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
    >
      <motion.span
        className="absolute inset-0 rounded-full bg-gradient-to-br from-white/60 via-amber-200/50 to-amber-400/50 blur-3xl"
        variants={glowVariants}
        animate="pulse"
      />
      <span className="absolute inset-0 rounded-full bg-black/80 shadow-[inset_0_0_65px_rgba(0,0,0,0.95)]" />
      <span className="absolute inset-0 rounded-full border border-amber-200/40" />
      <span className="relative text-xs uppercase tracking-[0.5em] text-white/80">Enter Portal</span>
    </motion.button>
  );
};

export default BlackHoleButton;
