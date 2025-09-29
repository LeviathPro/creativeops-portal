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

const ADMIN_TABS = [
  {
    id: "overview",
    label: "Overview",
    render: (user) => (
      <div className="grid gap-8 xl:grid-cols-[1.4fr_1fr]">
        <section className="glass-panel space-y-6">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.55em] text-blue-200/80">Command Bridge</p>
            <h2 className="text-3xl font-semibold text-white">Welcome back, {user.displayName}</h2>
            <p className="text-sm text-blue-100/80">
              All CreativeOps timelines are synced. Review company vitals, monitor cash flow, and deploy crews from this
              master console.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {[
              {
                title: "Active Projects",
                metric: "31",
                delta: "+4 scheduled",
                descriptor: "Decks, fences, pergolas, docks, gazebos, roofing, painting & staining",
              },
              {
                title: "Crew Availability",
                metric: "92%",
                delta: "Optimal load",
                descriptor: "Crewed by 47 W4 and 18 W9 specialists",
              },
              {
                title: "Cash on Hand",
                metric: "$418K",
                delta: "↑ 12%",
                descriptor: "Operating runway of 5.5 months",
              },
              {
                title: "Client Pipeline",
                metric: "86",
                delta: "19 hot leads",
                descriptor: "Residential & commercial opportunities",
              },
              {
                title: "Open Tickets",
                metric: "12",
                delta: "↓ 35%",
                descriptor: "Quality audits, material escalations, client revisions",
              },
              {
                title: "Vendor Health",
                metric: "A-",
                delta: "Stable",
                descriptor: "Supply chain metrics are within tolerance",
              },
            ].map((item) => (
              <article key={item.title} className="rounded-3xl border border-white/5 bg-white/5 p-5 shadow-inner shadow-blue-900/30">
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
            <li className="timeline-item">
              <span className="timeline-indicator bg-emerald-400"></span>
              Pergola illumination retrofit in Loveland passed inspection 2 days ahead of schedule.
            </li>
            <li className="timeline-item">
              <span className="timeline-indicator bg-sky-400"></span>
              Vendor reconciliation complete – reclaimed $8,450 in bulk lumber credits.
            </li>
            <li className="timeline-item">
              <span className="timeline-indicator bg-amber-400"></span>
              Three proposals awaiting executive signature. Review ready in Blueprints tab.
            </li>
            <li className="timeline-item">
              <span className="timeline-indicator bg-rose-400"></span>
              Security scan reports zero vulnerabilities across payroll processors.
            </li>
          </ul>
        </section>
      </div>
    ),
  },
  {
    id: "employees",
    label: "Employees",
    render: () => (
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
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                {
                  name: "Logan Pierce",
                  role: "Deck Lead (W4)",
                  address: "842 Riverbend Way, Cincinnati, OH",
                  phone: "(513) 555-0182",
                  payroll: "$34.50/hr",
                  ytd: "$41,860",
                  hours: "1,214",
                },
                {
                  name: "Mara Vance",
                  role: "Fence Crew (W9)",
                  address: "19 Pike Ridge, Newport, KY",
                  phone: "(859) 555-0279",
                  payroll: "$600/project",
                  ytd: "$28,200",
                  hours: "744",
                },
                {
                  name: "Jerome Castillo",
                  role: "Pergola Artisan (W4)",
                  address: "610 Walnut St, Loveland, OH",
                  phone: "(513) 555-2244",
                  payroll: "$31.25/hr",
                  ytd: "$37,420",
                  hours: "1,072",
                },
                {
                  name: "Riya Patel",
                  role: "Logistics Coordinator (W4)",
                  address: "355 Skyline Dr, Mason, OH",
                  phone: "(513) 555-1175",
                  payroll: "$29.75/hr",
                  ytd: "$33,010",
                  hours: "1,116",
                },
              ].map((person) => (
                <tr key={person.name}>
                  <td className="px-4 py-3 text-white">{person.name}</td>
                  <td className="px-4 py-3">{person.role}</td>
                  <td className="px-4 py-3">{person.address}</td>
                  <td className="px-4 py-3">{person.phone}</td>
                  <td className="px-4 py-3">{person.payroll}</td>
                  <td className="px-4 py-3">{person.ytd}</td>
                  <td className="px-4 py-3">{person.hours}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      {"ID • SSN • W9".split(" • ").map((doc) => (
                        <span key={doc} className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.3em]">
                          {doc}
                        </span>
                      ))}
                    </div>
                    <label className="mt-3 inline-flex cursor-pointer items-center gap-2 text-xs text-blue-100/80">
                      <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1">Upload</span>
                      <input type="file" className="hidden" />
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ),
  },
  {
    id: "payroll",
    label: "Payroll",
    render: () => (
      <div className="glass-panel space-y-6">
        <header className="space-y-3">
          <p className="text-xs uppercase tracking-[0.55em] text-blue-200/80">Compensation Control</p>
          <h2 className="text-3xl font-semibold text-white">Disburse payroll & taxes securely</h2>
          <p className="text-sm text-blue-100/80">
            Issue payments via Cash App, Venmo, PayPal, Chime, Zelle, ACH transfer, or paper check with multi-step
            confirmations and encryption.
          </p>
        </header>
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <section className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-inner shadow-blue-900/30">
            <p className="text-xs uppercase tracking-[0.45em] text-blue-200/70">Payroll Wizard</p>
            <form className="space-y-4">
              <label className="block text-xs uppercase tracking-[0.35em] text-blue-100/80">
                Select teammate
                <select className="mt-2 w-full rounded-2xl border border-white/20 bg-slate-950/70 px-4 py-3 text-sm text-white shadow-inner shadow-blue-900/40 outline-none">
                  <option>Logan Pierce</option>
                  <option>Mara Vance</option>
                  <option>Jerome Castillo</option>
                  <option>Riya Patel</option>
                </select>
              </label>
              <label className="block text-xs uppercase tracking-[0.35em] text-blue-100/80">
                Amount
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="Enter amount"
                  className="mt-2 w-full rounded-2xl border border-white/20 bg-slate-950/70 px-4 py-3 text-sm text-white shadow-inner shadow-blue-900/40 outline-none"
                />
              </label>
              <label className="block text-xs uppercase tracking-[0.35em] text-blue-100/80">
                Payment method
                <select className="mt-2 w-full rounded-2xl border border-white/20 bg-slate-950/70 px-4 py-3 text-sm text-white shadow-inner shadow-blue-900/40 outline-none">
                  <option>Cash App</option>
                  <option>Venmo</option>
                  <option>PayPal</option>
                  <option>Chime</option>
                  <option>Zelle</option>
                  <option>ACH Transfer</option>
                  <option>Paper Check</option>
                </select>
              </label>
              <div className="grid gap-3 md:grid-cols-2">
                <label className="flex items-center gap-3 text-xs text-blue-100/70">
                  <input type="checkbox" defaultChecked className="accent-blue-400" />
                  Verify tax withholding and benefit deductions
                </label>
                <label className="flex items-center gap-3 text-xs text-blue-100/70">
                  <input type="checkbox" className="accent-blue-400" />
                  Schedule follow-up receipt confirmation
                </label>
              </div>
              <button type="button" className="w-full rounded-2xl bg-blue-500/90 px-4 py-3 text-sm font-semibold uppercase tracking-[0.4em] text-white transition hover:bg-blue-500">
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
          </aside>
        </div>
      </div>
    ),
  },
  {
    id: "projects",
    label: "Projects",
    render: () => (
      <div className="glass-panel space-y-6">
        <header className="space-y-3">
          <p className="text-xs uppercase tracking-[0.55em] text-blue-200/80">Project Status</p>
          <h2 className="text-3xl font-semibold text-white">Monitor execution, blueprints & milestones</h2>
          <p className="text-sm text-blue-100/80">
            Track progress, upload blueprints, and oversee completion percentages across the entire build portfolio.
          </p>
        </header>
        <div className="grid gap-6 lg:grid-cols-2">
          {[
            {
              name: "Riverside Deck Expansion",
              percent: 68,
              status: "On schedule",
              blueprint: "RiversideDeck_v5.pdf",
              checklist: ["Footings inspection", "Electrical rough-in", "Composite decking", "Lighting layout"],
            },
            {
              name: "Walnut Hills Perimeter Fence",
              percent: 54,
              status: "Materials en route",
              blueprint: "WalnutFence_v2.pdf",
              checklist: ["Demolition", "Post setting", "Panel install", "Stain & seal"],
            },
            {
              name: "Harborview Dock Renewal",
              percent: 82,
              status: "Awaiting punch list",
              blueprint: "HarborDock_v4.ifc",
              checklist: ["Pile reinforcement", "Deck planking", "Night lighting", "Client walkthrough"],
            },
            {
              name: "Northcrest Pergola + Lighting",
              percent: 31,
              status: "Design approvals",
              blueprint: "NorthcrestPergola_v1.dwg",
              checklist: ["Design review", "Material sourcing", "Fabrication", "Installation"],
            },
          ].map((project) => (
            <article key={project.name} className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-white">{project.name}</h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.4em] text-blue-200/70">{project.status}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-sm font-semibold text-white">
                  {project.percent}%
                </div>
              </div>
              <div className="mt-5 space-y-3 text-xs text-blue-100/70">
                <p>Blueprint: {project.blueprint}</p>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {project.checklist.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="inline-flex h-2 w-2 rounded-full bg-blue-300"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-blue-100/70">
                <button className="rounded-full border border-white/20 bg-white/10 px-3 py-1">Upload blueprint</button>
                <button className="rounded-full border border-white/20 bg-white/10 px-3 py-1">Update status</button>
                <button className="rounded-full border border-white/20 bg-white/10 px-3 py-1">Assign crew</button>
              </div>
            </article>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "finance",
    label: "Finance",
    render: () => (
      <div className="glass-panel space-y-6">
        <header className="space-y-3">
          <p className="text-xs uppercase tracking-[0.55em] text-blue-200/80">Accounting & Cash Flow</p>
          <h2 className="text-3xl font-semibold text-white">Keep CreativeOps financially aligned</h2>
          <p className="text-sm text-blue-100/80">
            Manage income, expenses, ACH transfers, and forecasting from a single control center.
          </p>
        </header>
        <div className="grid gap-6 xl:grid-cols-[1.2fr_1fr]">
          <section className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
            <h3 className="text-xl font-semibold text-white">Cash Flow Streams</h3>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {[
                { label: "Accounts Receivable", amount: "$186,400", info: "Invoices due within 30 days" },
                { label: "Accounts Payable", amount: "$72,150", info: "Materials, subcontractors, utilities" },
                { label: "Operating Expenses", amount: "$43,920", info: "Payroll, insurance, fleet" },
                { label: "Forecast", amount: "+$138,250", info: "Projected net for next 45 days" },
              ].map((item) => (
                <article key={item.label} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <p className="text-xs uppercase tracking-[0.4em] text-blue-200/70">{item.label}</p>
                  <p className="mt-4 text-2xl font-semibold text-white">{item.amount}</p>
                  <p className="mt-2 text-xs text-blue-100/70">{item.info}</p>
                </article>
              ))}
            </div>
          </section>
          <aside className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-inner shadow-blue-900/30">
            <p className="text-xs uppercase tracking-[0.45em] text-blue-200/70">ACH Transfer Queue</p>
            <ul className="mt-4 space-y-3 text-sm text-blue-100/70">
              <li className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3">
                Lakeside Builders • $18,300 • Materials reimbursement
              </li>
              <li className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3">
                Skyline Crane • $12,550 • Equipment rental
              </li>
              <li className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3">
                CreativeOps Payroll • $54,210 • Weekly distribution
              </li>
            </ul>
            <button className="mt-5 w-full rounded-2xl bg-blue-500/90 px-4 py-3 text-sm font-semibold uppercase tracking-[0.4em] text-white transition hover:bg-blue-500">
              Initiate ACH transfer
            </button>
          </aside>
        </div>
      </div>
    ),
  },
  {
    id: "clients",
    label: "Clients",
    render: () => (
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
              <li className="client-card">
                <div>
                  <p className="font-semibold text-white">Lanier Residence</p>
                  <p className="text-xs uppercase tracking-[0.35em]">Deck + Pergola</p>
                </div>
                <span className="status-pill bg-emerald-500/15 text-emerald-300">On schedule</span>
              </li>
              <li className="client-card">
                <div>
                  <p className="font-semibold text-white">Cityside HOA</p>
                  <p className="text-xs uppercase tracking-[0.35em]">Perimeter Fencing</p>
                </div>
                <span className="status-pill bg-amber-500/15 text-amber-300">Awaiting permits</span>
              </li>
              <li className="client-card">
                <div>
                  <p className="font-semibold text-white">Harborview Marina</p>
                  <p className="text-xs uppercase tracking-[0.35em]">Dock Renewal</p>
                </div>
                <span className="status-pill bg-sky-500/15 text-sky-300">In progress</span>
              </li>
            </ul>
          </section>
          <section className="space-y-4 rounded-3xl border border-white/10 bg-slate-950/70 p-6">
            <h3 className="text-xl font-semibold text-white">Potential Clients</h3>
            <ul className="space-y-3 text-sm text-blue-100/80">
              <li className="client-card">
                <div>
                  <p className="font-semibold text-white">Aurora Hotel Group</p>
                  <p className="text-xs uppercase tracking-[0.35em]">Rooftop lounge + lighting</p>
                </div>
                <button className="status-pill bg-white/10 text-white">Send estimate</button>
              </li>
              <li className="client-card">
                <div>
                  <p className="font-semibold text-white">Lytle Park Conservancy</p>
                  <p className="text-xs uppercase tracking-[0.35em]">Gazebo restoration</p>
                </div>
                <button className="status-pill bg-white/10 text-white">Schedule site visit</button>
              </li>
              <li className="client-card">
                <div>
                  <p className="font-semibold text-white">Northwind Apartments</p>
                  <p className="text-xs uppercase tracking-[0.35em]">Balcony refurbishments</p>
                </div>
                <button className="status-pill bg-white/10 text-white">Upload proposal</button>
              </li>
            </ul>
          </section>
        </div>
      </div>
    ),
  },
];

const EMPLOYEE_TABS = [
  {
    id: "jobs",
    label: "Current Jobs",
    render: (user) => (
      <section className="glass-panel space-y-4">
        <header>
          <p className="text-xs uppercase tracking-[0.55em] text-blue-200/80">Assignments</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Active deployments for {user.displayName}</h2>
        </header>
        <div className="grid gap-5 lg:grid-cols-2">
          {[
            {
              name: "Riverside Deck Expansion",
              shift: "07:00 – 17:00",
              status: "Framing & railing",
              tasks: ["Clock in", "Install joists", "Run electrical conduit", "Client briefing"],
            },
            {
              name: "Cityside HOA Fence",
              shift: "08:00 – 16:00",
              status: "Post setting",
              tasks: ["Locate utilities", "Set posts", "Check alignment", "Material report"],
            },
          ].map((job) => (
            <article key={job.name} className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
              <h3 className="text-xl font-semibold text-white">{job.name}</h3>
              <p className="mt-1 text-xs uppercase tracking-[0.35em] text-blue-200/70">{job.shift}</p>
              <p className="mt-3 text-sm text-blue-100/80">Status: {job.status}</p>
              <ul className="mt-4 space-y-2 text-xs text-blue-100/70">
                {job.tasks.map((task) => (
                  <li key={task} className="flex items-center gap-2">
                    <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400"></span>
                    {task}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    ),
  },
  {
    id: "materials",
    label: "Materials",
    render: () => (
      <section className="glass-panel space-y-4">
        <header>
          <p className="text-xs uppercase tracking-[0.55em] text-blue-200/80">Material Queue</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Inventory assigned to your crew</h2>
        </header>
        <div className="grid gap-4 md:grid-cols-2">
          {[
            { label: "Cedar deck boards", qty: "125 pcs", status: "On site" },
            { label: "Black steel posts", qty: "42 pcs", status: "Delivering 14:30" },
            { label: "Exterior stain", qty: "14 gallons", status: "Warehouse" },
            { label: "Pergola LED kits", qty: "5 kits", status: "QC check" },
          ].map((item) => (
            <article key={item.label} className="rounded-3xl border border-white/10 bg-slate-950/70 p-5 text-sm text-blue-100/80">
              <p className="text-white">{item.label}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.35em]">{item.qty}</p>
              <p className="mt-2 text-xs text-blue-200/70">Status: {item.status}</p>
            </article>
          ))}
        </div>
      </section>
    ),
  },
  {
    id: "checklist",
    label: "Checklist",
    render: () => (
      <section className="glass-panel space-y-4">
        <header>
          <p className="text-xs uppercase tracking-[0.55em] text-blue-200/80">Task Log</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Track completed work</h2>
        </header>
        <div className="space-y-3">
          {[
            { label: "Clock in", complete: true },
            { label: "Safety briefing", complete: true },
            { label: "Material verification", complete: false },
            { label: "Upload progress photos", complete: false },
          ].map((item) => (
            <label key={item.label} className="flex items-center justify-between rounded-3xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-blue-100/80">
              <span>{item.label}</span>
              <input type="checkbox" defaultChecked={item.complete} className="accent-blue-400" />
            </label>
          ))}
        </div>
      </section>
    ),
  },
  {
    id: "time",
    label: "Timekeeping",
    render: () => (
      <section className="glass-panel space-y-4">
        <header>
          <p className="text-xs uppercase tracking-[0.55em] text-blue-200/80">Clock</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Clock in, break, and clock out</h2>
        </header>
        <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
          <p className="text-sm text-blue-100/80">Your time today: 6h 45m</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button className="action-pill">Clock In</button>
            <button className="action-pill">Break</button>
            <button className="action-pill">Clock Out</button>
          </div>
          <ul className="mt-4 space-y-2 text-xs text-blue-100/70">
            <li>07:01 • Clocked in</li>
            <li>11:58 • Break start</li>
            <li>12:28 • Break end</li>
          </ul>
        </div>
      </section>
    ),
  },
  {
    id: "schedule",
    label: "Schedule",
    render: () => (
      <section className="glass-panel space-y-4">
        <header>
          <p className="text-xs uppercase tracking-[0.55em] text-blue-200/80">Scheduling</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Plan your calendar & request time off</h2>
        </header>
        <div className="grid gap-4 md:grid-cols-2">
          <article className="rounded-3xl border border-white/10 bg-slate-950/70 p-5 text-sm text-blue-100/80">
            <h3 className="text-lg font-semibold text-white">Upcoming shifts</h3>
            <ul className="mt-3 space-y-2 text-xs text-blue-100/70">
              <li>Fri • 07:00 – 15:00 • Riverside Deck</li>
              <li>Sat • 08:00 – 14:00 • Pergola Lighting</li>
              <li>Mon • 07:30 – 16:00 • Cityside HOA</li>
            </ul>
          </article>
          <article className="rounded-3xl border border-white/10 bg-slate-950/70 p-5 text-sm text-blue-100/80">
            <h3 className="text-lg font-semibold text-white">Request time off</h3>
            <form className="mt-3 space-y-3">
              <input type="date" className="w-full rounded-2xl border border-white/20 bg-slate-950/70 px-4 py-3 text-xs text-white outline-none" />
              <textarea className="h-24 w-full rounded-2xl border border-white/20 bg-slate-950/70 px-4 py-3 text-xs text-white outline-none" placeholder="Reason" />
              <button type="button" className="w-full rounded-2xl bg-blue-500/90 px-4 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-white transition hover:bg-blue-500">
                Submit request
              </button>
            </form>
          </article>
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
          <p className="text-xs uppercase tracking-[0.55em] text-blue-200/80">Crew Voice</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Share ideas and report issues</h2>
        </header>
        <form className="space-y-3">
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

const StagePortal = ({ statusMessage, headline }) => (
  <div className="stage-warp">
    <div className="stage-warp__core">
      <div className="stage-warp__rings"></div>
      <div className="stage-warp__rings stage-warp__rings--delayed"></div>
      <div className="stage-warp__singularity"></div>
    </div>
    <div className="stage-warp__stars"></div>
    <div className="relative z-20 text-center space-y-4 px-6">
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
      <header className="relative z-20 text-center space-y-4 px-6">
        <p className="text-xs uppercase tracking-[0.6em] text-white/80">Welcome to</p>
        <h1 className="text-5xl font-semibold text-white drop-shadow-[0_25px_45px_rgba(15,23,42,0.75)]">CreativeOps</h1>
        <p className="mx-auto max-w-xl text-sm text-blue-100/85">
          Step through the CreativeOps portal to explore our construction mastery — from radiant decks to illuminated
          pergolas, each timeline is captured in a cinematic drone flight.
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
          <div className="text-center space-y-3">
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
            <button
              type="submit"
              disabled={isAuthenticating}
              className="signin-button"
            >
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

const DashboardShell = ({ user, onSignOut }) => {
  const [activeTab, setActiveTab] = useState(
    user.role === "admin" ? ADMIN_TABS[0].id : EMPLOYEE_TABS[0].id
  );

  const tabs = user.role === "admin" ? ADMIN_TABS : EMPLOYEE_TABS;
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
            <button onClick={onSignOut} className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20">
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
        <main className="dashboard-main">
          {activeTabDefinition?.render(user)}
        </main>
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
      {stage === "dashboard" && currentUser && <DashboardShell user={currentUser} onSignOut={handleSignOut} />}
    </div>
  );
};

export default App;
