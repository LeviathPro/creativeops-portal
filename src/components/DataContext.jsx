import React, { createContext, useContext, useMemo, useState } from "react";

const themesCatalog = [
  {
    id: "luminous",
    label: "Luminous Singularity",
    description: "White and gold quantum void with radiant equations"
  },
  {
    id: "midnight",
    label: "Midnight Grid",
    description: "Deep navy command center with cyan pulse work"
  }
];

const initialData = {
  contractors: [
    {
      id: "CTR-001",
      name: "Jamie Rivers",
      role: "Foreman",
      certifications: "OSHA 30, Forklift",
      skills: "Composite decking, crew leadership",
      status: "Active"
    },
    {
      id: "CTR-002",
      name: "Morgan Lee",
      role: "Team Lead",
      certifications: "OSHA 10",
      skills: "Rail systems, site logistics",
      status: "Active"
    }
  ],
  jobs: [
    {
      id: "JOB-1042",
      client: "Miller Residence",
      scope: "Two-tier Trex deck with lighting",
      location: "Findlay, OH",
      timeline: "Framing",
      crew: "Foreman Rivers",
      blueprint: "Deck_Lumina_v4.pdf"
    },
    {
      id: "JOB-1043",
      client: "Henderson Property",
      scope: "Perimeter fencing + privacy panels",
      location: "Bowling Green, OH",
      timeline: "Permitting",
      crew: "Team Lead Lee",
      blueprint: "Fence_Prism_v2.pdf"
    }
  ],
  timesheets: [
    { id: "TS-001", crew: "Crew A", day: "2024-06-10", hours: 9, weather: "Findlay, OH — 78°F / Clear" },
    { id: "TS-002", crew: "Crew B", day: "2024-06-10", hours: 8.5, weather: "Kenton, OH — 75°F / Partly Cloudy" }
  ],
  materials: [
    { id: "MAT-001", item: "Trex Transcend Board", vendor: "Lowe's", quantity: 180, status: "Scheduled" },
    { id: "MAT-002", item: "6x6 Posts", vendor: "Menards", quantity: 40, status: "Delivered" }
  ],
  payouts: [
    { id: "ACH-7421", recipient: "Jamie Rivers", amount: 1840, status: "Pending Approval" },
    { id: "ACH-7422", recipient: "Morgan Lee", amount: 1620, status: "Queued" }
  ],
  form1099: [
    {
      id: "1099-2024-01",
      contractor: "Jamie Rivers",
      taxYear: "2024",
      status: "Draft",
      notes: "Awaiting W-9 verification"
    },
    {
      id: "1099-2024-02",
      contractor: "Morgan Lee",
      taxYear: "2024",
      status: "Filed",
      notes: "Submitted via IRIS"
    }
  ],
  invoices: [
    { id: "INV-9001", client: "Miller Residence", amount: 24800, status: "Awaiting Client" },
    { id: "INV-9002", client: "Henderson Property", amount: 18650, status: "Approved" }
  ],
  changeOrders: [
    { id: "CO-301", project: "Miller Residence", request: "Add LED stair lighting", delta: "$1,450", status: "Client Reviewing" },
    { id: "CO-302", project: "Henderson Property", request: "Upgrade to cedar privacy panels", delta: "$2,180", status: "Approved" }
  ],
  careGuides: [
    { id: "CG-001", scope: "Composite Deck", summary: "Heat gun scratch repair, seasonal wash schedule", shopLink: "Trex cleaning kit" },
    { id: "CG-002", scope: "Cedar Fence", summary: "Annual staining, moisture barrier tips", shopLink: "Creative Ops stain" }
  ],
  training: [
    { id: "TR-101", module: "Deck Footing Safety", format: "AR Scenario", status: "Available", audience: "Apprentice" },
    { id: "TR-102", module: "Fence Post Alignment", format: "Video + Quiz", status: "Assigned", audience: "Crew" },
    { id: "TR-103", module: "Foreman Leadership Pulse", format: "Live Workshop", status: "Scheduled", audience: "Foreman" }
  ],
  documents: [
    { id: "DOC-001", title: "Master Contract Template", access: "Admin", updated: "2024-06-04" },
    { id: "DOC-002", title: "Client Welcome Packet", access: "Client", updated: "2024-06-08" }
  ],
  alerts: [
    { id: "ALT-01", message: "Lightning alert triggered for Kenton site", severity: "High" },
    { id: "ALT-02", message: "Permit reminder: Henderson fence", severity: "Medium" }
  ],
  weatherStations: [
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
  ],
  clients: [
    {
      id: "CLIENT-001",
      name: "Amanda & Chris Miller",
      contact: "amanda.miller@example.com",
      project: "Miller Residence",
      progress: "65%",
      nextStep: "Electrical rough-in"
    },
    {
      id: "CLIENT-002",
      name: "Henderson HOA",
      contact: "board@hendersonhoa.org",
      project: "Henderson Property",
      progress: "12%",
      nextStep: "Permit hearing"
    }
  ],
  approvals: [
    { id: "APP-001", item: "ACH-7421", owner: "Stacy Grohoske", status: "Awaiting" },
    { id: "APP-002", item: "INV-9001", owner: "Leviath Productions", status: "Needs Review" }
  ],
  schedules: [
    {
      id: "SCH-001",
      role: "Foreman",
      date: "2024-06-12",
      assignment: "Miller Residence — Deck Framing",
      crew: "Alpha",
      site: "Findlay, OH",
      start: "07:00",
      end: "15:30"
    },
    {
      id: "SCH-002",
      role: "Team Lead",
      date: "2024-06-12",
      assignment: "Henderson Fence Layout",
      crew: "Bravo",
      site: "Bowling Green, OH",
      start: "08:00",
      end: "16:00"
    }
  ],
  payroll: [
    {
      id: "PAY-001",
      name: "Jamie Rivers",
      role: "Foreman",
      weekEnding: "2024-06-08",
      hours: 44,
      gross: "$2,640",
      status: "Approved"
    },
    {
      id: "PAY-002",
      name: "Morgan Lee",
      role: "Team Lead",
      weekEnding: "2024-06-08",
      hours: 42,
      gross: "$2,142",
      status: "Processing"
    }
  ],
  timeOff: [
    {
      id: "TO-001",
      name: "Crew Member",
      role: "Crew",
      date: "2024-06-14",
      reason: "Family commitment",
      status: "Pending"
    },
    {
      id: "TO-002",
      name: "Apprentice Nova",
      role: "Apprentice",
      date: "2024-06-18",
      reason: "Certification exam",
      status: "Approved"
    }
  ],
  quotes: [
    {
      id: "Q-4501",
      client: "Barton Estate",
      scope: "Multi-level deck with pergola",
      estimator: "Leviath Productions",
      value: "$48,900",
      status: "Issued"
    },
    {
      id: "Q-4502",
      client: "Parker Residence",
      scope: "Horizontal privacy fence",
      estimator: "Stacy Grohoske",
      value: "$12,760",
      status: "Draft"
    }
  ],
  analyticsReports: [
    {
      id: "AN-001",
      name: "Backlog Velocity",
      cadence: "Weekly",
      owner: "Operations AI",
      notes: "Forecast indicates 18% uplift in July"
    },
    {
      id: "AN-002",
      name: "Crew Utilization",
      cadence: "Daily",
      owner: "Field Ops",
      notes: "Alpha crew at 92% capacity"
    }
  ],
  securityControls: [
    {
      id: "SEC-01",
      control: "WebAuthn Enforcement",
      scope: "Admin",
      status: "Enabled",
      owner: "Stacy"
    },
    {
      id: "SEC-02",
      control: "IP Whitelist",
      scope: "HQ",
      status: "Active",
      owner: "Levi"
    }
  ],
  adminTasks: [
    {
      id: "ADM-01",
      user: "Apprentice Nova",
      request: "Promote to Crew",
      status: "Queued",
      notes: "Completed deck footing safety"
    },
    {
      id: "ADM-02",
      user: "Client Aurora",
      request: "Client portal activation",
      status: "Approved",
      notes: "Notified via email"
    }
  ],
  notificationChannels: [
    {
      id: "NT-01",
      channel: "SMS",
      description: "Send alerts to Stacy",
      status: "Active"
    },
    {
      id: "NT-02",
      channel: "Email",
      description: "Daily digest to Levi",
      status: "Active"
    }
  ]
};

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(initialData);
  const [theme, setTheme] = useState(themesCatalog[0].id);

  React.useEffect(() => {
    const body = document.body;
    if (!body) return;
    themesCatalog.forEach((themeOption) => body.classList.remove(`theme-${themeOption.id}`));
    body.classList.add(`theme-${theme}`);
  }, [theme]);

  const updateEntry = (collection, id, changes) => {
    setData((prev) => ({
      ...prev,
      [collection]: (prev[collection] ?? []).map((entry) =>
        entry.id === id ? { ...entry, ...changes } : entry
      )
    }));
  };

  const addEntry = (collection, entry) => {
    setData((prev) => ({
      ...prev,
      [collection]: [...(prev[collection] ?? []), entry]
    }));
  };

  const removeEntry = (collection, id) => {
    setData((prev) => ({
      ...prev,
      [collection]: (prev[collection] ?? []).filter((entry) => entry.id !== id)
    }));
  };

  const value = useMemo(
    () => ({
      data,
      theme,
      themes: themesCatalog,
      setTheme,
      actions: { updateEntry, addEntry, removeEntry }
    }),
    [data, theme]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};

