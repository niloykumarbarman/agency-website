"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { fetchCaseStudies, type CaseStudy } from "@/lib/caseStudies";

const ILLUSTRATIVE_SUFFIX = " (Illustrative Example)";

function splitClientName(clientName: string): {
  name: string;
  isIllustrative: boolean;
} {
  if (clientName.endsWith(ILLUSTRATIVE_SUFFIX)) {
    return {
      name: clientName.slice(0, -ILLUSTRATIVE_SUFFIX.length),
      isIllustrative: true,
    };
  }
  return { name: clientName, isIllustrative: false };
}

function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trimEnd()}...`;
}

export default function PortfolioCaseStudies() {
  const shouldReduceMotion = useReducedMotion();
  const [studies, setStudies] = useState<CaseStudy[]>([]);
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );

  useEffect(() => {
    let cancelled = false;

    fetchCaseStudies()
      .then((data) => {
        if (!cancelled) {
          setStudies(data);
          setStatus("success");
        }
      })
      .catch(() => {
        if (!cancelled) {
          setStatus("error");
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const fadeUp = (i: number) =>
    shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-60px" },
          transition: { duration: 0.5, delay: (i % 6) * 0.08 },
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
        {status === "loading" && (
          <p className="font-mono text-sm text-graphite">
            Loading portfolio...
          </p>
        )}

        {status === "error" && (
          <p className="font-mono text-sm text-graphite">
            We could not load the portfolio right now. Please try again
            later.
          </p>
        )}

        {status === "success" && studies.length === 0 && (
          <div className="border border-ink/10 bg-ink/[0.02] px-8 py-14 text-center">
            <p className="font-display text-xl text-ink">
              No projects published yet
            </p>
            <p className="mx-auto mt-3 max-w-md text-graphite">
              We are documenting our first engagements. Check back soon.
            </p>
          </div>
        )}

        {status === "success" && studies.length > 0 && (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {studies.map((study, i) => {
              const { name, isIllustrative } = splitClientName(
                study.clientName
              );

              return (
                <motion.article
                  key={study.id}
                  {...fadeUp(i)}
                  className="group flex flex-col overflow-hidden rounded-xl border border-ink/10 bg-paper transition-colors duration-300 hover:border-ink/25"
                >
                  <Link href="/case-studies" className="flex flex-1 flex-col">
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-graphite/10">
                      {study.coverImageUrl && (
                        <Image
                          src={study.coverImageUrl}
                          alt={study.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      )}
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-signal">
                          {study.industry} — {name}
                        </p>
                        {isIllustrative && (
                          <span className="rounded-sm border border-ember/30 px-2 py-0.5 font-mono text-[0.625rem] uppercase tracking-[0.1em] text-ember">
                            Illustrative Example
                          </span>
                        )}
                      </div>

                      <h3 className="mt-3 font-display text-xl font-semibold leading-snug tracking-tight text-graphite">
                        {study.title}
                      </h3>

                      <p className="mt-3 flex-1 text-sm leading-relaxed text-graphite/70">
                        {truncate(study.results, 140)}
                      </p>

                      <span className="mt-6 inline-flex items-center gap-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-graphite/50 transition-colors group-hover:text-ember">
                        View full case study
                        <ArrowUpRight className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </Link>
                </motion.article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
