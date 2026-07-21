"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, User, CalendarDays } from "lucide-react";
import type { BlogPostDetail } from "@/lib/blogPosts";

function formatDate(value: string | null): string {
  if (!value) return "Unpublished";
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPostDetailHero({
  post,
}: {
  post: BlogPostDetail;
}) {
  const shouldReduceMotion = useReducedMotion();

  const fadeUp = (i: number) =>
    shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay: i * 0.08 },
        };

  return (
    <section className="relative overflow-hidden bg-ink py-20 sm:py-28">
      <div className="bg-grain absolute inset-0 opacity-40" />

      <div className="relative mx-auto max-w-3xl px-6">
        <motion.div {...fadeUp(0)}>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-mono text-sm uppercase tracking-[0.2em] text-signal transition-colors hover:text-paper"
          >
            <ArrowLeft className="h-4 w-4" />
            /articles
          </Link>
        </motion.div>

        <motion.h1
          {...fadeUp(1)}
          className="mt-6 text-balance font-display text-3xl font-semibold text-paper sm:text-4xl md:text-5xl"
        >
          {post.title}
        </motion.h1>

        <motion.div
          {...fadeUp(2)}
          className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-wide text-wire"
        >
          <span className="inline-flex items-center gap-1.5">
            <User className="h-3.5 w-3.5 text-signal" />
            {post.authorName}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5 text-signal" />
            {formatDate(post.publishedAt)}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
