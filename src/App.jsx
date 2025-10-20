import React, { useMemo, useRef, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import VideoBackground from "./components/VideoBackground";
import BlackHoleButton from "./components/BlackHoleButton";
import AuthPanel from "./components/AuthPanel";
import PortalShell from "./components/PortalShell";
import { DataProvider } from "./components/DataContext";
import WormholeTransition from "./components/WormholeTransition";

const WORMHOLE_DURATION = 11000;

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
    displayRole: "Co-Owner",
    providers: ["manual", "google"]
  },
  "stacygrohoske@gmail.com": {
    password: "Kendall929!",
    role: "ADMIN",
    name: "Stacy Grohoske",
    displayRole: "Co-Owner",
    providers: ["manual", "google", "facebook"]
  },
  "foreman@creativeops.test": {
    password: "crewlead",
    role: "FOREMAN",
    name: "Foreman Rivera",
    displayRole: "Field Command",
    providers: ["manual", "microsoft"]
  },
  "teamlead@creativeops.test": {
    password: "deckteam",
    role: "TEAM_LEAD",
    name: "Team Lead Morgan",
    displayRole: "Ops Lead",
    providers: ["manual", "google"]
  },
  "crew@creativeops.test": {
    password: "buildcrew",
    role: "CREW",
    name: "Crew Member",
    displayRole: "Crew",
    providers: ["manual"]
  },
  "apprentice@creativeops.test": {
    password: "learnandbuild",
    role: "APPRENTICE",
    name: "Apprentice Nova",
    displayRole: "Training",
    providers: ["manual"]
  },
  "client@creativeops.test": {
    password: "clientview",
    role: "CLIENT",
    name: "Client Aurora",
    displayRole: "Client",
    providers: ["manual", "guest"]
  },
  "guest@creativeops.test": {
    password: "guestaccess",
    role: "GUEST",
    name: "Guest Observer",
    displayRole: "Preview",
    providers: ["guest"]
  }
};

const App = () => {
  const [step, setStep] = useState("landing");
  const [selectedRole, setSelectedRole] = useState("ADMIN");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [user, setUser] = useState(null);
  const [authError, setAuthError] = useState("");
  const [isWarping, setIsWarping] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const warpTimersRef = useRef([]);

  useEffect(() => {
    return () => {
      warpTimersRef.current.forEach((timer) => clearTimeout(timer));
      warpTimersRef.current = [];
    };
  }, []);

  const userName = useMemo(() => {
    if (!user) return "Guest";
    return user.name ?? "Operator";
  }, [user]);

  const handlePortalEntry = () => {
    if (isWarping) return;
    warpTimersRef.current.forEach((timer) => clearTimeout(timer));
    warpTimersRef.current = [];
    setIsWarping(true);
    const toSignin = setTimeout(() => {
      setStep("signin");
    }, WORMHOLE_DURATION);
    const finishWarp = setTimeout(() => {
      setIsWarping(false);
    }, WORMHOLE_DURATION + 800);
    warpTimersRef.current = [toSignin, finishWarp];
  };

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
    setActiveTab(defaultTabByRole[roleId] ?? "dashboard");
  };

  const handleProviderRequest = (providerId) => {
    setSelectedProvider(providerId);
    setAuthError("");
  };

  const authenticateWithRecord = (recordEmail, record) => {
    const nextRole = record.role;
    setUser({
      email: recordEmail,
      name: record.name,
      role: nextRole,
      displayRole: record.displayRole
    });
    setSelectedRole(nextRole);
    setActiveTab(defaultTabByRole[nextRole] ?? "dashboard");
    setAuthError("");
    setSelectedProvider(null);
    setStep("portal");
  };

  const handleProviderAuthenticate = (providerId, email, password) => {
    if (!email || !password) {
      setAuthError("Enter the email and password linked to this provider.");
      return;
    }
    const lookupKey = email.trim().toLowerCase();
    const record = directory[lookupKey];
    if (!record) {
      setAuthError("We couldn’t find that account. Confirm the email or use manual sign-in.");
      return;
    }
    if (!record.providers?.includes(providerId)) {
      setAuthError("This account is not linked to the selected provider.");
      return;
    }
    if (record.password !== password) {
      setAuthError("Password does not match the selected provider account.");
      return;
    }
    authenticateWithRecord(lookupKey, record);
  };

  const handleManualSignIn = (email, password) => {
    if (!email || !password) {
      setAuthError("Enter an email and password to continue.");
      return;
    }
    const record = directory[email.trim().toLowerCase()];
    if (!record) {
      setAuthError("Credentials not recognized. Confirm your account or use the provider buttons to demo roles.");
      return;
    }
    if (record.providers && !record.providers.includes("manual")) {
      setAuthError("This account requires signing in with a linked provider.");
      return;
    }
    if (record.password !== password) {
      setAuthError("Credentials not recognized. Confirm your account or use the provider buttons to demo roles.");
      return;
    }
    authenticateWithRecord(email.trim().toLowerCase(), record);
  };

  const handleSignOut = () => {
    setStep("landing");
    setUser(null);
    setSelectedRole("ADMIN");
    setActiveTab("dashboard");
    setAuthError("");
    setIsWarping(false);
    setSelectedProvider(null);
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden font-sans text-white">
      <VideoBackground />
      <AnimatePresence>
        {isWarping && <WormholeTransition key="wormhole" />}
      </AnimatePresence>
      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 py-16">
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
                <h1 className="mt-4 text-5xl font-semibold leading-tight text-white drop-shadow-[0_0_24px_rgba(0,0,0,0.6)] md:text-6xl">
                  Creative Ops Portal
                </h1>
                <p className="mt-6 max-w-2xl text-[0.55rem] font-medium uppercase tracking-[0.6em] text-black/70 drop-shadow-[0_0_18px_rgba(255,255,255,0.85)]">
                  Innovative Software for the Intelligent Minds of Creative Deck &amp; Fence, LLC. Step through the luminous
                  portal to orchestrate operations across the entire company.
                </p>
              </motion.div>
              <BlackHoleButton onClick={handlePortalEntry} disabled={isWarping} />
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
                selectedProvider={selectedProvider}
                onRequestProvider={handleProviderRequest}
                onProviderAuthenticate={handleProviderAuthenticate}
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
