"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function IndustriesHero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-ink py-28 md:py-36">
      <div className="bg-grain absolute inset-0" />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(61,90,254,0.25), transparent 60%), radial-gradient(circle at 80% 0%, rgba(255,107,53,0.15), transparent 55%)",
        }}
      />
      <div className="absolute inset-0 bg-[size:56px_56px] bg-[linear-gradient(to_right,rgba(243,242,237,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(243,242,237,0.04)_1px,transparent_1px)]" />

      <div className="relative mx-auto max-w-4xl px-6">
        <motion.p
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-mono text-sm uppercase tracking-[0.2em] text-signal"
        >
          /industries
        </motion.p>

        <motion.h1
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="mt-4 text-balance font-display text-4xl font-semibold text-paper md:text-5xl"
        >
          Domain context, <span className="text-signal">not guesswork</span>
        </motion.h1>

        <motion.p
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.16 }}
          className="mt-6 max-w-2xl text-lg text-wire"
        >
          Every industry has its own constraints, compliance needs, and
          failure modes. Here's where we've built the deepest context.
        </motion.p>
      </div>
    </section>
  );
}
