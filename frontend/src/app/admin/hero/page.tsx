"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Loader2, Save, ImageIcon } from "lucide-react";
import {
  fetchAdminHero,
  updateHero,
  type HeroFormPayload,
} from "@/lib/adminHero";

const inputClass =
  "mt-1 w-full rounded-lg border border-graphite/15 px-3 py-2.5 text-sm outline-none transition focus:border-signal focus:ring-2 focus:ring-signal/10";
const labelClass = "block font-mono text-xs uppercase tracking-wider text-graphite/50";

const emptyForm: HeroFormPayload = {
  title: "",
  subtitle: "",
  primaryCtaText: "",
  primaryCtaUrl: "",
  secondaryCtaText: "",
  secondaryCtaUrl: "",
  backgroundImageUrl: "",
};

export default function AdminHeroPage() {
  const [heroId, setHeroId] = useState<string | null>(null);
  const [form, setForm] = useState<HeroFormPayload>(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await fetchAdminHero();
        setHeroId(data.id);
        setForm({
          title: data.title,
          subtitle: data.subtitle,
          primaryCtaText: data.primaryCtaText,
          primaryCtaUrl: data.primaryCtaUrl,
          secondaryCtaText: data.secondaryCtaText,
          secondaryCtaUrl: data.secondaryCtaUrl,
          backgroundImageUrl: data.backgroundImageUrl,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load hero content.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const setField = (key: keyof HeroFormPayload, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setSuccess(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!heroId) return;
    setSaving(true);
    setError("");
    setSuccess(false);
    try {
      await updateHero(heroId, form);
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save hero content.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="mt-10 flex items-center gap-2 text-graphite/60">
        <Loader2 className="h-4 w-4 animate-spin" />
        Loading hero content...
      </div>
    );
  }

  return (
    <div>
      <span className="font-mono text-sm uppercase tracking-[0.2em] text-signal">
        /admin/hero
      </span>
      <h1 className="mt-2 text-3xl font-semibold text-graphite">Hero Section</h1>

      {error && (
        <div className="mt-6 rounded-lg border border-ember/40 bg-ember/10 px-4 py-3 text-sm text-ember">
          {error}
        </div>
      )}
      {success && (
        <div className="mt-6 rounded-lg border border-signal/40 bg-signal/10 px-4 py-3 text-sm text-signal">
          Hero content saved.
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="admin-fade-in mt-8 grid grid-cols-1 gap-6 rounded-xl border border-graphite/10 bg-white p-6 shadow-sm md:grid-cols-2"
      >
        <div className="md:col-span-2">
          <label className={labelClass}>Title</label>
          <input
            required
            value={form.title}
            onChange={(e) => setField("title", e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="md:col-span-2">
          <label className={labelClass}>Subtitle</label>
          <textarea
            required
            rows={3}
            value={form.subtitle}
            onChange={(e) => setField("subtitle", e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Primary CTA Text</label>
          <input
            value={form.primaryCtaText}
            onChange={(e) => setField("primaryCtaText", e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Primary CTA URL</label>
          <input
            value={form.primaryCtaUrl}
            onChange={(e) => setField("primaryCtaUrl", e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Secondary CTA Text</label>
          <input
            value={form.secondaryCtaText}
            onChange={(e) => setField("secondaryCtaText", e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Secondary CTA URL</label>
          <input
            value={form.secondaryCtaUrl}
            onChange={(e) => setField("secondaryCtaUrl", e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="md:col-span-2">
          <label className={labelClass}>Background Image URL</label>
          <input
            value={form.backgroundImageUrl}
            onChange={(e) => setField("backgroundImageUrl", e.target.value)}
            className={inputClass}
          />
          <div className="mt-3 flex h-40 w-full items-center justify-center overflow-hidden rounded-lg border border-dashed border-graphite/15 bg-graphite/5">
            {form.backgroundImageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={form.backgroundImageUrl}
                alt="Background preview"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center gap-2 text-graphite/30">
                <ImageIcon className="h-6 w-6" />
                <span className="text-xs">No image URL set</span>
              </div>
            )}
          </div>
        </div>

        <div className="md:col-span-2 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 rounded-lg bg-signal px-4 py-2 text-sm font-medium text-ink shadow-sm transition hover:brightness-110 disabled:opacity-60"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
