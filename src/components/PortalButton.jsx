import React from "react";

const PortalButton = ({ onClick }) => (
  <button type="button" className="portal-control" onClick={onClick}>
    <span className="portal-control__rim" aria-hidden="true" />
    <span className="portal-control__vortex" aria-hidden="true">
      <span className="portal-control__swirl portal-control__swirl--one" />
      <span className="portal-control__swirl portal-control__swirl--two" />
      <span className="portal-control__swirl portal-control__swirl--three" />
    </span>
    <span className="portal-control__mandala" aria-hidden="true">
      <svg viewBox="0 0 200 200" className="portal-control__mandala-svg">
        <g stroke="#ffffff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="100" cy="100" r="78" opacity="0.42" />
          <circle cx="100" cy="100" r="56" opacity="0.55" />
          <circle cx="100" cy="100" r="34" opacity="0.68" />
          <polygon points="100,26 174,74 174,126 100,174 26,126 26,74" opacity="0.6" />
          <polygon points="100,34 164,166 36,166" opacity="0.35" />
          <polygon points="100,18 182,100 100,182 18,100" opacity="0.32" />
          <line x1="100" y1="18" x2="100" y2="182" opacity="0.55" />
          <line x1="18" y1="100" x2="182" y2="100" opacity="0.55" />
          <line x1="46" y1="46" x2="154" y2="154" opacity="0.35" />
          <line x1="154" y1="46" x2="46" y2="154" opacity="0.35" />
        </g>
        <circle cx="100" cy="100" r="18" fill="#ffffff" opacity="0.9" />
        <circle cx="100" cy="100" r="8" fill="#ffffff" opacity="0.75" />
      </svg>
    </span>
    <span className="portal-control__label">Enter Portal</span>
  </button>
);

export default PortalButton;
