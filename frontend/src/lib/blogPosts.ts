export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImageUrl: string;
  authorName: string;
  publishedAt: string | null;
}

export const BLOG_POSTS_API_URL = "http://localhost:5240/api/blog-posts";

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  const res = await fetch(BLOG_POSTS_API_URL, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Failed to fetch blog posts: ${res.status}`);
  }
  return res.json();
}
