import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

const providers = [
  { id: "google", label: "Continue with Google" },
  { id: "facebook", label: "Continue with Facebook" },
  { id: "microsoft", label: "Continue with Microsoft" },
  { id: "guest", label: "Continue as Guest" }
];

const providerTitle = {
  google: "Google",
  facebook: "Facebook",
  microsoft: "Microsoft",
  guest: "Guest Pass"
};

const roles = [
  { id: "ADMIN", description: "Master controls + financial intelligence" },
  { id: "FOREMAN", description: "Crew orchestration, scheduling, inventory" },
  { id: "TEAM_LEAD", description: "Task delegation, progress capture" },
  { id: "CREW", description: "Daily execution + timesheets" },
  { id: "APPRENTICE", description: "Onboarding academy + docs" },
  { id: "CLIENT", description: "Project transparency + care guides" }
];

const AuthPanel = ({
  activeRole,
  onSelectRole,
  selectedProvider,
  onRequestProvider,
  onProviderAuthenticate,
  onManualLogin,
  error
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [providerEmail, setProviderEmail] = useState("");
  const [providerPassword, setProviderPassword] = useState("");

  useEffect(() => {
    setProviderEmail("");
    setProviderPassword("");
  }, [selectedProvider]);

  const roleButtons = useMemo(
    () =>
      roles.map((role) => {
        const isActive = role.id === activeRole;
        return (
          <button
            key={role.id}
            onClick={() => onSelectRole(role.id)}
            className={`group rounded-3xl border border-white/10 bg-gradient-to-br from-black/40 via-black/30 to-black/10 p-4 text-left transition hover:border-amber-300/70 hover:shadow-[0_20px_40px_rgba(209,178,98,0.25)] ${
              isActive ? "ring-2 ring-amber-300/80" : ""
            }`}
          >
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm font-semibold tracking-[0.45em] text-white/90">{role.id}</span>
              <span className="text-[10px] uppercase tracking-[0.6em] text-amber-200/70">Role</span>
            </div>
            <p className="mt-2 text-xs text-white/70">{role.description}</p>
          </button>
        );
      }),
    [activeRole, onSelectRole]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel w-full max-w-4xl space-y-8 rounded-4xl border border-white/10 bg-black/55 p-10 shadow-[0_40px_120px_rgba(15,23,42,0.6)]"
    >
      <div className="space-y-3 text-center">
        <p className="text-xs uppercase tracking-[0.6em] text-amber-300/80">Authentication</p>
        <h2 className="text-3xl font-semibold text-white">Sign into Creative Ops</h2>
        <p className="text-sm text-white/70">
          Stacy and Levi retain omnipotent access. All other roles inherit limited portals that mirror the construction workflow.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {providers.map((provider) => (
          <motion.button
            key={provider.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onRequestProvider(provider.id)}
            className={`rounded-3xl border border-white/10 px-4 py-4 text-sm font-medium shadow-inner transition ${
              selectedProvider === provider.id
                ? "border-amber-300/80 bg-white/15 text-white"
                : "bg-gradient-to-r from-amber-400/40 via-transparent to-white/10 text-white/85 hover:border-amber-300/60"
            }`}
          >
            {provider.label}
          </motion.button>
        ))}
      </div>

      {selectedProvider && (
        <div className="space-y-4 rounded-3xl border border-white/10 bg-white/10 p-6">
          <div className="flex flex-col gap-1 text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.5em] text-amber-200/70">
              {providerTitle[selectedProvider] ?? "Provider"} Credentials
            </p>
            <p className="text-[0.65rem] text-white/70">
              Enter the email and password associated with this provider. Only linked accounts can proceed.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <input
              value={providerEmail}
              onChange={(event) => setProviderEmail(event.target.value)}
              placeholder="enter provider email"
              className="w-full rounded-2xl border border-white/10 bg-black/60 px-4 py-3 text-sm uppercase tracking-[0.35em] text-white placeholder:italic placeholder:text-white/45 focus:border-amber-300/80 focus:outline-none"
            />
            <input
              type="password"
              value={providerPassword}
              onChange={(event) => setProviderPassword(event.target.value)}
              placeholder="provider password"
              className="w-full rounded-2xl border border-white/10 bg-black/60 px-4 py-3 text-sm uppercase tracking-[0.35em] text-white placeholder:italic placeholder:text-white/45 focus:border-amber-300/80 focus:outline-none"
            />
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => onProviderAuthenticate(selectedProvider, providerEmail, providerPassword)}
              className="rounded-full bg-gradient-to-r from-white via-amber-200 to-amber-400 px-6 py-2 text-xs font-semibold uppercase tracking-[0.45em] text-black shadow-lg shadow-amber-200/30"
            >
              Authenticate with {providerTitle[selectedProvider] ?? "Provider"}
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4 rounded-3xl border border-white/10 bg-white/10 p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.5em] text-amber-200/70">Manual Sign In</p>
        <div className="grid gap-4 md:grid-cols-2">
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="admin email (e.g. leviathproductions@gmail.com)"
            className="w-full rounded-2xl border border-white/10 bg-black/60 px-4 py-3 text-sm uppercase tracking-[0.35em] text-white placeholder:italic placeholder:text-white/45 focus:border-amber-300/80 focus:outline-none"
          />
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="account password"
            className="w-full rounded-2xl border border-white/10 bg-black/60 px-4 py-3 text-sm uppercase tracking-[0.35em] text-white placeholder:italic placeholder:text-white/45 focus:border-amber-300/80 focus:outline-none"
          />
        </div>
        {error && <p className="text-xs text-rose-300">{error}</p>}
        <div className="flex justify-end">
          <button
            onClick={() => onManualLogin(email, password)}
            className="rounded-full bg-gradient-to-r from-white via-amber-200 to-amber-400 px-6 py-2 text-xs font-semibold uppercase tracking-[0.45em] text-black shadow-lg shadow-amber-200/30"
          >
            Authenticate
          </button>
        </div>
      </div>

      <div>
        <p className="mb-3 text-xs uppercase tracking-[0.5em] text-amber-200/80">Align Experience</p>
        <div className="grid gap-3 md:grid-cols-3">{roleButtons}</div>
      </div>
    </motion.div>
  );
};

export default AuthPanel;
