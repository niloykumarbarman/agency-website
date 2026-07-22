import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BlogPostDetailHero from "@/components/sections/BlogPostDetailHero";
import BlogPostDetailContent from "@/components/sections/BlogPostDetailContent";
import BlogCTA from "@/components/sections/BlogCTA";
import { fetchBlogPostBySlug } from "@/lib/blogPosts";
import { articleJsonLd, buildMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchBlogPostBySlug(slug);

  if (!post) {
    return { title: "Article not found | Ferrowave" };
  }

  return buildMetadata({
    title: `${post.title} | Ferrowave`,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.coverImageUrl || undefined,
    type: "article",
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await fetchBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const jsonLd = articleJsonLd({
    title: post.title,
    description: post.excerpt,
    slug: post.slug,
    authorName: post.authorName,
    publishedAt: post.publishedAt,
    imageUrl: post.coverImageUrl || undefined,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
