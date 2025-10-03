import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const STEP_SEQUENCE = ["landing", "portal", "signin", "dashboard"];
const ADMIN_EMAIL = "leviathproductions@gmail.com";

const DEFAULT_CONTENT = {
  landingTitle: "CreativeOps Portal",
  landingDescription:
    "Launch into the experience tailored for Creative Deck & Fence, LLC. Start in the portal to review updates, then continue into the administrative workspace.",
  portalSections: [
    {
      id: "brief",
      heading: "✨ Daily Brief",
      body: "Snapshot of tasks, approvals, and open requests across crews."
    },
    {
      id: "schedule",
      heading: "🗓️ Schedule",
      body: "See which projects are onsite today and what resources they need."
    },
    {
      id: "docs",
      heading: "📁 Documentation",
      body: "Permit packets, creative briefs, and contracts are ready to review."
    }
  ],
  dashboard: {
    title: "Administrative Dashboard",
    subtitle: "Monitor workstreams, assign crews, and keep clients updated from one place.",
    progressHeading: "Today’s Progress",
    progressSummary: "5 active installations",
    progressItems: [
      "2 deck designs awaiting approval",
      "1 fence repair request escalated",
      "12 assets ready for creative review"
    ],
    teamHeading: "Team Focus",
    teamSummary: "3 crews onsite",
    teamDescription: "Allocate resources and communicate updates without leaving the dashboard."
  }
};

const StepWrapper = ({ title, description, children }) => (
  <div className="w-full max-w-xl rounded-3xl bg-black/40 p-10 text-left shadow-2xl backdrop-blur-xl">
    <h1 className="text-3xl font-semibold text-white md:text-4xl">{title}</h1>
    {description ? (
      <p className="mt-3 text-sm text-white/70 md:text-base">{description}</p>
    ) : null}
    <div className="mt-8 space-y-6 text-white">{children}</div>
  </div>
);

const StepIndicator = ({ currentStep }) => {
  const items = useMemo(
    () => [
      { id: "landing", label: "Landing" },
      { id: "portal", label: "Portal" },
      { id: "signin", label: "Sign in" },
      { id: "dashboard", label: "Dashboard" }
    ],
    []
  );

  return (
    <ol className="mb-10 flex items-center gap-3 text-xs font-medium uppercase tracking-wide text-white/60 md:text-sm">
      {items.map((item, index) => {
        const currentIndex = STEP_SEQUENCE.indexOf(currentStep);
        const status =
          index < currentIndex ? "complete" : index === currentIndex ? "active" : "upcoming";

        return (
          <li key={item.id} className="flex items-center gap-2">
            <span
              className={
                "flex h-7 w-7 items-center justify-center rounded-full border text-xs font-semibold transition " +
                (status === "complete"
                  ? "border-emerald-400 bg-emerald-400/20 text-emerald-200"
                  : status === "active"
                    ? "border-white text-white"
                    : "border-white/40 text-white/40")
              }
            >
              {index + 1}
            </span>
            <span
              className={
                status === "complete"
                  ? "text-emerald-200"
                  : status === "active"
                    ? "text-white"
                    : "text-white/40"
              }
            >
              {item.label}
            </span>
            {index < items.length - 1 ? (
              <span className="hidden h-px w-10 bg-white/20 sm:block" aria-hidden="true" />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
};

const App = () => {
  const [step, setStep] = useState("landing");
  const [formState, setFormState] = useState({ email: "", password: "", remember: true });
  const [error, setError] = useState("");
  const [user, setUser] = useState({ email: "", isAdmin: false });
  const [content, setContent] = useState(DEFAULT_CONTENT);

  const handleGoBack = () => {
    const index = STEP_SEQUENCE.indexOf(step);
    if (index > 0) {
      setStep(STEP_SEQUENCE[index - 1]);
      setError("");
    }
  };

  const handleAdvance = (nextStep) => {
    setStep(nextStep);
    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formState.email || !formState.password) {
      setError("Please enter both an email address and password.");
      return;
    }

    const normalizedEmail = formState.email.trim().toLowerCase();
    setUser({ email: formState.email.trim(), isAdmin: normalizedEmail === ADMIN_EMAIL });
    handleAdvance("dashboard");
  };

  const handleGoogleSignIn = () => {
    const email = "LeviathProductions@gmail.com";
    setFormState({ email, password: "", remember: true });
    setUser({ email, isAdmin: true });
    setError("");
    handleAdvance("dashboard");
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-slate-950 px-6 py-12">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-purple-700 via-pink-500 to-indigo-600 opacity-80 blur-3xl" />
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950/60 via-slate-950/70 to-slate-950/90" />

      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center gap-6 text-center text-white">
        <StepIndicator currentStep={step} />
        <AnimatePresence mode="wait">
          {step === "landing" ? (
            <motion.div
              key="landing"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex justify-center"
            >
              <StepWrapper
                title={content.landingTitle}
                description={content.landingDescription}
              >
                <button
                  type="button"
                  onClick={() => handleAdvance("portal")}
                  className="w-full rounded-2xl bg-white/20 px-6 py-3 text-base font-semibold shadow-lg backdrop-blur-lg transition hover:bg-white/30 hover:shadow-xl"
                >
                  Enter Portal
                </button>
              </StepWrapper>
            </motion.div>
          ) : step === "portal" ? (
            <motion.div
              key="portal"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex justify-center"
            >
              <StepWrapper
                title="Portal Overview"
                description="Review upcoming projects, team alerts, and partner communications before signing in to the administrative console."
              >
                <ul className="space-y-4 text-sm text-white/80">
                  {content.portalSections.map((section) => (
                    <li key={section.id} className="rounded-2xl bg-white/5 p-4">
                      <p className="font-semibold text-white">{section.heading}</p>
                      <p className="mt-1 text-white/70">{section.body}</p>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col gap-4 pt-2 sm:flex-row">
                  <button
                    type="button"
                    onClick={handleGoBack}
                    className="flex-1 rounded-2xl border border-white/30 px-6 py-3 text-base font-semibold text-white transition hover:border-white/60 hover:bg-white/10"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAdvance("signin")}
                    className="flex-1 rounded-2xl bg-emerald-500 px-6 py-3 text-base font-semibold text-emerald-50 shadow-lg transition hover:bg-emerald-400"
                  >
                    Go to Sign in
                  </button>
                </div>
              </StepWrapper>
            </motion.div>
          ) : step === "signin" ? (
            <motion.div
              key="signin"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex justify-center"
            >
              <StepWrapper
                title="Administrative Sign in"
                description="Securely access the CreativeOps administrative workspace to manage teams, schedules, and deliverables."
              >
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-white/80">
                      Email address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={formState.email}
                      onChange={(event) =>
                        setFormState((prev) => ({ ...prev, email: event.target.value }))
                      }
                      className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
                      placeholder="you@creativedeckfence.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium text-white/80">
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      value={formState.password}
                      onChange={(event) =>
                        setFormState((prev) => ({ ...prev, password: event.target.value }))
                      }
                      className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm text-white/70">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formState.remember}
                        onChange={(event) =>
                          setFormState((prev) => ({ ...prev, remember: event.target.checked }))
                        }
                        className="h-4 w-4 rounded border-white/30 bg-white/10 text-emerald-400 focus:ring-emerald-400/50"
                      />
                      Remember me
                    </label>
                    <button
                      type="button"
                      className="font-semibold text-emerald-200 transition hover:text-emerald-100"
                    >
                      Forgot password?
                    </button>
                  </div>
                  {error ? (
                    <p role="alert" className="rounded-2xl bg-red-500/20 px-4 py-2 text-sm text-red-100">
                      {error}
                    </p>
                  ) : null}
                  <div className="flex flex-col gap-4 pt-2 sm:flex-row">
                    <button
                      type="button"
                      onClick={handleGoBack}
                      className="flex-1 rounded-2xl border border-white/30 px-6 py-3 text-base font-semibold text-white transition hover:border-white/60 hover:bg-white/10"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="flex-1 rounded-2xl bg-emerald-500 px-6 py-3 text-base font-semibold text-emerald-50 shadow-lg transition hover:bg-emerald-400"
                    >
                      Sign in
                    </button>
                  </div>
                </form>
                <div className="mt-6 rounded-2xl border border-white/20 bg-white/5 p-5 text-left">
                  <p className="text-sm font-semibold text-white">Prefer Google?</p>
                  <p className="mt-1 text-xs text-white/70">
                    Use the Creative Deck & Fence Google Workspace account to receive administrator access instantly.
                  </p>
                  <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    className="mt-4 w-full rounded-2xl bg-white/20 px-6 py-2 text-sm font-semibold text-white transition hover:bg-white/30"
                  >
                    Sign in with Google as LeviathProductions@gmail.com
                  </button>
                </div>
              </StepWrapper>
            </motion.div>
          ) : (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex justify-center"
            >
              <StepWrapper
                title={user.isAdmin ? `${content.dashboard.title} (Admin)` : content.dashboard.title}
                description={content.dashboard.subtitle}
              >
                <p className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-left text-sm text-white/80">
                  Signed in as <span className="font-semibold text-white">{user.email || "guest"}</span>
                  {user.isAdmin ? " — administrator access enabled." : "."}
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                    <p className="text-sm font-medium uppercase tracking-wide text-white/50">
                      {content.dashboard.progressHeading}
                    </p>
                    <p className="mt-3 text-2xl font-semibold">{content.dashboard.progressSummary}</p>
                    <ul className="mt-4 space-y-2 text-sm text-white/70">
                      {content.dashboard.progressItems.map((item, index) => (
                        <li key={`${item}-${index}`}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                    <p className="text-sm font-medium uppercase tracking-wide text-white/50">
                      {content.dashboard.teamHeading}
                    </p>
                    <p className="mt-3 text-2xl font-semibold">{content.dashboard.teamSummary}</p>
                    <p className="mt-2 text-sm text-white/70">{content.dashboard.teamDescription}</p>
                    <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                      <button
                        type="button"
                        className="flex-1 rounded-2xl bg-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/30"
                        onClick={() => handleAdvance("portal")}
                      >
                        Return to Portal
                      </button>
                      <button
                        type="button"
                        className="flex-1 rounded-2xl border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10"
                        onClick={() => handleAdvance("landing")}
                      >
                        View Landing Page
                      </button>
                    </div>
                  </div>
                </div>
                {user.isAdmin ? (
                  <form className="mt-8 space-y-6" aria-label="Admin content editor">
                    <p className="text-left text-xs uppercase tracking-wide text-white/60">
                      Changes save instantly for all visitors.
                    </p>
                    <fieldset className="space-y-4 rounded-3xl border border-white/15 bg-white/5 p-5">
                      <legend className="px-2 text-sm font-semibold text-white">Landing content</legend>
                      <div className="space-y-2 text-left">
                        <label htmlFor="landing-title" className="text-xs font-medium uppercase tracking-wide text-white/70">
                          Landing title
                        </label>
                        <input
                          id="landing-title"
                          value={content.landingTitle}
                          onChange={(event) =>
                            setContent((prev) => ({ ...prev, landingTitle: event.target.value }))
                          }
                          className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
                        />
                      </div>
                      <div className="space-y-2 text-left">
                        <label htmlFor="landing-description" className="text-xs font-medium uppercase tracking-wide text-white/70">
                          Landing description
                        </label>
                        <textarea
                          id="landing-description"
                          value={content.landingDescription}
                          onChange={(event) =>
                            setContent((prev) => ({ ...prev, landingDescription: event.target.value }))
                          }
                          className="h-24 w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
                        />
                      </div>
                    </fieldset>
                    <fieldset className="space-y-4 rounded-3xl border border-white/15 bg-white/5 p-5">
                      <legend className="px-2 text-sm font-semibold text-white">Portal overview</legend>
                      {content.portalSections.map((section, index) => (
                        <div key={section.id} className="space-y-3 rounded-2xl border border-white/10 bg-black/20 p-4">
                          <div className="space-y-2 text-left">
                            <label
                              htmlFor={`portal-heading-${section.id}`}
                              className="text-xs font-medium uppercase tracking-wide text-white/70"
                            >
                              Card heading
                            </label>
                            <input
                              id={`portal-heading-${section.id}`}
                              value={section.heading}
                              onChange={(event) =>
                                setContent((prev) => ({
                                  ...prev,
                                  portalSections: prev.portalSections.map((item, itemIndex) =>
                                    itemIndex === index ? { ...item, heading: event.target.value } : item
                                  )
                                }))
                              }
                              className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
                            />
                          </div>
                          <div className="space-y-2 text-left">
                            <label
                              htmlFor={`portal-body-${section.id}`}
                              className="text-xs font-medium uppercase tracking-wide text-white/70"
                            >
                              Card description
                            </label>
                            <textarea
                              id={`portal-body-${section.id}`}
                              value={section.body}
                              onChange={(event) =>
                                setContent((prev) => ({
                                  ...prev,
                                  portalSections: prev.portalSections.map((item, itemIndex) =>
                                    itemIndex === index ? { ...item, body: event.target.value } : item
                                  )
                                }))
                              }
                              className="h-24 w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
                            />
                          </div>
                        </div>
                      ))}
                    </fieldset>
                    <fieldset className="space-y-4 rounded-3xl border border-white/15 bg-white/5 p-5">
                      <legend className="px-2 text-sm font-semibold text-white">Dashboard insights</legend>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-4 text-left">
                          <div className="space-y-2">
                            <label
                              htmlFor="progress-heading"
                              className="text-xs font-medium uppercase tracking-wide text-white/70"
                            >
                              Progress heading
                            </label>
                            <input
                              id="progress-heading"
                              value={content.dashboard.progressHeading}
                              onChange={(event) =>
                                setContent((prev) => ({
                                  ...prev,
                                  dashboard: {
                                    ...prev.dashboard,
                                    progressHeading: event.target.value
                                  }
                                }))
                              }
                              className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
                            />
                          </div>
                          <div className="space-y-2">
                            <label
                              htmlFor="progress-summary"
                              className="text-xs font-medium uppercase tracking-wide text-white/70"
                            >
                              Progress summary
                            </label>
                            <input
                              id="progress-summary"
                              value={content.dashboard.progressSummary}
                              onChange={(event) =>
                                setContent((prev) => ({
                                  ...prev,
                                  dashboard: {
                                    ...prev.dashboard,
                                    progressSummary: event.target.value
                                  }
                                }))
                              }
                              className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
                            />
                          </div>
                          <div className="space-y-2">
                            <label
                              htmlFor="progress-items"
                              className="text-xs font-medium uppercase tracking-wide text-white/70"
                            >
                              Progress bullet points (one per line)
                            </label>
                            <textarea
                              id="progress-items"
                              value={content.dashboard.progressItems.join("\n")}
                              onChange={(event) => {
                                const items = event.target
                                  .value
                                  .split("\n")
                                  .map((item) => item.trim())
                                  .filter(Boolean);
                                setContent((prev) => ({
                                  ...prev,
                                  dashboard: {
                                    ...prev.dashboard,
                                    progressItems: items
                                  }
                                }));
                              }}
                              className="h-32 w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
                            />
                          </div>
                        </div>
                        <div className="space-y-4 text-left">
                          <div className="space-y-2">
                            <label htmlFor="team-heading" className="text-xs font-medium uppercase tracking-wide text-white/70">
                              Team heading
                            </label>
                            <input
                              id="team-heading"
                              value={content.dashboard.teamHeading}
                              onChange={(event) =>
                                setContent((prev) => ({
                                  ...prev,
                                  dashboard: {
                                    ...prev.dashboard,
                                    teamHeading: event.target.value
                                  }
                                }))
                              }
                              className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
                            />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="team-summary" className="text-xs font-medium uppercase tracking-wide text-white/70">
                              Team summary
                            </label>
                            <input
                              id="team-summary"
                              value={content.dashboard.teamSummary}
                              onChange={(event) =>
                                setContent((prev) => ({
                                  ...prev,
                                  dashboard: {
                                    ...prev.dashboard,
                                    teamSummary: event.target.value
                                  }
                                }))
                              }
                              className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
                            />
                          </div>
                          <div className="space-y-2">
                            <label
                              htmlFor="team-description"
                              className="text-xs font-medium uppercase tracking-wide text-white/70"
                            >
                              Team description
                            </label>
                            <textarea
                              id="team-description"
                              value={content.dashboard.teamDescription}
                              onChange={(event) =>
                                setContent((prev) => ({
                                  ...prev,
                                  dashboard: {
                                    ...prev.dashboard,
                                    teamDescription: event.target.value
                                  }
                                }))
                              }
                              className="h-32 w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
                            />
                          </div>
                        </div>
                      </div>
                    </fieldset>
                  </form>
                ) : null}
              </StepWrapper>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default App;
