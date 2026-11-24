import {
  BookItem,
  GalleryEntry,
  PodcastItem,
  QuoteItem,
  ReviewItem,
  SiteOverview,
  WorkItem,
} from "./types";

const TOKEN_STORAGE_KEY = "didar_admin_token";

export function getStoredToken(): string | null {
  if (typeof window === "undefined" || typeof window.localStorage?.getItem !== "function") {
    return null;
  }
  return window.localStorage.getItem(TOKEN_STORAGE_KEY);
}

export function setStoredToken(token: string | null): void {
  if (typeof window === "undefined" || typeof window.localStorage?.setItem !== "function") {
    return;
  }
  if (token) {
    window.localStorage.setItem(TOKEN_STORAGE_KEY, token);
  } else {
    window.localStorage.removeItem(TOKEN_STORAGE_KEY);
  }
}

async function requestJson<T>(url: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(url, options);
  if (!res.ok) {
    let detail = `Request failed (${res.status})`;
    try {
      const body = await res.json();
      if (body?.detail) detail = body.detail;
    } catch {
      // ignore non-json error body
    }
    throw new Error(detail);
  }
  if (res.status === 204) {
    return undefined as T;
  }
  return res.json() as Promise<T>;
}

function authHeaders(token: string): HeadersInit {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export const api = {
  getOverview: () => requestJson<SiteOverview>("/api/site-overview", { cache: "no-store" }),

  login: (username: string, password: string) =>
    requestJson<{ access_token: string; token_type: string; username: string }>("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    }),

  me: (token: string) =>
    requestJson<{ username: string }>("/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    }),

  createBook: (token: string, payload: Partial<BookItem>) =>
    requestJson<BookItem>("/api/books", {
      method: "POST",
      headers: authHeaders(token),
      body: JSON.stringify(payload),
    }),

  updateBook: (token: string, id: number, payload: Partial<BookItem>) =>
    requestJson<BookItem>(`/api/books/${id}`, {
      method: "PUT",
      headers: authHeaders(token),
      body: JSON.stringify(payload),
    }),

  deleteBook: (token: string, id: number) =>
    requestJson<void>(`/api/books/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }),

  createWork: (token: string, payload: Partial<WorkItem>) =>
    requestJson<WorkItem>("/api/works", {
      method: "POST",
      headers: authHeaders(token),
      body: JSON.stringify(payload),
    }),

  deleteWork: (token: string, id: number) =>
    requestJson<void>(`/api/works/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }),

  createQuote: (token: string, payload: Partial<QuoteItem>) =>
    requestJson<QuoteItem>("/api/quotes", {
      method: "POST",
      headers: authHeaders(token),
      body: JSON.stringify(payload),
    }),

  deleteQuote: (token: string, id: number) =>
    requestJson<void>(`/api/quotes/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }),

  createPodcast: (token: string, payload: Partial<PodcastItem>) =>
    requestJson<PodcastItem>("/api/podcasts", {
      method: "POST",
      headers: authHeaders(token),
      body: JSON.stringify(payload),
    }),

  deletePodcast: (token: string, id: number) =>
    requestJson<void>(`/api/podcasts/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }),

  createGallery: (token: string, payload: Partial<GalleryEntry>) =>
    requestJson<GalleryEntry>("/api/gallery", {
      method: "POST",
      headers: authHeaders(token),
      body: JSON.stringify(payload),
    }),

  deleteGallery: (token: string, id: number) =>
    requestJson<void>(`/api/gallery/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }),

  listAllReviews: (token: string) =>
    requestJson<ReviewItem[]>("/api/reviews?all=true", {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    }),

  submitReview: (payload: {
    author_name: string;
    author_role?: string;
    book_title?: string;
    rating: number;
    content: string;
  }) =>
    requestJson<ReviewItem>("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }),

  toggleReview: (token: string, id: number, is_approved: boolean) =>
    requestJson<ReviewItem>(`/api/reviews/${id}`, {
      method: "PATCH",
      headers: authHeaders(token),
      body: JSON.stringify({ is_approved }),
    }),

  deleteReview: (token: string, id: number) =>
    requestJson<void>(`/api/reviews/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }),

  uploadFile: async (token: string, file: File): Promise<{ url: string; filename: string }> => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    if (!res.ok) {
      let detail = `Upload failed (${res.status})`;
      try {
        const body = await res.json();
        if (body?.detail) detail = body.detail;
      } catch {
        // ignore
      }
      throw new Error(detail);
    }
    return res.json();
  },
};
