import React from "react";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";
import TabContent from "./TabContent";

const TAB_LIBRARY = {
  dashboard: { id: "dashboard", label: "Mission Dashboard", badge: "Overview" },
  contractors: { id: "contractors", label: "Contractors", badge: "Workforce" },
  jobs: { id: "jobs", label: "Jobs", badge: "Operations" },
  payouts: { id: "payouts", label: "Payouts / ACH", badge: "Finance" },
  payroll: { id: "payroll", label: "Payroll", badge: "Comp" },
  form1099: { id: "form1099", label: "1099 Filings", badge: "Compliance" },
  schedule: { id: "schedule", label: "Scheduling / Gantt", badge: "Planning" },
  materials: { id: "materials", label: "Materials / POs", badge: "Supply" },
  quotes: { id: "quotes", label: "Quotes / Estimates", badge: "Sales" },
  changeOrders: { id: "changeOrders", label: "Change Orders", badge: "Delta" },
  timesheets: { id: "timesheets", label: "Timesheets / Geo", badge: "Field" },
  timeOff: { id: "timeOff", label: "Time Off", badge: "Rest" },
  weather: { id: "weather", label: "Weather", badge: "WX" },
  invoices: { id: "invoices", label: "Invoices", badge: "Billing" },
  clientPortal: { id: "clientPortal", label: "Client Documents", badge: "Client" },
  analytics: { id: "analytics", label: "Analytics", badge: "AI" },
  security: { id: "security", label: "Security", badge: "Shield" },
  admin: { id: "admin", label: "Admin / RBAC", badge: "Control" },
  settings: { id: "settings", label: "Settings", badge: "Prefs" },
  training: { id: "training", label: "Training", badge: "Academy" },
  client: { id: "client", label: "My Project", badge: "Client" },
  portfolio: { id: "portfolio", label: "Portfolio & Company", badge: "Welcome" },
  map: { id: "map", label: "Project Map", badge: "Geo" }
};

const ROLE_TABS = {
  ADMIN: [
    TAB_LIBRARY.dashboard,
    TAB_LIBRARY.contractors,
    TAB_LIBRARY.jobs,
    TAB_LIBRARY.payouts,
    TAB_LIBRARY.payroll,
    TAB_LIBRARY.form1099,
    TAB_LIBRARY.schedule,
    TAB_LIBRARY.materials,
    TAB_LIBRARY.quotes,
    TAB_LIBRARY.changeOrders,
    TAB_LIBRARY.timesheets,
    TAB_LIBRARY.timeOff,
    TAB_LIBRARY.weather,
    TAB_LIBRARY.map,
    TAB_LIBRARY.invoices,
    TAB_LIBRARY.clientPortal,
    TAB_LIBRARY.training,
    TAB_LIBRARY.analytics,
    TAB_LIBRARY.security,
    TAB_LIBRARY.admin,
    TAB_LIBRARY.settings
  ],
  FOREMAN: [
    TAB_LIBRARY.dashboard,
    TAB_LIBRARY.jobs,
    TAB_LIBRARY.schedule,
    TAB_LIBRARY.payroll,
    TAB_LIBRARY.materials,
    TAB_LIBRARY.timesheets,
    TAB_LIBRARY.timeOff,
    TAB_LIBRARY.training,
    TAB_LIBRARY.map,
    TAB_LIBRARY.weather,
    TAB_LIBRARY.clientPortal,
    TAB_LIBRARY.settings
  ],
  TEAM_LEAD: [
    TAB_LIBRARY.dashboard,
    TAB_LIBRARY.jobs,
    TAB_LIBRARY.schedule,
    TAB_LIBRARY.changeOrders,
    TAB_LIBRARY.payroll,
    TAB_LIBRARY.timesheets,
    TAB_LIBRARY.timeOff,
    TAB_LIBRARY.weather,
    TAB_LIBRARY.map,
    TAB_LIBRARY.training,
    TAB_LIBRARY.clientPortal,
    TAB_LIBRARY.settings
  ],
  CREW: [
    TAB_LIBRARY.dashboard,
    TAB_LIBRARY.schedule,
    TAB_LIBRARY.jobs,
    TAB_LIBRARY.payroll,
    TAB_LIBRARY.timesheets,
    TAB_LIBRARY.timeOff,
    TAB_LIBRARY.weather,
    TAB_LIBRARY.training,
    TAB_LIBRARY.settings
  ],
  APPRENTICE: [
    TAB_LIBRARY.dashboard,
    TAB_LIBRARY.training,
    TAB_LIBRARY.schedule,
    TAB_LIBRARY.jobs,
    TAB_LIBRARY.payroll,
    TAB_LIBRARY.timesheets,
    TAB_LIBRARY.timeOff,
    TAB_LIBRARY.weather,
    TAB_LIBRARY.settings
  ],
  CLIENT: [TAB_LIBRARY.client, TAB_LIBRARY.clientPortal, TAB_LIBRARY.invoices, TAB_LIBRARY.changeOrders, TAB_LIBRARY.analytics],
  GUEST: [TAB_LIBRARY.portfolio, TAB_LIBRARY.clientPortal]
};

const PortalShell = ({ user, activeRole, activeTab, onChangeTab, onLogout }) => {
  const tabs = ROLE_TABS[activeRole] ?? ROLE_TABS.ADMIN;

  return (
    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <header className="glass-panel flex flex-col gap-4 rounded-4xl border border-white/10 bg-black/60 p-6 shadow-[0_40px_80px_rgba(15,23,42,0.6)] md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p className="text-[10px] uppercase tracking-[0.6em] text-amber-200/70">Creative Ops Portal</p>
          <h1 className="text-3xl font-semibold text-white">Welcome, {user.name}</h1>
          <p className="text-sm text-white/70">
            Role matrix: <span className="text-amber-200">{user.displayRole ?? activeRole}</span> · Tiered access curated for Creative Deck &amp;
            Fence, LLC.
          </p>
          <p className="text-xs text-white/50">{user.email}</p>
        </div>
        <div className="flex flex-wrap items-center justify-end gap-3">
          <div className="rounded-3xl border border-white/10 bg-white/5 px-4 py-2 text-[10px] uppercase tracking-[0.5em] text-white/70">
            Offline Ready
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 px-4 py-2 text-[10px] uppercase tracking-[0.5em] text-white/70">
            Audit Logging
          </div>
          <button
            onClick={onLogout}
            className="rounded-3xl border border-white/10 bg-gradient-to-r from-amber-400/80 to-orange-500/80 px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.5em] text-black shadow-lg shadow-amber-400/40"
          >
            Sign out
          </button>
        </div>
      </header>
      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <Sidebar tabs={tabs} activeTab={activeTab} onSelect={onChangeTab} />
        <div className="glass-panel min-h-[32rem] rounded-4xl border border-white/10 bg-black/55 p-6 shadow-[0_40px_90px_rgba(15,23,42,0.55)]">
          <TabContent activeTab={activeTab} role={activeRole} user={user} />
        </div>
      </div>
    </motion.div>
  );
};

export default PortalShell;
