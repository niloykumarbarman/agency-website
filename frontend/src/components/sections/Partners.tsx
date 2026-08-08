"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Handshake } from "lucide-react";
import DraggableMarquee from "@/components/DraggableMarquee";
import { fetchPartners, type PartnerDto } from "@/lib/partners";
import { resolveImageUrl } from "@/lib/hero";

export default function Partners() {
  const reduceMotion = useReducedMotion();
  const [partners, setPartners] = useState<PartnerDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await fetchPartners();
      setPartners(data);
      setLoading(false);
    };
    load();
  }, []);

  if (!loading && partners.length === 0) {
    return null;
  }

  return (
    <section className="relative overflow-hidden bg-paper">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={
            reduceMotion ? { duration: 0.3 } : { duration: 0.6, ease: "easeOut" }
          }
          className="text-center"
        >
          <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Meet Our <span className="text-signal">Partners</span>
          </h2>
          <p className="mt-2 text-sm text-graphite/60">
            Who are helping us grow, thank you.
          </p>
        </motion.div>

        {loading ? (
          <p className="mt-12 text-center text-sm text-graphite/50">
            Loading partners...
          </p>
        ) : (
          <div className="relative mt-12 overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-paper to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-paper to-transparent" />

            <DraggableMarquee trackClassName="items-center gap-14">
              {[...partners, ...partners].map((partner, i) => {
                const content = partner.logoUrl ? (
                  <img
                    src={resolveImageUrl(partner.logoUrl)}
                    alt={partner.name}
                    className="h-9 w-auto max-w-[140px] object-contain grayscale opacity-70 transition-all duration-300 hover:grayscale-0 hover:opacity-100"
                  />
                ) : (
                  <span className="flex items-center gap-2 font-mono text-sm text-graphite/50">
                    <Handshake className="h-5 w-5" strokeWidth={1.6} />
                    {partner.name}
                  </span>
                );

                return (
                  <div
                    key={`${partner.id}-${i}`}
                    className="flex shrink-0 items-center justify-center px-4"
                  >
                    {partner.websiteUrl ? (
                      <a
                        href={partner.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        aria-label={partner.name}
                      >
                        {content}
                      </a>
                    ) : (
                      content
                    )}
                  </div>
                );
              })}
            </DraggableMarquee>
          </div>
        )}
      </div>
    </section>
  );
}
