"use client";

import { useEffect, useState } from "react";
import { useSite } from "@/context/SiteContext";
import { AdminCard, SaveButton, AddItemButton, ItemCard } from "@/components/admin/AdminUI";
import { BilingualInput, PlainInput, BilingualListInput } from "@/components/admin/BilingualInput";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { toast } from "sonner";

export default function AboutAdminPage() {
  const { content, updateSection } = useSite();
  const [form, setForm] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (content?.about) setForm(JSON.parse(JSON.stringify(content.about)));
  }, [content]);

  if (!form) return <p className="text-muted">Loading...</p>;

  const save = async () => {
    setSaving(true);
    try {
      await updateSection("about", form);
      toast.success("About section updated!");
    } catch (e: any) {
      toast.error(e?.message || "Failed to save.");
    } finally {
      setSaving(false);
    }
  };

  const updateStat = (i: number, patch: any) => {
    const stats = [...form.stats];
    stats[i] = { ...stats[i], ...patch };
    setForm({ ...form, stats });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">About Me Section</h1>

      <AdminCard title="Heading">
        <BilingualInput label="Badge Text" value={form.badge} onChange={(v) => setForm({ ...form, badge: v })} />
        <BilingualInput label="Heading" value={form.heading} onChange={(v) => setForm({ ...form, heading: v })} />
        <BilingualInput
          label="Subheading"
          value={form.subheading}
          textarea
          onChange={(v) => setForm({ ...form, subheading: v })}
        />
      </AdminCard>

      <AdminCard
        title="Photo & Bio"
        description="Add one photo, or a few for an auto-playing slider on the site."
      >
        <ImageUploader
          label="Profile Photo (used if Gallery below is empty)"
          value={form.imageUrl}
          onChange={(v) => setForm({ ...form, imageUrl: v })}
        />

        <div className="space-y-3">
          <p className="text-sm font-semibold text-foreground/80">
            Gallery (auto-slides through these on the site)
          </p>
          <p className="text-xs text-muted">
            Add photos here one by one — on the live site they&apos;ll change automatically,
            one after another, every few seconds. Leave empty to just show the single photo above.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {(form.gallery || []).map((img: string, gi: number) => (
              <div key={gi} className="space-y-2 rounded-xl border border-border p-3">
                <ImageUploader
                  label={`Image ${gi + 1}`}
                  value={img}
                  onChange={(v) => {
                    const gallery = [...(form.gallery || [])];
                    gallery[gi] = v;
                    setForm({ ...form, gallery });
                  }}
                />
                <button
                  onClick={() => {
                    const gallery = (form.gallery || []).filter((_: any, idx: number) => idx !== gi);
                    setForm({ ...form, gallery });
                  }}
                  className="text-xs font-semibold text-red-400 hover:text-red-300"
                >
                  Remove Image
                </button>
              </div>
            ))}
          </div>
          <AddItemButton
            label="Add Gallery Image"
            onClick={() => setForm({ ...form, gallery: [...(form.gallery || []), ""] })}
          />
        </div>

        <PlainInput
          label="Name Highlight (shown in colored text)"
          value={form.nameHighlight}
          onChange={(v) => setForm({ ...form, nameHighlight: v })}
        />
        {form.paragraphs.map((p: any, i: number) => (
          <ItemCard
            key={i}
            onRemove={() => setForm({ ...form, paragraphs: form.paragraphs.filter((_: any, idx: number) => idx !== i) })}
          >
            <BilingualInput
              label={`Paragraph ${i + 1}`}
              value={p}
              textarea
              onChange={(v) => {
                const paragraphs = [...form.paragraphs];
                paragraphs[i] = v;
                setForm({ ...form, paragraphs });
              }}
            />
          </ItemCard>
        ))}
        <AddItemButton
          label="Add Paragraph"
          onClick={() => setForm({ ...form, paragraphs: [...form.paragraphs, { en: "", bn: "" }] })}
        />
      </AdminCard>

      <AdminCard title="Stats">
        {form.stats.map((s: any, i: number) => (
          <ItemCard key={i} onRemove={() => setForm({ ...form, stats: form.stats.filter((_: any, idx: number) => idx !== i) })}>
            <div className="grid gap-3 sm:grid-cols-3">
              <PlainInput label="Number" value={s.number} onChange={(v) => updateStat(i, { number: v })} />
              <div className="sm:col-span-2">
                <BilingualInput
                  label="Label"
                  value={s.label}
                  onChange={(v) => updateStat(i, { label: v })}
                />
              </div>
            </div>
          </ItemCard>
        ))}
        <AddItemButton
          label="Add Stat"
          onClick={() => setForm({ ...form, stats: [...form.stats, { number: "", label: { en: "", bn: "" } }] })}
        />
      </AdminCard>

      <SaveButton saving={saving} onClick={save} />
    </div>
  );
}
