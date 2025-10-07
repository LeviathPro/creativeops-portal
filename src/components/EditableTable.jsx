import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useData } from "./DataContext";

const createEmptyRow = (columns) =>
  columns.reduce((acc, column) => {
    acc[column.key] = column.defaultValue ?? "";
    return acc;
  }, {});

const InputField = ({ column, value, onChange }) => {
  const commonClasses =
    "w-full rounded-2xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/40 focus:border-amber-400 focus:outline-none";
  if (column.type === "textarea") {
    return (
      <textarea
        rows={column.rows ?? 3}
        className={`${commonClasses} resize-none`}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    );
  }
  if (column.type === "number") {
    return (
      <input
        type="number"
        className={commonClasses}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    );
  }
  if (column.type === "select" && column.options) {
    return (
      <select
        className={`${commonClasses} bg-black/50`}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {column.options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }
  return (
    <input
      type="text"
      className={commonClasses}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  );
};

const EditableTable = ({
  collection,
  title,
  description,
  columns,
  role,
  allowEditRoles = ["ADMIN"],
  newEntryLabel = "Add Entry"
}) => {
  const {
    data,
    actions: { addEntry, updateEntry, removeEntry }
  } = useData();
  const rows = data[collection] ?? [];
  const canEdit = allowEditRoles.includes(role);
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState({});
  const [newRow, setNewRow] = useState(() => createEmptyRow(columns));
  const [error, setError] = useState("");

  useEffect(() => {
    setNewRow(() => createEmptyRow(columns));
  }, [collection, columns]);

  const handleStartEdit = (row) => {
    setEditingId(row.id);
    setDraft(row);
  };

  const handleSave = () => {
    if (!editingId) return;
    updateEntry(collection, editingId, draft);
    setEditingId(null);
  };

  const handleDelete = (id) => {
    removeEntry(collection, id);
  };

  const handleAdd = () => {
    if (!newRow.id) {
      setError("ID is required before saving a new entry.");
      return;
    }
    setError("");
    addEntry(collection, newRow);
    setNewRow(() => createEmptyRow(columns));
  };

  const tableHeader = useMemo(
    () => (
      <div className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-3 text-[10px] uppercase tracking-[0.3em] text-white/60">
        {columns.map((column) => (
          <span key={column.key}>{column.label}</span>
        ))}
        {canEdit && <span>Actions</span>}
      </div>
    ),
    [columns, canEdit]
  );

  return (
    <motion.section
      layout
      className="space-y-4 rounded-3xl border border-white/10 bg-black/55 p-5 shadow-[0_20px_60px_rgba(16,24,40,0.45)]"
    >
      <div className="space-y-1">
        <p className="text-[10px] uppercase tracking-[0.45em] text-amber-200/70">{description}</p>
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>

      {canEdit && (
        <div className="space-y-3 rounded-2xl border border-white/5 bg-white/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/60">Create New</p>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-3">
            {columns.map((column) => (
              <InputField
                key={`new-${column.key}`}
                column={column}
                value={newRow[column.key] ?? ""}
                onChange={(value) => setNewRow((prev) => ({ ...prev, [column.key]: value }))}
              />
            ))}
          </div>
          {error && <p className="text-xs text-rose-300">{error}</p>}
          <div className="flex justify-end">
            <button
              onClick={handleAdd}
              className="rounded-full bg-gradient-to-r from-amber-400/80 to-orange-500/70 px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-black shadow-lg shadow-amber-500/30"
            >
              {newEntryLabel}
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {tableHeader}
        <div className="space-y-3">
          {rows.map((row) => {
            const isEditing = editingId === row.id;
            return (
              <motion.div
                layout
                key={row.id}
                className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-3 rounded-2xl border border-white/5 bg-white/5 p-4 text-sm text-white/80"
              >
                {columns.map((column) => (
                  <div key={`${row.id}-${column.key}`} className="flex flex-col gap-1">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">{column.label}</span>
                    {isEditing ? (
                      <InputField
                        column={column}
                        value={draft[column.key] ?? ""}
                        onChange={(value) => setDraft((prev) => ({ ...prev, [column.key]: value }))}
                      />
                    ) : (
                      <span className="text-sm text-white/80">{row[column.key]}</span>
                    )}
                  </div>
                ))}
                {canEdit && (
                  <div className="flex flex-col items-end justify-center gap-2">
                    {isEditing ? (
                      <>
                        <button
                          onClick={handleSave}
                          className="w-full rounded-full bg-emerald-400/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-black"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="w-full rounded-full border border-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-white/70"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleStartEdit(row)}
                          className="w-full rounded-full border border-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-white/80"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(row.id)}
                          className="w-full rounded-full border border-rose-200/40 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-rose-200/80"
                        >
                          Remove
                        </button>
                      </>
                    )}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
        {!rows.length && (
          <div className="rounded-2xl border border-dashed border-white/20 bg-black/40 p-6 text-center text-sm text-white/60">
            No records yet. {canEdit ? "Use the form above to create the first entry." : "Contact your administrator for access."}
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default EditableTable;
