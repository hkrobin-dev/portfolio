"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Lock, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function AdminLoginPage() {
  const { login, isAdmin } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  if (isAdmin) {
    router.replace("/admin");
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(username, password);
      toast.success("Welcome back!");
      router.replace("/admin");
    } catch (err: any) {
      toast.error(err?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6 text-foreground">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-3xl border border-border bg-surface/70 p-8 shadow-2xl backdrop-blur"
      >
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-primary to-secondary">
            <Lock className="text-white" size={24} />
          </div>
          <h1 className="text-2xl font-bold">Admin Login</h1>
          <p className="mt-1 text-sm text-muted">Sign in to edit your portfolio content.</p>
        </div>

        <div className="space-y-4">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            autoFocus
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary"
          />
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-secondary py-3 font-semibold text-white transition hover:scale-[1.02] disabled:opacity-60"
          >
            {loading && <Loader2 size={16} className="animate-spin" />}
            Login
          </button>
        </div>

        <p className="mt-6 text-center text-xs text-muted">
          Default credentials are set in the server&apos;s <code>.env</code> file
          (<code>ADMIN_USERNAME</code> / <code>ADMIN_PASSWORD</code>).
        </p>
      </form>
    </div>
  );
}
