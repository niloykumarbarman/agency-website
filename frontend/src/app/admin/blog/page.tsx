"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Trash2, Loader2, RefreshCw, Plus, X, Pencil, Newspaper } from "lucide-react";
import {
  fetchAdminBlogPosts,
  fetchAdminBlogPostBySlug,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  BLOG_POST_STATUS_OPTIONS,
  type AdminBlogPost,
  type BlogPostStatus,
  type BlogPostFormPayload,
} from "@/lib/adminBlog";

const STATUS_STYLES: Record<string, string> = {
  Draft: "bg-graphite/10 text-graphite/60 border-graphite/20",
  Published: "bg-emerald-600/10 text-emerald-700 border-emerald-600/20",
  Archived: "bg-wire/10 text-graphite/50 border-wire/30",
};

const EMPTY_FORM: BlogPostFormPayload = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  coverImageUrl: "",
  authorName: "",
  status: "Draft",
};

const inputClass =
  "mt-1 w-full rounded-lg border border-graphite/15 px-3 py-2.5 text-sm outline-none transition focus:border-signal focus:ring-2 focus:ring-signal/10";
const labelClass = "block font-mono text-xs uppercase tracking-wider text-graphite/50";

export default function AdminBlogPage() {
  const [items, setItems] = useState<AdminBlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [form, setForm] = useState<BlogPostFormPayload>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchAdminBlogPosts();
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load blog posts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const openCreateForm = () => {
    setForm(EMPTY_FORM);
    setEditingSlug(null);
    setShowForm(true);
  };

  const openEditForm = async (slug: string) => {
    setError("");
    try {
      const detail = await fetchAdminBlogPostBySlug(slug);
      setForm({
        title: detail.title,
        slug: detail.slug,
        excerpt: detail.excerpt,
        content: detail.content,
        coverImageUrl: detail.coverImageUrl,
        authorName: detail.authorName,
        // NOTE: the backend list/detail DTOs do not expose the Status enum,
        // only publishedAt. This is a best-effort guess, not the real value —
        // Archived posts cannot be distinguished from Draft this way.
        status: detail.publishedAt ? "Published" : "Draft",
      });
      setEditingSlug(slug);
      setShowForm(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load post for editing.");
    }
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingSlug(null);
    setForm(EMPTY_FORM);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      if (editingSlug) {
        const current = items.find((i) => i.slug === editingSlug);
        if (current) {
          await updateBlogPost(current.id, form);
        }
      } else {
        await createBlogPost(form);
      }
      closeForm();
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save blog post.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await deleteBlogPost(id);
      setItems((prev) => prev.filter((item) => item.id !== id));
      setConfirmDeleteId(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete blog post.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <span className="font-mono text-sm uppercase tracking-[0.2em] text-signal">
            /admin/blog
          </span>
          <h1 className="mt-2 text-3xl font-semibold text-graphite">Blog Posts</h1>
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
            New Post
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
              {editingSlug ? "Edit Post" : "New Post"}
            </h2>
            <button onClick={closeForm} className="text-graphite/40 transition hover:text-graphite">
              <X className="h-5 w-5" />
            </button>
          </div>

          <p className="mt-2 text-xs text-graphite/50">
            Note: status shown here is a best-effort guess from publish date,
            since the API does not return the actual status field.
          </p>

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
            <div className="md:col-span-2">
              <label className={labelClass}>Excerpt</label>
              <textarea
                required
                rows={2}
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                className={inputClass}
              />
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>Content</label>
              <textarea
                required
                rows={8}
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Cover Image URL</label>
              <input
                value={form.coverImageUrl}
                onChange={(e) => setForm({ ...form, coverImageUrl: e.target.value })}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Author Name</label>
              <input
                required
                value={form.authorName}
                onChange={(e) => setForm({ ...form, authorName: e.target.value })}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as BlogPostStatus })}
                className={inputClass}
              >
                {BLOG_POST_STATUS_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
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
                {editingSlug ? "Save Changes" : "Create Post"}
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="mt-10 flex items-center gap-2 text-graphite/60">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading blog posts...
        </div>
      ) : items.length === 0 ? (
        <div className="mt-10 flex flex-col items-center gap-3 rounded-xl border border-dashed border-graphite/15 bg-white/50 py-16 text-center">
          <Newspaper className="h-8 w-8 text-graphite/30" />
          <p className="text-graphite/60">No blog posts yet.</p>
        </div>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-xl border border-graphite/10 bg-white shadow-sm">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead className="bg-graphite/5 font-mono text-xs uppercase tracking-wider text-graphite/50">
              <tr>
                <th className="px-5 py-4">Title</th>
                <th className="px-5 py-4">Slug</th>
                <th className="px-5 py-4">Author</th>
                <th className="px-5 py-4">Published</th>
                <th className="px-5 py-4"></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-t border-graphite/8 transition hover:bg-graphite/[0.03]">
                  <td className="px-5 py-4 font-medium text-graphite">{item.title}</td>
                  <td className="px-5 py-4 text-graphite/60">{item.slug}</td>
                  <td className="px-5 py-4 text-graphite/70">{item.authorName}</td>
                  <td className="px-5 py-4">
                    <span
                      className={
                        "rounded-full border px-3 py-1 text-xs font-medium " +
                        (item.publishedAt ? STATUS_STYLES.Published : STATUS_STYLES.Draft)
                      }
                    >
                      {item.publishedAt
                        ? new Date(item.publishedAt).toLocaleDateString()
                        : "Draft"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => openEditForm(item.slug)}
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
