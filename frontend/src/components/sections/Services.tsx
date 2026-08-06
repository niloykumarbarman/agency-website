"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Layers } from "lucide-react";
import { API_BASE_URL } from "@/lib/apiConfig";

type ServiceItem = {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  includes: string[];
  iconUrl: string;
  displayOrder: number;
};

export default function Services() {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hoverCapable, setHoverCapable] = useState(true);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Detect once on mount whether this device actually supports hover
  // (mouse/trackpad) vs touch-only. Doing this once avoids the mobile
  // "phantom hover" bug where a tap fires a synthetic mouseenter and
  // then a click right after -- previously that made the active state
  // flash on and immediately get toggled back off.
  useEffect(() => {
    setHoverCapable(window.matchMedia("(hover: hover)").matches);
  }, []);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${API_BASE_URL}/services`);
        if (!res.ok) {
          throw new Error(`Failed to load services: ${res.status}`);
        }
        const data = (await res.json()) as ServiceItem[];
        setServices(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load services.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const handleCardClick = (i: number) => {
    if (hoverCapable) return;
    setActiveIndex((prev) => (prev === i ? null : i));
  };

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-paper text-ink"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,theme(colors.ink/4)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.ink/4)_1px,transparent_1px)] bg-[size:56px_56px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-[-8%] h-[420px] w-[420px] rounded-full bg-signal/10 blur-[130px]"
      />

      <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <h2 className="mt-5 text-balance font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Engineering built for{" "}
            <span className="text-signal">systems that outlast us</span>.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-graphite/75">
            We take on the parts of enterprise software that are hardest to
            get right the first time, and hardest to unwind if they go
            wrong.
          </p>
        </motion.div>

        {loading ? (
          <p className="mt-16 text-center text-sm text-graphite/50">
            Loading services...
          </p>
        ) : error ? (
          <p className="mt-16 text-center text-sm text-ember">{error}</p>
        ) : services.length === 0 ? (
          <p className="mt-16 text-center text-sm text-graphite/50">
            No services available yet.
          </p>
        ) : (
          <div className="mt-16 grid gap-px overflow-hidden rounded-sm border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => {
              const isSignal = i % 2 === 0;
              const isActive = activeIndex === i;
              const hoverHandlers = hoverCapable
                ? {
                    onMouseEnter: () => setActiveIndex(i),
                    onMouseLeave: () =>
                      setActiveIndex((prev) => (prev === i ? null : prev)),
                  }
                : {
                    onClick: () => handleCardClick(i),
                  };
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={
                    reduceMotion
                      ? { duration: 0.3 }
                      : { duration: 0.5, ease: "easeOut", delay: i * 0.08 }
                  }
                  {...hoverHandlers}
                  className={`group relative cursor-pointer p-8 transition-colors duration-300 ${
                    isActive ? "bg-ink text-paper" : "bg-paper"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`flex h-16 w-16 items-center justify-center rounded-sm transition-colors duration-300 ${
                        isSignal
                          ? isActive
                            ? "bg-signal/30 text-signal"
                            : "bg-signal/15 text-signal"
                          : isActive
                            ? "bg-ember/30 text-ember"
                            : "bg-ember/15 text-ember"
                      }`}
                    >
                      {service.iconUrl ? (
                        <img
                          src={service.iconUrl}
                          alt=""
                          className="h-7 w-7 object-contain"
                        />
                      ) : (
                        <Layers className="h-7 w-7" strokeWidth={1.6} />
                      )}
                    </span>
                    <span
                      className={`font-mono text-[11px] uppercase tracking-[0.15em] transition-colors duration-300 ${
                        isActive ? "text-paper/40" : "text-graphite/40"
                      }`}
                    >
                      /{service.slug}
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-xl font-semibold tracking-tight">
                    {service.title}
                  </h3>
                  <p
                    className={`mt-3 text-sm leading-relaxed transition-colors duration-300 ${
                      isActive ? "text-paper/70" : "text-graphite/75"
                    }`}
                  >
                    {service.shortDescription}
                  </p>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
