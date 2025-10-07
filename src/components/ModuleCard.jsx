import React from "react";

const ModuleCard = ({ title, subtitle, children, accent = "gold" }) => {
  const accentMap = {
    gold: "from-amber-400/25",
    purple: "from-purple-500/20",
    fuchsia: "from-fuchsia-500/20",
    emerald: "from-emerald-500/20",
    cyan: "from-sky-500/20"
  };

  return (
    <div className="relative overflow-hidden rounded-4xl border border-white/10 bg-black/60 p-6 shadow-[0_30px_80px_rgba(15,23,42,0.55)]">
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${accentMap[accent] ?? accentMap.gold} via-transparent to-transparent opacity-80`}
      />
      <div className="relative space-y-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.45em] text-amber-200/70">{subtitle}</p>
          <h3 className="text-xl font-semibold text-white">{title}</h3>
        </div>
        <div className="text-sm text-white/80">{children}</div>
      </div>
    </div>
  );
};

export default ModuleCard;
