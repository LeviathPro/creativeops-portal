import React, { useEffect, useMemo, useState } from "react";

const ACCOUNT_DIRECTORY = {
  "creativedeckfence@gmail.com": {
    displayName: "Creative Deck & Fence Admin",
    role: "admin",
    company: "Creative Deck & Fence, LLC",
    password: "Freyja1!",
    provider: "google",
    displayEmail: "CreativeDeckFence@gmail.com",
  },
  "stacygrohoske@gmail.com": {
    displayName: "Stacy Grohoske",
    role: "admin",
    company: "Creative Deck & Fence, LLC",
    password: "Kendall929!",
    provider: "password",
    displayEmail: "StacyGrohoske@gmail.com",
  },
  "crewlead@creativedeckfence.com": {
    displayName: "Crew Operations Lead",
    role: "team",
    company: "Creative Deck & Fence, LLC",
    password: "SiteSync2024",
    provider: "password",
    displayEmail: "CrewLead@CreativeDeckFence.com",
  },
};

const GOOGLE_ACCOUNT = "creativedeckfence@gmail.com";

const StatCard = ({ title, value, change, descriptor, positive = true }) => (
  <div className="bg-slate-900/60 border border-white/5 rounded-3xl p-6 shadow-xl shadow-blue-900/40">
    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{title}</p>
    <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
    {change && (
      <p className={`mt-2 text-sm font-medium ${positive ? "text-emerald-400" : "text-rose-400"}`}>
        {change}
      </p>
    )}
    {descriptor && <p className="mt-4 text-sm text-slate-400">{descriptor}</p>}
  </div>
);

const AdminDashboard = ({ user }) => (
  <div className="space-y-12">
    <section className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
      <div className="rounded-3xl bg-gradient-to-br from-blue-900/70 via-indigo-900/70 to-slate-950/70 border border-white/10 p-8 shadow-[0_40px_120px_-40px_rgba(59,130,246,0.45)]">
        <p className="text-sm uppercase tracking-[0.3em] text-blue-200/70">Command Deck</p>
        <h2 className="mt-4 text-3xl font-semibold text-white">Welcome back, {user.displayName}</h2>
        <p className="mt-4 max-w-xl text-slate-200/80">
          The CreativeOps timewarp has synchronized all operational telemetry. Review active crews,
          revenue trajectories, and client sentiment from one unified console.
        </p>
        <div className="mt-6 flex flex-wrap gap-4 text-sm text-slate-300/80">
          <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1">{user.company}</span>
          <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1">Admin Access</span>
          <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1">{user.provider === "google" ? "Google Authenticated" : "Portal Authenticated"}</span>
        </div>
      </div>
      <div className="rounded-3xl bg-slate-900/80 border border-white/10 p-8">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Mission Log</p>
        <ul className="mt-5 space-y-4 text-sm text-slate-300">
          <li className="flex items-start gap-3">
            <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-emerald-400"></span>
            <span>7 crews currently deployed across Cincinnati metro.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-sky-400"></span>
            <span>Supply chain latency reduced by 12% week-over-week.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-amber-400"></span>
            <span>3 proposals awaiting executive approval.</span>
          </li>
        </ul>
      </div>
    </section>

    <section>
      <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Live Intelligence</p>
      <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Monthly Revenue"
          value="$212,400"
          change="↑ 18% vs. last month"
          descriptor="Forecasted to exceed quarterly target by 7.4%."
        />
        <StatCard
          title="Active Projects"
          value="24"
          change="On schedule"
          descriptor="15 residential, 6 commercial, 3 municipal installations."
        />
        <StatCard
          title="Crew Capacity"
          value="92%"
          change="Optimal load"
          descriptor="Downtime minimized across divisions."
        />
        <StatCard
          title="Client Sentiment"
          value="4.8 / 5.0"
          change="↑ +0.3 in 30 days"
          descriptor="Feedback-driven enhancements rolled out to CRM.
"
        />
      </div>
    </section>

    <section className="grid gap-6 lg:grid-cols-[1.35fr_1fr]">
      <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Company Matrix</p>
          <span className="text-xs font-semibold text-blue-300/80">Real-time sync</span>
        </div>
        <div className="mt-6 overflow-hidden rounded-2xl border border-white/5 bg-slate-950/60">
          <table className="min-w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-900/80 text-xs uppercase tracking-wide text-slate-400">
              <tr>
                <th className="px-4 py-3">Division</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Lead</th>
                <th className="px-4 py-3">Next Milestone</th>
              </tr>
            </thead>
            <tbody>
              {[ 
                {
                  name: "Residential Fencing",
                  status: "Deploying crews",
                  lead: "Dana Cooper",
                  milestone: "Finish Madeira perimeter by 05/24",
                },
                {
                  name: "Commercial Decking",
                  status: "Design review",
                  lead: "Louis Morgan",
                  milestone: "Approve downtown terrace retrofit",
                },
                {
                  name: "Materials & Logistics",
                  status: "Freight inbound",
                  lead: "Stacy Grohoske",
                  milestone: "Inventory reconciliation Thursday",
                },
                {
                  name: "Client Success",
                  status: "Follow-up cadence",
                  lead: "Ashley Ramirez",
                  milestone: "Launch onboarding journey v2",
                },
              ].map((row) => (
                <tr key={row.name} className="border-t border-white/5">
                  <td className="px-4 py-3 text-white/90">{row.name}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-medium text-emerald-300">
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-300">{row.lead}</td>
                  <td className="px-4 py-3 text-slate-400">{row.milestone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="space-y-6">
        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Space-Time Alerts</p>
          <ul className="mt-5 space-y-4 text-sm text-slate-300">
            <li>
              <p className="font-semibold text-white">Solari Parkway install</p>
              <p className="text-slate-400">Inspection moved up 24 hours — notify crew Ω7.</p>
            </li>
            <li>
              <p className="font-semibold text-white">Vendor calibration</p>
              <p className="text-slate-400">Composite railing supplier ready for Q3 contract renewal.</p>
            </li>
            <li>
              <p className="font-semibold text-white">Revenue control</p>
              <p className="text-slate-400">New upsell bundle produced +$8,900 this week.</p>
            </li>
          </ul>
        </div>
        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Approvals Queue</p>
          <ul className="mt-5 space-y-3 text-sm text-slate-300">
            <li className="flex items-center justify-between">
              <span>Norwood civic deck expansion</span>
              <span className="text-xs text-amber-300">Awaiting signature</span>
            </li>
            <li className="flex items-center justify-between">
              <span>Mason HOA perimeter refresh</span>
              <span className="text-xs text-emerald-300">Approved</span>
            </li>
            <li className="flex items-center justify-between">
              <span>Edgewood hospitality patio</span>
              <span className="text-xs text-sky-300">Reviewing</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
);

const TeamDashboard = ({ user }) => (
  <div className="space-y-10">
    <section className="rounded-3xl bg-gradient-to-br from-slate-900/80 via-slate-950/70 to-black/80 border border-white/10 p-8 shadow-[0_40px_120px_-40px_rgba(96,165,250,0.35)]">
      <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Field Operations</p>
      <h2 className="mt-4 text-3xl font-semibold text-white">Good to see you, {user.displayName}</h2>
      <p className="mt-3 text-slate-300/80">
        Your deployment timeline, crew status, and materials queue have been synchronized from HQ.
        Stay aligned with the admin team as projects phase through execution.
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <StatCard
          title="Active Jobs"
          value="6"
          change="Next check-in: 14:00"
          descriptor="3 deck builds, 2 fence replacements, 1 pergola install."
        />
        <StatCard
          title="Materials Readiness"
          value="84%"
          change="Awaiting delivery"
          descriptor="Two pallets of cedar scheduled for morning drop."
          positive={false}
        />
      </div>
    </section>

    <section className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
      <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Today's Timeline</p>
        <ul className="mt-5 space-y-4 text-sm text-slate-300">
          <li>
            <p className="font-semibold text-white">07:30 • Crew briefing</p>
            <p className="text-slate-400">Review scope for Montgomery patio extension.</p>
          </li>
          <li>
            <p className="font-semibold text-white">11:45 • Materials confirmation</p>
            <p className="text-slate-400">Confirm lumber delivery for Anderson install.</p>
          </li>
          <li>
            <p className="font-semibold text-white">15:00 • Client walkthrough</p>
            <p className="text-slate-400">On-site progress report for Hyde Park addition.</p>
          </li>
        </ul>
      </div>
      <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Quick Links</p>
        <ul className="mt-5 space-y-3 text-sm text-slate-300">
          <li className="flex items-center justify-between">
            <span>Submit a site photo</span>
            <span className="text-xs text-sky-300">Upload</span>
          </li>
          <li className="flex items-center justify-between">
            <span>Request materials</span>
            <span className="text-xs text-emerald-300">New</span>
          </li>
          <li className="flex items-center justify-between">
            <span>Escalate an issue</span>
            <span className="text-xs text-amber-300">Action</span>
          </li>
        </ul>
      </div>
    </section>
  </div>
);

const DashboardShell = ({ user, onSignOut }) => (
  <div className="min-h-screen bg-slate-950 text-slate-100">
    <div className="relative h-56 overflow-hidden rounded-b-[3rem] bg-gradient-to-br from-blue-900/70 via-indigo-900/50 to-slate-900">
      <div className="absolute inset-0 animate-gradient bg-[length:300%_300%] opacity-40"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.2),transparent_55%)]"></div>
      <header className="relative z-10 mx-auto flex h-full max-w-6xl items-end justify-between px-8 pb-10">
        <div>
          <p className="text-xs uppercase tracking-[0.5em] text-blue-200/70">CreativeOps Control</p>
          <h1 className="mt-3 text-4xl font-semibold text-white">Dashboard</h1>
          <p className="mt-2 text-sm text-blue-100/80">
            Access level: <span className="font-medium uppercase tracking-[0.3em]">{user.role}</span>
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden text-right text-sm text-blue-100/80 sm:block">
            <p className="font-semibold text-white">{user.displayName}</p>
            <p className="text-xs uppercase tracking-[0.35em]">{user.company}</p>
          </div>
          <button
            onClick={onSignOut}
            className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
          >
            Sign out
          </button>
        </div>
      </header>
    </div>

    <main className="mx-auto max-w-6xl px-6 py-12">
      {user.role === "admin" ? <AdminDashboard user={user} /> : <TeamDashboard user={user} />}
    </main>
  </div>
);

const SignInView = ({
  credentials,
  onChange,
  onSubmit,
  onGoogle,
  isAuthenticating,
  errorMessage,
  availableAccounts,
}) => (
  <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
    <div className="absolute inset-0 animate-gradient bg-[length:320%_320%] bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.45),transparent_45%),radial-gradient(circle_at_80%_10%,rgba(236,72,153,0.35),transparent_40%),radial-gradient(circle_at_50%_80%,rgba(14,165,233,0.35),transparent_35%)]"></div>
    <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-3xl"></div>

    <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-16">
      <div className="w-full max-w-xl space-y-10 rounded-[2.5rem] border border-white/10 bg-white/10 p-10 shadow-[0_40px_120px_-40px_rgba(59,130,246,0.65)]">
        <div className="text-center space-y-3">
          <p className="text-xs uppercase tracking-[0.5em] text-blue-200/70">CreativeOps Portal</p>
          <h1 className="text-4xl font-semibold text-white">Step into the timewarp</h1>
          <p className="text-sm text-blue-100/80">
            Sign in to orchestrate operations across every Creative Deck & Fence timeline.
          </p>
        </div>

        <form className="space-y-5" onSubmit={onSubmit}>
          <label className="block text-sm font-medium tracking-[0.2em] text-blue-100/80">
            Email address
            <input
              type="email"
              required
              value={credentials.email}
              onChange={(event) => onChange({ ...credentials, email: event.target.value })}
              className="mt-2 w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-base text-white shadow-inner shadow-blue-900/30 outline-none transition focus:border-blue-300/80 focus:bg-slate-900/70"
              placeholder="name@company.com"
            />
          </label>
          <label className="block text-sm font-medium tracking-[0.2em] text-blue-100/80">
            Password
            <input
              type="password"
              required
              value={credentials.password}
              onChange={(event) => onChange({ ...credentials, password: event.target.value })}
              className="mt-2 w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-base text-white shadow-inner shadow-blue-900/30 outline-none transition focus:border-blue-300/80 focus:bg-slate-900/70"
              placeholder="Enter your password"
            />
          </label>

          {errorMessage && (
            <p className="rounded-2xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={isAuthenticating}
            className="flex w-full items-center justify-center gap-3 rounded-2xl bg-blue-500/90 px-5 py-3 text-sm font-semibold uppercase tracking-[0.4em] text-white transition hover:bg-blue-500 disabled:cursor-wait disabled:bg-blue-500/60"
          >
            {isAuthenticating ? "Authenticating..." : "Enter Portal"}
          </button>
        </form>

        <div className="space-y-4">
          <button
            type="button"
            onClick={onGoogle}
            disabled={isAuthenticating}
            className="flex w-full items-center justify-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-900">G</span>
            Continue with Google
          </button>
          {availableAccounts?.length > 0 && (
            <div className="space-y-3 text-center text-xs text-blue-100/70">
              <p className="uppercase tracking-[0.45em] text-blue-100/60">Recognized Accounts</p>
              <div className="flex flex-wrap justify-center gap-2">
                {availableAccounts.map((account) => (
                  <span
                    key={account}
                    className="rounded-full border border-white/20 bg-white/10 px-3 py-1 font-medium uppercase tracking-[0.35em]"
                  >
                    {account}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);

const PortalWarp = ({ statusMessage, user }) => (
  <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black text-white">
    <div className="portal-warp">
      <div className="portal-stars"></div>
      <div className="portal-horizon">
        <div className="portal-ring"></div>
        <div className="portal-ring portal-ring--delayed"></div>
        <div className="portal-singularity"></div>
      </div>
      <div className="portal-lens"></div>
    </div>
    <div className="relative z-10 text-center">
      <p className="text-xs uppercase tracking-[0.5em] text-blue-200/70">Quantum transitioning</p>
      <h2 className="mt-4 text-3xl font-semibold">Hold steady, {user.displayName}</h2>
      <p className="mt-3 text-sm text-blue-100/80">{statusMessage}</p>
    </div>
  </div>
);

const App = () => {
  const [stage, setStage] = useState("signIn");
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [currentUser, setCurrentUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [portalStatus, setPortalStatus] = useState("Calibrating entry point...");

  const sortedAccountHint = useMemo(
    () =>
      Object.entries(ACCOUNT_DIRECTORY)
        .sort(([, a], [, b]) => {
          if (a.role === b.role) return 0;
          return a.role === "admin" ? -1 : 1;
        })
        .map(([email, account]) => account.displayEmail ?? email),
    []
  );

  useEffect(() => {
    if (stage !== "warp") return;

    const phases = [
      "Aligning CreativeOps telemetry...",
      "Engaging gravitational lensing...",
      "Crossing the event horizon...",
      "Stabilizing dashboard viewport...",
    ];

    let index = 0;
    setPortalStatus(phases[index]);
    index += 1;

    const interval = setInterval(() => {
      if (index >= phases.length) {
        clearInterval(interval);
        return;
      }
      setPortalStatus(phases[index]);
      index += 1;
    }, 800);

    const timer = setTimeout(() => {
      setStage("dashboard");
    }, 3200);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [stage]);

  const authenticate = (email, password) => {
    setErrorMessage("");
    setIsAuthenticating(true);
    const normalizedEmail = email.trim().toLowerCase();

    const attempt = setTimeout(() => {
      const account = ACCOUNT_DIRECTORY[normalizedEmail];
      if (!account || account.password !== password) {
        setErrorMessage("Unable to verify credentials. Please check your email or password.");
        setIsAuthenticating(false);
        return;
      }

      setCurrentUser({ ...account, email: normalizedEmail });
      setStage("warp");
      setIsAuthenticating(false);
    }, 650);

    return () => clearTimeout(attempt);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    authenticate(credentials.email, credentials.password);
  };

  const handleGoogle = () => {
    if (isAuthenticating) return;
    authenticate(GOOGLE_ACCOUNT, ACCOUNT_DIRECTORY[GOOGLE_ACCOUNT].password);
  };

  const handleSignOut = () => {
    setCurrentUser(null);
    setCredentials({ email: "", password: "" });
    setStage("signIn");
    setPortalStatus("Calibrating entry point...");
    setErrorMessage("");
  };

  return (
    <div className="min-h-screen font-['Inter',_'Inter_var',system-ui,sans-serif] text-white">
      {stage === "signIn" && (
        <SignInView
          credentials={credentials}
          onChange={setCredentials}
          onSubmit={handleSubmit}
          onGoogle={handleGoogle}
          isAuthenticating={isAuthenticating}
          errorMessage={errorMessage}
          availableAccounts={sortedAccountHint}
        />
      )}
      {stage === "warp" && currentUser && <PortalWarp statusMessage={portalStatus} user={currentUser} />}
      {stage === "dashboard" && currentUser && <DashboardShell user={currentUser} onSignOut={handleSignOut} />}
    </div>
  );
};

export default App;
