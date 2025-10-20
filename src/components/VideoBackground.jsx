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

const randomInRange = (min, max) => Math.random() * (max - min) + min;

const buildField = () =>
  Array.from({ length: 54 }).map((_, index) => {
    const isFormula = index % 3 !== 0;
    const text = isFormula
      ? formulaFragments[index % formulaFragments.length]
      : polyGlyphs[index % polyGlyphs.length];

    const top = randomInRange(4, 96);
    const left = randomInRange(4, 96);

    const style = {
      top: `${top}%`,
      left: `${left}%`,
      animationDelay: `${index * 0.35}s`,
      animationDuration: `${26 + randomInRange(0, 22)}s`,
      "--start-x": `${randomInRange(-6, 6).toFixed(2)}vmin`,
      "--start-y": `${randomInRange(-8, 2).toFixed(2)}vmin`,
      "--ctrl1-x": `${randomInRange(-16, 16).toFixed(2)}vmin`,
      "--ctrl1-y": `${randomInRange(-14, 14).toFixed(2)}vmin`,
      "--ctrl2-x": `${randomInRange(-20, 20).toFixed(2)}vmin`,
      "--ctrl2-y": `${randomInRange(-18, 18).toFixed(2)}vmin`,
      "--ctrl3-x": `${randomInRange(-14, 14).toFixed(2)}vmin`,
      "--ctrl3-y": `${randomInRange(-16, 16).toFixed(2)}vmin`,
      "--end-x": `${randomInRange(-6, 6).toFixed(2)}vmin`,
      "--end-y": `${randomInRange(-2, 8).toFixed(2)}vmin`,
      "--start-rot": `${randomInRange(-18, 18).toFixed(2)}deg`,
      "--ctrl1-rot": `${randomInRange(-42, 42).toFixed(2)}deg`,
      "--ctrl2-rot": `${randomInRange(-72, 72).toFixed(2)}deg`,
      "--ctrl3-rot": `${randomInRange(-54, 54).toFixed(2)}deg`,
      "--end-rot": `${randomInRange(-24, 24).toFixed(2)}deg`,
      "--scale-min": randomInRange(0.82, 0.94).toFixed(3),
      "--scale-mid": randomInRange(0.96, 1.12).toFixed(3),
      "--scale-max": randomInRange(1.08, 1.2).toFixed(3),
      "--opacity-peak": randomInRange(0.82, 0.98).toFixed(2)
    };

    return {
      key: index,
      text,
      isFormula,
      style
    };
  });

const VideoBackground = () => {
  const particles = useMemo(buildField, []);

  return (
    <div className="portal-canvas">
      <div className="white-plane white-plane--primary" />
      <div className="white-plane white-plane--secondary" />
      <div className="white-plane white-plane--tertiary" />
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
