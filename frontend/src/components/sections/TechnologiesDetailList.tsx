"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Server,
  LayoutTemplate,
  Cloud,
  Database,
  GitBranch,
  BrainCircuit,
} from "lucide-react";

type TechCategory = {
  icon: typeof Server;
  title: string;
  description: string;
  tools: string[];
};

const CATEGORIES: TechCategory[] = [
  {
    icon: Server,
    title: "Backend & APIs",
    description:
      "Type-safe, well-tested services built for correctness and long-term maintainability.",
    tools: ["ASP.NET Core", "Node.js", "Python", "MediatR", "FluentValidation"],
  },
  {
    icon: LayoutTemplate,
    title: "Frontend & UI",
    description:
      "Fast, accessible interfaces that hold up across devices and screen sizes.",
    tools: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    icon: Cloud,
    title: "Cloud & Infrastructure",
    description:
      "Infrastructure that scales predictably and fails gracefully under load.",
    tools: ["AWS", "Azure", "Docker", "Kubernetes", "Terraform"],
  },
  {
    icon: Database,
    title: "Databases & Caching",
    description:
      "Data layers chosen for consistency, speed, and the access patterns that matter.",
    tools: ["PostgreSQL", "Redis", "MongoDB", "SQL Server"],
  },
  {
    icon: GitBranch,
    title: "DevOps & CI/CD",
    description:
      "Automated pipelines so every release ships the same way, every time.",
    tools: ["GitHub Actions", "Nginx", "Let's Encrypt", "GitHub"],
  },
  {
    icon: BrainCircuit,
    title: "AI/ML & Data",
    description:
      "Practical AI integration focused on real workflows, not novelty.",
    tools: ["Python ML Stack", "LLM Integration", "Ollama", "Data Pipelines"],
  },
];

export default function TechnologiesDetailList() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-paper px-6 py-24 sm:py-28">
      <div
        className="pointer-events-none absolute inset-0 bg-[size:56px_56px] opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-ink) 1px, transparent 1px), linear-gradient(to bottom, var(--color-ink) 1px, transparent 1px)",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="font-mono text-sm uppercase tracking-[0.2em] text-signal"
        >
          /stack
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="mt-4 max-w-2xl text-balance font-display text-3xl font-medium text-ink sm:text-4xl"
        >
          Every layer, <span className="text-signal">deliberately chosen</span>
        </motion.h2>

        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-graphite/10 bg-graphite/10 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((category, i) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex flex-col bg-paper p-8"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-signal/10 text-signal">
                  <Icon size={20} strokeWidth={1.75} />
                </div>

                <h3 className="mt-6 font-display text-lg font-medium text-ink">
                  {category.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-graphite">
                  {category.description}
                </p>

                <ul className="mt-6 flex flex-wrap gap-2 border-t border-graphite/10 pt-6">
                  {category.tools.map((tool) => (
                    <li
                      key={tool}
                      className="rounded-full border border-graphite/15 px-3 py-1 font-mono text-xs text-graphite"
                    >
                      {tool}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
