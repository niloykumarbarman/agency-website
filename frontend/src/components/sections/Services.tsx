"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Layers,
  Workflow,
  RefreshCw,
  Cloud,
  ShieldCheck,
  Gauge,
} from "lucide-react";

type Service = {
  icon: typeof Layers;
  title: string;
  description: string;
};

const SERVICES: Service[] = [
  {
    icon: Layers,
    title: "Platform Engineering",
    description:
      "Internal developer platforms, service scaffolding, and golden paths that let product teams ship without reinventing infrastructure each time.",
  },
  {
    icon: Workflow,
    title: "API Design & Integration",
    description:
      "Contract-first REST and event-driven APIs, versioning strategy, and integration layers that hold up under multi-team, multi-vendor load.",
  },
  {
    icon: RefreshCw,
    title: "System Migration",
    description:
      "Legacy modernization and cloud migration executed in reversible stages, with data integrity and uptime treated as non-negotiable.",
  },
  {
    icon: Cloud,
    title: "Cloud Infrastructure & DevOps",
    description:
      "Infrastructure as code, container orchestration, and CI/CD pipelines built for repeatable, auditable deployments at scale.",
  },
  {
    icon: ShieldCheck,
    title: "Security & Compliance Engineering",
    description:
      "Threat modeling, access control, audit logging, and hardened authentication built into the system, not bolted on afterward.",
  },
  {
    icon: Gauge,
    title: "Performance & Reliability Engineering",
    description:
      "Caching strategy, load testing, and observability that keep latency low and SLAs intact as traffic and complexity grow.",
  },
];

export default function Services() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-paper text-ink"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,theme(colors.ink/4)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.ink/4)_1px,transparent_1px)] bg-[size:56px_56px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-[-8%] h-[420px] w-[420px] rounded-full bg-signal/10 blur-[130px]"
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
            /services
          </p>
          <h2 className="mt-5 text-balance font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Engineering built for{" "}
            <span className="text-signal">systems that outlast us</span>.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-graphite/75">
            We take on the parts of enterprise software that are hardest to
            get right the first time, and hardest to unwind if they go
            wrong.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-sm border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={
                  reduceMotion
                    ? { duration: 0.3 }
                    : { duration: 0.5, ease: "easeOut", delay: i * 0.08 }
                }
                className="group relative bg-paper p-8 transition-colors duration-300 hover:bg-ink hover:text-paper"
              >
                <Icon
                  className="h-6 w-6 text-signal transition-colors duration-300 group-hover:text-ember"
                  strokeWidth={1.75}
                />
                <h3 className="mt-6 font-display text-xl font-semibold tracking-tight">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-graphite/75 transition-colors duration-300 group-hover:text-paper/70">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
