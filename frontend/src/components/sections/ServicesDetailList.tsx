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

type DetailedService = {
  icon: typeof Layers;
  title: string;
  description: string;
  includes: string[];
};

const SERVICES: DetailedService[] = [
  {
    icon: Layers,
    title: "Platform Engineering",
    description:
      "Internal developer platforms, service scaffolding, and golden paths that let product teams ship without reinventing infrastructure each time.",
    includes: [
      "Clean Architecture / CQRS scaffolding for new services",
      "Reusable module templates and shared libraries",
      "Internal documentation and onboarding paths for engineers",
      "Golden-path CI templates for new repositories",
    ],
  },
  {
    icon: Workflow,
    title: "API Design & Integration",
    description:
      "Contract-first REST and event-driven APIs, versioning strategy, and integration layers that hold up under multi-team, multi-vendor load.",
    includes: [
      "OpenAPI-first contract design before implementation",
      "Versioning strategy for breaking and non-breaking changes",
      "Third-party and internal service integration layers",
      "Interactive API documentation (Scalar / OpenAPI)",
    ],
  },
  {
    icon: RefreshCw,
    title: "System Migration",
    description:
      "Legacy modernization and cloud migration executed in reversible stages, with data integrity and uptime treated as non-negotiable.",
    includes: [
      "Reversible, staged migration plans with rollback points",
      "Data integrity verification at every stage",
      "Zero/near-zero downtime cutover strategy",
      "Legacy system decommissioning once verified stable",
    ],
  },
  {
    icon: Cloud,
    title: "Cloud Infrastructure & DevOps",
    description:
      "Infrastructure as code, container orchestration, and CI/CD pipelines built for repeatable, auditable deployments at scale.",
    includes: [
      "Dockerized services with reproducible builds",
      "CI/CD pipelines with automated build, test, and deploy stages",
      "Infrastructure as code for repeatable environments",
      "Deployment audit trail for every release",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Security & Compliance Engineering",
    description:
      "Threat modeling, access control, audit logging, and hardened authentication built into the system, not bolted on afterward.",
    includes: [
      "JWT access + rotating/revocable refresh token auth",
      "Per-IP rate limiting on sensitive endpoints",
      "Full audit logging on state-changing operations",
      "Secrets and credential handling review",
    ],
  },
  {
    icon: Gauge,
    title: "Performance & Reliability Engineering",
    description:
      "Caching strategy, load testing, and observability that keep latency low and SLAs intact as traffic and complexity grow.",
    includes: [
      "Cache-aside strategy scoped per domain entity",
      "Load testing before and after major releases",
      "Structured logging and error tracking",
      "Latency and uptime monitoring dashboards",
    ],
  },
];

export default function ServicesDetailList() {
  const shouldReduceMotion = useReducedMotion();

  const fadeUp = (i: number) =>
    shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-60px" },
          transition: { duration: 0.5, delay: (i % 6) * 0.06 },
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
        <div className="grid gap-px overflow-hidden rounded-xl border border-ink/10 bg-ink/10 md:grid-cols-2">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                {...fadeUp(i)}
                className="bg-paper p-8 md:p-10"
              >
                <Icon className="h-6 w-6 text-signal" strokeWidth={1.75} />
                <h2 className="mt-5 text-xl font-semibold text-graphite">
                  {service.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-graphite/70">
                  {service.description}
                </p>
                <ul className="mt-5 space-y-2 border-t border-ink/10 pt-5">
                  {service.includes.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-graphite/70"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-signal" />
                      {item}
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
