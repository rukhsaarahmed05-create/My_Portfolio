import { apiRequest } from "@/lib/queryClient";
import type { InsertContact } from "@shared/schema";

export const api = {
  // Projects
  getProjects: (category?: string) => {
    const url = category ? `/api/projects?category=${encodeURIComponent(category)}` : "/api/projects";
    return fetch(url).then(res => res.json());
  },
  
  getProject: (id: number) => {
    return fetch(`/api/projects/${id}`).then(res => res.json());
  },
  
  // Blog Posts
  getBlogPosts: (params?: { published?: boolean; q?: string }) => {
    const searchParams = new URLSearchParams();
    if (params?.published !== undefined) {
      searchParams.set("published", params.published.toString());
    }
    if (params?.q) {
      searchParams.set("q", params.q);
    }
    const url = `/api/blog-posts${searchParams.toString() ? `?${searchParams}` : ""}`;
    return fetch(url).then(res => res.json());
  },
  
  getBlogPost: (id: number) => {
    return fetch(`/api/blog-posts/${id}`).then(res => res.json());
  },
  
  getBlogPostBySlug: (slug: string) => {
    return fetch(`/api/blog-posts/slug/${slug}`).then(res => res.json());
  },
  
  // Skills
  getSkills: () => {
    return fetch("/api/skills").then(res => res.json());
  },
  
  // Contact
  submitContact: (data: InsertContact) => {
    return apiRequest("POST", "/api/contact", data);
  },
};
