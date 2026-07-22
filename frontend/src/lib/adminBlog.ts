import { adminFetch } from "@/lib/adminAuth";

export type BlogPostStatus = "Draft" | "Published" | "Archived";

// Backend enum has no JsonStringEnumConverter configured, so Create/Update
// commands bind Status as an integer matching BlogPostStatus.cs declaration order.
const STATUS_TO_INT: Record<BlogPostStatus, number> = {
  Draft: 0,
  Published: 1,
  Archived: 2,
};

export const BLOG_POST_STATUS_OPTIONS: BlogPostStatus[] = [
  "Draft",
  "Published",
  "Archived",
];

export interface AdminBlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImageUrl: string;
  authorName: string;
  publishedAt: string | null;
}

export interface AdminBlogPostDetail extends AdminBlogPost {
  content: string;
}

export interface BlogPostFormPayload {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImageUrl: string;
  authorName: string;
  status: BlogPostStatus;
}

export const BLOG_POSTS_ADMIN_API_URL = "http://localhost:5240/api/blog-posts";

export async function fetchAdminBlogPosts(): Promise<AdminBlogPost[]> {
  const res = await adminFetch(BLOG_POSTS_ADMIN_API_URL);
  if (!res.ok) {
    throw new Error(`Failed to fetch blog posts: ${res.status}`);
  }
  return res.json();
}

export async function fetchAdminBlogPostBySlug(
  slug: string
): Promise<AdminBlogPostDetail> {
  const res = await adminFetch(`${BLOG_POSTS_ADMIN_API_URL}/${slug}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch blog post: ${res.status}`);
  }
  return res.json();
}

export async function createBlogPost(
  payload: BlogPostFormPayload
): Promise<string> {
  const res = await adminFetch(BLOG_POSTS_ADMIN_API_URL, {
    method: "POST",
    body: JSON.stringify({
      ...payload,
      status: STATUS_TO_INT[payload.status],
    }),
  });
  if (!res.ok) {
    throw new Error(`Failed to create blog post: ${res.status}`);
  }
  return res.json();
}

export async function updateBlogPost(
  id: string,
  payload: BlogPostFormPayload
): Promise<void> {
  const res = await adminFetch(`${BLOG_POSTS_ADMIN_API_URL}/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      id,
      ...payload,
      status: STATUS_TO_INT[payload.status],
    }),
  });
  if (!res.ok) {
    throw new Error(`Failed to update blog post: ${res.status}`);
  }
}

export async function deleteBlogPost(id: string): Promise<void> {
  const res = await adminFetch(`${BLOG_POSTS_ADMIN_API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error(`Failed to delete blog post: ${res.status}`);
  }
}
