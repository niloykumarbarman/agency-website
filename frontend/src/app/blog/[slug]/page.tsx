import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BlogPostDetailHero from "@/components/sections/BlogPostDetailHero";
import BlogPostDetailContent from "@/components/sections/BlogPostDetailContent";
import BlogCTA from "@/components/sections/BlogCTA";
import { fetchBlogPostBySlug } from "@/lib/blogPosts";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchBlogPostBySlug(slug);

  if (!post) {
    return { title: "Article not found | Anchorpoint" };
  }

  return {
    title: `${post.title} | Anchorpoint`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await fetchBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main>
        <BlogPostDetailHero post={post} />
        <BlogPostDetailContent post={post} />
        <BlogCTA />
      </main>
      <Footer />
    </>
  );
}
