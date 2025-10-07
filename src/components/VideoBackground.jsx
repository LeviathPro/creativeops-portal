import React, { useMemo } from "react";

const formulaFragments = [
  "E = mc²",
  "∇·E = ρ/ε₀",
  "F = ma",
  "ψ(x) = Ae^{ikx}",
  "∮ B · dl = μ₀I",
  "a² + b² = c²",
  "∑_{n=1}^{∞} 1/n² = π²/6",
  "Δt · Δf ≥ 1/2",
  "φ = (1+√5)/2",
  "V = 4/3πr³",
  "∂²u/∂t² = c²∇²u",
  "iħ ∂Ψ/∂t",
  "τ = r × F",
  "lim_{x→0} sin x / x = 1",
  "σ = √{∑(x-μ)²/n}",
  "R_{μν} - 1/2Rg_{μν}"
];

const polyGlyphs = ["△", "⬡", "⬣", "◇", "⬢", "⟡", "⬟", "◬"];

const buildField = () =>
  Array.from({ length: 48 }).map((_, index) => {
    const isFormula = index % 3 !== 0;
    const text = isFormula
      ? formulaFragments[index % formulaFragments.length]
      : polyGlyphs[index % polyGlyphs.length];

    const top = ((index * 37) % 100) / 100;
    const left = ((index * 61) % 100) / 100;

    return {
      key: index,
      text,
      isFormula,
      style: {
        top: `${top * 100}%`,
        left: `${left * 100}%`,
        animationDelay: `${index * 0.4}s`,
        animationDuration: `${18 + (index % 5) * 3}s`
      }
    };
  });

const VideoBackground = () => {
  const particles = useMemo(buildField, []);

  return (
    <div className="portal-canvas">
      <div className="luminous-core" />
      <div className="celestial-haze" />
      <div className="golden-veil" />
      <div className="aurora-stream" />
      <div className="string-rings">
        <span className="string-ring string-ring--one" />
        <span className="string-ring string-ring--two" />
        <span className="string-ring string-ring--three" />
      </div>
      <div className="nebula-smoke" />
      <div className="particle-stream" />
      <div className="equation-field">
        {particles.map((particle) => (
          <span
            key={particle.key}
            className={`equation-node ${particle.isFormula ? "equation-node--formula" : "equation-node--glyph"}`}
            style={particle.style}
          >
            {particle.text}
          </span>
        ))}
      </div>
    </div>
  );
};

export default VideoBackground;
