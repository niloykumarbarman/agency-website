"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const NODES = [
  { id: "a", x: 60, y: 60 },
  { id: "b", x: 220, y: 40 },
  { id: "c", x: 340, y: 130 },
  { id: "d", x: 120, y: 190 },
  { id: "e", x: 280, y: 240 },
  { id: "f", x: 60, y: 300 },
];

const EDGES: [string, string][] = [
  ["a", "b"],
  ["b", "c"],
  ["a", "d"],
  ["d", "c"],
  ["d", "f"],
  ["c", "e"],
  ["d", "e"],
];

function nodeById(id: string) {
  return NODES.find((n) => n.id === id)!;
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink text-paper">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,theme(colors.paper/6)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.paper/6)_1px,transparent_1px)] bg-[size:56px_56px]"
      />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-16 px-6 pb-24 pt-20 md:pt-28 lg:flex-row lg:items-center lg:gap-12 lg:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="lg:w-3/5"
        >
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal">
            /enterprise-software-engineering
          </p>

          <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl">
            We architect the systems your business runs on.
          </h1>

          <p className="mt-6 max-w-xl text-lg text-paper/70">
            Anchorpoint designs, builds, and hardens production software for
            enterprise teams — APIs, platforms, and the infrastructure that
            keeps them connected under real load.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 rounded-sm bg-signal px-6 py-3.5 font-mono text-sm font-medium text-paper transition-colors hover:bg-signal/90"
            >
              Start a project
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="#work"
              className="inline-flex items-center justify-center rounded-sm border border-paper/20 px-6 py-3.5 font-mono text-sm text-paper/80 transition-colors hover:border-paper/40 hover:text-paper"
            >
              See our systems
            </Link>
          </div>

          <dl className="mt-16 grid max-w-md grid-cols-3 gap-6 border-t border-paper/10 pt-8">
            <div>
              <dt className="font-mono text-xs text-paper/40">Uptime SLA</dt>
              <dd className="mt-1 font-display text-2xl font-semibold">99.95%</dd>
            </div>
            <div>
              <dt className="font-mono text-xs text-paper/40">Systems shipped</dt>
              <dd className="mt-1 font-display text-2xl font-semibold">120+</dd>
            </div>
            <div>
              <dt className="font-mono text-xs text-paper/40">Avg. team tenure</dt>
              <dd className="mt-1 font-display text-2xl font-semibold">6 yrs</dd>
            </div>
          </dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="relative lg:w-2/5"
        >
          <svg
            viewBox="0 0 400 360"
            className="h-auto w-full max-w-md mx-auto"
            role="img"
            aria-label="Diagram of connected system nodes assembling into a network"
          >
            {EDGES.map(([fromId, toId], i) => {
              const from = nodeById(fromId);
              const to = nodeById(toId);
              return (
                <motion.line
                  key={`${fromId}-${toId}`}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke="var(--color-signal)"
                  strokeOpacity={0.5}
                  strokeWidth={1.5}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 + i * 0.1, ease: "easeInOut" }}
                />
              );
            })}

            {NODES.map((node, i) => (
              <motion.g
                key={node.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.08, ease: "backOut" }}
              >
                <circle cx={node.x} cy={node.y} r={7} fill="var(--color-ink)" stroke="var(--color-signal)" strokeWidth={2} />
                <circle cx={node.x} cy={node.y} r={2.5} fill="var(--color-ember)" />
              </motion.g>
            ))}
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
