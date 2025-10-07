import React, { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell
} from "recharts";
import ModuleCard from "./ModuleCard";
import EditableTable from "./EditableTable";
import { useData } from "./DataContext";

const weeklyPerformance = [
  { name: "Mon", jobs: 3, revenue: 12600 },
  { name: "Tue", jobs: 4, revenue: 18400 },
  { name: "Wed", jobs: 5, revenue: 24100 },
  { name: "Thu", jobs: 4, revenue: 19800 },
  { name: "Fri", jobs: 6, revenue: 28640 }
];

const payoutMix = [
  { name: "ACH", value: 62 },
  { name: "Card", value: 18 },
  { name: "Check", value: 11 },
  { name: "Cash", value: 9 }
];

const COLORS = ["#fef08a", "#fde68a", "#facc15", "#f97316"];

const weatherBriefs = [
  {
    id: "findlay",
    label: "Findlay, OH — HQ",
    today: "78°F / Clear",
    outlook: "Light winds, ideal build conditions",
    radar: "https://maps.google.com/maps?q=Findlay%20Ohio&z=11&output=embed"
  },
  {
    id: "kenton",
    label: "Kenton, OH — Current Project",
    today: "75°F / Partly Cloudy",
    outlook: "Rain window Thursday 3-6pm",
    radar: "https://maps.google.com/maps?q=Kenton%20Ohio&z=11&output=embed"
  },
  {
    id: "bowling",
    label: "Bowling Green, OH — Staging",
    today: "74°F / Breezy",
    outlook: "Monitor gusts impacting fence panels",
    radar: "https://maps.google.com/maps?q=Bowling%20Green%20Ohio&z=11&output=embed"
  }
];

const iframeClasses = "h-72 w-full rounded-3xl border border-white/10";

const TabContent = ({ activeTab, role, user }) => {
  const { data } = useData();
  const [selectedWeather, setSelectedWeather] = useState(weatherBriefs[0]);

  const projectLocations = useMemo(
    () =>
      data.jobs.map((job) => ({
        id: job.id,
        label: `${job.client} — ${job.location}`,
        query: `${job.location} ${job.client}`
      })),
    [data.jobs]
  );

  switch (activeTab) {
    case "dashboard":
      return (
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <ModuleCard title="Active Jobs" subtitle="Operational Load" accent="gold">
              <p className="text-4xl font-semibold text-white">{data.jobs.length}</p>
              <p className="text-xs uppercase tracking-[0.3em] text-amber-200/80">Across Northwest Ohio</p>
            </ModuleCard>
            <ModuleCard title="Pending Approvals" subtitle="Executive" accent="purple">
              <p className="text-4xl font-semibold text-white">{data.approvals.length}</p>
              <p className="text-xs uppercase tracking-[0.3em] text-amber-100/70">Awaiting Stacy / Levi</p>
            </ModuleCard>
            <ModuleCard title="Crew Logged Hours" subtitle="Field" accent="emerald">
              <p className="text-4xl font-semibold text-white">
                {data.timesheets.reduce((sum, entry) => sum + Number(entry.hours || 0), 0)}
              </p>
              <p className="text-xs uppercase tracking-[0.3em] text-amber-100/70">Past 24 Hours</p>
            </ModuleCard>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <ModuleCard title="Weekly Impact" subtitle="Forecast" accent="gold">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={weeklyPerformance}>
                    <defs>
                      <linearGradient id="jobs" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#facc15" stopOpacity={0.9} />
                        <stop offset="100%" stopColor="#facc15" stopOpacity={0.05} />
                      </linearGradient>
                      <linearGradient id="revenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#f97316" stopOpacity={0.8} />
                        <stop offset="100%" stopColor="#f97316" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#fef3c7" opacity={0.2} />
                    <XAxis dataKey="name" stroke="#fef3c7" />
                    <YAxis stroke="#fef3c7" />
                    <Tooltip
                      contentStyle={{
                        background: "rgba(12,12,15,0.92)",
                        border: "1px solid rgba(253,224,71,0.3)",
                        borderRadius: "16px",
                        color: "white"
                      }}
                    />
                    <Area type="monotone" dataKey="jobs" stroke="#fde68a" strokeWidth={2} fill="url(#jobs)" />
                    <Area type="monotone" dataKey="revenue" stroke="#fb923c" strokeWidth={2} fill="url(#revenue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </ModuleCard>

            <ModuleCard title="Payout Distribution" subtitle="Finance" accent="purple">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={payoutMix} dataKey="value" cx="50%" cy="50%" innerRadius={40} outerRadius={80} paddingAngle={4}>
                      {payoutMix.map((entry, index) => (
                        <Cell key={`slice-${entry.name}`} fill={COLORS[index % COLORS.length]} stroke="transparent" />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        background: "rgba(12,12,15,0.92)",
                        border: "1px solid rgba(253,224,71,0.3)",
                        borderRadius: "16px",
                        color: "white"
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </ModuleCard>

            <ModuleCard title="Owner Alerts" subtitle="Priority" accent="emerald">
              <ul className="space-y-3 text-sm text-white/80">
                {data.alerts.map((alert) => (
                  <li key={alert.id} className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3">
                    <p className="text-[10px] uppercase tracking-[0.4em] text-amber-200/70">{alert.severity}</p>
                    <p>{alert.message}</p>
                  </li>
                ))}
              </ul>
            </ModuleCard>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
            <EditableTable
              collection="approvals"
              title="Executive Approvals"
              description="Stacy & Levi queue"
              role={role}
              allowEditRoles={["ADMIN"]}
              columns={[
                { key: "id", label: "ID" },
                { key: "item", label: "Item" },
                { key: "owner", label: "Owner" },
                { key: "status", label: "Status" }
              ]}
              newEntryLabel="Add Approval"
            />
            <ModuleCard title="Weather Intel" subtitle="Site Conditions" accent="gold">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {weatherBriefs.map((brief) => (
                    <button
                      key={brief.id}
                      onClick={() => setSelectedWeather(brief)}
                      className={`rounded-full border px-4 py-1 text-[10px] uppercase tracking-[0.4em] transition ${
                        selectedWeather.id === brief.id
                          ? "border-amber-300 bg-amber-200/20 text-amber-100"
                          : "border-white/20 text-white/70 hover:border-amber-200/40"
                      }`}
                    >
                      {brief.label}
                    </button>
                  ))}
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/10 p-4 text-sm text-white/80">
                  <p className="text-[10px] uppercase tracking-[0.4em] text-amber-200/70">Current</p>
                  <p className="text-lg font-semibold text-white">{selectedWeather.today}</p>
                  <p className="mt-2 text-xs text-white/70">{selectedWeather.outlook}</p>
                </div>
                <iframe title={`radar-${selectedWeather.id}`} src={selectedWeather.radar} className={iframeClasses} allowFullScreen />
              </div>
            </ModuleCard>
          </div>
        </div>
      );

    case "contractors":
      return (
        <EditableTable
          collection="contractors"
          title="Contractor Roster"
          description="Onboard & certify"
          role={role}
          allowEditRoles={["ADMIN", "FOREMAN"]}
          columns={[
            { key: "id", label: "ID" },
            { key: "name", label: "Name" },
            { key: "role", label: "Role" },
            { key: "certifications", label: "Certifications", type: "textarea", rows: 2 },
            { key: "skills", label: "Skills", type: "textarea", rows: 2 },
            { key: "status", label: "Status" }
          ]}
          newEntryLabel="Add Contractor"
        />
      );

    case "jobs":
      return (
        <div className="space-y-6">
          <EditableTable
            collection="jobs"
            title="Project Command"
            description="Scopes + crews"
            role={role}
            allowEditRoles={["ADMIN", "FOREMAN", "TEAM_LEAD"]}
            columns={[
              { key: "id", label: "ID" },
              { key: "client", label: "Client" },
              { key: "scope", label: "Scope", type: "textarea", rows: 2 },
              { key: "location", label: "Location" },
              { key: "timeline", label: "Timeline" },
              { key: "crew", label: "Crew" },
              { key: "blueprint", label: "Blueprint" }
            ]}
            newEntryLabel="Add Project"
          />
          <ModuleCard title="Blueprint Access" subtitle="Client & Crew" accent="gold">
            <p className="text-sm text-white/80">
              Upload blueprint PDFs and AR overlays directly into each project entry. Clients receive read-only access while foremen
              and team leads can append markups, upload site photos, and generate day-end reports.
            </p>
          </ModuleCard>
        </div>
      );

    case "payouts":
      return (
        <div className="space-y-6">
          <EditableTable
            collection="payouts"
            title="ACH Pipeline"
            description="Dwolla / Modern Treasury"
            role={role}
            allowEditRoles={["ADMIN"]}
            columns={[
              { key: "id", label: "Batch ID" },
              { key: "recipient", label: "Recipient" },
              { key: "amount", label: "Amount" },
              { key: "status", label: "Status" }
            ]}
            newEntryLabel="Queue ACH"
          />
          <ModuleCard title="Approval Gates" subtitle="Finance" accent="purple">
            <p className="text-sm text-white/80">
              ACH batches require dual approval—Levi and Stacy are notified via SMS and email before funds are released. Audit trails
              mirror IRS-compliant record keeping with exportable PDFs.
            </p>
          </ModuleCard>
        </div>
      );

    case "form1099":
      return (
        <ModuleCard title="1099 Command" subtitle="Compliance" accent="gold">
          <ul className="space-y-3 text-sm text-white/80">
            <li>• Auto-generate 1099-NEC drafts from approved payouts and contractor W-9 files.</li>
            <li>• Submit directly to the IRS IRIS API with encrypted payloads.</li>
            <li>• Allow contractors to download secure copies via the client document vault.</li>
          </ul>
        </ModuleCard>
      );

    case "schedule":
      return (
        <ModuleCard title="Scheduling Matrix" subtitle="Gantt" accent="purple">
          <p className="text-sm text-white/80">
            Drag-and-drop crews between tasks, hold time slots when Findlay or project-specific weather dips, and push change-order
            adjustments to the timeline. Foremen can stage their crew availability, while apprentices view read-only calendars.
          </p>
        </ModuleCard>
      );

    case "materials":
      return (
        <EditableTable
          collection="materials"
          title="Materials &amp; POs"
          description="Supply stream"
          role={role}
          allowEditRoles={["ADMIN", "FOREMAN"]}
          columns={[
            { key: "id", label: "ID" },
            { key: "item", label: "Item" },
            { key: "vendor", label: "Vendor" },
            { key: "quantity", label: "Quantity" },
            { key: "status", label: "Status" }
          ]}
          newEntryLabel="Add Material"
        />
      );

    case "quotes":
      return (
        <ModuleCard title="Quotes &amp; Estimates" subtitle="Sales" accent="gold">
          <p className="text-sm text-white/80">
            Admins craft dynamic quotes with margin projections and tax intelligence. Clients can request upgrades directly within
            the Change Orders tab, feeding delta pricing here for review before approvals.
          </p>
        </ModuleCard>
      );

    case "changeOrders":
      return (
        <EditableTable
          collection="changeOrders"
          title="Change Orders"
          description="Client add-ons"
          role={role}
          allowEditRoles={["ADMIN", "TEAM_LEAD", "CLIENT"]}
          columns={[
            { key: "id", label: "ID" },
            { key: "project", label: "Project" },
            { key: "request", label: "Request", type: "textarea", rows: 2 },
            { key: "delta", label: "Delta" },
            { key: "status", label: "Status" }
          ]}
          newEntryLabel="Submit Change Order"
        />
      );

    case "timesheets":
      return (
        <EditableTable
          collection="timesheets"
          title="Timesheets &amp; Geo"
          description="Crew proof"
          role={role}
          allowEditRoles={["ADMIN", "FOREMAN", "TEAM_LEAD"]}
          columns={[
            { key: "id", label: "ID" },
            { key: "crew", label: "Crew" },
            { key: "day", label: "Day" },
            { key: "hours", label: "Hours" },
            { key: "weather", label: "Weather" }
          ]}
          newEntryLabel="Add Entry"
        />
      );

    case "weather":
      return (
        <div className="space-y-6">
          {weatherBriefs.map((brief) => (
            <ModuleCard key={brief.id} title={brief.label} subtitle="Hyperlocal" accent="gold">
              <p className="text-sm text-white/80">Current: {brief.today}</p>
              <p className="text-xs text-white/70">{brief.outlook}</p>
              <iframe title={`weather-${brief.id}`} src={brief.radar} className={`${iframeClasses} mt-4`} allowFullScreen />
            </ModuleCard>
          ))}
        </div>
      );

    case "map":
      return (
        <div className="space-y-4">
          <p className="text-[10px] uppercase tracking-[0.4em] text-amber-200/70">Interactive Map</p>
          <h3 className="text-2xl font-semibold text-white">Project Footprint</h3>
          <p className="text-sm text-white/70">
            Pinpoint project locations, crew staging, and weather overlays. Switch between jobs to confirm logistics for deliveries
            and travel time.
          </p>
          <div className="flex flex-wrap gap-2">
            {projectLocations.map((location) => (
              <a
                key={location.id}
                href={`https://maps.google.com/maps?q=${encodeURIComponent(location.query)}&z=12`}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/15 px-4 py-2 text-[10px] uppercase tracking-[0.4em] text-white/80 hover:border-amber-200/60"
              >
                {location.label}
              </a>
            ))}
          </div>
          {projectLocations.map((location) => (
            <iframe
              key={`map-${location.id}`}
              title={`map-${location.id}`}
              src={`https://maps.google.com/maps?q=${encodeURIComponent(location.query)}&z=12&output=embed`}
              className={`${iframeClasses} mt-4`}
              allowFullScreen
            />
          ))}
        </div>
      );

    case "invoices":
      return (
        <EditableTable
          collection="invoices"
          title="Invoices"
          description="Billing visibility"
          role={role}
          allowEditRoles={["ADMIN"]}
          columns={[
            { key: "id", label: "ID" },
            { key: "client", label: "Client" },
            { key: "amount", label: "Amount" },
            { key: "status", label: "Status" }
          ]}
          newEntryLabel="Add Invoice"
        />
      );

    case "clientPortal":
      return (
        <div className="space-y-6">
          <EditableTable
            collection="documents"
            title="Document Vault"
            description="Contracts, permits, warranties"
            role={role}
            allowEditRoles={["ADMIN"]}
            columns={[
              { key: "id", label: "ID" },
              { key: "title", label: "Title" },
              { key: "access", label: "Access" },
              { key: "updated", label: "Updated" }
            ]}
            newEntryLabel="Add Document"
          />
          <EditableTable
            collection="careGuides"
            title="Care Guides"
            description="Client education"
            role={role}
            allowEditRoles={["ADMIN", "CLIENT"]}
            columns={[
              { key: "id", label: "ID" },
              { key: "scope", label: "Scope" },
              { key: "summary", label: "Summary", type: "textarea", rows: 2 },
              { key: "shopLink", label: "Shop Link" }
            ]}
            newEntryLabel="Add Care Guide"
          />
        </div>
      );

    case "analytics":
      return (
        <ModuleCard title="Analytics" subtitle="Predictive" accent="purple">
          <p className="text-sm text-white/80">
            Track revenue velocity, crew utilization, and forecast backlog. Integrate Power BI or Looker Studio dashboards for
            deep analytics—all within the Creative Ops shell.
          </p>
        </ModuleCard>
      );

    case "security":
      return (
        <ModuleCard title="Security &amp; Audit" subtitle="Shield" accent="emerald">
          <ul className="space-y-3 text-sm text-white/80">
            <li>• WebAuthn + TOTP enforced for admin accounts.</li>
            <li>• IP whitelisting available for office and secure remote networks.</li>
            <li>• Immutable audit log for payouts, change orders, and document access.</li>
          </ul>
        </ModuleCard>
      );

    case "admin":
      return (
        <ModuleCard title="Role Management" subtitle="Control" accent="gold">
          <p className="text-sm text-white/80">
            Admins assign roles, activate MFA, and configure approval chains. Promote apprentices into crew, crew into team leads,
            and eventually foreman based on certifications uploaded in the Contractor tab.
          </p>
        </ModuleCard>
      );

    case "settings":
      return (
        <ModuleCard title="Settings" subtitle="Preferences" accent="purple">
          <p className="text-sm text-white/80">
            Customize notification channels, set weather alert thresholds, toggle immersive soundscapes, and manage offline cache
            refresh schedules for field tablets.
          </p>
        </ModuleCard>
      );

    case "client":
      return (
        <div className="space-y-6">
          <ModuleCard title="Project Snapshot" subtitle="Client View" accent="gold">
            <ul className="space-y-3 text-sm text-white/80">
              <li>• Progress: {data.clients[0]?.progress ?? "--"}</li>
              <li>• Next milestone: {data.clients[0]?.nextStep ?? "--"}</li>
              <li>• Access invoices, receipts, permits, dig ticket numbers, and signed contracts in the Document Vault.</li>
            </ul>
          </ModuleCard>
          <ModuleCard title="Care &amp; Shop" subtitle="Experience" accent="emerald">
            <p className="text-sm text-white/80">
              Explore care guides tailored to the project scope with direct links into the Creative Ops shop for accessories, stain
              kits, lighting, and upgrades.
            </p>
          </ModuleCard>
        </div>
      );

    case "training":
      return (
        <EditableTable
          collection="training"
          title="Apprentice Academy"
          description="Onboarding modules"
          role={role}
          allowEditRoles={["ADMIN", "TEAM_LEAD"]}
          columns={[
            { key: "id", label: "ID" },
            { key: "module", label: "Module" },
            { key: "format", label: "Format" },
            { key: "status", label: "Status" }
          ]}
          newEntryLabel="Add Module"
        />
      );

    case "portfolio":
      return (
        <ModuleCard title="Creative Ops" subtitle="Company" accent="gold">
          <p className="text-sm text-white/80">
            Creative Deck &amp; Fence, LLC orchestrates fencing, decking, and outdoor living spaces with precision. This portfolio view
            keeps prospective clients entertained while awaiting admin approval and tier assignment.
          </p>
        </ModuleCard>
      );

    default:
      return (
        <ModuleCard title="Module" subtitle="Coming Soon" accent="purple">
          <p className="text-sm text-white/80">Immersive module content is on the way.</p>
        </ModuleCard>
      );
  }
};

export default TabContent;
