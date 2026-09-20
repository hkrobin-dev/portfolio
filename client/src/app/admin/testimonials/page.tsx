"use client";

import { useEffect, useState } from "react";
import { useSite } from "@/context/SiteContext";
import { AdminCard, SaveButton, AddItemButton, ItemCard } from "@/components/admin/AdminUI";
import { BilingualInput, PlainInput } from "@/components/admin/BilingualInput";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { toast } from "sonner";

function newTestimonial() {
  return {
    id: `testimonial-${Date.now()}`,
    quote: { en: "", bn: "" },
    name: "",
    role: "",
    company: "",
    companyUrl: "",
    avatar: "",
  };
}

export default function TestimonialsAdminPage() {
  const { content, updateSection } = useSite();
  const [form, setForm] = useState<any[] | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (content?.testimonials) setForm(JSON.parse(JSON.stringify(content.testimonials)));
  }, [content]);

  if (!form) return <p className="text-muted">Loading...</p>;

  const save = async () => {
    setSaving(true);
    try {
      await updateSection("testimonials", form);
      toast.success("Testimonials updated!");
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
      <h1 className="text-3xl font-bold">Testimonials</h1>
      <p className="text-sm text-muted">
        This section stays hidden on the live site until you add at least one testimonial here.
      </p>

      {form.length === 0 && (
        <div className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted">
          No testimonials yet — add your first one below.
        </div>
      )}

      {form.map((item, i) => (
        <AdminCard key={item.id || i} title={item.name || `Testimonial ${i + 1}`}>
          <ItemCard onRemove={() => setForm(form.filter((_, idx) => idx !== i))}>
            <ImageUploader label="Avatar Photo (optional)" value={item.avatar} onChange={(v) => update(i, { avatar: v })} />
            <BilingualInput label="Quote" value={item.quote} textarea onChange={(v) => update(i, { quote: v })} />
            <div className="grid gap-3 sm:grid-cols-2">
              <PlainInput label="Name" value={item.name} onChange={(v) => update(i, { name: v })} />
              <PlainInput label="Role / Title" value={item.role} onChange={(v) => update(i, { role: v })} />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <PlainInput label="Company" value={item.company} onChange={(v) => update(i, { company: v })} />
              <PlainInput label="Company URL (optional)" value={item.companyUrl} onChange={(v) => update(i, { companyUrl: v })} />
            </div>
          </ItemCard>
        </AdminCard>
      ))}

      <AddItemButton label="Add Testimonial" onClick={() => setForm([...form, newTestimonial()])} />
      <SaveButton saving={saving} onClick={save} />
    </div>
  );
}
