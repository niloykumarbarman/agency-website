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

export interface BlogPostDetail extends BlogPost {
  content: string;
}

export async function fetchBlogPostBySlug(
  slug: string
): Promise<BlogPostDetail | null> {
  const res = await fetch(`${BLOG_POSTS_API_URL}/${slug}`, {
    cache: "no-store",
  });
  if (res.status === 404) {
    return null;
  }
  if (!res.ok) {
    throw new Error(`Failed to fetch blog post: ${res.status}`);
  }
  return res.json();
}
