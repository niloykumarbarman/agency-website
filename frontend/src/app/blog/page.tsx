import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BlogHero from "@/components/sections/BlogHero";
import BlogPostList from "@/components/sections/BlogPostList";
import BlogCTA from "@/components/sections/BlogCTA";

export const metadata: Metadata = {
  title: "Blog | Ferrowave",
  description:
    "Engineering practices, architecture decisions, and lessons from building enterprise systems.",
};

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main>
        <BlogHero />
        <BlogPostList />
        <BlogCTA />
      </main>
      <Footer />
    </>
  );
}
