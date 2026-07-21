"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";

type FaqItem = {
  question: string;
  answer: string;
};

const FAQS: FaqItem[] = [
  {
    question: "What does a typical engagement look like?",
    answer:
      "Most engagements start with a two-to-three week discovery phase to map requirements and constraints, followed by design, then build in short, reviewable increments. You see working software early and often, not just at the end.",
  },
  {
    question: "Can you work with our existing systems and team?",
    answer:
      "Yes. We regularly integrate with existing databases, APIs, and internal tools, and we work alongside in-house engineers rather than replacing them. We document as we go so your team can maintain what we build.",
  },
  {
    question: "How do you handle security and compliance?",
    answer:
      "Authentication, rate limiting, and audit logging are built into every system by default, not added at the end. For regulated industries, we scope compliance requirements during discovery and design around them from day one.",
  },
  {
    question: "What happens after launch?",
    answer:
      "We offer ongoing support and monitoring arrangements scoped to your needs, from a fixed post-launch stabilization period to a longer-term retainer. You always retain full ownership of the code and infrastructure.",
  },
  {
    question: "How is pricing structured?",
    answer:
      "We scope fixed-price for well-defined projects and time-and-materials for evolving ones. Every proposal includes a clear breakdown before any work begins, no surprise invoices.",
  },
];

export default function FAQ() {
  const reduceMotion = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-grain relative overflow-hidden bg-ink text-paper">
      <div
        aria-hidden
        className="pointer-events-none absolute top-[-10%] left-[-8%] h-[420px] w-[420px] rounded-full bg-signal/15 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,theme(colors.paper/4)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.paper/4)_1px,transparent_1px)] bg-[size:56px_56px]"
      />

      <div className="relative mx-auto max-w-4xl px-6 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal">
            /faq
          </p>
          <h2 className="mt-5 text-balance font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Questions we get{" "}
            <span className="text-signal">before the first call</span>.
          </h2>
        </motion.div>

        <div className="mt-14 flex flex-col divide-y divide-paper/10 border-t border-paper/10">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={faq.question}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal"
                >
                  <span className="font-display text-lg font-medium tracking-tight sm:text-xl">
                    {faq.question}
                  </span>
                  <Plus
                    className={
                      isOpen
                        ? "h-5 w-5 shrink-0 rotate-45 text-ember transition-transform duration-300"
                        : "h-5 w-5 shrink-0 text-paper/50 transition-transform duration-300"
                    }
                    strokeWidth={1.75}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={
                        reduceMotion
                          ? { duration: 0.15 }
                          : { duration: 0.3, ease: "easeInOut" }
                      }
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pr-10 text-sm leading-relaxed text-paper/70">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
