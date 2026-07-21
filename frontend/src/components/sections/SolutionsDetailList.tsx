"use client";

import { motion, useReducedMotion } from "framer-motion";

const solutions = [
  {
    id: "01",
    title: "Custom Software Development",
    description:
      "Bespoke applications built around your exact workflows, not forced into an off-the-shelf template — from internal tools to customer-facing platforms.",
  },
  {
    id: "02",
    title: "Legacy System Modernization",
    description:
      "Careful, incremental migration of aging systems onto modern, maintainable architectures — without disrupting the business that depends on them.",
  },
  {
    id: "03",
    title: "Cloud & DevOps Modernization",
    description:
      "Containerized, CI/CD-driven infrastructure that ships faster and fails safer, with observability and rollback built in from day one.",
  },
  {
    id: "04",
    title: "Digital Transformation Consulting",
    description:
      "A pragmatic assessment of where technology is holding your business back, and a phased roadmap to fix it without a full rebuild.",
  },
  {
    id: "05",
    title: "Data & Analytics",
    description:
      "Turning scattered operational data into dashboards and pipelines that decision-makers actually trust and use.",
  },
  {
    id: "06",
    title: "AI / ML Integration",
    description:
      "Practical, scoped AI features — not hype — added where they measurably reduce manual work or improve a product experience.",
  },
];

export default function SolutionsDetailList() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative bg-paper py-24">
      <div className="absolute inset-0 bg-[size:56px_56px] bg-[linear-gradient(to_right,rgba(14,20,32,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(14,20,32,0.04)_1px,transparent_1px)]" />

      <div className="relative mx-auto max-w-5xl px-6">
        <p className="font-mono text-sm uppercase tracking-[0.2em] text-signal">
          /what-we-solve
        </p>
        <h2 className="mt-4 max-w-2xl text-balance font-display text-3xl font-semibold text-ink md:text-4xl">
          Six ways we help teams move forward
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 md:grid-cols-2">
          {solutions.map((solution, i) => (
            <motion.div
              key={solution.id}
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-paper p-8"
            >
              <span className="font-mono text-sm tabular-nums text-signal">
                {solution.id}
              </span>
              <h3 className="mt-3 font-display text-xl font-semibold text-ink">
                {solution.title}
              </h3>
              <p className="mt-3 text-graphite">{solution.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
