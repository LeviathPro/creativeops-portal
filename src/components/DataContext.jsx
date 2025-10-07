import React, { createContext, useContext, useMemo, useState } from "react";

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
    { id: "TR-101", module: "Deck Footing Safety", format: "AR Scenario", status: "Available" },
    { id: "TR-102", module: "Fence Post Alignment", format: "Video + Quiz", status: "Assigned" }
  ],
  documents: [
    { id: "DOC-001", title: "Master Contract Template", access: "Admin", updated: "2024-06-04" },
    { id: "DOC-002", title: "Client Welcome Packet", access: "Client", updated: "2024-06-08" }
  ],
  alerts: [
    { id: "ALT-01", message: "Lightning alert triggered for Kenton site", severity: "High" },
    { id: "ALT-02", message: "Permit reminder: Henderson fence", severity: "Medium" }
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
  ]
};

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(initialData);

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
      actions: { updateEntry, addEntry, removeEntry }
    }),
    [data]
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

