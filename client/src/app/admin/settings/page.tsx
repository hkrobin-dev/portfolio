"use client";

import { useEffect, useState } from "react";
import { useSite } from "@/context/SiteContext";
import { AdminCard, SaveButton } from "@/components/admin/AdminUI";
import { BilingualInput, PlainInput } from "@/components/admin/BilingualInput";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { toast } from "sonner";

export default function SettingsAdminPage() {
  const { content, updateSection } = useSite();
  const [form, setForm] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (content?.meta) setForm(JSON.parse(JSON.stringify(content.meta)));
  }, [content]);

  if (!form) return <p className="text-muted">Loading...</p>;

  const save = async () => {
    setSaving(true);
    try {
      await updateSection("meta", form);
      toast.success("Settings updated!");
    } catch (e: any) {
      toast.error(e?.message || "Failed to save.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>

      <AdminCard title="Site Identity">
        <BilingualInput label="Site Title" value={form.siteTitle} onChange={(v) => setForm({ ...form, siteTitle: v })} />
        <ImageUploader label="Favicon / Browser Icon" value={form.faviconUrl} onChange={(v) => setForm({ ...form, faviconUrl: v })} />
      </AdminCard>

      <AdminCard title="Admin Login" description="Your username & password are not stored in the database — they live in the server's .env file for security.">
        <div className="rounded-xl border border-border bg-background p-4 text-sm text-muted">
          To change your admin username or password, open <code className="text-foreground">server/.env</code> on
          your server and update <code className="text-foreground">ADMIN_USERNAME</code> and{" "}
          <code className="text-foreground">ADMIN_PASSWORD</code>, then restart the server.
        </div>
      </AdminCard>

      <SaveButton saving={saving} onClick={save} />
    </div>
  );
}
