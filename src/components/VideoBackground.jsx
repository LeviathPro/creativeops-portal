import React from "react";

const formulas = ["Σ", "∫", "π", "∞", "ϕ", "λ", "Δ", "∇", "α", "β", "γ", "δ", "Ω", "⊕", "≡", "≈"];
const shapes = ["◯", "△", "⬡", "◇", "⬢", "⬣", "⬟", "⬡"];

const VideoBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(253,230,138,0.35),transparent_60%)]" />
      <div className="quantum-field" />
      <div className="floating-formulas">
        {Array.from({ length: 40 }).map((_, index) => {
          const content = index % 2 === 0 ? formulas[index % formulas.length] : shapes[index % shapes.length];
          return (
            <span key={index} className="formula-particle" style={{ animationDelay: `${index * 0.8}s` }}>
              {content}
            </span>
          );
        })}
      </div>
      <div className="dust-particles" />
    </div>
  );
};

export default VideoBackground;
