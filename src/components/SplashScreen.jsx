import React from "react";
import { motion } from "framer-motion";
import logoUrl from "../assets/creative-deck-fence-logo.svg";

const SplashScreen = ({ fadeDuration }) => {
  const fadeSeconds = Math.max(fadeDuration / 1000, 0.01);

  return (
    <motion.div
      className="splash-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: fadeSeconds, ease: "easeInOut" } }}
      exit={{ opacity: 0, transition: { duration: fadeSeconds, ease: "easeInOut" } }}
    >
      <img src={logoUrl} alt="Creative Deck & Fence, LLC" className="splash-logo" />
    </motion.div>
  );
};

export default SplashScreen;
