"use client";

import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { Trash2, Loader2, RefreshCw, Plus, X, Pencil, type LucideIcon } from "lucide-react";

export interface FieldConfig<TForm> {
  key: keyof TForm;
  label: string;
  type: "text" | "textarea" | "checkbox" | "number";
  required?: boolean;
  colSpan?: 1 | 2;
  placeholder?: string;
}

export interface ColumnConfig<T> {
  key: keyof T;
  label: string;
  render?: (item: T) => ReactNode;
}

export interface AdminResourcePageProps<T extends { id: string }, TForm> {
  routePath: string;
  title: string;
  itemLabel: string;
  emptyForm: TForm;
  fields: FieldConfig<TForm>[];
  columns: ColumnConfig<T>[];
  emptyIcon: LucideIcon;
  emptyMessage: string;
  fetchAll: () => Promise<T[]>;
  create: (payload: TForm) => Promise<string>;
  update: (id: string, payload: TForm) => Promise<void>;
  remove: (id: string) => Promise<void>;
  toForm: (item: T) => TForm;
  editNote?: string;
}

const inputClass =
  "mt-1 w-full rounded-lg border border-graphite/15 px-3 py-2.5 text-sm outline-none transition focus:border-signal focus:ring-2 focus:ring-signal/10";
const labelClass = "block font-mono text-xs uppercase tracking-wider text-graphite/50";

export default function AdminResourcePage<T extends { id: string }, TForm>({
  routePath,
  title,
  itemLabel,
  emptyForm,
  fields,
  columns,
  emptyIcon: EmptyIcon,
  emptyMessage,
  fetchAll,
  create,
  update,
  remove,
  toForm,
  editNote,
}: AdminResourcePageProps<T, TForm>) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<TForm>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchAll();
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : `Failed to load ${itemLabel.toLowerCase()}s.`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openCreateForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  };

  const openEditForm = (item: T) => {
    setForm(toForm(item));
    setEditingId(item.id);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      if (editingId) {
        await update(editingId, form);
      } else {
        await create(form);
      }
      closeForm();
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : `Failed to save ${itemLabel.toLowerCase()}.`);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await remove(id);
      setItems((prev) => prev.filter((item) => item.id !== id));
      setConfirmDeleteId(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : `Failed to delete ${itemLabel.toLowerCase()}.`);
    } finally {
      setDeletingId(null);
    }
  };

  const setFieldValue = (key: keyof TForm, value: string | boolean | number) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <span className="font-mono text-sm uppercase tracking-[0.2em] text-signal">
            {routePath}
          </span>
          <h1 className="mt-2 text-3xl font-semibold text-graphite">{title}</h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={load}
            disabled={loading}
            className="flex items-center gap-2 rounded-lg border border-graphite/15 bg-white px-4 py-2 text-sm font-medium text-graphite shadow-sm transition hover:border-signal hover:text-signal disabled:opacity-60"
          >
            <RefreshCw className={loading ? "h-4 w-4 animate-spin" : "h-4 w-4"} />
            Refresh
          </button>
          <button
            onClick={openCreateForm}
            className="flex items-center gap-2 rounded-lg bg-signal px-4 py-2 text-sm font-medium text-ink shadow-sm transition hover:brightness-110"
          >
            <Plus className="h-4 w-4" />
            New {itemLabel}
          </button>
        </div>
      </div>

      {error && (
        <div className="mt-6 rounded-lg border border-ember/40 bg-ember/10 px-4 py-3 text-sm text-ember">
          {error}
        </div>
      )}

      {showForm && (
        <div className="admin-fade-in mt-8 rounded-xl border border-graphite/10 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-graphite">
              {editingId ? `Edit ${itemLabel}` : `New ${itemLabel}`}
            </h2>
            <button onClick={closeForm} className="text-graphite/40 transition hover:text-graphite">
              <X className="h-5 w-5" />
            </button>
          </div>

          {editingId && editNote && (
            <p className="mt-2 text-xs text-graphite/50">{editNote}</p>
          )}

          <form onSubmit={handleSubmit} className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            {fields.map((field) => {
              const value = form[field.key];
              const spanClass = field.colSpan === 2 ? "md:col-span-2" : "";

              if (field.type === "checkbox") {
                return (
                  <div key={String(field.key)} className={`flex items-center gap-2 ${spanClass}`}>
                    <input
                      id={String(field.key)}
                      type="checkbox"
                      checked={Boolean(value)}
                      onChange={(e) => setFieldValue(field.key, e.target.checked)}
                      className="h-4 w-4 rounded border-graphite/30 text-signal focus:ring-signal/30"
                    />
                    <label htmlFor={String(field.key)} className="text-sm text-graphite">
                      {field.label}
                    </label>
                  </div>
                );
              }

              if (field.type === "textarea") {
                return (
                  <div key={String(field.key)} className={spanClass}>
                    <label className={labelClass}>{field.label}</label>
                    <textarea
                      required={field.required}
                      rows={3}
                      placeholder={field.placeholder}
                      value={String(value ?? "")}
                      onChange={(e) => setFieldValue(field.key, e.target.value)}
                      className={inputClass}
                    />
                  </div>
                );
              }

              return (
                <div key={String(field.key)} className={spanClass}>
                  <label className={labelClass}>{field.label}</label>
                  <input
                    type={field.type === "number" ? "number" : "text"}
                    required={field.required}
                    placeholder={field.placeholder}
                    value={String(value ?? "")}
                    onChange={(e) =>
                      setFieldValue(
                        field.key,
                        field.type === "number" ? Number(e.target.value) : e.target.value
                      )
                    }
                    className={inputClass}
                  />
                </div>
              );
            })}

            <div className="md:col-span-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={closeForm}
                className="rounded-lg border border-graphite/15 px-4 py-2 text-sm text-graphite/70 transition hover:bg-graphite/5"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 rounded-lg bg-signal px-4 py-2 text-sm font-medium text-ink shadow-sm transition hover:brightness-110 disabled:opacity-60"
              >
                {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                {editingId ? "Save Changes" : `Create ${itemLabel}`}
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="mt-10 flex items-center gap-2 text-graphite/60">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading {itemLabel.toLowerCase()}s...
        </div>
      ) : items.length === 0 ? (
        <div className="mt-10 flex flex-col items-center gap-3 rounded-xl border border-dashed border-graphite/15 bg-white/50 py-16 text-center">
          <EmptyIcon className="h-8 w-8 text-graphite/30" />
          <p className="text-graphite/60">{emptyMessage}</p>
        </div>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-xl border border-graphite/10 bg-white shadow-sm">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead className="bg-graphite/5 font-mono text-xs uppercase tracking-wider text-graphite/50">
              <tr>
                {columns.map((col) => (
                  <th key={String(col.key)} className="px-5 py-4">
                    {col.label}
                  </th>
                ))}
                <th className="px-5 py-4"></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-t border-graphite/8 transition hover:bg-graphite/[0.03]">
                  {columns.map((col) => (
                    <td key={String(col.key)} className="px-5 py-4 text-graphite/70">
                      {col.render ? col.render(item) : String(item[col.key] ?? "")}
                    </td>
                  ))}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => openEditForm(item)}
                        className="text-graphite/30 transition hover:scale-110 hover:text-signal"
                        title="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      {confirmDeleteId === item.id ? (
                        <>
                          <button
                            onClick={() => handleDelete(item.id)}
                            disabled={deletingId === item.id}
                            className="rounded-md bg-ember px-2 py-1 text-xs font-medium text-paper transition hover:brightness-110"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => setConfirmDeleteId(null)}
                            className="rounded-md border border-graphite/20 px-2 py-1 text-xs text-graphite/60"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => setConfirmDeleteId(item.id)}
                          className="text-graphite/30 transition hover:scale-110 hover:text-ember"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
