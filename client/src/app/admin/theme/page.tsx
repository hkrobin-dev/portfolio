"use client";

import { useEffect, useState } from "react";
import { useSite } from "@/context/SiteContext";
import { AdminCard, SaveButton } from "@/components/admin/AdminUI";
import { toast } from "sonner";

const COLOR_FIELDS: { key: string; label: string }[] = [
  { key: "primary", label: "Primary (buttons, highlights)" },
  { key: "secondary", label: "Secondary (gradients)" },
  { key: "accent", label: "Accent" },
  { key: "backgroundDark", label: "Background — Dark mode" },
  { key: "surfaceDark", label: "Card / Surface — Dark mode" },
  { key: "textDark", label: "Text — Dark mode" },
  { key: "backgroundLight", label: "Background — Light mode" },
  { key: "surfaceLight", label: "Card / Surface — Light mode" },
  { key: "textLight", label: "Text — Light mode" },
];

export default function ThemeAdminPage() {
  const { content, updateSection } = useSite();
  const [form, setForm] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (content?.theme) setForm(JSON.parse(JSON.stringify(content.theme)));
  }, [content]);

  if (!form) return <p className="text-muted">Loading...</p>;

  const save = async () => {
    setSaving(true);
    try {
      await updateSection("theme", form);
      toast.success("Theme updated!");
    } catch (e: any) {
      toast.error(e?.message || "Failed to save.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Theme & Colors</h1>

      <AdminCard title="Default Mode" description="Which mode visitors see by default (they can still switch).">
        <div className="flex gap-3">
          {["dark", "light", "system"].map((m) => (
            <button
              key={m}
              onClick={() => setForm({ ...form, defaultMode: m })}
              className={`flex-1 rounded-xl border px-4 py-3 text-sm font-semibold capitalize transition ${
                form.defaultMode === m
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted hover:border-primary/40"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </AdminCard>

      <AdminCard title="Colors" description="Pick your brand colors — the whole site updates instantly.">
        <div className="grid gap-5 sm:grid-cols-2">
          {COLOR_FIELDS.map((f) => (
            <div key={f.key} className="space-y-1.5">
              <label className="text-sm font-medium text-foreground/80">{f.label}</label>
              <div className="flex items-center gap-3 rounded-xl border border-border bg-background px-3 py-2">
                <input
                  type="color"
                  value={form.colors[f.key]}
                  onChange={(e) => setForm({ ...form, colors: { ...form.colors, [f.key]: e.target.value } })}
                  className="h-9 w-9 cursor-pointer rounded-md border-none bg-transparent"
                />
                <input
                  value={form.colors[f.key]}
                  onChange={(e) => setForm({ ...form, colors: { ...form.colors, [f.key]: e.target.value } })}
                  className="w-full bg-transparent text-sm outline-none"
                />
              </div>
            </div>
          ))}
        </div>
      </AdminCard>

      <SaveButton saving={saving} onClick={save} />
    </div>
  );
}
