"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { fetchHero, resolveImageUrl, type HeroDto, type TelemetryPillDto } from "@/lib/hero";

const FALLBACK_HERO: HeroDto = {
  id: "fallback",
  title: "We architect the systems your business runs on.",
  subtitle:
    "Devliora designs, builds, and hardens production software for enterprise teams — APIs, platforms, and the infrastructure that keeps them connected under real load.",
  primaryCtaText: "Start a project",
  primaryCtaUrl: "#contact",
  secondaryCtaText: "See our systems",
  secondaryCtaUrl: "#work",
  backgroundImageUrl: "",
  backgroundVideoUrl: "",
  telemetryPills: [
    { id: "fallback-1", label: "deploy \u2192 production", accent: "Signal", top: 6, left: 8, displayOrder: 0 },
    { id: "fallback-2", label: "p95 latency 41ms", accent: "Ember", top: 2, left: 52, displayOrder: 1 },
    { id: "fallback-3", label: "tests: 1,204 passed", accent: "Signal", top: 38, left: 62, displayOrder: 2 },
    { id: "fallback-4", label: "zero-downtime migration", accent: "Ember", top: 58, left: 4, displayOrder: 3 },
    { id: "fallback-5", label: "uptime 99.98%", accent: "Signal", top: 78, left: 44, displayOrder: 4 },
  ],
};

const MotionLink = motion.create(Link);

const NODES = [
  { x: 60, y: 40 },
  { x: 180, y: 90 },
  { x: 90, y: 170 },
  { x: 230, y: 200 },
  { x: 160, y: 280 },
];

const EDGES: [number, number][] = [
  [0, 1],
  [1, 2],
  [1, 3],
  [2, 4],
  [3, 4],
];

function NodeGraph() {
  return (
    <svg
      viewBox="0 0 300 340"
      className="h-full w-full"
      aria-hidden="true"
    >
      {EDGES.map(([a, b], i) => (
        <motion.line
          key={`edge-${i}`}
          x1={NODES[a].x}
          y1={NODES[a].y}
          x2={NODES[b].x}
          y2={NODES[b].y}
          stroke="var(--color-wire)"
          strokeOpacity={0.35}
          strokeWidth={1}
          strokeDasharray="4 5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, delay: i * 0.15, ease: "easeOut" }}
        />
      ))}
      {NODES.map((n, i) => (
        <motion.circle
          key={`node-${i}`}
          cx={n.x}
          cy={n.y}
          r={5}
          fill={i % 2 === 0 ? "var(--color-signal)" : "var(--color-ember)"}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
        />
      ))}
    </svg>
  );
}

function TelemetryCluster({ pills }: { pills: TelemetryPillDto[] }) {
  return (
    <div className="relative hidden h-[420px] flex-1 lg:block">
      <div className="absolute inset-0 opacity-80">
        <NodeGraph />
      </div>
      {pills.map((pill, i) => (
        <motion.div
          key={pill.id}
          className="absolute flex items-center gap-2 rounded-full border border-wire/30 bg-ink/50 px-3 py-1.5 font-mono text-[11px] text-paper/90 backdrop-blur-sm"
          style={{ top: `${pill.top}%`, left: `${pill.left}%` }}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              pill.accent === "Signal" ? "bg-signal" : "bg-ember"
            }`}
          />
          {pill.label}
        </motion.div>
      ))}
    </div>
  );
}

export default function Hero() {
  const [hero, setHero] = useState<HeroDto>(FALLBACK_HERO);

  useEffect(() => {
    let isMounted = true;
    fetchHero().then((data) => {
      if (isMounted && data) {
        setHero(data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const backgroundSrc = hero.backgroundImageUrl ? resolveImageUrl(hero.backgroundImageUrl) : "";
  const videoSrc = hero.backgroundVideoUrl ? resolveImageUrl(hero.backgroundVideoUrl) : "";
  const pills = hero.telemetryPills && hero.telemetryPills.length > 0 ? hero.telemetryPills : FALLBACK_HERO.telemetryPills;

  return (
    <section className="relative isolate overflow-hidden bg-ink">
      <div className="absolute inset-0">
        {videoSrc ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src={videoSrc} />
          </video>
        ) : backgroundSrc ? (
          <Image src={backgroundSrc}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <>
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, var(--color-wire) 1px, transparent 1px), linear-gradient(to bottom, var(--color-wire) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
              }}
            />
            <motion.div
              className="absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-signal/25 blur-[120px]"
              animate={{ opacity: [0.35, 0.65, 0.35] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -bottom-40 right-[-10%] h-[480px] w-[480px] rounded-full bg-ember/20 blur-[140px]"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
            />
          </>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/30" />
      </div>

      <div className="relative flex min-h-[640px] max-w-6xl items-end justify-between gap-8 pl-4 pr-6 pb-4 pt-32 sm:min-h-[680px] sm:pl-6 md:pt-40">
        <motion.div initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } }}
          className="relative w-full max-w-xl overflow-hidden rounded-lg bg-paper p-6 shadow-[0_24px_60px_-20px_rgba(14,20,32,0.55)] sm:p-8"
        >
          <div className="pointer-events-none absolute inset-0 z-10 flex">
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                className="h-full flex-1 bg-ink"
                style={{ transformOrigin: "top" }}
                initial={{ scaleY: 1 }}
                animate={{ scaleY: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut", delay: 0.15 + i * 0.04 }}
              />
            ))}
          </div>

          <motion.p
            variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="font-mono text-xs uppercase tracking-[0.2em] text-signal"
          >
            /enterprise-software-engineering
          </motion.p>

          <motion.h1
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mt-4 font-display text-3xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-4xl md:text-[2.75rem]"
          >
            {hero.title}
          </motion.h1>

          <motion.p
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mt-5 text-base leading-relaxed text-graphite/80 sm:text-lg"
          >
            {hero.subtitle}
          </motion.p>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <MotionLink href={hero.primaryCtaUrl}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="group inline-flex items-center justify-center gap-2 rounded-sm bg-ember px-6 py-3.5 font-mono text-sm font-medium text-paper shadow-[0_8px_30px_-8px_rgba(255,107,53,0.55)] transition-shadow duration-200 hover:bg-ember/90 hover:shadow-[0_12px_36px_-8px_rgba(255,107,53,0.65)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
            >
              {hero.primaryCtaText}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </MotionLink>
            <MotionLink href={hero.secondaryCtaUrl}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="inline-flex items-center justify-center rounded-sm border border-ink/20 px-6 py-3.5 font-mono text-sm text-ink/80 transition-colors duration-200 hover:border-ink/40 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/30 focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
            >
              {hero.secondaryCtaText}
            </MotionLink>
          </motion.div>
</motion.div>

        <TelemetryCluster pills={pills} />
      </div>
    </section>
  );
}
