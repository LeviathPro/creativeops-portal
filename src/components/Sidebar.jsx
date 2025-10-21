import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const Sidebar = ({ items, active, onSelect }) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-inner">
        {items.map((item) => (
          <button
            key={item.id}
            className={`sidebar-item ${active === item.id ? "active" : ""}`}
            onClick={() => onSelect(item.id)}
          >
            <AnimatePresence initial={false}>
              {active === item.id && (
                <motion.span
                  layoutId="sidebar-active"
                  className="sidebar-active-pill"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </AnimatePresence>
            <span className="sidebar-label">{item.label}</span>
          </button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
