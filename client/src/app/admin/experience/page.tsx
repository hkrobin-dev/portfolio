"use client";

import { useEffect, useState } from "react";
import { useSite } from "@/context/SiteContext";
import { AdminCard, SaveButton, AddItemButton, ItemCard } from "@/components/admin/AdminUI";
import { BilingualInput, PlainInput, TagsInput, BilingualListInput } from "@/components/admin/BilingualInput";
import { toast } from "sonner";

function newItem() {
  return {
    id: `exp-${Date.now()}`,
    role: { en: "", bn: "" },
    company: "",
    companyUrl: "",
    location: { en: "", bn: "" },
    period: "",
    points: [],
    stack: [],
  };
}

export default function ExperienceAdminPage() {
  const { content, updateSection } = useSite();
  const [form, setForm] = useState<any[] | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (content?.experience) setForm(JSON.parse(JSON.stringify(content.experience)));
  }, [content]);

  if (!form) return <p className="text-muted">Loading...</p>;

  const save = async () => {
    setSaving(true);
    try {
      await updateSection("experience", form);
      toast.success("Experience updated!");
    } catch (e: any) {
      toast.error(e?.message || "Failed to save.");
    } finally {
      setSaving(false);
    }
  };

  const update = (i: number, patch: any) => {
    const next = [...form];
    next[i] = { ...next[i], ...patch };
    setForm(next);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Experience</h1>

      {form.map((item, i) => (
        <AdminCard key={item.id || i} title={`Experience ${i + 1}`}>
          <ItemCard onRemove={() => setForm(form.filter((_, idx) => idx !== i))}>
            <BilingualInput label="Role / Position" value={item.role} onChange={(v) => update(i, { role: v })} />
            <div className="grid gap-3 sm:grid-cols-2">
              <PlainInput label="Company" value={item.company} onChange={(v) => update(i, { company: v })} />
              <PlainInput label="Company URL" value={item.companyUrl} onChange={(v) => update(i, { companyUrl: v })} />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <PlainInput label="Period (e.g. Jan 2025 - Present)" value={item.period} onChange={(v) => update(i, { period: v })} />
              <BilingualInput label="Location" value={item.location} onChange={(v) => update(i, { location: v })} />
            </div>
            <BilingualListInput label="Responsibilities / Points" value={item.points} onChange={(v) => update(i, { points: v })} />
            <TagsInput label="Tech Stack" value={item.stack} onChange={(v) => update(i, { stack: v })} />
          </ItemCard>
        </AdminCard>
      ))}

      <AddItemButton label="Add Experience" onClick={() => setForm([newItem(), ...form])} />
      <SaveButton saving={saving} onClick={save} />
    </div>
  );
}
