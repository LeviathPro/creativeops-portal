import React, { useMemo } from "react";

const formulae = [
  "F=ma",
  "E=mc²",
  "∇·E=ρ/ε₀",
  "ΣF=0",
  "τ=r×F",
  "σ=F/A",
  "V=IR",
  "P=IV",
  "Δx=v₀t+½at²",
  "∫F·ds"
];

const VideoBackground = () => {
  const sprites = useMemo(() => {
    return Array.from({ length: 18 }).map((_, idx) => ({
      id: idx,
      label: formulae[idx % formulae.length]
    }));
  }, []);

  return (
    <div className="bg-scene" aria-hidden>
      <div className="bg-gradient" />
      <div className="bg-gradient bg-gradient-secondary" />
      <div className="bg-gradient bg-gradient-tertiary" />
      <div className="bg-aurora" />
      <div className="bg-smoke" />
      <div className="bg-grid" />
      {sprites.map((sprite) => (
        <span key={sprite.id} className={`formula formula-${sprite.id % 6}`}>
          {sprite.label}
        </span>
      ))}
    </div>
  );
};

export default VideoBackground;
