"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Trash2, Loader2, RefreshCw, Plus, X, Pencil } from "lucide-react";
import {
  fetchAdminCaseStudies,
  createCaseStudy,
  updateCaseStudy,
  deleteCaseStudy,
  type AdminCaseStudy,
  type CaseStudyFormPayload,
} from "@/lib/adminCaseStudies";

const EMPTY_FORM: CaseStudyFormPayload = {
  title: "",
  slug: "",
  clientName: "",
  industry: "",
  challenge: "",
  solution: "",
  results: "",
  coverImageUrl: "",
  isPublished: false,
};

export default function AdminCaseStudiesPage() {
  const [items, setItems] = useState<AdminCaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<CaseStudyFormPayload>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchAdminCaseStudies();
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load case studies.");
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

  const openEditForm = (item: AdminCaseStudy) => {
    setForm({
      title: item.title,
      slug: item.slug,
      clientName: item.clientName,
      industry: item.industry,
      challenge: item.challenge,
      solution: item.solution,
      results: item.results,
      coverImageUrl: item.coverImageUrl,
      // NOTE: the backend list DTO does not expose IsPublished, so we
      // cannot know the real current value here — defaults to unchecked.
      isPublished: false,
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
        await updateCaseStudy(editingId, form);
      } else {
        await createCaseStudy(form);
      }
      closeForm();
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save case study.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await deleteCaseStudy(id);
      setItems((prev) => prev.filter((item) => item.id !== id));
      setConfirmDeleteId(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete case study.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <span className="font-mono text-sm uppercase tracking-[0.2em] text-signal">
            /admin/case-studies
          </span>
          <h1 className="mt-2 text-3xl font-semibold text-graphite">Case Studies</h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={load}
            disabled={loading}
            className="flex items-center gap-2 rounded-md border border-graphite/20 px-4 py-2 text-sm font-medium text-graphite transition hover:border-signal hover:text-signal disabled:opacity-60"
          >
            <RefreshCw className={loading ? "h-4 w-4 animate-spin" : "h-4 w-4"} />
            Refresh
          </button>
          <button
            onClick={openCreateForm}
            className="flex items-center gap-2 rounded-md bg-signal px-4 py-2 text-sm font-medium text-ink transition hover:brightness-110"
          >
            <Plus className="h-4 w-4" />
            New Case Study
          </button>
        </div>
      </div>

      {error && (
        <div className="mt-6 rounded-md border border-ember/40 bg-ember/10 px-4 py-3 text-sm text-ember">
          {error}
        </div>
      )}

      {showForm && (
        <div className="mt-8 rounded-lg border border-graphite/10 bg-graphite/5 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-graphite">
              {editingId ? "Edit Case Study" : "New Case Study"}
            </h2>
            <button onClick={closeForm} className="text-graphite/50 hover:text-graphite">
              <X className="h-5 w-5" />
            </button>
          </div>

          {editingId && (
            <p className="mt-2 text-xs text-graphite/50">
              Note: the published toggle defaults to off when editing, since
              the API does not return the current published state.
            </p>
          )}

          <form onSubmit={handleSubmit} className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block font-mono text-xs uppercase tracking-wider text-graphite/60">Title</label>
              <input
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="mt-1 w-full rounded-md border border-graphite/20 px-3 py-2 text-sm outline-none focus:border-signal"
              />
            </div>
            <div>
              <label className="block font-mono text-xs uppercase tracking-wider text-graphite/60">Slug</label>
              <input
                required
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                placeholder="lowercase-hyphen-separated"
                className="mt-1 w-full rounded-md border border-graphite/20 px-3 py-2 text-sm outline-none focus:border-signal"
              />
            </div>
            <div>
              <label className="block font-mono text-xs uppercase tracking-wider text-graphite/60">Client Name</label>
              <input
                required
                value={form.clientName}
                onChange={(e) => setForm({ ...form, clientName: e.target.value })}
                className="mt-1 w-full rounded-md border border-graphite/20 px-3 py-2 text-sm outline-none focus:border-signal"
              />
            </div>
            <div>
              <label className="block font-mono text-xs uppercase tracking-wider text-graphite/60">Industry</label>
              <input
                value={form.industry}
                onChange={(e) => setForm({ ...form, industry: e.target.value })}
                className="mt-1 w-full rounded-md border border-graphite/20 px-3 py-2 text-sm outline-none focus:border-signal"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block font-mono text-xs uppercase tracking-wider text-graphite/60">Challenge</label>
              <textarea
                required
                rows={3}
                value={form.challenge}
                onChange={(e) => setForm({ ...form, challenge: e.target.value })}
                className="mt-1 w-full rounded-md border border-graphite/20 px-3 py-2 text-sm outline-none focus:border-signal"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block font-mono text-xs uppercase tracking-wider text-graphite/60">Solution</label>
              <textarea
                required
                rows={3}
                value={form.solution}
                onChange={(e) => setForm({ ...form, solution: e.target.value })}
                className="mt-1 w-full rounded-md border border-graphite/20 px-3 py-2 text-sm outline-none focus:border-signal"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block font-mono text-xs uppercase tracking-wider text-graphite/60">Results</label>
              <textarea
                required
                rows={3}
                value={form.results}
                onChange={(e) => setForm({ ...form, results: e.target.value })}
                className="mt-1 w-full rounded-md border border-graphite/20 px-3 py-2 text-sm outline-none focus:border-signal"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block font-mono text-xs uppercase tracking-wider text-graphite/60">Cover Image URL</label>
              <input
                value={form.coverImageUrl}
                onChange={(e) => setForm({ ...form, coverImageUrl: e.target.value })}
                className="mt-1 w-full rounded-md border border-graphite/20 px-3 py-2 text-sm outline-none focus:border-signal"
              />
            </div>
            <div className="md:col-span-2 flex items-center gap-2">
              <input
                id="isPublished"
                type="checkbox"
                checked={form.isPublished}
                onChange={(e) => setForm({ ...form, isPublished: e.target.checked })}
                className="h-4 w-4 rounded border-graphite/30"
              />
              <label htmlFor="isPublished" className="text-sm text-graphite">
                Published
              </label>
            </div>
            <div className="md:col-span-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={closeForm}
                className="rounded-md border border-graphite/20 px-4 py-2 text-sm text-graphite/70"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 rounded-md bg-signal px-4 py-2 text-sm font-medium text-ink transition hover:brightness-110 disabled:opacity-60"
              >
                {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                {editingId ? "Save Changes" : "Create Case Study"}
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="mt-10 flex items-center gap-2 text-graphite/60">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading case studies...
        </div>
      ) : items.length === 0 ? (
        <p className="mt-10 text-graphite/60">No case studies yet.</p>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-lg border border-graphite/10">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead className="bg-graphite/5 font-mono text-xs uppercase tracking-wider text-graphite/60">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Client</th>
                <th className="px-4 py-3">Industry</th>
                <th className="px-4 py-3">Slug</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-t border-graphite/10">
                  <td className="px-4 py-3 font-medium text-graphite">{item.title}</td>
                  <td className="px-4 py-3 text-graphite/70">{item.clientName}</td>
                  <td className="px-4 py-3 text-graphite/70">{item.industry}</td>
                  <td className="px-4 py-3 text-graphite/60">{item.slug}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => openEditForm(item)}
                        className="text-graphite/40 transition hover:text-signal"
                        title="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      {confirmDeleteId === item.id ? (
                        <>
                          <button
                            onClick={() => handleDelete(item.id)}
                            disabled={deletingId === item.id}
                            className="rounded-md bg-ember px-2 py-1 text-xs font-medium text-paper hover:brightness-110"
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
                          className="text-graphite/40 transition hover:text-ember"
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
