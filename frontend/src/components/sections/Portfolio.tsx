"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

type Project = {
  client: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
};

const PROJECTS: Project[] = [
  {
    client: "Meridian Logistics",
    category: "Platform Engineering",
    title: "Fleet operations platform rebuild",
    description:
      "Replaced a decade-old monolith with a service-based platform handling live dispatch, routing, and driver compliance for a national fleet.",
    tags: ["ASP.NET Core", "PostgreSQL", "Redis"],
  },
  {
    client: "Northbridge Health",
    category: "System Migration",
    title: "Patient records modernization",
    description:
      "Migrated a legacy on-premise records system to a cloud-native architecture with zero downtime and full audit compliance.",
    tags: ["Cloud Migration", "Audit Logging", "PostgreSQL"],
  },
  {
    client: "Verity Payments",
    category: "API Design & Integration",
    title: "Multi-bank settlement API",
    description:
      "Designed a contract-first settlement API connecting six banking partners, processing transactions with strict idempotency guarantees.",
    tags: ["REST API", "JWT Auth", "Rate Limiting"],
  },
  {
    client: "Anchorpoint",
    category: "Internal Platform",
    title: "This website and its backend platform",
    description:
      "Designed and built end to end, with the same architecture patterns, security defaults, and caching strategy we apply for clients.",
    tags: ["Next.js", "ASP.NET Core", "Redis"],
  },
];

export default function Portfolio() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="work" className="relative overflow-hidden bg-paper text-ink">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,theme(colors.ink/4)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.ink/4)_1px,transparent_1px)] bg-[size:56px_56px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-[-10%] right-[-8%] h-[420px] w-[420px] rounded-full bg-signal/10 blur-[130px]"
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
            /work
          </p>
          <h2 className="mt-5 text-balance font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Systems we have{" "}
            <span className="text-signal">put into production</span>.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-graphite/75">
            A sample of the platforms, migrations, and integrations we
            have shipped for teams that could not afford downtime.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2">
          {PROJECTS.map((project, i) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={
                reduceMotion
                  ? { duration: 0.3 }
                  : { duration: 0.5, ease: "easeOut", delay: i * 0.08 }
              }
              className="group relative border border-ink/10 bg-paper p-8 transition-colors duration-300 hover:border-ink/25"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-signal">
                    {project.category}
                  </p>
                  <p className="mt-1.5 font-mono text-xs text-graphite/50">
                    {project.client}
                  </p>
                </div>
                <ArrowUpRight
                  className="h-5 w-5 shrink-0 text-graphite/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ember"
                  strokeWidth={1.75}
                />
              </div>

              <h3 className="mt-5 font-display text-2xl font-semibold leading-snug tracking-tight">
                {project.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-graphite/75">
                {project.description}
              </p>

              <ul className="mt-6 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-sm border border-ink/10 px-2.5 py-1 font-mono text-[0.6875rem] text-graphite/60"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
