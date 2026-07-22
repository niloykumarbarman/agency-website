import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo";
import { fetchBlogPosts } from "@/lib/blogPosts";

const STATIC_ROUTES: { path: string; priority: number }[] = [
  { path: "", priority: 1.0 },
  { path: "/about", priority: 0.7 },
  { path: "/services", priority: 0.8 },
  { path: "/solutions", priority: 0.8 },
  { path: "/industries", priority: 0.6 },
  { path: "/technologies", priority: 0.6 },
  { path: "/portfolio", priority: 0.7 },
  { path: "/case-studies", priority: 0.7 },
  { path: "/blog", priority: 0.7 },
  { path: "/careers", priority: 0.5 },
  { path: "/contact", priority: 0.6 },
  { path: "/book-consultation", priority: 0.6 },
  { path: "/privacy", priority: 0.3 },
  { path: "/terms", priority: 0.3 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map(
    ({ path, priority }) => ({
      url: `${siteConfig.url}${path}`,
      lastModified: new Date(),
      changeFrequency: path === "" ? "weekly" : "monthly",
      priority,
    })
  );

  // Blog posts are dynamic content served from the live API, so they are
  // fetched here rather than hardcoded. If the API is unreachable (e.g. at
  // build time with no backend running), fall back to the static routes
  // only instead of failing the whole sitemap.
  let blogEntries: MetadataRoute.Sitemap = [];
  try {
    const posts = await fetchBlogPosts();
    blogEntries = posts.map((post) => ({
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    }));
  } catch {
    // Swallow errors so a temporarily-down API doesn't break the sitemap.
  }

  return [...staticEntries, ...blogEntries];
}
