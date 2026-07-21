"use client";

import { motion, useReducedMotion } from "framer-motion";

type CaseStudy = {
  client: string;
  industry: string;
  title: string;
  problem: string;
  approach: string;
  result: string;
  metric: string;
  metricLabel: string;
  tags: string[];
};

const CASE_STUDIES: CaseStudy[] = [
  {
    client: "Meridian Logistics",
    industry: "Logistics & Fleet Management",
    title: "Rebuilding dispatch without a single missed delivery window",
    problem:
      "A 12-year-old monolith could not handle real-time dispatch at scale. Peak-hour requests were timing out, and every deploy risked downtime during active routes.",
    approach:
      "We decomposed the monolith into bounded services, introduced Redis-backed caching for hot routing data, and shipped changes behind feature flags with zero-downtime rollout.",
    result:
      "The new platform handled peak load with room to spare, and deploys became routine instead of risky.",
    metric: "99.95%",
    metricLabel: "Uptime after rollout",
    tags: ["ASP.NET Core", "PostgreSQL", "Redis"],
  },
  {
    client: "Northbridge Health",
    industry: "Healthcare",
    title: "Moving patient records to the cloud without losing a single record",
    problem:
      "A legacy on-premise records system had no audit trail, no realistic disaster-recovery path, and staff were manually reconciling records between two systems during outages.",
    approach:
      "We ran a staged, reversible migration to a cloud-native architecture, verifying data integrity at every checkpoint before decommissioning legacy components, with full audit logging built in from the start.",
    result:
      "The migration completed with zero downtime and zero data loss, and the system now produces a complete, queryable audit trail for every record access.",
    metric: "0",
    metricLabel: "Downtime minutes during migration",
    tags: ["Cloud Migration", "Audit Logging", "PostgreSQL"],
  },
  {
    client: "Verity Payments",
    industry: "Financial Services",
    title: "Six banking partners, one settlement API, zero double charges",
    problem:
      "Manual reconciliation across six banking partners was error-prone and slow, and a prior integration attempt had caused duplicate settlements under load.",
    approach:
      "We designed a contract-first API with strict idempotency keys, per-partner rate limiting, and full audit logging on every settlement event.",
    result:
      "Reconciliation time dropped from days to minutes, with a complete audit trail for every transaction.",
    metric: "0",
    metricLabel: "Duplicate settlements since launch",
    tags: ["REST API", "JWT Auth", "Rate Limiting"],
  },
  {
    client: "Anchorpoint",
    industry: "Internal Platform",
    title: "This website, built with the same standard we sell",
    problem:
      "A portfolio site with fabricated claims and generic stock content would not hold up to scrutiny from technical clients evaluating an engineering studio.",
    approach:
      "We built the entire platform — backend and frontend — using the identical architecture, security defaults, and caching strategy applied to client work, and kept the commit history public so anyone can verify it.",
    result:
      "A live, verifiable system: working JWT auth with rotation, Redis cache-aside on every entity, and a linear git history anyone can read.",
    metric: "100%",
    metricLabel: "Of claims backed by running code",
    tags: ["Next.js", "ASP.NET Core", "Redis"],
  },
];

export default function PortfolioCaseStudies() {
  const shouldReduceMotion = useReducedMotion();

  const fadeUp = (i: number) =>
    shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-60px" },
          transition: { duration: 0.5, delay: (i % 4) * 0.08 },
        };

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
        <div className="flex flex-col gap-px overflow-hidden rounded-xl border border-ink/10 bg-ink/10">
          {CASE_STUDIES.map((study, i) => (
            <motion.article
              key={study.client}
              {...fadeUp(i)}
              className="grid gap-10 bg-paper p-8 md:grid-cols-[2fr_1fr] md:p-12"
            >
              <div>
                <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-signal">
                  {study.industry} — {study.client}
                </p>
                <h2 className="mt-3 text-2xl font-semibold leading-snug tracking-tight text-graphite sm:text-3xl">
                  {study.title}
                </h2>

                <div className="mt-8 grid gap-6 sm:grid-cols-3">
                  <div>
                    <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ember">
                      Problem
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-graphite/70">
                      {study.problem}
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ember">
                      Approach
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-graphite/70">
                      {study.approach}
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ember">
                      Result
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-graphite/70">
                      {study.result}
                    </p>
                  </div>
                </div>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {study.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-sm border border-ink/10 px-2.5 py-1 font-mono text-[0.6875rem] text-graphite/60"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col justify-center border-t border-ink/10 pt-6 md:border-l md:border-t-0 md:pl-10 md:pt-0">
                <p className="text-5xl font-semibold tabular-nums text-signal">
                  {study.metric}
                </p>
                <p className="mt-2 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-graphite/45">
                  {study.metricLabel}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
