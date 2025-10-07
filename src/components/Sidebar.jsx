import React from "react";
import { motion } from "framer-motion";

const Sidebar = ({ tabs, activeTab, onSelect }) => {
  return (
    <aside className="glass-panel space-y-3 rounded-4xl border border-white/10 bg-black/55 p-4 shadow-[0_30px_80px_rgba(15,23,42,0.6)]">
      <p className="px-2 text-[10px] uppercase tracking-[0.4em] text-amber-200/70">Navigation</p>
      <div className="relative grid gap-2">
        {tabs.map((tab) => {
          const selected = activeTab === tab.id;
          return (
            <motion.button
              key={tab.id}
              onClick={() => onSelect(tab.id)}
              className={`relative overflow-hidden rounded-3xl px-4 py-3 text-left text-sm font-medium transition ${
                selected ? "text-white" : "text-white/70 hover:text-white"
              }`}
              whileHover={{ x: selected ? 0 : 3 }}
            >
              {selected && (
                <motion.span
                  layoutId="sidebar-pill"
                  className="absolute inset-0 rounded-3xl bg-gradient-to-r from-amber-300/30 via-amber-200/20 to-transparent"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center justify-between text-xs">
                <span>{tab.label}</span>
                <span className="text-[10px] text-white/60">{tab.badge}</span>
              </span>
            </motion.button>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
