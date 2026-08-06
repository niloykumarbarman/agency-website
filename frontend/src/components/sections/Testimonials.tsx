"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { API_BASE_URL } from "@/lib/apiConfig";
import { resolveImageUrl } from "@/lib/hero";

type TestimonialItem = {
  id: string;
  clientName: string;
  clientTitle: string;
  clientCompany: string;
  clientPhotoUrl: string;
  quote: string;
  rating: number;
};

export default function Testimonials() {
  const shouldReduceMotion = useReducedMotion();
  const [items, setItems] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${API_BASE_URL}/testimonials?featured=true`);
        if (!res.ok) {
          throw new Error(`Failed to load testimonials: ${res.status}`);
        }
        const data = (await res.json()) as TestimonialItem[];
        setItems(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load testimonials."
        );
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const fadeUp = (i: number) =>
    shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-60px" },
          transition: { duration: 0.5, delay: (i % 6) * 0.08 },
        };

  // Don't render the section at all if there's nothing to show and no error --
  // an empty testimonials block would look broken on the homepage.
  if (!loading && !error && items.length === 0) {
    return null;
  }

  return (
    <section className="relative overflow-hidden bg-paper py-24 text-ink md:py-32">
      <div
        className="pointer-events-none absolute inset-0 bg-[size:56px_56px] opacity-100"
        style={{
          backgroundImage:
            "linear-gradient(to right, color-mix(in srgb, var(--color-ink) 4%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, var(--color-ink) 4%, transparent) 1px, transparent 1px)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <h2 className="text-balance font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            What clients say{" "}
            <span className="text-signal">after we ship</span>.
          </h2>
        </motion.div>

        {loading ? (
          <p className="mt-16 text-center text-sm text-graphite/50">
            Loading testimonials...
          </p>
        ) : error ? (
          <p className="mt-16 text-center text-sm text-ember">{error}</p>
        ) : (
          <div className="mt-16 grid gap-px overflow-hidden rounded-xl border border-ink/10 bg-ink/10 md:grid-cols-2">
            {items.map((item, i) => (
              <motion.div
                key={item.id}
                {...fadeUp(i)}
                className="flex flex-col bg-paper p-8 md:p-10"
              >
                <Quote
                  className="h-6 w-6 text-signal"
                  strokeWidth={1.75}
                  fill="currentColor"
                />
                {item.rating > 0 && (
                  <div className="mt-4 flex gap-1">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Star
                        key={starIndex}
                        className={`h-3.5 w-3.5 ${
                          starIndex < item.rating
                            ? "fill-signal text-signal"
                            : "fill-transparent text-ink/15"
                        }`}
                        strokeWidth={1.5}
                      />
                    ))}
                  </div>
                )}
                <p className="mt-4 flex-1 text-sm leading-relaxed text-graphite/80">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3 border-t border-ink/10 pt-5">
                  {item.clientPhotoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={resolveImageUrl(item.clientPhotoUrl)}
                      alt=""
                      className="h-10 w-10 shrink-0 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-signal/15 font-mono text-xs uppercase text-signal">
                      {item.clientName.slice(0, 1)}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-semibold text-graphite">
                      {item.clientName}
                    </p>
                    <p className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-graphite/50">
                      {item.clientTitle}
                      {item.clientCompany ? ` — ${item.clientCompany}` : ""}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
