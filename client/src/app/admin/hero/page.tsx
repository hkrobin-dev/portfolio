"use client";

import { useEffect, useState } from "react";
import { useSite } from "@/context/SiteContext";
import { AdminCard, SaveButton } from "@/components/admin/AdminUI";
import { BilingualInput, PlainInput, TagsInput } from "@/components/admin/BilingualInput";
import { toast } from "sonner";

export default function HeroAdminPage() {
  const { content, updateSection } = useSite();
  const [form, setForm] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (content?.hero) setForm(JSON.parse(JSON.stringify(content.hero)));
  }, [content]);

  if (!form) return <p className="text-muted">Loading...</p>;

  const save = async () => {
    setSaving(true);
    try {
      await updateSection("hero", form);
      toast.success("Banner updated!");
    } catch (e: any) {
      toast.error(e?.message || "Failed to save.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Banner / Hero Section</h1>

      <AdminCard title="Main Content">
        <BilingualInput label="Greeting" value={form.greeting} onChange={(v) => setForm({ ...form, greeting: v })} />
        <PlainInput label="Full Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
        <BilingualInput label="Role / Title" value={form.role} onChange={(v) => setForm({ ...form, role: v })} />
        <BilingualInput
          label="Description"
          value={form.description}
          textarea
          onChange={(v) => setForm({ ...form, description: v })}
        />
        <TagsInput label="Tech Stack Pills" value={form.techStack} onChange={(v) => setForm({ ...form, techStack: v })} />
      </AdminCard>

      <AdminCard title="Contact & Links">
        <PlainInput label="Email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
        <PlainInput label="Phone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
        <PlainInput label="WhatsApp Link" value={form.whatsapp} onChange={(v) => setForm({ ...form, whatsapp: v })} />
        <PlainInput label="Resume URL" value={form.resumeUrl} onChange={(v) => setForm({ ...form, resumeUrl: v })} />
      </AdminCard>

      <AdminCard title="Social Links">
        <PlainInput
          label="GitHub"
          value={form.socials.github}
          onChange={(v) => setForm({ ...form, socials: { ...form.socials, github: v } })}
        />
        <PlainInput
          label="LinkedIn"
          value={form.socials.linkedin}
          onChange={(v) => setForm({ ...form, socials: { ...form.socials, linkedin: v } })}
        />
        <PlainInput
          label="Facebook"
          value={form.socials.facebook}
          onChange={(v) => setForm({ ...form, socials: { ...form.socials, facebook: v } })}
        />
        <PlainInput
          label="Twitter / X"
          value={form.socials.twitter}
          onChange={(v) => setForm({ ...form, socials: { ...form.socials, twitter: v } })}
        />
      </AdminCard>

      <SaveButton saving={saving} onClick={save} />
    </div>
  );
}
