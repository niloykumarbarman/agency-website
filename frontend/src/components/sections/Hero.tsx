"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { fetchHero, resolveImageUrl, type HeroDto } from "@/lib/hero";

const FALLBACK_HERO: HeroDto = {
  id: "fallback",
  title: "We architect the systems your business runs on.",
  subtitle:
    "Ferrowave designs, builds, and hardens production software for enterprise teams — APIs, platforms, and the infrastructure that keeps them connected under real load.",
  primaryCtaText: "Start a project",
  primaryCtaUrl: "#contact",
  secondaryCtaText: "See our systems",
  secondaryCtaUrl: "#work",
  backgroundImageUrl: "",
};

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

  return (
    <section className="relative isolate overflow-hidden bg-ink">
      <div className="absolute inset-0">
        {backgroundSrc ? (
          <Image src={backgroundSrc}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/30" />
      </div>

      <div className="relative mx-auto flex min-h-[640px] max-w-6xl items-end px-6 pb-20 pt-32 sm:min-h-[680px] md:pt-40">
        <motion.div initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-2xl rounded-lg bg-paper p-8 shadow-[0_24px_60px_-20px_rgba(14,20,32,0.55)] sm:p-10"
        >
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal">
            /enterprise-software-engineering
          </p>

          <h1 className="mt-4 font-display text-3xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-4xl md:text-[2.75rem]">
            {hero.title}
          </h1>

          <p className="mt-5 text-base leading-relaxed text-graphite/80 sm:text-lg">
            {hero.subtitle}
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link href={hero.primaryCtaUrl}
              className="group inline-flex items-center justify-center gap-2 rounded-sm bg-ember px-6 py-3.5 font-mono text-sm font-medium text-paper shadow-[0_8px_30px_-8px_rgba(255,107,53,0.55)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-ember/90 hover:shadow-[0_12px_36px_-8px_rgba(255,107,53,0.65)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
            >
              {hero.primaryCtaText}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link href={hero.secondaryCtaUrl}
              className="inline-flex items-center justify-center rounded-sm border border-ink/20 px-6 py-3.5 font-mono text-sm text-ink/80 transition-all duration-200 hover:-translate-y-0.5 hover:border-ink/40 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/30 focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
            >
              {hero.secondaryCtaText}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
