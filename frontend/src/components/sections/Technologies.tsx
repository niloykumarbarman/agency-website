"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { fetchTechnologies, type TechnologyDto } from "@/lib/technologies";

export default function Technologies() {
  const reduceMotion = useReducedMotion();
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
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal">
            /stack
          </p>
          <h2 className="mt-5 text-balance font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            The same stack we{" "}
            <span className="text-signal">run our own systems on</span>.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/70">
            No stack chosen for a pitch deck. Every tool here is one we
            operate in production, including this site.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-paper/10 bg-paper/10 sm:grid-cols-4">
          {technologies.map((tech, i) => (
            <motion.div
              key={tech.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={
                reduceMotion
                  ? { duration: 0.3 }
                  : { duration: 0.5, ease: "easeOut", delay: i * 0.06 }
              }
              className="bg-ink p-6"
            >
              <p className="font-display text-lg font-semibold tracking-tight">
                {tech.name}
              </p>
              <p className="mt-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-paper/45">
                {tech.displayName}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
