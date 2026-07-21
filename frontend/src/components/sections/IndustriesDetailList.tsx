"use client";

import { motion, useReducedMotion } from "framer-motion";

const industries = [
  {
    id: "01",
    title: "FinTech",
    description:
      "Payment flows, ledgers, and compliance-aware architecture where correctness and auditability aren't optional.",
  },
  {
    id: "02",
    title: "Healthcare",
    description:
      "Systems built with data privacy and reliability as first-class constraints, not afterthoughts bolted on later.",
  },
  {
    id: "03",
    title: "E-commerce & Retail",
    description:
      "Catalog, inventory, and checkout systems that hold up under real traffic spikes, not just demo-day load.",
  },
  {
    id: "04",
    title: "Logistics & Supply Chain",
    description:
      "Coordination across many moving parts, where stale data or a missed event has a real-world, physical cost.",
  },
  {
    id: "05",
    title: "SaaS & B2B Platforms",
    description:
      "Multi-tenant architecture, usage-based billing, and the operational tooling that lets a product scale without a rewrite.",
  },
  {
    id: "06",
    title: "EdTech",
    description:
      "Content, progress tracking, and access-control systems designed around how learners and institutions actually use them.",
  },
];

export default function IndustriesDetailList() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative bg-paper py-24">
      <div className="absolute inset-0 bg-[size:56px_56px] bg-[linear-gradient(to_right,rgba(14,20,32,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(14,20,32,0.04)_1px,transparent_1px)]" />

      <div className="relative mx-auto max-w-5xl px-6">
        <p className="font-mono text-sm uppercase tracking-[0.2em] text-signal">
          /where-we-work
        </p>
        <h2 className="mt-4 max-w-2xl text-balance font-display text-3xl font-semibold text-ink md:text-4xl">
          Industries where we've built real context
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 md:grid-cols-2">
          {industries.map((industry, i) => (
            <motion.div
              key={industry.id}
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-paper p-8"
            >
              <span className="font-mono text-sm tabular-nums text-signal">
                {industry.id}
              </span>
              <h3 className="mt-3 font-display text-xl font-semibold text-ink">
                {industry.title}
              </h3>
              <p className="mt-3 text-graphite">{industry.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
