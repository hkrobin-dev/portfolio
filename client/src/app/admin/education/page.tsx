"use client";

import { useEffect, useState } from "react";
import { useSite } from "@/context/SiteContext";
import { AdminCard, SaveButton, AddItemButton, ItemCard } from "@/components/admin/AdminUI";
import { BilingualInput, PlainInput } from "@/components/admin/BilingualInput";
import { toast } from "sonner";

function newItem() {
  return {
    id: `edu-${Date.now()}`,
    degree: { en: "", bn: "" },
    institute: { en: "", bn: "" },
    period: "",
    location: { en: "", bn: "" },
    extra: { en: "", bn: "" },
    badge: "",
  };
}

export default function EducationAdminPage() {
  const { content, updateSection } = useSite();
  const [form, setForm] = useState<any[] | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (content?.education) setForm(JSON.parse(JSON.stringify(content.education)));
  }, [content]);

  if (!form) return <p className="text-muted">Loading...</p>;

  const save = async () => {
    setSaving(true);
    try {
      await updateSection("education", form);
      toast.success("Education updated!");
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
      <h1 className="text-3xl font-bold">Education</h1>

      {form.map((item, i) => (
        <AdminCard key={item.id || i} title={`Education ${i + 1}`}>
          <ItemCard onRemove={() => setForm(form.filter((_, idx) => idx !== i))}>
            <BilingualInput label="Degree" value={item.degree} onChange={(v) => update(i, { degree: v })} />
            <BilingualInput label="Institute" value={item.institute} onChange={(v) => update(i, { institute: v })} />
            <div className="grid gap-3 sm:grid-cols-2">
              <PlainInput label="Period" value={item.period} onChange={(v) => update(i, { period: v })} />
              <PlainInput label="Result / Badge (e.g. CGPA: 3.5)" value={item.badge} onChange={(v) => update(i, { badge: v })} />
            </div>
            <BilingualInput label="Location" value={item.location} onChange={(v) => update(i, { location: v })} />
            <BilingualInput label="Extra Note" value={item.extra} textarea onChange={(v) => update(i, { extra: v })} />
          </ItemCard>
        </AdminCard>
      ))}

      <AddItemButton label="Add Education" onClick={() => setForm([...form, newItem()])} />
      <SaveButton saving={saving} onClick={save} />
    </div>
  );
}
