"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Loader2, Save, ImageIcon, Video, Plus, Trash2 } from "lucide-react";
import {
  fetchAdminHero,
  updateHero,
  type HeroFormPayload,
  type TelemetryPillInput,
} from "@/lib/adminHero";

const inputClass =
  "mt-1 w-full rounded-lg border border-graphite/15 px-3 py-2.5 text-sm outline-none transition focus:border-signal focus:ring-2 focus:ring-signal/10";
const labelClass = "block font-mono text-xs uppercase tracking-wider text-graphite/50";

type PillRow = TelemetryPillInput & { rowKey: string };

const emptyForm: HeroFormPayload = {
  title: "",
  subtitle: "",
  primaryCtaText: "",
  primaryCtaUrl: "",
  secondaryCtaText: "",
  secondaryCtaUrl: "",
  backgroundImageUrl: "",
  backgroundVideoUrl: "",
  telemetryPills: [],
};

function makeRowKey(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function emptyPillRow(displayOrder: number): PillRow {
  return {
    rowKey: makeRowKey(),
    label: "",
    accent: "Signal",
    top: 0,
    left: 0,
    displayOrder,
  };
}

export default function AdminHeroPage() {
  const [heroId, setHeroId] = useState<string | null>(null);
  const [form, setForm] = useState<HeroFormPayload>(emptyForm);
  const [pills, setPills] = useState<PillRow[]>([]);
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
          backgroundVideoUrl: data.backgroundVideoUrl,
          telemetryPills: [],
        });
        const sortedPills = [...data.telemetryPills].sort(
          (a, b) => a.displayOrder - b.displayOrder
        );
        setPills(
          sortedPills.map((pill) => ({
            rowKey: makeRowKey(),
            label: pill.label,
            accent: pill.accent,
            top: pill.top,
            left: pill.left,
            displayOrder: pill.displayOrder,
          }))
        );
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

  const addPill = () => {
    setPills((prev) => [...prev, emptyPillRow(prev.length)]);
    setSuccess(false);
  };

  const removePill = (rowKey: string) => {
    setPills((prev) => prev.filter((p) => p.rowKey !== rowKey));
    setSuccess(false);
  };

  const setPillField = (
    rowKey: string,
    key: keyof TelemetryPillInput,
    value: string
  ) => {
    setPills((prev) =>
      prev.map((p) => {
        if (p.rowKey !== rowKey) return p;
        if (key === "accent") {
          return { ...p, accent: value as "Signal" | "Ember" };
        }
        if (key === "top" || key === "left" || key === "displayOrder") {
          return { ...p, [key]: Number(value) };
        }
        return { ...p, [key]: value };
      })
    );
    setSuccess(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!heroId) return;
    setSaving(true);
    setError("");
    setSuccess(false);
    try {
      const telemetryPills: TelemetryPillInput[] = pills.map((p) => ({
        label: p.label,
        accent: p.accent,
        top: p.top,
        left: p.left,
        displayOrder: p.displayOrder,
      }));
      await updateHero(heroId, { ...form, telemetryPills });
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

        <div className="md:col-span-2">
          <label className={labelClass}>Background Video URL</label>
          <input
            value={form.backgroundVideoUrl}
            onChange={(e) => setField("backgroundVideoUrl", e.target.value)}
            className={inputClass}
          />
          <div className="mt-3 flex h-40 w-full items-center justify-center overflow-hidden rounded-lg border border-dashed border-graphite/15 bg-graphite/5">
            {form.backgroundVideoUrl ? (
              <video
                src={form.backgroundVideoUrl}
                autoPlay
                muted
                loop
                playsInline
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center gap-2 text-graphite/30">
                <Video className="h-6 w-6" />
                <span className="text-xs">No video URL set</span>
              </div>
            )}
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="flex items-center justify-between">
            <label className={labelClass}>Telemetry Pills</label>
            <button
              type="button"
              onClick={addPill}
              className="flex items-center gap-1 rounded-lg border border-graphite/15 px-3 py-1.5 text-xs font-medium text-graphite transition hover:border-signal hover:text-signal"
            >
              <Plus className="h-3.5 w-3.5" />
              Add Pill
            </button>
          </div>

          {pills.length === 0 && (
            <div className="mt-3 rounded-lg border border-dashed border-graphite/15 px-4 py-6 text-center text-xs text-graphite/40">
              No telemetry pills yet. Click &quot;Add Pill&quot; to create one.
            </div>
          )}

          <div className="mt-3 space-y-3">
            {pills.map((pill, index) => (
              <div
                key={pill.rowKey}
                className="grid grid-cols-2 gap-3 rounded-lg border border-graphite/10 p-4 md:grid-cols-6"
              >
                <div className="md:col-span-2">
                  <label className={labelClass}>Label</label>
                  <input
                    value={pill.label}
                    onChange={(e) =>
                      setPillField(pill.rowKey, "label", e.target.value)
                    }
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Accent</label>
                  <select
                    value={pill.accent}
                    onChange={(e) =>
                      setPillField(pill.rowKey, "accent", e.target.value)
                    }
                    className={inputClass}
                  >
                    <option value="Signal">Signal</option>
                    <option value="Ember">Ember</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Top (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={pill.top}
                    onChange={(e) =>
                      setPillField(pill.rowKey, "top", e.target.value)
                    }
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Left (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={pill.left}
                    onChange={(e) =>
                      setPillField(pill.rowKey, "left", e.target.value)
                    }
                    className={inputClass}
                  />
                </div>
                <div className="flex items-end gap-2">
                  <div className="flex-1">
                    <label className={labelClass}>Order</label>
                    <input
                      type="number"
                      value={pill.displayOrder}
                      onChange={(e) =>
                        setPillField(pill.rowKey, "displayOrder", e.target.value)
                      }
                      className={inputClass}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removePill(pill.rowKey)}
                    className="mb-0.5 rounded-lg border border-ember/30 p-2.5 text-ember transition hover:bg-ember/10"
                    aria-label={`Remove pill ${index + 1}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
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
