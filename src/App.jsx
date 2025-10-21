import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import VideoBackground from "./components/VideoBackground";
import BlackHoleButton from "./components/BlackHoleButton";
import AuthPanel from "./components/AuthPanel";
import PortalShell from "./components/PortalShell";
import WormholeTransition from "./components/WormholeTransition";

const WORMHOLE_DURATION = 10000;

const introVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

const directory = {
  "leviathproductions@gmail.com": {
    password: "Freyja1!",
    role: "ADMIN",
    name: "Leviath Productions",
    displayRole: "Co-Owner"
  },
  "stacygrohoske@gmail.com": {
    password: "Kendall929!",
    role: "ADMIN",
    name: "Stacy Grohoske",
    displayRole: "Co-Owner"
  },
  "foreman@creativeops.test": {
    password: "crewlead",
    role: "FOREMAN",
    name: "Foreman Rivera",
    displayRole: "Field Command"
  },
  "teamlead@creativeops.test": {
    password: "deckteam",
    role: "TEAM_LEAD",
    name: "Team Lead Morgan",
    displayRole: "Ops Lead"
  },
  "crew@creativeops.test": {
    password: "buildcrew",
    role: "CREW",
    name: "Crew Member",
    displayRole: "Crew"
  },
  "apprentice@creativeops.test": {
    password: "learnfast",
    role: "APPRENTICE",
    name: "Apprentice Jordan",
    displayRole: "Apprentice"
  },
  "client@creativeops.test": {
    password: "clientview",
    role: "CLIENT",
    name: "Client Sanders",
    displayRole: "Client"
  }
};

const tabsByRole = {
  ADMIN: [
    { id: "dashboard", label: "Dashboard" },
    { id: "contractors", label: "Contractors" },
    { id: "jobs", label: "Jobs" },
    { id: "payouts", label: "Payouts / ACH" },
    { id: "filings1099", label: "1099 Filings" },
    { id: "schedule", label: "Scheduling / Gantt" },
    { id: "materials", label: "Materials / POs" },
    { id: "quotes", label: "Quotes / Estimates" },
    { id: "changeOrders", label: "Change Orders" },
    { id: "timesheets", label: "Timesheets" },
    { id: "weather", label: "Weather" },
    { id: "invoices", label: "Invoices" },
    { id: "clientPortal", label: "Client Portal" },
    { id: "analytics", label: "Analytics" },
    { id: "security", label: "Security" },
    { id: "admin", label: "Admin / RBAC" },
    { id: "settings", label: "Settings" }
  ],
  FOREMAN: [
    { id: "dashboard", label: "Dashboard" },
    { id: "jobs", label: "Jobs" },
    { id: "crew", label: "Crew Scheduling" },
    { id: "materials", label: "Materials" },
    { id: "weather", label: "Weather" },
    { id: "reports", label: "Daily Reports" },
    { id: "settings", label: "Settings" }
  ],
  TEAM_LEAD: [
    { id: "dashboard", label: "Dashboard" },
    { id: "jobs", label: "Jobs" },
    { id: "tasks", label: "Tasks" },
    { id: "uploads", label: "Photos & Docs" },
    { id: "weather", label: "Weather" },
    { id: "training", label: "Training" },
    { id: "settings", label: "Settings" }
  ],
  CREW: [
    { id: "dashboard", label: "Dashboard" },
    { id: "schedule", label: "Schedule" },
    { id: "training", label: "Training" },
    { id: "payroll", label: "Payroll" },
    { id: "weather", label: "Weather" },
    { id: "settings", label: "Settings" }
  ],
  APPRENTICE: [
    { id: "dashboard", label: "Dashboard" },
    { id: "training", label: "Training" },
    { id: "onboarding", label: "Onboarding" },
    { id: "schedule", label: "Schedule" },
    { id: "documents", label: "Documents" },
    { id: "settings", label: "Settings" }
  ],
  CLIENT: [
    { id: "clientDashboard", label: "Project Overview" },
    { id: "documents", label: "Documents" },
    { id: "invoices", label: "Invoices" },
    { id: "gallery", label: "Gallery" },
    { id: "care", label: "Care Guides" },
    { id: "changeOrders", label: "Change Orders" },
    { id: "support", label: "Support" }
  ],
  GUEST: [
    { id: "portfolio", label: "Portfolio" },
    { id: "about", label: "About" }
  ]
};

const defaultTabByRole = {
  ADMIN: "dashboard",
  FOREMAN: "dashboard",
  TEAM_LEAD: "dashboard",
  CREW: "dashboard",
  APPRENTICE: "dashboard",
  CLIENT: "clientDashboard",
  GUEST: "portfolio"
};

const quickProviders = [
  { label: "Continue with Google", email: "leviathproductions@gmail.com" },
  { label: "Continue with Facebook", email: "stacygrohoske@gmail.com" },
  { label: "Continue with Microsoft", email: "foreman@creativeops.test" }
];

const App = () => {
  const [step, setStep] = useState("landing");
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    const defaultTab = defaultTabByRole[user.role] ?? "dashboard";
    setActiveTab(defaultTab);
  }, [user]);

  const tabs = useMemo(() => {
    if (!user) return [];
    return tabsByRole[user.role] ?? tabsByRole.ADMIN;
  }, [user]);

  const handlePortalClick = () => {
    if (loading) return;
    setLoading(true);
    setStep("wormhole");
    window.setTimeout(() => {
      setLoading(false);
      setStep("signin");
    }, WORMHOLE_DURATION);
  };

  const handleLogin = (email, password) => {
    const record = directory[email.toLowerCase()];
    if (!record || record.password !== password) {
      setError("Invalid credentials. Please try again.");
      return;
    }
    setError("");
    setUser({ email: email.toLowerCase(), ...record });
    setStep("portal");
  };

  const handleQuick = (email) => {
    const record = directory[email.toLowerCase()];
    if (!record) {
      setError("Account not configured.");
      return;
    }
    setError("");
    setUser({ email: email.toLowerCase(), ...record });
    setStep("portal");
  };

  const handleLogout = () => {
    setUser(null);
    setStep("landing");
    setActiveTab("dashboard");
    setError("");
  };

  return (
    <div className="app-root">
      <VideoBackground />
      <AnimatePresence>
        {step === "wormhole" && <WormholeTransition duration={WORMHOLE_DURATION} />}
      </AnimatePresence>

      {step === "landing" && (
        <div className="landing">
          <motion.div
            className="landing-inner"
            variants={introVariants}
            initial="hidden"
            animate="visible"
          >
            <img src="/logo.png" alt="Creative Ops" className="landing-logo" />
            <h1 className="landing-title">Creative Ops Portal</h1>
            <p className="landing-tagline">Innovative Software for the Intelligent Minds of Creative Deck &amp; Fence, LLC.</p>
            <BlackHoleButton onClick={handlePortalClick} disabled={loading} />
          </motion.div>
        </div>
      )}

      {step === "signin" && (
        <motion.div
          className="signin-wrapper"
          variants={introVariants}
          initial="hidden"
          animate="visible"
        >
          <AuthPanel
            onLogin={handleLogin}
            onQuickLogin={handleQuick}
            providers={quickProviders}
            error={error}
          />
        </motion.div>
      )}

      {step === "portal" && user && (
        <PortalShell
          user={user}
          tabs={tabs}
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
};

export default App;
