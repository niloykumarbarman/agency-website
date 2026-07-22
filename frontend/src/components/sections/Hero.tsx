"use client";

import { motion, useReducedMotion } from "framer-motion";
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

const HUB_NODE_ID = "d";

function nodeById(id: string) {
  return NODES.find((n) => n.id === id)!;
}

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-grain relative overflow-hidden bg-ink text-paper">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full bg-signal/25 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-15%] left-[-10%] h-[380px] w-[380px] rounded-full bg-ember/10 blur-[120px]"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,theme(colors.paper/4)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.paper/4)_1px,transparent_1px)] bg-[size:56px_56px]"
      />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-16 px-6 pb-24 pt-20 md:pt-28 lg:flex-row lg:items-center lg:gap-12 lg:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="lg:w-3/5"
        >
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span
                className={
                  reduceMotion
                    ? "absolute inline-flex h-full w-full rounded-full bg-signal/60"
                    : "absolute inline-flex h-full w-full animate-ping rounded-full bg-signal/60"
                }
              />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
            </span>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal">
              /enterprise-software-engineering
            </p>
          </div>

          <h1 className="mt-7 font-display text-[2.75rem] font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-[4.25rem]">
            We architect the systems{" "}
            <span className="text-signal">your business runs on</span>.
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-relaxed text-paper/70">
            Ferrowave designs, builds, and hardens production software for
            enterprise teams — APIs, platforms, and the infrastructure that
            keeps them connected under real load.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 rounded-sm bg-signal px-6 py-3.5 font-mono text-sm font-medium text-paper shadow-[0_8px_30px_-8px_rgba(61,90,254,0.55)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-signal/90 hover:shadow-[0_12px_36px_-8px_rgba(61,90,254,0.65)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              Start a project
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="#work"
              className="inline-flex items-center justify-center rounded-sm border border-paper/20 px-6 py-3.5 font-mono text-sm text-paper/80 transition-all duration-200 hover:-translate-y-0.5 hover:border-paper/40 hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper/40 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              See our systems
            </Link>
          </div>

          <dl className="mt-16 grid max-w-md grid-cols-3 divide-x divide-paper/10 border-t border-paper/10 pt-8">
            <div className="pr-6">
              <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-paper/40">
                Uptime SLA
              </dt>
              <dd className="mt-1.5 font-display text-2xl font-semibold tabular-nums">
                99.95%
              </dd>
            </div>
            <div className="px-6">
              <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-paper/40">
                Systems shipped
              </dt>
              <dd className="mt-1.5 font-display text-2xl font-semibold tabular-nums">
                120+
              </dd>
            </div>
            <div className="pl-6">
              <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-paper/40">
                Avg. team tenure
              </dt>
              <dd className="mt-1.5 font-display text-2xl font-semibold tabular-nums">
                6 yrs
              </dd>
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
            className="mx-auto h-auto w-full max-w-md"
            role="img"
            aria-label="Diagram of connected system nodes assembling into a network"
          >
            <defs>
              <linearGradient id="edge-gradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="var(--color-signal)" />
                <stop offset="100%" stopColor="var(--color-ember)" />
              </linearGradient>
              <filter id="node-glow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

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
                  stroke="url(#edge-gradient)"
                  strokeOpacity={0.45}
                  strokeWidth={1.5}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 + i * 0.1, ease: "easeInOut" }}
                />
              );
            })}

            {NODES.map((node, i) => {
              const isHub = node.id === HUB_NODE_ID;
              return (
                <motion.g
                  key={node.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={
                    isHub && !reduceMotion
                      ? { opacity: 1, scale: [1, 1.15, 1] }
                      : { opacity: 1, scale: 1 }
                  }
                  transition={
                    isHub && !reduceMotion
                      ? {
                          scale: {
                            duration: 2.4,
                            repeat: Infinity,
                            repeatDelay: 1.2,
                            ease: "easeInOut",
                            delay: 1.4,
                          },
                          opacity: { duration: 0.4, delay: 0.4 + i * 0.08, ease: "backOut" },
                        }
                      : { duration: 0.4, delay: 0.4 + i * 0.08, ease: "backOut" }
                  }
                  filter={isHub ? "url(#node-glow)" : undefined}
                >
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={7}
                    fill="var(--color-ink)"
                    stroke="var(--color-signal)"
                    strokeWidth={2}
                  />
                  <circle cx={node.x} cy={node.y} r={2.5} fill="var(--color-ember)" />
                </motion.g>
              );
            })}
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
