import React, { useMemo } from "react";
import { motion } from "framer-motion";
import PortalButton from "./PortalButton";

const formulaFragments = [
  "E = mc²",
  "∇·E = ρ/ε₀",
  "F = ma",
  "ψ(x) = Ae^{ikx}",
  "∮ B · dl = μ₀I",
  "a² + b² = c²",
  "∑ 1/n² = π²/6",
  "Δt · Δf ≥ 1/2",
  "φ = (1+√5)/2",
  "V = 4/3πr³",
  "∂²u/∂t² = c²∇²u",
  "iħ ∂Ψ/∂t",
  "τ = r × F",
  "limₓ→0 sin x / x = 1",
  "σ = √{∑(x-μ)²/n}",
  "R_{μν} - ½Rg_{μν}"
];

const buildField = () =>
  Array.from({ length: 48 }).map((_, index) => {
    const fragment = formulaFragments[index % formulaFragments.length];
    const top = 6 + Math.random() * 88;
    const left = 6 + Math.random() * 88;
    const driftX = (Math.random() - 0.5) * 14;
    const driftY = (Math.random() - 0.5) * 10;
    const duration = 46 + Math.random() * 22;
    const delay = Math.random() * -24;
    const scale = 0.72 + Math.random() * 0.42;
    const opacity = 0.08 + Math.random() * 0.06;

    return {
      id: `${index}-${fragment}`,
      fragment,
      style: {
        top: `${top}%`,
        left: `${left}%`,
        "--drift-x": `${driftX.toFixed(2)}vmin`,
        "--drift-y": `${driftY.toFixed(2)}vmin`,
        "--drift-duration": `${duration.toFixed(2)}s`,
        "--drift-delay": `${delay.toFixed(2)}s`,
        "--formula-scale": scale.toFixed(2),
        "--formula-opacity": opacity.toFixed(2)
      }
    };
  });

const LandingExperience = ({ onEnterPortal }) => {
  const nodes = useMemo(buildField, []);

  return (
    <motion.main
      className="landing-screen"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }}
      exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.6, ease: "easeInOut" } }}
    >
      <div className="formula-field" aria-hidden="true">
        {nodes.map((node) => (
          <span key={node.id} className="formula-fragment" style={node.style}>
            {node.fragment}
          </span>
        ))}
      </div>
      <div className="landing-content">
        <div className="landing-header" role="presentation">
          <p className="landing-header__line">Creative Deck &amp; Fence, LLC</p>
          <h1 className="landing-header__title">Creative Ops Portal</h1>
          <p className="landing-header__tagline">innovative software ... etc.</p>
        </div>
        <PortalButton onClick={onEnterPortal} />
      </div>
    </motion.main>
  );
};

export default LandingExperience;
