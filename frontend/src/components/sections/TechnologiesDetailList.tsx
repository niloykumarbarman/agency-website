"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Server,
  LayoutTemplate,
  Cloud,
  Database,
  GitBranch,
  BrainCircuit,
} from "lucide-react";
import TechBrandIcon from "@/components/TechBrandIcon";
import { getTechIcon } from "@/lib/techIcons";
import { fetchTechnologies, TechnologyDto } from "@/lib/technologies";

type CategoryMeta = {
  icon: typeof Server;
  title: string;
  description: string;
};

const CATEGORY_META: Record<number, CategoryMeta> = {
  0: {
    icon: Server,
    title: "Backend & APIs",
    description:
      "Type-safe, well-tested services built for correctness and long-term maintainability.",
  },
  1: {
    icon: LayoutTemplate,
    title: "Frontend & UI",
    description:
      "Fast, accessible interfaces that hold up across devices and screen sizes.",
  },
  2: {
    icon: Cloud,
    title: "Cloud & Infrastructure",
    description:
      "Infrastructure that scales predictably and fails gracefully under load.",
  },
  3: {
    icon: Database,
    title: "Databases & Caching",
    description:
      "Data layers chosen for consistency, speed, and the access patterns that matter.",
  },
  4: {
    icon: GitBranch,
    title: "DevOps & CI/CD",
    description:
      "Automated pipelines so every release ships the same way, every time.",
  },
  5: {
    icon: BrainCircuit,
    title: "AI/ML & Data",
    description:
      "Practical AI integration focused on real workflows, not novelty.",
  },
};

const CATEGORY_ORDER = [0, 1, 2, 3, 4, 5];

export default function TechnologiesDetailList() {
  const reducedMotion = useReducedMotion();
  const [technologies, setTechnologies] = useState<TechnologyDto[]>([]);

  useEffect(() => {
    fetchTechnologies().then(setTechnologies);
  }, []);

  const groups = CATEGORY_ORDER.map((categoryId) => {
    const items = technologies
      .filter((t) => t.category === categoryId)
      .sort((a, b) => a.displayOrder - b.displayOrder);
    return { categoryId, meta: CATEGORY_META[categoryId], items };
  }).filter((group) => group.items.length > 0);

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
          {groups.map((group, i) => {
            const Icon = group.meta.icon;
            return (
              <motion.div
                key={group.categoryId}
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
                  {group.meta.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-graphite">
                  {group.meta.description}
                </p>

                <ul className="mt-6 flex flex-wrap gap-2 border-t border-graphite/10 pt-6">
                  {group.items.map((tool) => {
                    const hasIcon = !!getTechIcon(tool.name);
                    return (
                      <li
                        key={tool.id}
                        className="flex items-center gap-1.5 rounded-full border border-graphite/15 px-3 py-1 font-mono text-xs text-graphite"
                      >
                        {hasIcon ? (
                          <TechBrandIcon name={tool.name} className="h-3.5 w-3.5 shrink-0" />
                        ) : (
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-signal/60" />
                        )}
                        {tool.displayName}
                      </li>
                    );
                  })}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
