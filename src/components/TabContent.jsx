import React, { useEffect, useMemo, useState } from "react";
import {
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
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

const iframeClasses = "h-72 w-full rounded-3xl border border-white/10";

const TabContent = ({ activeTab, role, user }) => {
  const { data, theme, themes, setTheme, actions } = useData();
  const [selectedWeatherId, setSelectedWeatherId] = useState(data.weatherStations?.[0]?.id ?? null);
  const [timeOffDraft, setTimeOffDraft] = useState({ date: "", reason: "" });

  const projectLocations = useMemo(
    () =>
      data.jobs.map((job) => ({
        id: job.id,
        label: `${job.client} — ${job.location}`,
        query: `${job.location} ${job.client}`
      })),
    [data.jobs]
  );

  useEffect(() => {
    if (!data.weatherStations?.length) return;
    if (!selectedWeatherId || !data.weatherStations.some((station) => station.id === selectedWeatherId)) {
      setSelectedWeatherId(data.weatherStations[0].id);
    }
  }, [data.weatherStations, selectedWeatherId]);

  const selectedWeather = useMemo(
    () => data.weatherStations?.find((station) => station.id === selectedWeatherId) ?? data.weatherStations?.[0],
    [data.weatherStations, selectedWeatherId]
  );

  const handleTimeOffRequest = () => {
    if (!timeOffDraft.date || !timeOffDraft.reason) return;
    const requestId = `TO-${Date.now()}`;
    actions.addEntry("timeOff", {
      id: requestId,
      name: user?.name ?? "Team Member",
      role: role,
      date: timeOffDraft.date,
      reason: timeOffDraft.reason,
      status: "Pending"
    });
    setTimeOffDraft({ date: "", reason: "" });
  };

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
                  <LineChart data={weeklyPerformance} margin={{ top: 12, right: 24, left: -12, bottom: 0 }}>
                    <defs>
                      <linearGradient id="jobsGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#fef08a" stopOpacity={0.95} />
                        <stop offset="100%" stopColor="#facc15" stopOpacity={0.4} />
                      </linearGradient>
                      <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#f97316" stopOpacity={0.9} />
                        <stop offset="100%" stopColor="#fb923c" stopOpacity={0.35} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" stroke="rgba(255,255,255,0.65)" tickLine={false} axisLine={false} />
                    <YAxis
                      yAxisId="jobs"
                      stroke="rgba(255,255,255,0.65)"
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `${value} crews`}
                    />
                    <YAxis
                      yAxisId="revenue"
                      orientation="right"
                      stroke="rgba(255,255,255,0.65)"
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(15,23,42,0.9)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "1rem",
                        color: "#fff"
                      }}
                      labelStyle={{ textTransform: "uppercase", letterSpacing: "0.3em", fontSize: "0.6rem" }}
                    />
                    <Legend
                      verticalAlign="top"
                      height={28}
                      wrapperStyle={{
                        color: "rgba(255,255,255,0.75)",
                        fontSize: "0.6rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.3em"
                      }}
                      formatter={(value) => (value === "jobs" ? "Crew Deployments" : "Revenue")}
                    />
                    <Line
                      yAxisId="jobs"
                      type="monotone"
                      dataKey="jobs"
                      stroke="url(#jobsGradient)"
                      strokeWidth={3}
                      dot={{ r: 4, stroke: "rgba(255,255,255,0.7)", strokeWidth: 1.5 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line
                      yAxisId="revenue"
                      type="monotone"
                      dataKey="revenue"
                      stroke="url(#revenueGradient)"
                      strokeWidth={3.5}
                      dot={{ r: 4, stroke: "rgba(255,255,255,0.7)", strokeWidth: 1.5 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </ModuleCard>

            <ModuleCard title="Payout Distribution" subtitle="Finance" accent="purple">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <defs>
                      {COLORS.map((color, index) => (
                        <linearGradient
                          key={`payout-gradient-${index}`}
                          id={`payoutGradient-${index}`}
                          x1="0"
                          y1="0"
                          x2="1"
                          y2="1"
                        >
                          <stop offset="0%" stopColor={color} stopOpacity={0.95} />
                          <stop offset="100%" stopColor="rgba(255,255,255,0.35)" />
                        </linearGradient>
                      ))}
                    </defs>
                    <Pie
                      data={payoutMix}
                      dataKey="value"
                      nameKey="name"
                      innerRadius="45%"
                      outerRadius="80%"
                      paddingAngle={4}
                      stroke="rgba(255,255,255,0.25)"
                      strokeWidth={1.5}
                    >
                      {payoutMix.map((entry, index) => (
                        <Cell key={entry.name} fill={`url(#payoutGradient-${index})`} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(15,23,42,0.9)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "1rem",
                        color: "#fff"
                      }}
                      formatter={(value, _name, item) => [`${value}%`, item?.payload?.name ?? ""]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-5 grid gap-2 text-[0.6rem] uppercase tracking-[0.35em] text-white/70">
                {payoutMix.map((entry, index) => (
                  <div key={entry.name} className="flex items-center justify-between rounded-full bg-white/5 px-3 py-1">
                    <span className="flex items-center gap-2">
                      <span
                        className="inline-block h-2.5 w-2.5 rounded-full"
                        style={{ background: COLORS[index % COLORS.length] }}
                      />
                      {entry.name}
                    </span>
                    <span>{entry.value}%</span>
                  </div>
                ))}
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
                { key: "id", label: "ID", placeholder: "e.g., APP-003" },
                { key: "item", label: "Item", placeholder: "ACH batch or invoice" },
                { key: "owner", label: "Owner", placeholder: "Assign approver" },
                { key: "status", label: "Status", placeholder: "Pending / Approved" }
              ]}
              newEntryLabel="Add Approval"
            />
            <ModuleCard title="Weather Intel" subtitle="Site Conditions" accent="gold">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {data.weatherStations?.map((brief) => (
                    <button
                      key={brief.id}
                      onClick={() => setSelectedWeatherId(brief.id)}
                      className={`rounded-full border px-4 py-1 text-[10px] uppercase tracking-[0.4em] transition ${
                        selectedWeather?.id === brief.id
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
                  <p className="text-lg font-semibold text-white">{selectedWeather?.today ?? "--"}</p>
                  <p className="mt-2 text-xs text-white/70">{selectedWeather?.outlook ?? "Set forecast"}</p>
                </div>
                {selectedWeather && (
                  <iframe
                    title={`radar-${selectedWeather.id}`}
                    src={selectedWeather.radar}
                    className={iframeClasses}
                    allowFullScreen
                  />
                )}
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
            { key: "id", label: "ID", placeholder: "e.g., CTR-003" },
            { key: "name", label: "Name", placeholder: "Contractor name" },
            { key: "role", label: "Role", placeholder: "Foreman / Crew" },
            {
              key: "certifications",
              label: "Certifications",
              type: "textarea",
              rows: 2,
              placeholder: "List OSHA, equipment, etc."
            },
            { key: "skills", label: "Skills", type: "textarea", rows: 2, placeholder: "Key capabilities" },
            { key: "status", label: "Status", placeholder: "Active / Onboarding" }
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
              { key: "id", label: "ID", placeholder: "e.g., JOB-1044" },
              { key: "client", label: "Client", placeholder: "Client name" },
              { key: "scope", label: "Scope", type: "textarea", rows: 2, placeholder: "Deck, fence, etc." },
              { key: "location", label: "Location", placeholder: "City, State" },
              { key: "timeline", label: "Timeline", placeholder: "Phase or milestone" },
              { key: "crew", label: "Crew", placeholder: "Assigned crew" },
              { key: "blueprint", label: "Blueprint", placeholder: "File reference" }
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
              { key: "id", label: "Batch ID", placeholder: "e.g., ACH-7423" },
              { key: "recipient", label: "Recipient", placeholder: "Payee" },
              { key: "amount", label: "Amount", placeholder: "$0.00" },
              { key: "status", label: "Status", placeholder: "Pending / Approved" }
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

    case "payroll":
      return (
        <EditableTable
          collection="payroll"
          title="Payroll Summary"
          description="Weekly payouts"
          role={role}
          allowEditRoles={["ADMIN"]}
          columns={[
            { key: "id", label: "ID", placeholder: "e.g., PAY-003" },
            { key: "name", label: "Team Member", placeholder: "Crew member" },
            { key: "role", label: "Role", placeholder: "Crew / Foreman" },
            { key: "weekEnding", label: "Week Ending", placeholder: "YYYY-MM-DD" },
            { key: "hours", label: "Hours", placeholder: "0" },
            { key: "gross", label: "Gross", placeholder: "$0.00" },
            { key: "status", label: "Status", placeholder: "Approved / Processing" }
          ]}
          newEntryLabel="Add Payroll Record"
        />
      );

    case "form1099":
      return (
        <EditableTable
          collection="form1099"
          title="1099 Filings"
          description="Compliance queue"
          role={role}
          allowEditRoles={["ADMIN"]}
          columns={[
            { key: "id", label: "ID", placeholder: "e.g., 1099-2024-01" },
            { key: "contractor", label: "Contractor", placeholder: "Recipient name" },
            { key: "taxYear", label: "Tax Year", placeholder: "2024" },
            { key: "status", label: "Status", placeholder: "Draft / Filed" },
            { key: "notes", label: "Notes", type: "textarea", rows: 2, placeholder: "Submission detail" }
          ]}
          newEntryLabel="Add Filing"
        />
      );

    case "schedule":
      return (
        <EditableTable
          collection="schedules"
          title="Scheduling Matrix"
          description="Crew assignments"
          role={role}
          allowEditRoles={["ADMIN", "FOREMAN"]}
          columns={[
            { key: "id", label: "ID", placeholder: "e.g., SCH-003" },
            { key: "role", label: "Role", placeholder: "Crew / Foreman" },
            { key: "date", label: "Date", placeholder: "YYYY-MM-DD" },
            { key: "assignment", label: "Assignment", type: "textarea", rows: 2, placeholder: "Task summary" },
            { key: "crew", label: "Crew", placeholder: "Crew name" },
            { key: "site", label: "Site", placeholder: "Project location" },
            { key: "start", label: "Start", placeholder: "07:00" },
            { key: "end", label: "End", placeholder: "15:30" }
          ]}
          newEntryLabel="Add Schedule"
        />
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
            { key: "id", label: "ID", placeholder: "e.g., MAT-003" },
            { key: "item", label: "Item", placeholder: "Material description" },
            { key: "vendor", label: "Vendor", placeholder: "Supplier" },
            { key: "quantity", label: "Quantity", placeholder: "0" },
            { key: "status", label: "Status", placeholder: "Ordered / Delivered" }
          ]}
          newEntryLabel="Add Material"
        />
      );

    case "quotes":
      return (
        <EditableTable
          collection="quotes"
          title="Quotes &amp; Estimates"
          description="Sales intelligence"
          role={role}
          allowEditRoles={["ADMIN"]}
          columns={[
            { key: "id", label: "ID", placeholder: "e.g., Q-4503" },
            { key: "client", label: "Client", placeholder: "Client name" },
            { key: "scope", label: "Scope", type: "textarea", rows: 2, placeholder: "Project summary" },
            { key: "estimator", label: "Estimator", placeholder: "Owner" },
            { key: "value", label: "Value", placeholder: "$0.00" },
            { key: "status", label: "Status", placeholder: "Draft / Issued" }
          ]}
          newEntryLabel="Add Quote"
        />
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
            { key: "id", label: "ID", placeholder: "e.g., CO-303" },
            { key: "project", label: "Project", placeholder: "Project name" },
            { key: "request", label: "Request", type: "textarea", rows: 2, placeholder: "Upgrade description" },
            { key: "delta", label: "Delta", placeholder: "$0.00" },
            { key: "status", label: "Status", placeholder: "Pending / Approved" }
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
            { key: "id", label: "ID", placeholder: "e.g., TS-003" },
            { key: "crew", label: "Crew", placeholder: "Crew name" },
            { key: "day", label: "Day", placeholder: "YYYY-MM-DD" },
            { key: "hours", label: "Hours", placeholder: "0" },
            { key: "weather", label: "Weather", placeholder: "Site weather" }
          ]}
          newEntryLabel="Add Entry"
        />
      );

    case "timeOff":
      return (
        <div className="space-y-6">
          {role !== "ADMIN" && (
            <ModuleCard title="Request Time Off" subtitle="Crew portal" accent="emerald">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-[0.4em] text-white/60">Date</label>
                  <input
                    type="date"
                    value={timeOffDraft.date}
                    onChange={(event) => setTimeOffDraft((prev) => ({ ...prev, date: event.target.value }))}
                    className="rounded-2xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-[0.4em] text-white/60">Reason</label>
                  <textarea
                    rows={3}
                    value={timeOffDraft.reason}
                    onChange={(event) => setTimeOffDraft((prev) => ({ ...prev, reason: event.target.value }))}
                    placeholder="Explain why you need time away"
                    className="rounded-2xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder:italic placeholder-white/50 focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs text-white/60">Admins will review and update the status in real time.</p>
                <button
                  onClick={handleTimeOffRequest}
                  disabled={!timeOffDraft.date || !timeOffDraft.reason}
                  className={`rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] shadow-lg transition ${
                    timeOffDraft.date && timeOffDraft.reason
                      ? "bg-gradient-to-r from-emerald-400/80 to-teal-500/80 text-black"
                      : "bg-white/10 text-white/40"
                  }`}
                >
                  Submit Request
                </button>
              </div>
            </ModuleCard>
          )}
          <EditableTable
            collection="timeOff"
            title="Time Off Ledger"
            description="Approvals &amp; status"
            role={role}
            allowEditRoles={["ADMIN"]}
            allowCreateRoles={["ADMIN"]}
            allowRemoveRoles={["ADMIN"]}
            columns={[
              { key: "id", label: "ID", placeholder: "e.g., TO-003" },
              { key: "name", label: "Name", placeholder: "Team member" },
              { key: "role", label: "Role", placeholder: "Crew / Apprentice" },
              { key: "date", label: "Date", placeholder: "YYYY-MM-DD" },
              { key: "reason", label: "Reason", type: "textarea", rows: 2, placeholder: "Why" },
              { key: "status", label: "Status", placeholder: "Pending / Approved" }
            ]}
            newEntryLabel="Add Time Off"
          />
        </div>
      );

    case "weather":
      return (
        <div className="space-y-6">
          {data.weatherStations?.map((brief) => (
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
            { key: "id", label: "ID", placeholder: "e.g., INV-9003" },
            { key: "client", label: "Client", placeholder: "Client name" },
            { key: "amount", label: "Amount", placeholder: "$0.00" },
            { key: "status", label: "Status", placeholder: "Awaiting / Paid" }
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
              { key: "id", label: "ID", placeholder: "e.g., DOC-003" },
              { key: "title", label: "Title", placeholder: "Document name" },
              { key: "access", label: "Access", placeholder: "Admin / Client" },
              { key: "updated", label: "Updated", placeholder: "YYYY-MM-DD" }
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
              { key: "id", label: "ID", placeholder: "e.g., CG-003" },
              { key: "scope", label: "Scope", placeholder: "Deck / Fence" },
              { key: "summary", label: "Summary", type: "textarea", rows: 2, placeholder: "Care overview" },
              { key: "shopLink", label: "Shop Link", placeholder: "Accessory or URL" }
            ]}
            newEntryLabel="Add Care Guide"
          />
        </div>
      );

    case "analytics":
      return (
        <EditableTable
          collection="analyticsReports"
          title="Analytics Library"
          description="AI + BI signals"
          role={role}
          allowEditRoles={["ADMIN"]}
          columns={[
            { key: "id", label: "ID", placeholder: "e.g., AN-003" },
            { key: "name", label: "Report", placeholder: "Report name" },
            { key: "cadence", label: "Cadence", placeholder: "Daily / Weekly" },
            { key: "owner", label: "Owner", placeholder: "Ops / Finance" },
            { key: "notes", label: "Notes", type: "textarea", rows: 2, placeholder: "Highlights" }
          ]}
          newEntryLabel="Add Report"
        />
      );

    case "security":
      return (
        <EditableTable
          collection="securityControls"
          title="Security Controls"
          description="Shield posture"
          role={role}
          allowEditRoles={["ADMIN"]}
          columns={[
            { key: "id", label: "ID", placeholder: "e.g., SEC-03" },
            { key: "control", label: "Control", placeholder: "Security control" },
            { key: "scope", label: "Scope", placeholder: "Admin / Crew" },
            { key: "status", label: "Status", placeholder: "Active / Planned" },
            { key: "owner", label: "Owner", placeholder: "Owner" }
          ]}
          newEntryLabel="Add Control"
        />
      );

    case "admin":
      return (
        <EditableTable
          collection="adminTasks"
          title="Role Management"
          description="RBAC workflow"
          role={role}
          allowEditRoles={["ADMIN"]}
          columns={[
            { key: "id", label: "ID", placeholder: "e.g., ADM-03" },
            { key: "user", label: "User", placeholder: "Team member" },
            { key: "request", label: "Request", type: "textarea", rows: 2, placeholder: "Promotion / access" },
            { key: "status", label: "Status", placeholder: "Queued / Approved" },
            { key: "notes", label: "Notes", type: "textarea", rows: 2, placeholder: "Context" }
          ]}
          newEntryLabel="Add Admin Task"
        />
      );

    case "settings":
      return (
        <div className="space-y-6">
          <ModuleCard title="Theme Selection" subtitle="Experience" accent="purple">
            <p className="text-sm text-white/70">
              Choose the control-room aesthetic that best matches your mission. Themes update instantly across the portal.
            </p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {themes.map((option) => {
                const active = theme === option.id;
                return (
                  <button
                    key={option.id}
                    onClick={() => setTheme(option.id)}
                    className={`rounded-3xl border px-4 py-4 text-left transition ${
                      active
                        ? "border-amber-300 bg-amber-100/10 text-white"
                        : "border-white/15 text-white/80 hover:border-amber-200/40"
                    }`}
                  >
                    <p className="text-xs uppercase tracking-[0.4em] text-amber-200/70">{option.label}</p>
                    <p className="mt-2 text-sm text-white/80">{option.description}</p>
                  </button>
                );
              })}
            </div>
          </ModuleCard>
          <EditableTable
            collection="notificationChannels"
            title="Notifications"
            description="Alerts &amp; digests"
            role={role}
            allowEditRoles={["ADMIN"]}
            columns={[
              { key: "id", label: "ID", placeholder: "e.g., NT-03" },
              { key: "channel", label: "Channel", placeholder: "SMS / Email" },
              { key: "description", label: "Description", type: "textarea", rows: 2, placeholder: "Who receives it" },
              { key: "status", label: "Status", placeholder: "Active / Paused" }
            ]}
            newEntryLabel="Add Channel"
          />
        </div>
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
          <EditableTable
            collection="clients"
            title="Client Directory"
            description="Project access"
            role={role}
            allowEditRoles={["ADMIN"]}
            columns={[
              { key: "id", label: "ID", placeholder: "e.g., CLIENT-003" },
              { key: "name", label: "Name", placeholder: "Client name" },
              { key: "contact", label: "Contact", placeholder: "Email / phone" },
              { key: "project", label: "Project", placeholder: "Project title" },
              { key: "progress", label: "Progress", placeholder: "0%" },
              { key: "nextStep", label: "Next Step", placeholder: "Upcoming milestone" }
            ]}
            newEntryLabel="Add Client"
          />
        </div>
      );

    case "training":
      return (
        <EditableTable
          collection="training"
          title="Apprentice Academy"
          description="Onboarding modules"
          role={role}
          allowEditRoles={["ADMIN", "TEAM_LEAD", "FOREMAN"]}
          columns={[
            { key: "id", label: "ID", placeholder: "e.g., TR-104" },
            { key: "module", label: "Module", placeholder: "Training topic" },
            { key: "format", label: "Format", placeholder: "VR / Video" },
            { key: "status", label: "Status", placeholder: "Assigned / Complete" },
            { key: "audience", label: "Audience", placeholder: "Apprentice / Crew" }
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
