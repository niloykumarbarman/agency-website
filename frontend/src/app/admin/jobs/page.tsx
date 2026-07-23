"use client";

import { useState, useEffect, type FormEvent } from "react";
import { Trash2, Loader2, RefreshCw, Plus, X, Pencil, Briefcase } from "lucide-react";
import {
  fetchAdminJobListings,
  createJobListing,
  updateJobListing,
  deleteJobListing,
  JOB_LISTING_STATUS_OPTIONS,
  type AdminJobListing,
  type JobListingStatus,
  type JobListingFormPayload,
} from "@/lib/adminJobListings";

const inputClass =
  "mt-1 w-full rounded-lg border border-graphite/15 px-3 py-2.5 text-sm outline-none transition focus:border-signal focus:ring-2 focus:ring-signal/10";
const labelClass = "block font-mono text-xs uppercase tracking-wider text-graphite/50";

const EMPTY_FORM: JobListingFormPayload = {
  title: "",
  slug: "",
  department: "",
  location: "",
  employmentType: "",
  description: "",
  requirements: "",
  status: "Draft",
};

export default function AdminJobListingsPage() {
  const [items, setItems] = useState<AdminJobListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<JobListingFormPayload>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchAdminJobListings();
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load job listings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const openCreateForm = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setShowForm(true);
  };

  const openEditForm = (item: AdminJobListing) => {
    setForm({
      title: item.title,
      slug: item.slug,
      department: item.department,
      location: item.location,
      employmentType: item.employmentType,
      // NOTE: the list API never returns description, requirements, or
      // status, so these cannot be prefilled. Re-enter them below, and
      // confirm the correct Status -- leaving it as Draft will overwrite
      // the existing status on save.
      description: "",
      requirements: "",
      status: "Draft",
    });
    setEditingId(item.id);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      if (editingId) {
        await updateJobListing(editingId, form);
      } else {
        await createJobListing(form);
      }
      closeForm();
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save job listing.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await deleteJobListing(id);
      setItems((prev) => prev.filter((item) => item.id !== id));
      setConfirmDeleteId(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete job listing.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <span className="font-mono text-sm uppercase tracking-[0.2em] text-signal">
            /admin/jobs
          </span>
          <h1 className="mt-2 text-3xl font-semibold text-graphite">Job Listings</h1>
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
            New Listing
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
              {editingId ? "Edit Listing" : "New Listing"}
            </h2>
            <button onClick={closeForm} className="text-graphite/40 transition hover:text-graphite">
              <X className="h-5 w-5" />
            </button>
          </div>

          {editingId && (
            <p className="mt-2 text-xs text-graphite/50">
              Note: Description, Requirements, and Status are not returned by
              the list API and cannot be prefilled. Please re-enter them and
              confirm the correct Status before saving, or the existing
              values will be overwritten.
            </p>
          )}

          <form onSubmit={handleSubmit} className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className={labelClass}>Title</label>
              <input
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Slug</label>
              <input
                required
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                placeholder="lowercase-hyphen-separated"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Department</label>
              <input
                required
                value={form.department}
                onChange={(e) => setForm({ ...form, department: e.target.value })}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Location</label>
              <input
                required
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Employment Type</label>
              <input
                required
                value={form.employmentType}
                onChange={(e) => setForm({ ...form, employmentType: e.target.value })}
                placeholder="e.g. Full-time, Part-time, Contract"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as JobListingStatus })}
                className={inputClass}
              >
                {JOB_LISTING_STATUS_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>Description</label>
              <textarea
                required
                rows={5}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className={inputClass}
              />
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>Requirements</label>
              <textarea
                required
                rows={5}
                value={form.requirements}
                onChange={(e) => setForm({ ...form, requirements: e.target.value })}
                className={inputClass}
              />
            </div>
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
                {editingId ? "Save Changes" : "Create Listing"}
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="mt-10 flex items-center gap-2 text-graphite/60">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading job listings...
        </div>
      ) : items.length === 0 ? (
        <div className="mt-10 flex flex-col items-center gap-3 rounded-xl border border-dashed border-graphite/15 bg-white/50 py-16 text-center">
          <Briefcase className="h-8 w-8 text-graphite/30" />
          <p className="text-graphite/60">No job listings yet.</p>
        </div>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-xl border border-graphite/10 bg-white shadow-sm">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead className="bg-graphite/5 font-mono text-xs uppercase tracking-wider text-graphite/50">
              <tr>
                <th className="px-5 py-4">Title</th>
                <th className="px-5 py-4">Department</th>
                <th className="px-5 py-4">Location</th>
                <th className="px-5 py-4">Type</th>
                <th className="px-5 py-4"></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-t border-graphite/8 transition hover:bg-graphite/[0.03]">
                  <td className="px-5 py-4 font-medium text-graphite">{item.title}</td>
                  <td className="px-5 py-4 text-graphite/70">{item.department}</td>
                  <td className="px-5 py-4 text-graphite/70">{item.location}</td>
                  <td className="px-5 py-4">
                    <span className="rounded-full border border-signal/20 bg-signal/10 px-3 py-1 text-xs font-medium text-signal">
                      {item.employmentType}
                    </span>
                  </td>
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
