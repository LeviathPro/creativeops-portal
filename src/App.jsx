import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import VideoBackground from "./components/VideoBackground";
import BlackHoleButton from "./components/BlackHoleButton";
import AuthPanel from "./components/AuthPanel";
import PortalShell from "./components/PortalShell";
import { DataProvider } from "./components/DataContext";

const introVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

const defaultTabByRole = {
  ADMIN: "dashboard",
  FOREMAN: "jobs",
  TEAM_LEAD: "jobs",
  CREW: "dashboard",
  APPRENTICE: "training",
  CLIENT: "client",
  GUEST: "portfolio"
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
    password: "learnandbuild",
    role: "APPRENTICE",
    name: "Apprentice Nova",
    displayRole: "Training"
  },
  "client@creativeops.test": {
    password: "clientview",
    role: "CLIENT",
    name: "Client Aurora",
    displayRole: "Client"
  }
};

const App = () => {
  const [step, setStep] = useState("landing");
  const [selectedRole, setSelectedRole] = useState("ADMIN");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [user, setUser] = useState(null);
  const [authError, setAuthError] = useState("");

  const userName = useMemo(() => {
    if (!user) return "Guest";
    return user.name ?? "Operator";
  }, [user]);

  const handlePortalEntry = () => {
    setStep("signin");
  };

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
    setActiveTab(defaultTabByRole[roleId] ?? "dashboard");
  };

  const handleProviderLogin = (providerId) => {
    const roleToApply = selectedRole ?? "CLIENT";
    const generatedName = `${roleToApply} ${providerId === "guest" ? "Guest" : "Operator"}`;
    const emailAlias = `${providerId}.${roleToApply.toLowerCase()}@creativeops.demo`;
    setUser({
      email: emailAlias,
      name: generatedName,
      provider: providerId,
      role: roleToApply,
      displayRole: roleToApply
    });
    setActiveTab(defaultTabByRole[roleToApply] ?? "dashboard");
    setAuthError("");
    setStep("portal");
  };

  const handleManualSignIn = (email, password) => {
    if (!email || !password) {
      setAuthError("Enter an email and password to continue.");
      return;
    }
    const record = directory[email.trim().toLowerCase()];
    if (!record || record.password !== password) {
      setAuthError("Credentials not recognized. Confirm your account or use the provider buttons to demo roles.");
      return;
    }
    const nextRole = record.role;
    setUser({
      email,
      name: record.name,
      role: nextRole,
      displayRole: record.displayRole
    });
    setSelectedRole(nextRole);
    setActiveTab(defaultTabByRole[nextRole] ?? "dashboard");
    setAuthError("");
    setStep("portal");
  };

  const handleSignOut = () => {
    setStep("landing");
    setUser(null);
    setSelectedRole("ADMIN");
    setActiveTab("dashboard");
    setAuthError("");
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-white font-sans text-white">
      <VideoBackground />
      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 py-16">
        <AnimatePresence mode="wait">
          {step === "landing" && (
            <motion.section
              key="landing"
              variants={introVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.4 } }}
              className="flex flex-col items-center gap-10 text-center"
            >
              <motion.div initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}>
                <p className="text-xs uppercase tracking-[0.6em] text-amber-500/80">Creative Deck &amp; Fence, LLC</p>
                <h1 className="mt-4 text-5xl font-semibold leading-tight text-white md:text-6xl">
                  Creative Ops Portal
                </h1>
                <p className="mt-4 max-w-2xl text-sm text-white/80">
                  Innovative Software for the Intelligent Minds of Creative Deck &amp; Fence, LLC. Step through the luminous portal
                  to orchestrate operations across the entire company.
                </p>
              </motion.div>
              <BlackHoleButton onClick={handlePortalEntry} />
            </motion.section>
          )}

          {step === "signin" && (
            <motion.section
              key="signin"
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, transition: { duration: 0.4 } }}
              className="w-full"
            >
              <div className="mb-8 text-center">
                <p className="text-xs uppercase tracking-[0.6em] text-amber-500/80">Secure Gateway</p>
                <h2 className="mt-2 text-4xl font-semibold text-white">Authenticate &amp; Align Roles</h2>
              </div>
              <AuthPanel
                activeRole={selectedRole}
                onSelectRole={handleRoleSelect}
                onProviderLogin={handleProviderLogin}
                onManualLogin={handleManualSignIn}
                error={authError}
              />
              <p className="mt-6 text-center text-xs text-white/70">
                Use Stacy or Levi&apos;s credentials for full administrative control. Other demo accounts simulate role-based views so
                you can preview permissions instantly.
              </p>
            </motion.section>
          )}

          {step === "portal" && user && (
            <motion.section
              key="portal"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              className="w-full"
            >
              <DataProvider>
                <PortalShell
                  user={user}
                  activeRole={user.role}
                  activeTab={activeTab}
                  onChangeTab={setActiveTab}
                  onLogout={handleSignOut}
                />
              </DataProvider>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default App;
