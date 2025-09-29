
import React, { useEffect, useMemo, useState } from "react";

const ACCOUNTS = {
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
  "foreman@creativeops.com": {
    displayName: "Crew Foreman",
    role: "team",
    company: "Creative Deck & Fence, LLC",
    password: "SiteSync2024",
    provider: "password",
    displayEmail: "Foreman@CreativeOps.com",
  },
  "installer@creativeops.com": {
    displayName: "Field Installer",
    role: "team",
    company: "Creative Deck & Fence, LLC",
    password: "Install2024",
    provider: "password",
    displayEmail: "Installer@CreativeOps.com",
  },
};

const GOOGLE_ACCOUNT = "creativedeckfence@gmail.com";

const DRONE_REEL = [
  {
    src: "https://cdn.coverr.co/videos/coverr-flying-over-a-wooden-pier-8535/1080p.mp4",
    caption: "Sunrise over cedar dock installation",
  },
  {
    src: "https://cdn.coverr.co/videos/coverr-aerial-view-of-a-residential-neighborhood-9781/1080p.mp4",
    caption: "Aerial rotation around stained deck system",
  },
  {
    src: "https://cdn.coverr.co/videos/coverr-dji-mavic-flying-over-a-huge-forest-1689870454233?download=1",
    caption: "Evening glow on pergola lighting retrofit",
  },
];

const EXPENSE_CATEGORIES = [
  "Materials",
  "Food",
  "Gas",
  "Tools",
  "Maintenance",
  "Vehicle",
  "Office",
  "Payroll",
  "Marketing",
  "Utilities",
  "Other",
];

const PAYMENT_METHODS = [
  "Cash",
  "Company Card",
  "ACH",
  "Zelle",
  "Venmo",
  "PayPal",
  "Cash App",
  "Chime",
  "Check",
];

function createId(prefix = "id") {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function formatCurrency(value) {
  const amount = Number(value) || 0;
  return amount.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

function deriveReceiptInsights(fileName) {
  const lowerName = fileName.toLowerCase();
  const baseName = fileName.replace(/\.[^/.]+$/, "");
  const cleaned = baseName
    .split(/[\s_-]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  const amountMatch = lowerName.match(/(\d+[\._]\d{2})|(\d{2,4})/);
  const inferredAmount = amountMatch ? amountMatch[0].replace("_", ".") : "";

  let category = "Other";
  if (/fuel|gas|diesel|bp|shell|speedway|marathon/.test(lowerName)) category = "Gas";
  else if (/food|grill|restaurant|cafe|coffee|lunch|taco|pizza/.test(lowerName)) category = "Food";
  else if (/lumber|wood|home.?depot|lowe|menards|material|supply|hardware/.test(lowerName)) category = "Materials";
  else if (/tool|fastenal|dewalt|milwaukee/.test(lowerName)) category = "Tools";
  else if (/truck|vehicle|tire|oil/.test(lowerName)) category = "Vehicle";
  else if (/office|staples|printer/.test(lowerName)) category = "Office";
  else if (/maint|repair|service|warranty/.test(lowerName)) category = "Maintenance";

  let method = "Company Card";
  if (/cash/.test(lowerName)) method = "Cash";
  else if (/zelle/.test(lowerName)) method = "Zelle";
  else if (/ach/.test(lowerName)) method = "ACH";
  else if (/venmo/.test(lowerName)) method = "Venmo";
  else if (/paypal/.test(lowerName)) method = "PayPal";
  else if (/cashapp|cash-app/.test(lowerName)) method = "Cash App";
  else if (/chime/.test(lowerName)) method = "Chime";
  else if (/check/.test(lowerName)) method = "Check";

  return {
    vendor: cleaned || "New Vendor",
    amount: inferredAmount,
    category,
    method,
    reference: cleaned ? `${cleaned} ${new Date().getFullYear()}` : `Receipt ${new Date().getFullYear()}`,
    notes: `Auto-categorized as ${category} via receipt scan.`,
  };
}

const INITIAL_EMPLOYEES = [
  {
    id: createId("emp"),
    name: "Logan Pierce",
    role: "Deck Lead (W4)",
    address: "842 Riverbend Way, Cincinnati, OH",
    phone: "(513) 555-0182",
    payroll: "$34.50/hr",
    ytd: 41860,
    hours: 1214,
    documents: ["ID", "SSN", "W9"],
  },
  {
    id: createId("emp"),
    name: "Mara Vance",
    role: "Fence Crew (W9)",
    address: "19 Pike Ridge, Newport, KY",
    phone: "(859) 555-0279",
    payroll: "$600/project",
    ytd: 28200,
    hours: 744,
    documents: ["ID", "W9"],
  },
  {
    id: createId("emp"),
    name: "Jerome Castillo",
    role: "Pergola Artisan (W4)",
    address: "610 Walnut St, Loveland, OH",
    phone: "(513) 555-2244",
    payroll: "$31.25/hr",
    ytd: 37420,
    hours: 1072,
    documents: ["ID", "SSN", "W4"],
  },
  {
    id: createId("emp"),
    name: "Riya Patel",
    role: "Logistics Coordinator (W4)",
    address: "355 Skyline Dr, Mason, OH",
    phone: "(513) 555-1175",
    payroll: "$29.75/hr",
    ytd: 33010,
    hours: 1116,
    documents: ["ID", "W4"],
  },
];

const INITIAL_PROJECTS = [
  {
    id: createId("proj"),
    name: "Riverside Deck Expansion",
    percent: 68,
    status: "On schedule",
    blueprint: "RiversideDeck_v5.pdf",
    checklist: [
      { id: createId("task"), label: "Footings inspection", complete: true },
      { id: createId("task"), label: "Electrical rough-in", complete: false },
      { id: createId("task"), label: "Composite decking", complete: false },
      { id: createId("task"), label: "Lighting layout", complete: false },
    ],
    client: "Lanier Residence",
    targetDate: "2024-06-18",
  },
  {
    id: createId("proj"),
    name: "Walnut Hills Perimeter Fence",
    percent: 54,
    status: "Materials en route",
    blueprint: "WalnutFence_v2.pdf",
    checklist: [
      { id: createId("task"), label: "Demolition", complete: true },
      { id: createId("task"), label: "Post setting", complete: false },
      { id: createId("task"), label: "Panel install", complete: false },
      { id: createId("task"), label: "Stain & seal", complete: false },
    ],
    client: "Cityside HOA",
    targetDate: "2024-07-02",
  },
  {
    id: createId("proj"),
    name: "Harborview Dock Renewal",
    percent: 82,
    status: "Awaiting punch list",
    blueprint: "HarborDock_v4.ifc",
    checklist: [
      { id: createId("task"), label: "Pile reinforcement", complete: true },
      { id: createId("task"), label: "Deck planking", complete: true },
      { id: createId("task"), label: "Night lighting", complete: false },
      { id: createId("task"), label: "Client walkthrough", complete: false },
    ],
    client: "Harborview Marina",
    targetDate: "2024-05-29",
  },
  {
    id: createId("proj"),
    name: "Northcrest Pergola + Lighting",
    percent: 31,
    status: "Design approvals",
    blueprint: "NorthcrestPergola_v1.dwg",
    checklist: [
      { id: createId("task"), label: "Design review", complete: false },
      { id: createId("task"), label: "Material sourcing", complete: false },
      { id: createId("task"), label: "Fabrication", complete: false },
      { id: createId("task"), label: "Installation", complete: false },
    ],
    client: "Northcrest Estates",
    targetDate: "2024-08-12",
  },
];

const INITIAL_TRANSACTIONS = [
  {
    id: createId("txn"),
    date: "2024-01-15",
    description: "Lanier Residence progress payment",
    type: "income",
    amount: 18500,
    method: "ACH",
    category: "Revenue",
    reference: "Invoice 1248",
  },
  {
    id: createId("txn"),
    date: "2024-01-22",
    description: "Composite decking purchase",
    type: "expense",
    amount: 7280,
    method: "Company Card",
    category: "Materials",
    reference: "Home Depot Pro Account",
  },
  {
    id: createId("txn"),
    date: "2024-02-02",
    description: "Weekly payroll",
    type: "expense",
    amount: 54210,
    method: "ACH",
    category: "Payroll",
    reference: "Payroll batch #208",
  },
  {
    id: createId("txn"),
    date: "2024-02-09",
    description: "Harborview Marina milestone payment",
    type: "income",
    amount: 22600,
    method: "Check",
    category: "Revenue",
    reference: "Check 7421",
  },
  {
    id: createId("txn"),
    date: "2024-02-14",
    description: "Fleet fuel",
    type: "expense",
    amount: 1240,
    method: "Company Card",
    category: "Gas",
    reference: "Speedway Fleet Card",
  },
];

const INITIAL_CLIENTS = {
  active: [
    {
      id: createId("client"),
      name: "Lanier Residence",
      project: "Deck + Pergola",
      status: "On schedule",
    },
    {
      id: createId("client"),
      name: "Cityside HOA",
      project: "Perimeter Fencing",
      status: "Awaiting permits",
    },
    {
      id: createId("client"),
      name: "Harborview Marina",
      project: "Dock Renewal",
      status: "In progress",
    },
  ],
  potential: [
    {
      id: createId("client"),
      name: "Aurora Hotel Group",
      project: "Rooftop lounge + lighting",
      nextAction: "Send estimate",
    },
    {
      id: createId("client"),
      name: "Lytle Park Conservancy",
      project: "Gazebo restoration",
      nextAction: "Schedule site visit",
    },
    {
      id: createId("client"),
      name: "Northwind Apartments",
      project: "Balcony refurbishments",
      nextAction: "Upload proposal",
    },
  ],
};

const EMPLOYEE_TABS = [
  {
    id: "jobs",
    label: "Current Jobs",
    render: (user) => (
      <section className="glass-panel space-y-4">
        <header>
          <p className="text-xs uppercase tracking-[0.55em] text-blue-200/80">Assignments</p>
          <h2 className="mt-2 text-3xl font-semibold text-white">Your field timeline</h2>
          <p className="text-sm text-blue-100/80">
            Review current job sites, priorities, and the checklist of deliverables assigned to your crew.
          </p>
        </header>
        <div className="grid gap-4 lg:grid-cols-2">
          {[
            {
              job: "Riverside Deck Expansion",
              status: "Install cable railing & night lighting",
              schedule: "Today",
              location: "New Richmond, OH",
            },
            {
              job: "Walnut Hills Perimeter Fence",
              status: "Set posts 4-12 & confirm concrete cure",
              schedule: "Tomorrow",
              location: "Cincinnati, OH",
            },
          ].map((assignment) => (
            <article key={assignment.job} className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
              <h3 className="text-xl font-semibold text-white">{assignment.job}</h3>
              <p className="mt-2 text-xs uppercase tracking-[0.45em] text-blue-200/70">{assignment.schedule}</p>
              <p className="mt-3 text-sm text-blue-100/80">{assignment.status}</p>
              <p className="mt-3 text-xs text-blue-100/70">{assignment.location}</p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                {["Blueprint", "Materials", "Photos"].map((item) => (
                  <span key={item} className="rounded-full border border-white/20 bg-white/10 px-3 py-1 uppercase tracking-[0.35em]">
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    ),
  },
  {
    id: "checklists",
    label: "Checklist",
    render: () => (
      <section className="glass-panel space-y-4">
        <header>
          <p className="text-xs uppercase tracking-[0.55em] text-blue-200/80">Daily checklist</p>
          <h2 className="mt-2 text-3xl font-semibold text-white">Keep the site running smooth</h2>
          <p className="text-sm text-blue-100/80">
            Log your daily progress, upload photos, and confirm safety walk-throughs to keep admin updated in real time.
          </p>
        </header>
        <form className="space-y-4 rounded-3xl border border-white/10 bg-slate-950/70 p-6">
          <label className="flex items-center gap-3 text-sm text-blue-100/70">
            <input type="checkbox" defaultChecked className="accent-blue-400" />
            Safety tailboard reviewed
          </label>
          <label className="flex items-center gap-3 text-sm text-blue-100/70">
            <input type="checkbox" className="accent-blue-400" />
            Materials staged and counted
          </label>
          <label className="flex items-center gap-3 text-sm text-blue-100/70">
            <input type="checkbox" className="accent-blue-400" />
            Progress photos uploaded
          </label>
          <label className="flex items-center gap-3 text-sm text-blue-100/70">
            <input type="checkbox" className="accent-blue-400" />
            Jobsite secured for evening
          </label>
          <textarea
            placeholder="Add notes for admin"
            className="h-32 w-full rounded-2xl border border-white/20 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none"
          ></textarea>
          <button type="button" className="w-full rounded-2xl bg-blue-500/90 px-4 py-3 text-sm font-semibold uppercase tracking-[0.35em] text-white transition hover:bg-blue-500">
            Submit daily log
          </button>
        </form>
      </section>
    ),
  },
  {
    id: "schedule",
    label: "Schedule",
    render: () => (
      <section className="glass-panel space-y-4">
        <header>
          <p className="text-xs uppercase tracking-[0.55em] text-blue-200/80">Schedule</p>
          <h2 className="mt-2 text-3xl font-semibold text-white">Clock in, breaks, and time off</h2>
          <p className="text-sm text-blue-100/80">
            Review upcoming shifts, clock in/out, and manage time off requests directly from the field portal.
          </p>
        </header>
        <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
          <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
            <h3 className="text-xl font-semibold text-white">This week</h3>
            <ul className="mt-4 space-y-3 text-sm text-blue-100/80">
              <li>Mon • Riverside Deck • 7:00a – 3:30p</li>
              <li>Tue • Riverside Deck • 7:00a – 3:30p</li>
              <li>Wed • Walnut Hills Fence • 7:00a – 4:00p</li>
              <li>Thu • Walnut Hills Fence • 7:00a – 4:00p</li>
              <li>Fri • Shop Prep • 8:00a – 1:00p</li>
            </ul>
          </div>
          <form className="space-y-3 rounded-3xl border border-white/10 bg-slate-950/70 p-6">
            <button type="button" className="w-full rounded-2xl bg-emerald-500/90 px-4 py-3 text-sm font-semibold uppercase tracking-[0.35em] text-white transition hover:bg-emerald-500">
              Clock in
            </button>
            <button type="button" className="w-full rounded-2xl bg-amber-500/90 px-4 py-3 text-sm font-semibold uppercase tracking-[0.35em] text-white transition hover:bg-amber-500">
              Start break
            </button>
            <label className="block text-xs uppercase tracking-[0.35em] text-blue-100/80">
              Request time off
              <input type="date" className="mt-2 w-full rounded-2xl border border-white/20 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none" />
            </label>
            <textarea
              placeholder="Reason or notes"
              className="h-24 w-full rounded-2xl border border-white/20 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none"
            ></textarea>
            <button type="button" className="w-full rounded-2xl bg-blue-500/90 px-4 py-3 text-sm font-semibold uppercase tracking-[0.35em] text-white transition hover:bg-blue-500">
              Submit request
            </button>
          </form>
        </div>
      </section>
    ),
  },
  {
    id: "feedback",
    label: "Feedback",
    render: () => (
      <section className="glass-panel space-y-4">
        <header>
          <p className="text-xs uppercase tracking-[0.55em] text-blue-200/80">Crew voice</p>
          <h2 className="mt-2 text-3xl font-semibold text-white">Share insights from the field</h2>
          <p className="text-sm text-blue-100/80">
            Offer observations, request materials, and highlight wins so the admin team can respond instantly.
          </p>
        </header>
        <form className="space-y-4 rounded-3xl border border-white/10 bg-slate-950/70 p-6">
          <input
            type="text"
            placeholder="Subject"
            className="w-full rounded-2xl border border-white/20 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none"
          />
          <textarea
            placeholder="Share your observations, improvements, or concerns"
            className="h-32 w-full rounded-2xl border border-white/20 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none"
          ></textarea>
          <button type="button" className="w-full rounded-2xl bg-blue-500/90 px-4 py-3 text-sm font-semibold uppercase tracking-[0.35em] text-white transition hover:bg-blue-500">
            Send feedback
          </button>
        </form>
      </section>
    ),
  },
];


const OverviewTab = ({ user, projects, employees, clients, transactions, payrollHistory, pendingReceipt, receipts }) => {
  const totalIncome = transactions.filter((txn) => txn.type === "income").reduce((sum, txn) => sum + txn.amount, 0);
  const totalExpenses = transactions.filter((txn) => txn.type === "expense").reduce((sum, txn) => sum + txn.amount, 0);
  const net = totalIncome - totalExpenses;
  const openTickets = projects.reduce(
    (count, project) => count + project.checklist.filter((item) => !item.complete).length,
    0
  );
  const latestPayroll = payrollHistory[0]?.amount ?? null;
  const pendingCount = pendingReceipt ? 1 : 0;

  const metrics = [
    {
      title: "Active Projects",
      metric: projects.length.toString(),
      delta: `${projects.filter((project) => project.percent >= 75).length} nearing completion`,
      descriptor: "Decks, fences, pergolas, docks, gazebos, roofing, painting & staining",
    },
    {
      title: "Crew Availability",
      metric: `${Math.max(60, Math.min(100, 120 - employees.length * 3))}%`,
      delta: "Optimal load",
      descriptor: `${employees.length} active teammates across W4 and W9 roles`,
    },
    {
      title: "Cash on Hand",
      metric: formatCurrency(net > 0 ? net : 418000 + net),
      delta: net >= 0 ? "↑ Healthy" : "↓ Monitor",
      descriptor: "Operating runway based on current ledger",
    },
    {
      title: "Client Pipeline",
      metric: String(clients.active.length + clients.potential.length),
      delta: `${clients.potential.length} opportunities`,
      descriptor: "Residential & commercial opportunities",
    },
    {
      title: "Open Tickets",
      metric: openTickets.toString(),
      delta: openTickets > 0 ? "Action required" : "All clear",
      descriptor: "Quality audits, material escalations, client revisions",
    },
    {
      title: "Payroll Ready",
      metric: latestPayroll ? formatCurrency(latestPayroll) : "Queued",
      delta: latestPayroll ? "Awaiting approval" : "Generate batch",
      descriptor: "Recent payroll wizard entries",
    },
  ];

  const missionLog = [
    "Pergola illumination retrofit passed inspection 2 days ahead of schedule.",
    "Vendor reconciliation complete – reclaimed $8,450 in bulk lumber credits.",
    "Three proposals awaiting executive signature. Review ready in Blueprints tab.",
    `Receipt automation processed ${receipts.length} uploads this quarter.`,
  ];

  return (
    <div className="grid gap-8 xl:grid-cols-[1.4fr_1fr]">
      <section className="glass-panel space-y-6">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.55em] text-blue-200/80">Command Bridge</p>
          <h2 className="text-3xl font-semibold text-white">Welcome back, {user.displayName}</h2>
          <p className="text-sm text-blue-100/80">
            All CreativeOps timelines are synced. Review company vitals, monitor cash flow, and deploy crews from this master console.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {metrics.map((item) => (
            <article
              key={item.title}
              className="rounded-3xl border border-white/5 bg-white/5 p-5 shadow-inner shadow-blue-900/30"
            >
              <p className="text-xs uppercase tracking-[0.4em] text-blue-200/70">{item.title}</p>
              <p className="mt-4 text-3xl font-semibold text-white">{item.metric}</p>
              <p className="mt-2 text-sm text-emerald-300/80">{item.delta}</p>
              <p className="mt-3 text-xs text-blue-100/70">{item.descriptor}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="glass-panel space-y-4">
        <div>
          <p className="text-xs uppercase tracking-[0.55em] text-blue-200/80">Mission Log</p>
          <p className="mt-2 text-sm text-blue-100/80">
            Real-time automation highlights and alerts from project telemetry and accounting feeds.
          </p>
        </div>
        <ul className="space-y-4 text-sm text-blue-100/80">
          {missionLog.map((entry) => (
            <li key={entry} className="timeline-item">
              <span className="timeline-indicator bg-emerald-400"></span>
              {entry}
            </li>
          ))}
          {pendingCount > 0 && (
            <li className="timeline-item">
              <span className="timeline-indicator bg-amber-400"></span>
              Receipt scan ready for review in Accounting Studio.
            </li>
          )}
        </ul>
      </section>
    </div>
  );
};

const EmployeesTab = ({ employees, onSave, onAdd, onUploadDocuments }) => {
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState(null);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    role: "",
    address: "",
    phone: "",
    payroll: "",
    ytd: "",
    hours: "",
  });

  const startEdit = (employee) => {
    setEditingId(employee.id);
    setDraft({ ...employee });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setDraft(null);
  };

  const saveEdit = () => {
    if (!draft) return;
    const payload = {
      ...draft,
      ytd: Number(draft.ytd) || 0,
      hours: Number(draft.hours) || 0,
    };
    onSave(draft.id, payload);
    setEditingId(null);
    setDraft(null);
  };

  const handleAdd = (event) => {
    event.preventDefault();
    if (!newEmployee.name || !newEmployee.role) return;
    onAdd({
      ...newEmployee,
      id: createId("emp"),
      ytd: Number(newEmployee.ytd) || 0,
      hours: Number(newEmployee.hours) || 0,
      documents: [],
    });
    setNewEmployee({ name: "", role: "", address: "", phone: "", payroll: "", ytd: "", hours: "" });
  };

  const handleDocumentUpload = (employeeId, files) => {
    const newDocs = Array.from(files).map((file) => file.name);
    onUploadDocuments(employeeId, newDocs);
  };

  return (
    <div className="glass-panel space-y-6">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.55em] text-blue-200/80">Roster & Compliance</p>
        <h2 className="text-3xl font-semibold text-white">Manage employees and contractors</h2>
        <p className="text-sm text-blue-100/80">
          Securely organize personnel data, documents, and payroll records for W4 and W9 team members.
        </p>
      </header>
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-950/70">
        <table className="min-w-full divide-y divide-white/10 text-left text-sm text-blue-100/80">
          <thead className="bg-white/5 text-xs uppercase tracking-[0.35em] text-blue-200/70">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Address</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Payroll</th>
              <th className="px-4 py-3">YTD</th>
              <th className="px-4 py-3">Hours</th>
              <th className="px-4 py-3">Documents</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {employees.map((person) => {
              const isEditing = editingId === person.id;
              return (
                <tr key={person.id}>
                  <td className="px-4 py-3 text-white">
                    {isEditing ? (
                      <input
                        value={draft?.name ?? ""}
                        onChange={(event) => setDraft((prev) => ({ ...prev, name: event.target.value }))}
                        className="w-full rounded-xl border border-white/20 bg-slate-950/70 px-2 py-2 text-sm text-white outline-none"
                      />
                    ) : (
                      person.name
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {isEditing ? (
                      <input
                        value={draft?.role ?? ""}
                        onChange={(event) => setDraft((prev) => ({ ...prev, role: event.target.value }))}
                        className="w-full rounded-xl border border-white/20 bg-slate-950/70 px-2 py-2 text-sm text-white outline-none"
                      />
                    ) : (
                      person.role
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {isEditing ? (
                      <input
                        value={draft?.address ?? ""}
                        onChange={(event) => setDraft((prev) => ({ ...prev, address: event.target.value }))}
                        className="w-full rounded-xl border border-white/20 bg-slate-950/70 px-2 py-2 text-sm text-white outline-none"
                      />
                    ) : (
                      person.address
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {isEditing ? (
                      <input
                        value={draft?.phone ?? ""}
                        onChange={(event) => setDraft((prev) => ({ ...prev, phone: event.target.value }))}
                        className="w-full rounded-xl border border-white/20 bg-slate-950/70 px-2 py-2 text-sm text-white outline-none"
                      />
                    ) : (
                      person.phone
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {isEditing ? (
                      <input
                        value={draft?.payroll ?? ""}
                        onChange={(event) => setDraft((prev) => ({ ...prev, payroll: event.target.value }))}
                        className="w-full rounded-xl border border-white/20 bg-slate-950/70 px-2 py-2 text-sm text-white outline-none"
                      />
                    ) : (
                      person.payroll
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {isEditing ? (
                      <input
                        type="number"
                        value={draft?.ytd ?? ""}
                        onChange={(event) => setDraft((prev) => ({ ...prev, ytd: event.target.value }))}
                        className="w-full rounded-xl border border-white/20 bg-slate-950/70 px-2 py-2 text-sm text-white outline-none"
                      />
                    ) : (
                      formatCurrency(person.ytd)
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {isEditing ? (
                      <input
                        type="number"
                        value={draft?.hours ?? ""}
                        onChange={(event) => setDraft((prev) => ({ ...prev, hours: event.target.value }))}
                        className="w-full rounded-xl border border-white/20 bg-slate-950/70 px-2 py-2 text-sm text-white outline-none"
                      />
                    ) : (
                      person.hours
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      {person.documents.map((doc) => (
                        <span
                          key={doc}
                          className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.3em]"
                        >
                          {doc}
                        </span>
                      ))}
                    </div>
                    <label className="mt-3 inline-flex cursor-pointer items-center gap-2 text-xs text-blue-100/80">
                      <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1">Upload</span>
                      <input
                        type="file"
                        className="hidden"
                        multiple
                        onChange={(event) => handleDocumentUpload(person.id, event.target.files)}
                      />
                    </label>
                  </td>
                  <td className="px-4 py-3">
                    {isEditing ? (
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          className="rounded-full border border-emerald-400/50 bg-emerald-500/20 px-3 py-1 text-xs uppercase tracking-[0.3em] text-emerald-200"
                          onClick={saveEdit}
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.3em]"
                          onClick={cancelEdit}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.3em]"
                        onClick={() => startEdit(person)}
                      >
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <form onSubmit={handleAdd} className="space-y-4 rounded-3xl border border-white/10 bg-slate-950/70 p-6">
        <p className="text-xs uppercase tracking-[0.45em] text-blue-200/70">Add team member</p>
        <div className="grid gap-4 md:grid-cols-2">
          <input
            value={newEmployee.name}
            onChange={(event) => setNewEmployee((prev) => ({ ...prev, name: event.target.value }))}
            placeholder="Full name"
            className="rounded-2xl border border-white/20 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none"
          />
          <input
            value={newEmployee.role}
            onChange={(event) => setNewEmployee((prev) => ({ ...prev, role: event.target.value }))}
            placeholder="Role"
            className="rounded-2xl border border-white/20 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none"
          />
          <input
            value={newEmployee.address}
            onChange={(event) => setNewEmployee((prev) => ({ ...prev, address: event.target.value }))}
            placeholder="Address"
            className="rounded-2xl border border-white/20 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none"
          />
          <input
            value={newEmployee.phone}
            onChange={(event) => setNewEmployee((prev) => ({ ...prev, phone: event.target.value }))}
            placeholder="Phone"
            className="rounded-2xl border border-white/20 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none"
          />
          <input
            value={newEmployee.payroll}
            onChange={(event) => setNewEmployee((prev) => ({ ...prev, payroll: event.target.value }))}
            placeholder="Payroll"
            className="rounded-2xl border border-white/20 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none"
          />
          <input
            type="number"
            value={newEmployee.ytd}
            onChange={(event) => setNewEmployee((prev) => ({ ...prev, ytd: event.target.value }))}
            placeholder="YTD"
            className="rounded-2xl border border-white/20 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none"
          />
          <input
            type="number"
            value={newEmployee.hours}
            onChange={(event) => setNewEmployee((prev) => ({ ...prev, hours: event.target.value }))}
            placeholder="Hours"
            className="rounded-2xl border border-white/20 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-2xl bg-blue-500/90 px-4 py-3 text-sm font-semibold uppercase tracking-[0.4em] text-white transition hover:bg-blue-500"
        >
          Add teammate
        </button>
      </form>
    </div>
  );
};

const PayrollTab = ({ employees, payrollHistory, onSchedule }) => {
  const [form, setForm] = useState({ employeeId: employees[0]?.id ?? "", amount: "", method: PAYMENT_METHODS[0], memo: "" });

  useEffect(() => {
    if (!form.employeeId && employees.length > 0) {
      setForm((prev) => ({ ...prev, employeeId: employees[0].id }));
    }
  }, [employees, form.employeeId]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.employeeId || !form.amount) return;
    const employee = employees.find((item) => item.id === form.employeeId);
    onSchedule({
      id: createId("pay"),
      employeeId: form.employeeId,
      employeeName: employee?.name ?? "Team Member",
      amount: Number(form.amount) || 0,
      method: form.method,
      memo: form.memo,
      createdAt: new Date().toISOString(),
    });
    setForm((prev) => ({ ...prev, amount: "", memo: "" }));
  };

  return (
    <div className="glass-panel space-y-6">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.55em] text-blue-200/80">Compensation Control</p>
        <h2 className="text-3xl font-semibold text-white">Disburse payroll & taxes securely</h2>
        <p className="text-sm text-blue-100/80">
          Issue payments via Cash App, Venmo, PayPal, Chime, Zelle, ACH transfer, or paper check with multi-step confirmations and encryption.
        </p>
      </header>
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <section className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-inner shadow-blue-900/30">
          <p className="text-xs uppercase tracking-[0.45em] text-blue-200/70">Payroll Wizard</p>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <label className="block text-xs uppercase tracking-[0.35em] text-blue-100/80">
              Select teammate
              <select
                value={form.employeeId}
                onChange={(event) => setForm((prev) => ({ ...prev, employeeId: event.target.value }))}
                className="mt-2 w-full rounded-2xl border border-white/20 bg-slate-950/70 px-4 py-3 text-sm text-white shadow-inner shadow-blue-900/40 outline-none"
              >
                {employees.map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-xs uppercase tracking-[0.35em] text-blue-100/80">
              Amount
              <input
                type="number"
                min="0"
                step="0.01"
                value={form.amount}
                onChange={(event) => setForm((prev) => ({ ...prev, amount: event.target.value }))}
                placeholder="Enter amount"
                className="mt-2 w-full rounded-2xl border border-white/20 bg-slate-950/70 px-4 py-3 text-sm text-white shadow-inner shadow-blue-900/40 outline-none"
              />
            </label>
            <label className="block text-xs uppercase tracking-[0.35em] text-blue-100/80">
              Payment method
              <select
                value={form.method}
                onChange={(event) => setForm((prev) => ({ ...prev, method: event.target.value }))}
                className="mt-2 w-full rounded-2xl border border-white/20 bg-slate-950/70 px-4 py-3 text-sm text-white shadow-inner shadow-blue-900/40 outline-none"
              >
                {PAYMENT_METHODS.map((method) => (
                  <option key={method} value={method}>
                    {method}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-xs uppercase tracking-[0.35em] text-blue-100/80">
              Notes
              <input
                type="text"
                value={form.memo}
                onChange={(event) => setForm((prev) => ({ ...prev, memo: event.target.value }))}
                placeholder="Add memo"
                className="mt-2 w-full rounded-2xl border border-white/20 bg-slate-950/70 px-4 py-3 text-sm text-white shadow-inner shadow-blue-900/40 outline-none"
              />
            </label>
            <button
              type="submit"
              className="w-full rounded-2xl bg-blue-500/90 px-4 py-3 text-sm font-semibold uppercase tracking-[0.4em] text-white transition hover:bg-blue-500"
            >
              Continue to confirmation
            </button>
          </form>
        </section>
        <aside className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
          <p className="text-xs uppercase tracking-[0.45em] text-blue-200/70">Security controls</p>
          <ul className="mt-4 space-y-4 text-xs text-blue-100/70">
            <li>• Multi-factor approval required for transfers over $5,000.</li>
            <li>• Encryption at rest for banking and routing information.</li>
            <li>• Audit trail of every payment step stored in immutable ledger.</li>
            <li>• Role-based access restricted to admin accounts.</li>
          </ul>
          {payrollHistory.length > 0 && (
            <div className="mt-6 space-y-3 text-xs text-blue-100/70">
              <p className="text-xs uppercase tracking-[0.35em] text-blue-200/70">Recent payroll</p>
              <ul className="space-y-2">
                {payrollHistory.slice(0, 3).map((entry) => (
                  <li key={entry.id} className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
                    <p className="font-semibold text-white">{entry.employeeName}</p>
                    <p>{formatCurrency(entry.amount)} • {entry.method}</p>
                    <p className="text-[0.65rem] uppercase tracking-[0.3em] text-blue-100/60">
                      {new Date(entry.createdAt).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};

const ProjectsTab = ({ projects, onUpdate, onAdd }) => {
  const [newProject, setNewProject] = useState({
    name: "",
    status: "Planning",
    blueprint: "",
    client: "",
    targetDate: "",
  });

  const handleChecklistToggle = (projectId, taskId) => {
    onUpdate(projectId, (project) => ({
      ...project,
      checklist: project.checklist.map((task) =>
        task.id === taskId ? { ...task, complete: !task.complete } : task
      ),
    }));
  };

  const handlePercentChange = (projectId, value) => {
    onUpdate(projectId, (project) => ({ ...project, percent: Number(value) }));
  };

  const handleStatusChange = (projectId, value) => {
    onUpdate(projectId, (project) => ({ ...project, status: value }));
  };

  const handleAddProject = (event) => {
    event.preventDefault();
    if (!newProject.name) return;
    onAdd({
      id: createId("proj"),
      name: newProject.name,
      percent: 0,
      status: newProject.status,
      blueprint: newProject.blueprint || "NewProject.pdf",
      client: newProject.client || "New Client",
      targetDate: newProject.targetDate || new Date().toISOString().slice(0, 10),
      checklist: [
        { id: createId("task"), label: "Design review", complete: false },
        { id: createId("task"), label: "Materials staged", complete: false },
        { id: createId("task"), label: "Install", complete: false },
        { id: createId("task"), label: "Punch list", complete: false },
      ],
    });
    setNewProject({ name: "", status: "Planning", blueprint: "", client: "", targetDate: "" });
  };

  const statusOptions = ["Planning", "Design approvals", "Materials en route", "In progress", "Awaiting punch list", "On schedule"];

  return (
    <div className="glass-panel space-y-6">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.55em] text-blue-200/80">Project Status</p>
        <h2 className="text-3xl font-semibold text-white">Monitor execution, blueprints & milestones</h2>
        <p className="text-sm text-blue-100/80">
          Track progress, upload blueprints, and oversee completion percentages across the entire build portfolio.
        </p>
      </header>
      <div className="grid gap-6 lg:grid-cols-2">
        {projects.map((project) => (
          <article key={project.id} className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold text-white">{project.name}</h3>
                <p className="mt-1 text-xs uppercase tracking-[0.4em] text-blue-200/70">{project.client}</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <input
                  type="number"
                  value={project.percent}
                  onChange={(event) => handlePercentChange(project.id, event.target.value)}
                  className="w-20 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-center text-sm text-white outline-none"
                />
                <span className="text-xs uppercase tracking-[0.35em] text-blue-100/70">Progress %</span>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2 text-xs text-blue-100/70">
              <label className="flex items-center gap-2">
                <span>Status:</span>
                <select
                  value={project.status}
                  onChange={(event) => handleStatusChange(project.id, event.target.value)}
                  className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-white outline-none"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </label>
              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1">Blueprint: {project.blueprint}</span>
              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1">Due {project.targetDate}</span>
            </div>
            <div className="mt-5 space-y-3 text-xs text-blue-100/70">
              <ul className="grid gap-2 sm:grid-cols-2">
                {project.checklist.map((item) => (
                  <li key={item.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={item.complete}
                      onChange={() => handleChecklistToggle(project.id, item.id)}
                      className="accent-blue-400"
                    />
                    <span className={item.complete ? "text-emerald-300" : ""}>{item.label}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-4 flex flex-wrap gap-2 text-xs text-blue-100/70">
              <button className="rounded-full border border-white/20 bg-white/10 px-3 py-1">Upload blueprint</button>
              <button className="rounded-full border border-white/20 bg-white/10 px-3 py-1">Assign crew</button>
            </div>
          </article>
        ))}
      </div>
      <form onSubmit={handleAddProject} className="space-y-4 rounded-3xl border border-white/10 bg-slate-950/70 p-6">
        <p className="text-xs uppercase tracking-[0.45em] text-blue-200/70">Add project</p>
        <div className="grid gap-4 md:grid-cols-2">
          <input
            value={newProject.name}
            onChange={(event) => setNewProject((prev) => ({ ...prev, name: event.target.value }))}
            placeholder="Project name"
            className="rounded-2xl border border-white/20 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none"
          />
          <input
            value={newProject.client}
            onChange={(event) => setNewProject((prev) => ({ ...prev, client: event.target.value }))}
            placeholder="Client"
            className="rounded-2xl border border-white/20 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none"
          />
          <select
            value={newProject.status}
            onChange={(event) => setNewProject((prev) => ({ ...prev, status: event.target.value }))}
            className="rounded-2xl border border-white/20 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none"
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <input
            value={newProject.blueprint}
            onChange={(event) => setNewProject((prev) => ({ ...prev, blueprint: event.target.value }))}
            placeholder="Blueprint file"
            className="rounded-2xl border border-white/20 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none"
          />
          <input
            type="date"
            value={newProject.targetDate}
            onChange={(event) => setNewProject((prev) => ({ ...prev, targetDate: event.target.value }))}
            className="rounded-2xl border border-white/20 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-2xl bg-blue-500/90 px-4 py-3 text-sm font-semibold uppercase tracking-[0.4em] text-white transition hover:bg-blue-500"
        >
          Add project
        </button>
      </form>
    </div>
  );
};


const FinanceTab = ({ transactions, onUpdate, onAdd }) => {
  const [newTransaction, setNewTransaction] = useState({
    date: new Date().toISOString().slice(0, 10),
    description: "",
    type: "expense",
    amount: "",
    method: PAYMENT_METHODS[0],
    category: EXPENSE_CATEGORIES[0],
    reference: "",
  });

  const totals = useMemo(() => {
    return transactions.reduce(
      (acc, transaction) => {
        const amount = Number(transaction.amount) || 0;
        if (transaction.type === "income") {
          acc.income += amount;
        } else {
          acc.expense += amount;
        }
        acc.byCategory[transaction.category] =
          (acc.byCategory[transaction.category] ?? 0) + (transaction.type === "income" ? amount : -amount);
        return acc;
      },
      { income: 0, expense: 0, byCategory: {} }
    );
  }, [transactions]);

  const handleInlineUpdate = (transactionId, field, value) => {
    onUpdate(transactionId, (transaction) => ({ ...transaction, [field]: field === "amount" ? Number(value) : value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!newTransaction.description || !newTransaction.amount) return;
    onAdd({
      ...newTransaction,
      id: createId("txn"),
      amount: Number(newTransaction.amount),
    });
    setNewTransaction({
      date: new Date().toISOString().slice(0, 10),
      description: "",
      type: "expense",
      amount: "",
      method: PAYMENT_METHODS[0],
      category: EXPENSE_CATEGORIES[0],
      reference: "",
    });
  };

  return (
    <div className="glass-panel space-y-6">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.55em] text-blue-200/80">Accounting & Cash Flow</p>
        <h2 className="text-3xl font-semibold text-white">Keep CreativeOps financially aligned</h2>
        <p className="text-sm text-blue-100/80">
          Manage income, expenses, ACH transfers, and forecasting from a single control center.
        </p>
      </header>
      <section className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
        <div className="grid gap-4 md:grid-cols-3">
          <article className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-[0.4em] text-blue-200/70">Year-to-date income</p>
            <p className="mt-4 text-2xl font-semibold text-white">{formatCurrency(totals.income)}</p>
          </article>
          <article className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-[0.4em] text-blue-200/70">Year-to-date expenses</p>
            <p className="mt-4 text-2xl font-semibold text-white">{formatCurrency(totals.expense)}</p>
          </article>
          <article className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-[0.4em] text-blue-200/70">Net position</p>
            <p className="mt-4 text-2xl font-semibold text-white">{formatCurrency(totals.income - totals.expense)}</p>
          </article>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {Object.entries(totals.byCategory).map(([category, amount]) => (
            <div key={category} className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-blue-100/80">
              <p className="text-xs uppercase tracking-[0.35em] text-blue-200/70">{category}</p>
              <p className={`mt-2 text-xl font-semibold ${amount >= 0 ? "text-emerald-300" : "text-rose-300"}`}>
                {formatCurrency(amount)}
              </p>
            </div>
          ))}
        </div>
      </section>
      <section className="rounded-3xl border border-white/10 bg-slate-950/70">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/10 text-left text-sm text-blue-100/80">
            <thead className="bg-white/5 text-xs uppercase tracking-[0.35em] text-blue-200/70">
              <tr>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Method</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Reference</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="px-4 py-3 text-white">
                    <input
                      type="date"
                      value={transaction.date}
                      onChange={(event) => handleInlineUpdate(transaction.id, "date", event.target.value)}
                      className="rounded-xl border border-white/20 bg-slate-950/70 px-2 py-1 text-sm text-white outline-none"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      value={transaction.description}
                      onChange={(event) => handleInlineUpdate(transaction.id, "description", event.target.value)}
                      className="w-full rounded-xl border border-white/20 bg-slate-950/70 px-2 py-1 text-sm text-white outline-none"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={transaction.type}
                      onChange={(event) => handleInlineUpdate(transaction.id, "type", event.target.value)}
                      className="rounded-xl border border-white/20 bg-slate-950/70 px-2 py-1 text-sm text-white outline-none"
                    >
                      <option value="income">Income</option>
                      <option value="expense">Expense</option>
                    </select>
                  </td>
                  <td className="px-4 py-3 text-white">
                    <input
                      type="number"
                      value={transaction.amount}
                      onChange={(event) => handleInlineUpdate(transaction.id, "amount", event.target.value)}
                      className="w-32 rounded-xl border border-white/20 bg-slate-950/70 px-2 py-1 text-sm text-white outline-none"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={transaction.method}
                      onChange={(event) => handleInlineUpdate(transaction.id, "method", event.target.value)}
                      className="rounded-xl border border-white/20 bg-slate-950/70 px-2 py-1 text-sm text-white outline-none"
                    >
                      {PAYMENT_METHODS.map((method) => (
                        <option key={method} value={method}>
                          {method}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={transaction.category}
                      onChange={(event) => handleInlineUpdate(transaction.id, "category", event.target.value)}
                      className="rounded-xl border border-white/20 bg-slate-950/70 px-2 py-1 text-sm text-white outline-none"
                    >
                      {["Revenue", ...EXPENSE_CATEGORIES].map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <input
                      value={transaction.reference}
                      onChange={(event) => handleInlineUpdate(transaction.id, "reference", event.target.value)}
                      className="w-full rounded-xl border border-white/20 bg-slate-950/70 px-2 py-1 text-sm text-white outline-none"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <form onSubmit={handleSubmit} className="space-y-4 rounded-3xl border border-white/10 bg-slate-950/70 p-6">
        <p className="text-xs uppercase tracking-[0.45em] text-blue-200/70">Record transaction</p>
        <div className="grid gap-4 md:grid-cols-2">
          <input
            type="date"
            value={newTransaction.date}
            onChange={(event) => setNewTransaction((prev) => ({ ...prev, date: event.target.value }))}
            className="rounded-2xl border border-white/20 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none"
          />
          <input
            value={newTransaction.description}
            onChange={(event) => setNewTransaction((prev) => ({ ...prev, description: event.target.value }))}
            placeholder="Description"
            className="rounded-2xl border border-white/20 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none"
          />
          <select
            value={newTransaction.type}
            onChange={(event) => setNewTransaction((prev) => ({ ...prev, type: event.target.value }))}
            className="rounded-2xl border border-white/20 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <input
            type="number"
            value={newTransaction.amount}
            onChange={(event) => setNewTransaction((prev) => ({ ...prev, amount: event.target.value }))}
            placeholder="Amount"
            className="rounded-2xl border border-white/20 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none"
          />
          <select
            value={newTransaction.method}
            onChange={(event) => setNewTransaction((prev) => ({ ...prev, method: event.target.value }))}
            className="rounded-2xl border border-white/20 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none"
          >
            {PAYMENT_METHODS.map((method) => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </select>
          <select
            value={newTransaction.category}
            onChange={(event) => setNewTransaction((prev) => ({ ...prev, category: event.target.value }))}
            className="rounded-2xl border border-white/20 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none"
          >
            {["Revenue", ...EXPENSE_CATEGORIES].map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <input
            value={newTransaction.reference}
            onChange={(event) => setNewTransaction((prev) => ({ ...prev, reference: event.target.value }))}
            placeholder="Reference"
            className="rounded-2xl border border-white/20 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-2xl bg-blue-500/90 px-4 py-3 text-sm font-semibold uppercase tracking-[0.4em] text-white transition hover:bg-blue-500"
        >
          Log transaction
        </button>
      </form>
    </div>
  );
};

const ReceiptCaptureTab = ({ pendingReceipt, onUpload, onUpdatePending, onConfirmReceipt, onDiscard, history }) => {
  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      onUpload(file);
    }
    event.target.value = "";
  };

  const hasPending = Boolean(pendingReceipt);
  const isProcessing = pendingReceipt?.status === "processing";

  return (
    <div className="glass-panel space-y-6">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.55em] text-blue-200/80">Receipts & OCR</p>
        <h2 className="text-3xl font-semibold text-white">Capture, categorize, and sync receipts</h2>
        <p className="text-sm text-blue-100/80">
          Open your device camera, scan receipts, and let CreativeOps auto-fill vendor, amount, payment method, and tax categories.
        </p>
      </header>
      <section className="space-y-4 rounded-3xl border border-white/10 bg-slate-950/70 p-6">
        <label className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-white/20 bg-white/5 p-8 text-center text-sm text-blue-100/80">
          <span className="text-lg font-semibold text-white">Tap to capture or upload receipt</span>
          <span className="text-xs uppercase tracking-[0.35em]">Camera & image library supported</span>
          <input type="file" accept="image/*" capture="environment" className="hidden" onChange={handleFileChange} />
        </label>
        {hasPending && (
          <div className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
              {pendingReceipt.previewUrl && (
                <img
                  src={pendingReceipt.previewUrl}
                  alt={pendingReceipt.fileName}
                  className="h-48 w-full rounded-2xl object-cover"
                />
              )}
              <div className="space-y-3 text-sm text-blue-100/80">
                <p className="text-xs uppercase tracking-[0.4em] text-blue-200/70">
                  {isProcessing ? "Analyzing receipt..." : "Edit detected fields"}
                </p>
                <div className="grid gap-3 md:grid-cols-2">
                  <input
                    value={pendingReceipt.vendor}
                    onChange={(event) => onUpdatePending({ vendor: event.target.value })}
                    placeholder="Vendor"
                    className="rounded-2xl border border-white/20 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none"
                  />
                  <input
                    value={pendingReceipt.amount}
                    onChange={(event) => onUpdatePending({ amount: event.target.value })}
                    placeholder="Amount"
                    type="number"
                    className="rounded-2xl border border-white/20 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none"
                  />
                  <select
                    value={pendingReceipt.category}
                    onChange={(event) => onUpdatePending({ category: event.target.value })}
                    className="rounded-2xl border border-white/20 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none"
                  >
                    {EXPENSE_CATEGORIES.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  <select
                    value={pendingReceipt.method}
                    onChange={(event) => onUpdatePending({ method: event.target.value })}
                    className="rounded-2xl border border-white/20 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none"
                  >
                    {PAYMENT_METHODS.map((method) => (
                      <option key={method} value={method}>
                        {method}
                      </option>
                    ))}
                  </select>
                  <input
                    value={pendingReceipt.reference}
                    onChange={(event) => onUpdatePending({ reference: event.target.value })}
                    placeholder="Reference"
                    className="rounded-2xl border border-white/20 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none"
                  />
                  <input
                    value={pendingReceipt.notes}
                    onChange={(event) => onUpdatePending({ notes: event.target.value })}
                    placeholder="Notes"
                    className="rounded-2xl border border-white/20 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-wrap justify-end gap-3">
              <button
                type="button"
                onClick={onDiscard}
                className="rounded-2xl border border-white/20 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.35em] text-white"
              >
                Discard
              </button>
              <button
                type="button"
                disabled={isProcessing}
                onClick={() => onConfirmReceipt(pendingReceipt)}
                className={`rounded-2xl px-4 py-2 text-xs uppercase tracking-[0.35em] ${
                  isProcessing ? "bg-blue-500/30" : "bg-blue-500/90 hover:bg-blue-500"
                } text-white`}
              >
                {isProcessing ? "Scanning..." : "Confirm & log expense"}
              </button>
            </div>
          </div>
        )}
      </section>
      {history.length > 0 && (
        <section className="space-y-4 rounded-3xl border border-white/10 bg-slate-950/70 p-6">
          <p className="text-xs uppercase tracking-[0.45em] text-blue-200/70">Processed receipts</p>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {history.map((receipt) => (
              <article key={receipt.id} className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-blue-100/80">
                {receipt.previewUrl && (
                  <img src={receipt.previewUrl} alt={receipt.vendor} className="mb-3 h-32 w-full rounded-2xl object-cover" />
                )}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-white">{receipt.vendor}</h3>
                  <p>{formatCurrency(receipt.amount)} • {receipt.category}</p>
                  <p className="text-xs uppercase tracking-[0.35em] text-blue-200/70">{receipt.method}</p>
                  <p className="text-xs text-blue-100/70">{receipt.notes}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

const ClientsTab = ({ clients, onAddClient, onUpdateClient }) => {
  const [newActive, setNewActive] = useState({ name: "", project: "", status: "On schedule" });
  const [newPotential, setNewPotential] = useState({ name: "", project: "", nextAction: "Send estimate" });
  const statusOptions = ["On schedule", "Awaiting permits", "In progress", "Paused", "Completed"];
  const nextActions = ["Send estimate", "Schedule site visit", "Upload proposal", "Follow up call", "Archive lead"];

  const handleActiveSubmit = (event) => {
    event.preventDefault();
    if (!newActive.name) return;
    onAddClient("active", newActive);
    setNewActive({ name: "", project: "", status: "On schedule" });
  };

  const handlePotentialSubmit = (event) => {
    event.preventDefault();
    if (!newPotential.name) return;
    onAddClient("potential", newPotential);
    setNewPotential({ name: "", project: "", nextAction: "Send estimate" });
  };

  return (
    <div className="glass-panel space-y-6">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.55em] text-blue-200/80">Client Success</p>
        <h2 className="text-3xl font-semibold text-white">Nurture relationships & new opportunities</h2>
        <p className="text-sm text-blue-100/80">
          Manage proposals, schedules, and client communications. Track potential clients alongside active engagements.
        </p>
      </header>
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="space-y-4 rounded-3xl border border-white/10 bg-slate-950/70 p-6">
          <h3 className="text-xl font-semibold text-white">Active Clients</h3>
          <ul className="space-y-3 text-sm text-blue-100/80">
            {clients.active.map((client) => (
              <li key={client.id} className="client-card">
                <div>
                  <p className="font-semibold text-white">{client.name}</p>
                  <p className="text-xs uppercase tracking-[0.35em]">{client.project}</p>
                </div>
                <select
                  value={client.status}
                  onChange={(event) => onUpdateClient("active", client.id, { status: event.target.value })}
                  className="status-pill bg-white/10 text-white"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </li>
            ))}
          </ul>
        </section>
        <section className="space-y-4 rounded-3xl border border-white/10 bg-slate-950/70 p-6">
          <h3 className="text-xl font-semibold text-white">Potential Clients</h3>
          <ul className="space-y-3 text-sm text-blue-100/80">
            {clients.potential.map((client) => (
              <li key={client.id} className="client-card">
                <div>
                  <p className="font-semibold text-white">{client.name}</p>
                  <p className="text-xs uppercase tracking-[0.35em]">{client.project}</p>
                </div>
                <select
                  value={client.nextAction}
                  onChange={(event) => onUpdateClient("potential", client.id, { nextAction: event.target.value })}
                  className="status-pill bg-white/10 text-white"
                >
                  {nextActions.map((action) => (
                    <option key={action} value={action}>
                      {action}
                    </option>
                  ))}
                </select>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <form onSubmit={handleActiveSubmit} className="space-y-4 rounded-3xl border border-white/10 bg-slate-950/70 p-6">
          <p className="text-xs uppercase tracking-[0.45em] text-blue-200/70">Add active client</p>
          <input
            value={newActive.name}
            onChange={(event) => setNewActive((prev) => ({ ...prev, name: event.target.value }))}
            placeholder="Client name"
            className="rounded-2xl border border-white/20 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none"
          />
          <input
            value={newActive.project}
            onChange={(event) => setNewActive((prev) => ({ ...prev, project: event.target.value }))}
            placeholder="Project"
            className="rounded-2xl border border-white/20 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none"
          />
          <select
            value={newActive.status}
            onChange={(event) => setNewActive((prev) => ({ ...prev, status: event.target.value }))}
            className="rounded-2xl border border-white/20 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none"
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="w-full rounded-2xl bg-blue-500/90 px-4 py-3 text-sm font-semibold uppercase tracking-[0.4em] text-white transition hover:bg-blue-500"
          >
            Add client
          </button>
        </form>
        <form onSubmit={handlePotentialSubmit} className="space-y-4 rounded-3xl border border-white/10 bg-slate-950/70 p-6">
          <p className="text-xs uppercase tracking-[0.45em] text-blue-200/70">Add potential client</p>
          <input
            value={newPotential.name}
            onChange={(event) => setNewPotential((prev) => ({ ...prev, name: event.target.value }))}
            placeholder="Client name"
            className="rounded-2xl border border-white/20 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none"
          />
          <input
            value={newPotential.project}
            onChange={(event) => setNewPotential((prev) => ({ ...prev, project: event.target.value }))}
            placeholder="Project"
            className="rounded-2xl border border-white/20 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none"
          />
          <select
            value={newPotential.nextAction}
            onChange={(event) => setNewPotential((prev) => ({ ...prev, nextAction: event.target.value }))}
            className="rounded-2xl border border-white/20 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none"
          >
            {nextActions.map((action) => (
              <option key={action} value={action}>
                {action}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="w-full rounded-2xl bg-blue-500/90 px-4 py-3 text-sm font-semibold uppercase tracking-[0.4em] text-white transition hover:bg-blue-500"
          >
            Add lead
          </button>
        </form>
      </div>
    </div>
  );
};


const generateAssistantResponse = (prompt, { ledger, projects, employees }) => {
  const lower = prompt.toLowerCase();
  const totalIncome = ledger.filter((txn) => txn.type === "income").reduce((sum, txn) => sum + txn.amount, 0);
  const totalExpenses = ledger.filter((txn) => txn.type === "expense").reduce((sum, txn) => sum + txn.amount, 0);
  const net = totalIncome - totalExpenses;
  const activeProjects = projects.filter((project) => project.percent < 100).length;
  const crewCount = employees.length;

  const responses = [];

  if (lower.includes("quarter") || lower.includes("tax")) {
    responses.push(
      `For quarterly filings, reconcile revenue of ${formatCurrency(totalIncome)} against expenses of ${formatCurrency(totalExpenses)}. Use the Finance tab export to populate Schedule C categories, then submit payroll tax deposits for ${crewCount} active teammates.`
    );
  }

  if (lower.includes("cash flow") || lower.includes("income") || lower.includes("expense")) {
    responses.push(
      `Current net position sits at ${formatCurrency(net)}. Consider accelerating invoices on projects beyond 75% complete and review ACH disbursements scheduled in the Payroll tab before month end.`
    );
  }

  if (lower.includes("payroll") || lower.includes("w4") || lower.includes("w9")) {
    responses.push(
      `There are ${crewCount} rostered teammates. Run the Payroll wizard, confirm deductions, and archive receipt confirmations so every payment method (ACH, app pay, or paper check) stays audit ready.`
    );
  }

  if (lower.includes("project") || lower.includes("schedule") || lower.includes("progress")) {
    responses.push(
      `${activeProjects} projects are in motion. Prioritize checklist items flagged as incomplete, upload revised blueprints, and assign crews directly from the Projects command center.`
    );
  }

  if (responses.length === 0) {
    responses.push(
      "I can help draft policies, outline cash-flow steps, or walk you through payroll approvals. Ask about receipts, taxes, or scheduling for tailored guidance."
    );
  }

  return responses.join("\n\n");
};

const AssistantTab = ({ ledger, projects, employees }) => {
  const [messages, setMessages] = useState([
    {
      id: createId("msg"),
      author: "assistant",
      content:
        "Hi Stacy! I'm your CreativeOps copilot. Ask about cash flow, payroll steps, or quarterly filings and I'll map out the process using your live data.",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [question, setQuestion] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!question.trim()) return;
    const userMessage = {
      id: createId("msg"),
      author: "user",
      content: question.trim(),
      timestamp: new Date().toISOString(),
    };
    const assistantMessage = {
      id: createId("msg"),
      author: "assistant",
      content: generateAssistantResponse(question.trim(), { ledger, projects, employees }),
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    setQuestion("");
  };

  return (
    <div className="glass-panel space-y-6">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.55em] text-blue-200/80">CreativeOps Copilot</p>
        <h2 className="text-3xl font-semibold text-white">Ask for guidance any time</h2>
        <p className="text-sm text-blue-100/80">
          Use conversational prompts to get coaching on payroll, accounting, project planning, and compliance workflows.
        </p>
      </header>
      <section className="space-y-4 rounded-3xl border border-white/10 bg-slate-950/70 p-6">
        <div className="max-h-96 space-y-3 overflow-y-auto pr-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`rounded-2xl border px-4 py-3 text-sm ${
                message.author === "assistant"
                  ? "border-blue-500/40 bg-blue-500/10 text-blue-100/90"
                  : "border-white/10 bg-white/10 text-white"
              }`}
            >
              <p className="text-xs uppercase tracking-[0.35em] text-blue-200/70">{message.author}</p>
              <p className="mt-2 whitespace-pre-wrap leading-relaxed">{message.content}</p>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <textarea
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder="Ask about quarterly taxes, payroll, scheduling, or anything else"
            className="h-28 w-full rounded-2xl border border-white/20 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none"
          ></textarea>
          <button
            type="submit"
            className="w-full rounded-2xl bg-blue-500/90 px-4 py-3 text-sm font-semibold uppercase tracking-[0.35em] text-white transition hover:bg-blue-500"
          >
            Ask CreativeOps Copilot
          </button>
        </form>
      </section>
    </div>
  );
};

const createAdminTabs = (context) => [
  {
    id: "overview",
    label: "Overview",
    render: (user) => (
      <OverviewTab
        user={user}
        projects={context.projects}
        employees={context.employees}
        clients={context.clients}
        transactions={context.transactions}
        payrollHistory={context.payrollHistory}
        pendingReceipt={context.pendingReceipt}
        receipts={context.receiptHistory}
      />
    ),
  },
  {
    id: "employees",
    label: "Employees",
    render: () => (
      <EmployeesTab
        employees={context.employees}
        onSave={context.handleEmployeeSave}
        onAdd={context.handleEmployeeAdd}
        onUploadDocuments={context.handleEmployeeDocuments}
      />
    ),
  },
  {
    id: "payroll",
    label: "Payroll",
    render: () => (
      <PayrollTab
        employees={context.employees}
        payrollHistory={context.payrollHistory}
        onSchedule={context.handlePayrollSchedule}
      />
    ),
  },
  {
    id: "projects",
    label: "Projects",
    render: () => <ProjectsTab projects={context.projects} onUpdate={context.handleProjectUpdate} onAdd={context.handleProjectAdd} />,
  },
  {
    id: "finance",
    label: "Finance",
    render: () => <FinanceTab transactions={context.transactions} onUpdate={context.handleTransactionUpdate} onAdd={context.handleTransactionAdd} />,
  },
  {
    id: "receipts",
    label: "Receipts",
    render: () => (
      <ReceiptCaptureTab
        pendingReceipt={context.pendingReceipt}
        onUpload={context.handleReceiptUpload}
        onUpdatePending={context.handlePendingReceiptUpdate}
        onConfirmReceipt={context.handleReceiptConfirm}
        onDiscard={context.handleReceiptDiscard}
        history={context.receiptHistory}
      />
    ),
  },
  {
    id: "clients",
    label: "Clients",
    render: () => <ClientsTab clients={context.clients} onAddClient={context.handleAddClient} onUpdateClient={context.handleUpdateClient} />,
  },
  {
    id: "assistant",
    label: "AI Assistant",
    render: () => <AssistantTab ledger={context.transactions} projects={context.projects} employees={context.employees} />,
  },
];

const StagePortal = ({ statusMessage, headline }) => (
  <div className="stage-warp">
    <div className="stage-warp__core">
      <div className="stage-warp__rings"></div>
      <div className="stage-warp__rings stage-warp__rings--delayed"></div>
      <div className="stage-warp__singularity"></div>
    </div>
    <div className="stage-warp__stars"></div>
    <div className="relative z-20 space-y-4 px-6 text-center">
      <p className="text-xs uppercase tracking-[0.55em] text-blue-200/80">{headline}</p>
      <p className="text-sm text-blue-100/80">{statusMessage}</p>
    </div>
  </div>
);

const WelcomeScreen = ({ onEnter, reelIndex }) => {
  const activeReel = DRONE_REEL[reelIndex % DRONE_REEL.length];

  return (
    <div className="welcome-stage">
      <div className="welcome-stage__video">
        <video key={activeReel.src} className="welcome-stage__video-el" src={activeReel.src} autoPlay muted loop playsInline />
      </div>
      <div className="welcome-stage__overlay"></div>
      <div className="welcome-stage__particles"></div>
      <header className="relative z-20 space-y-4 px-6 text-center">
        <p className="text-xs uppercase tracking-[0.6em] text-white/80">Welcome to</p>
        <h1 className="text-5xl font-semibold text-white drop-shadow-[0_25px_45px_rgba(15,23,42,0.75)]">CreativeOps</h1>
        <p className="mx-auto max-w-xl text-sm text-blue-100/85">
          Step through the CreativeOps portal to explore our construction mastery — from radiant decks to illuminated pergolas, each timeline is captured in a cinematic drone flight.
        </p>
        <p className="text-xs uppercase tracking-[0.45em] text-blue-100/70">{activeReel.caption}</p>
      </header>
      <button onClick={onEnter} className="portal-trigger" aria-label="Enter the CreativeOps portal">
        <span className="portal-trigger__spark portal-trigger__spark--primary"></span>
        <span className="portal-trigger__spark portal-trigger__spark--secondary"></span>
        <span className="portal-trigger__spark portal-trigger__spark--tertiary"></span>
        <span className="portal-trigger__core"></span>
        <span className="portal-trigger__text">Enter Portal</span>
      </button>
    </div>
  );
};

const SignInView = ({ credentials, onChange, onSubmit, onGoogle, isAuthenticating, errorMessage, accountHints }) => {
  const hasError = Boolean(errorMessage);

  return (
    <div className="signin-stage">
      <div className="signin-stage__background"></div>
      <div className="signin-stage__mesh"></div>
      <div className="signin-stage__content">
        <div className="space-y-10 rounded-[2.5rem] border border-white/10 bg-white/10 p-10 shadow-[0_50px_160px_-40px_rgba(79,70,229,0.6)] backdrop-blur-xl">
          <div className="space-y-3 text-center">
            <p className="text-xs uppercase tracking-[0.5em] text-blue-200/70">CreativeOps Portal</p>
            <h1 className="text-4xl font-semibold text-white">Step into the timewarp</h1>
            <p className="text-sm text-blue-100/80">
              Authenticate to command CreativeOps operations. Enter credentials or continue with Google.
            </p>
          </div>
          <form className="space-y-5" onSubmit={onSubmit}>
            <label className="block text-sm font-medium tracking-[0.25em] text-blue-100/80">
              Email address
              <input
                type="email"
                required
                value={credentials.email}
                onChange={(event) => onChange({ ...credentials, email: event.target.value })}
                aria-invalid={hasError}
                className={`signin-input ${hasError ? "signin-input--error" : ""}`}
                placeholder="name@company.com"
              />
            </label>
            <label className="block text-sm font-medium tracking-[0.25em] text-blue-100/80">
              Password
              <input
                type="password"
                required
                value={credentials.password}
                onChange={(event) => onChange({ ...credentials, password: event.target.value })}
                aria-invalid={hasError}
                className={`signin-input ${hasError ? "signin-input--error" : ""}`}
                placeholder="Enter your password"
              />
            </label>
            {hasError && (
              <p className="rounded-2xl border border-rose-500/50 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
                {errorMessage}
              </p>
            )}
            <button type="submit" disabled={isAuthenticating} className="signin-button">
              {isAuthenticating ? "Authenticating..." : "Enter portal"}
            </button>
          </form>
          <div className="space-y-4">
            <button type="button" onClick={onGoogle} disabled={isAuthenticating} className="signin-provider">
              <span className="signin-provider__badge">G</span>
              Continue with Google
            </button>
            {accountHints?.length > 0 && (
              <div className="space-y-2 text-center text-xs text-blue-100/70">
                <p className="uppercase tracking-[0.4em] text-blue-100/60">Recognized Accounts</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {accountHints.map((account) => (
                    <span key={account} className="rounded-full border border-white/15 bg-white/10 px-3 py-1 uppercase tracking-[0.3em]">
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
};

const DashboardShell = ({ user, onSignOut, adminTabs, employeeTabs }) => {
  const tabs = user.role === "admin" ? adminTabs : employeeTabs;
  const firstTab = tabs[0]?.id ?? "";
  const [activeTab, setActiveTab] = useState(firstTab);

  useEffect(() => {
    if (!tabs.some((tab) => tab.id === activeTab)) {
      setActiveTab(firstTab);
    }
  }, [tabs, activeTab, firstTab]);

  const activeTabDefinition = tabs.find((tab) => tab.id === activeTab) ?? tabs[0];

  return (
    <div className="dashboard-stage">
      <div className="dashboard-stage__background"></div>
      <div className="dashboard-stage__content">
        <header className="dashboard-hero">
          <div>
            <p className="text-xs uppercase tracking-[0.55em] text-blue-200/70">CreativeOps Control</p>
            <h1 className="mt-3 text-4xl font-semibold text-white">{user.role === "admin" ? "Administrative Command" : "Crew Command"}</h1>
            <p className="mt-2 text-sm text-blue-100/80">
              Access level: <span className="uppercase tracking-[0.45em] text-white">{user.role}</span>
            </p>
          </div>
          <div className="dashboard-hero__user">
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
        <nav className="dashboard-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`dashboard-tabs__button ${tab.id === activeTab ? "dashboard-tabs__button--active" : ""}`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
        <main className="dashboard-main">{activeTabDefinition?.render(user)}</main>
      </div>
    </div>
  );
};

const App = () => {
  const [stage, setStage] = useState("welcome");
  const [reelIndex, setReelIndex] = useState(0);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [currentUser, setCurrentUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [statusMessage, setStatusMessage] = useState("Calibrating portal");

  const [employees, setEmployees] = useState(INITIAL_EMPLOYEES);
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [clients, setClients] = useState(INITIAL_CLIENTS);
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [payrollHistory, setPayrollHistory] = useState([]);
  const [pendingReceipt, setPendingReceipt] = useState(null);
  const [receiptHistory, setReceiptHistory] = useState([]);

  const accountHints = useMemo(
    () =>
      Object.entries(ACCOUNTS)
        .sort(([, a], [, b]) => (a.role === b.role ? 0 : a.role === "admin" ? -1 : 1))
        .map(([email, info]) => info.displayEmail ?? email),
    []
  );

  useEffect(() => {
    if (stage !== "welcome") return;
    const interval = setInterval(() => {
      setReelIndex((index) => (index + 1) % DRONE_REEL.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [stage]);

  useEffect(() => {
    if (stage !== "collapse") return;
    setStatusMessage("The portal draws everything into the singularity...");
    const timer = setTimeout(() => setStage("signin"), 2400);
    return () => clearTimeout(timer);
  }, [stage]);

  useEffect(() => {
    if (stage !== "signinWarp") return;
    setStatusMessage("Translating through the CreativeOps hypercube...");
    const phases = [
      "Stitching operational timelines...",
      "Aligning dashboards with access controls...",
      "Generating luminous data canvas...",
      "Preparing CreativeOps interface...",
    ];
    let index = 0;
    const interval = setInterval(() => {
      setStatusMessage(phases[index % phases.length]);
      index += 1;
    }, 700);
    const timer = setTimeout(() => {
      setStage("dashboard");
      clearInterval(interval);
    }, 3200);
    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [stage]);

  const attemptAuthentication = (email, password) => {
    setErrorMessage("");
    setIsAuthenticating(true);
    const normalizedEmail = email.trim().toLowerCase();
    const timer = setTimeout(() => {
      const account = ACCOUNTS[normalizedEmail];
      if (!account || account.password !== password) {
        setErrorMessage("Unable to verify credentials. Please check your email or password.");
        setIsAuthenticating(false);
        return;
      }
      setCurrentUser({ ...account, email: normalizedEmail });
      setStage("signinWarp");
      setIsAuthenticating(false);
    }, 650);
    return () => clearTimeout(timer);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    attemptAuthentication(credentials.email, credentials.password);
  };

  const handleGoogle = () => {
    if (isAuthenticating) return;
    const googleAccount = ACCOUNTS[GOOGLE_ACCOUNT];
    attemptAuthentication(GOOGLE_ACCOUNT, googleAccount.password);
  };

  const handlePortalEnter = () => {
    if (stage !== "welcome") return;
    setStage("collapse");
  };

  const handleSignOut = () => {
    setCurrentUser(null);
    setCredentials({ email: "", password: "" });
    setStage("welcome");
    setStatusMessage("Calibrating portal");
    setErrorMessage("");
  };

  const handleEmployeeSave = (id, payload) => {
    setEmployees((prev) => prev.map((employee) => (employee.id === id ? { ...employee, ...payload } : employee)));
  };

  const handleEmployeeAdd = (employee) => {
    setEmployees((prev) => [...prev, employee]);
  };

  const handleEmployeeDocuments = (id, docs) => {
    setEmployees((prev) =>
      prev.map((employee) =>
        employee.id === id
          ? { ...employee, documents: Array.from(new Set([...employee.documents, ...docs])) }
          : employee
      )
    );
  };

  const handlePayrollSchedule = (entry) => {
    setPayrollHistory((prev) => [entry, ...prev]);
  };

  const handleProjectUpdate = (id, updater) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === id ? (typeof updater === "function" ? updater(project) : { ...project, ...updater }) : project
      )
    );
  };

  const handleProjectAdd = (project) => {
    setProjects((prev) => [project, ...prev]);
  };

  const handleTransactionUpdate = (id, updater) => {
    setTransactions((prev) =>
      prev.map((transaction) =>
        transaction.id === id
          ? typeof updater === "function"
            ? updater(transaction)
            : { ...transaction, ...updater }
          : transaction
      )
    );
  };

  const handleTransactionAdd = (transaction) => {
    setTransactions((prev) => [...prev, transaction]);
  };

  const handleReceiptUpload = (file) => {
    if (pendingReceipt?.previewUrl) {
      URL.revokeObjectURL(pendingReceipt.previewUrl);
    }
    const previewUrl = URL.createObjectURL(file);
    const draft = {
      id: createId("receipt"),
      fileName: file.name,
      previewUrl,
      vendor: "",
      amount: "",
      category: EXPENSE_CATEGORIES[0],
      method: "Company Card",
      reference: "",
      notes: "",
      status: "processing",
      createdAt: new Date().toISOString(),
    };
    setPendingReceipt(draft);
    setTimeout(() => {
      const insights = deriveReceiptInsights(file.name);
      setPendingReceipt((current) => (current && current.id === draft.id ? { ...current, ...insights, status: "ready" } : current));
    }, 900);
  };

  const handlePendingReceiptUpdate = (updates) => {
    setPendingReceipt((current) => (current ? { ...current, ...updates } : current));
  };

  const handleReceiptConfirm = (receipt) => {
    const amount = Number(receipt.amount) || 0;
    const transaction = {
      id: createId("txn"),
      date: new Date().toISOString().slice(0, 10),
      description: `${receipt.vendor} receipt`,
      type: "expense",
      amount,
      method: receipt.method || "Company Card",
      category: receipt.category || "Other",
      reference: receipt.reference || receipt.fileName,
    };
    setTransactions((prev) => [...prev, transaction]);
    setReceiptHistory((prev) => [
      {
        ...receipt,
        amount,
        transactionId: transaction.id,
        status: "archived",
        archivedAt: new Date().toISOString(),
      },
      ...prev,
    ]);
    setPendingReceipt(null);
  };

  const handleReceiptDiscard = () => {
    if (pendingReceipt?.previewUrl) {
      URL.revokeObjectURL(pendingReceipt.previewUrl);
    }
    setPendingReceipt(null);
  };

  const handleAddClient = (type, client) => {
    setClients((prev) => ({
      ...prev,
      [type]: [
        ...prev[type],
        {
          ...client,
          id: createId("client"),
        },
      ],
    }));
  };

  const handleUpdateClient = (type, id, updates) => {
    setClients((prev) => ({
      ...prev,
      [type]: prev[type].map((client) => (client.id === id ? { ...client, ...updates } : client)),
    }));
  };

  const adminTabs = createAdminTabs({
    employees,
    projects,
    clients,
    transactions,
    payrollHistory,
    pendingReceipt,
    receiptHistory,
    handleEmployeeSave,
    handleEmployeeAdd,
    handleEmployeeDocuments,
    handlePayrollSchedule,
    handleProjectUpdate,
    handleProjectAdd,
    handleTransactionUpdate,
    handleTransactionAdd,
    handleReceiptUpload,
    handlePendingReceiptUpdate,
    handleReceiptConfirm,
    handleReceiptDiscard,
    handleAddClient,
    handleUpdateClient,
  });

  return (
    <div className="min-h-screen text-white">
      {stage === "welcome" && <WelcomeScreen onEnter={handlePortalEnter} reelIndex={reelIndex} />}
      {stage === "collapse" && <StagePortal statusMessage={statusMessage} headline="Portal collapsing" />}
      {stage === "signin" && (
        <SignInView
          credentials={credentials}
          onChange={setCredentials}
          onSubmit={handleSubmit}
          onGoogle={handleGoogle}
          isAuthenticating={isAuthenticating}
          errorMessage={errorMessage}
          accountHints={accountHints}
        />
      )}
      {stage === "signinWarp" && <StagePortal statusMessage={statusMessage} headline="Timewarp engaged" />}
      {stage === "dashboard" && currentUser && (
        <DashboardShell user={currentUser} onSignOut={handleSignOut} adminTabs={adminTabs} employeeTabs={EMPLOYEE_TABS} />
      )}
    </div>
  );
};

export default App;
