// The API lives inside this Next app (src/app/api), so every request is
// same-origin and no environment variable is required. NEXT_PUBLIC_API_URL is
// still honoured as an escape hatch in case the API ever moves back out.
const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

// Must stay under Vercel's ~4.5MB request body cap — a bigger upload is
// rejected by the platform before this code ever runs.
const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem("admin_token");
}

export function setToken(token: string | null) {
  if (typeof window === "undefined") return;
  if (token) window.localStorage.setItem("admin_token", token);
  else window.localStorage.removeItem("admin_token");
}

async function request(path: string, options: RequestInit = {}) {
  const token = getToken();

  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers || {}),
      },
    });
  } catch {
    throw new Error("Could not reach the server. Please check your connection and try again.");
  }

  const isJson = res.headers.get("content-type")?.includes("application/json");
  const data = isJson ? await res.json() : null;

  if (!res.ok) {
    throw new Error(data?.message || `Something went wrong (${res.status}). Please try again.`);
  }

  return data;
}

export const api = {
  // Singleton sections: meta, theme, hero, about, contact, footer
  getSettings: () => request("/api/settings"),
  updateSettings: (section: string, value: unknown) =>
    request(`/api/settings/${section}`, { method: "PUT", body: JSON.stringify(value) }),

  // List collections stored as real Postgres rows
  getSkills: () => request("/api/skills"),
  updateSkills: (value: unknown) => request("/api/skills", { method: "PUT", body: JSON.stringify(value) }),

  getExperience: () => request("/api/experience"),
  updateExperience: (value: unknown) =>
    request("/api/experience", { method: "PUT", body: JSON.stringify(value) }),

  getEducation: () => request("/api/education"),
  updateEducation: (value: unknown) =>
    request("/api/education", { method: "PUT", body: JSON.stringify(value) }),

  getProjects: () => request("/api/projects"),
  getProject: (id: string) => request(`/api/projects/${id}`),
  updateProjects: (value: unknown) => request("/api/projects", { method: "PUT", body: JSON.stringify(value) }),

  getBlogs: () => request("/api/blogs"),
  getBlog: (id: string) => request(`/api/blogs/${id}`),
  updateBlogs: (value: unknown) => request("/api/blogs", { method: "PUT", body: JSON.stringify(value) }),

  getTestimonials: () => request("/api/testimonials"),
  updateTestimonials: (value: unknown) =>
    request("/api/testimonials", { method: "PUT", body: JSON.stringify(value) }),

  login: (username: string, password: string) =>
    request("/api/auth/login", { method: "POST", body: JSON.stringify({ username, password }) }),
  me: () => request("/api/auth/me"),

  uploadImage: async (file: File): Promise<{ url: string }> => {
    // Checked here too so the admin gets a readable message rather than a
    // gateway error from Vercel's body-size limit.
    if (file.size > MAX_UPLOAD_BYTES) {
      throw new Error("That image is too large. Please pick one under 4 MB.");
    }

    const token = getToken();
    const formData = new FormData();
    formData.append("image", file);

    let res: Response;
    try {
      res = await fetch(`${API_URL}/api/upload`, {
        method: "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        body: formData,
      });
    } catch {
      throw new Error("Could not reach the server to upload the image.");
    }

    const data = await res.json();
    if (!res.ok) throw new Error(data?.message || "Upload failed.");
    return data;
  },
};

export function resolveMediaUrl(url?: string) {
  if (!url) return "";
  if (url.startsWith("http") || url.startsWith("/images")) return url;
  // Legacy path from the standalone Express server. Nothing writes to /uploads
  // any more (uploads go to Vercel Blob and return absolute https URLs), but
  // an old row in the database could still point here — so prefix rather than
  // drop it, and it resolves to the same app now that both share an origin.
  if (url.startsWith("/uploads")) return `${API_URL}${url}`;
  return url;
}
