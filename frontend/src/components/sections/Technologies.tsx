"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import DraggableMarquee from "@/components/DraggableMarquee";
import TechBrandIcon from "@/components/TechBrandIcon";
import { getTechIcon } from "@/lib/techIcons";
import { fetchTechnologies, type TechnologyDto } from "@/lib/technologies";

export default function Technologies() {
  const [technologies, setTechnologies] = useState<TechnologyDto[]>([]);

  useEffect(() => {
    fetchTechnologies().then(setTechnologies);
  }, []);

  if (technologies.length === 0) {
    return null;
  }

  return (
    <section
      id="technologies"
      className="bg-grain relative overflow-hidden bg-ink text-paper"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute top-[-12%] left-[-10%] h-[440px] w-[440px] rounded-full bg-signal/15 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,theme(colors.paper/4)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.paper/4)_1px,transparent_1px)] bg-[size:56px_56px]"
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
            The same stack we{" "}
            <span className="text-signal">run our own systems on</span>.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/70">
            No stack chosen for a pitch deck. Every tool here is one we
            operate in production, including this site.
        </p>
        </motion.div>

        <div className="relative mt-16 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-ink to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-ink to-transparent" />

          <DraggableMarquee trackClassName="items-stretch gap-3">
            {[...technologies, ...technologies].map((tech, i) => {
              const isSignal = i % 2 === 0;
              const hasIcon = !!getTechIcon(tech.name);
              return (
                <div
                  key={`${tech.id}-${i}`}
                  className={`flex min-w-[180px] flex-col justify-center whitespace-nowrap rounded-sm border bg-ink px-6 py-5 transition-colors ${
                    isSignal
                      ? "border-signal/25 hover:border-signal/60"
                      : "border-ember/25 hover:border-ember/60"
                  }`}
                >
                  {hasIcon ? (
                    <TechBrandIcon name={tech.name} className="mb-2 h-5 w-5" />
                  ) : (
                    <span
                      className={`mb-2 h-1.5 w-1.5 rounded-full ${isSignal ? "bg-signal" : "bg-ember"}`}
                    />
                  )}
                  <p className="font-display text-lg font-semibold tracking-tight">
                    {tech.name}
                  </p>
                  <p className="mt-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-paper/45">
                    {tech.displayName}
                  </p>
                </div>
              );
            })}
          </DraggableMarquee>
        </div>
      </div>

    </section>
  );
}
