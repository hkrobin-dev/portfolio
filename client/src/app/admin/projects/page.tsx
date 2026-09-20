"use client";

import { useEffect, useState } from "react";
import { useSite } from "@/context/SiteContext";
import { AdminCard, SaveButton, AddItemButton, ItemCard } from "@/components/admin/AdminUI";
import { BilingualInput, PlainInput, TagsInput } from "@/components/admin/BilingualInput";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { toast } from "sonner";

function newProject() {
  return {
    id: `proj-${Date.now()}`,
    title: "",
    description: { en: "", bn: "" },
    longDescription: { en: "", bn: "" },
    image: "",
    gallery: [],
    stack: [],
    liveUrl: "",
    codeUrl: "",
    category: { en: "", bn: "" },
    features: [],
  };
}

export default function ProjectsAdminPage() {
  const { content, updateSection } = useSite();
  const [form, setForm] = useState<any[] | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (content?.projects) setForm(JSON.parse(JSON.stringify(content.projects)));
  }, [content]);

  if (!form) return <p className="text-muted">Loading...</p>;

  const save = async () => {
    setSaving(true);
    try {
      await updateSection("projects", form);
      toast.success("Projects updated!");
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

  const updateFeature = (pi: number, fi: number, patch: any) => {
    const next = [...form];
    const features = [...next[pi].features];
    features[fi] = { ...features[fi], ...patch };
    next[pi] = { ...next[pi], features };
    setForm(next);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Projects</h1>

      {form.map((p, i) => (
        <AdminCard key={p.id || i} title={p.title || `Project ${i + 1}`}>
          <ItemCard onRemove={() => setForm(form.filter((_, idx) => idx !== i))}>
            <ImageUploader label="Screenshot (used as the card thumbnail)" value={p.image} onChange={(v) => update(i, { image: v })} />

            <div className="space-y-3">
              <p className="text-sm font-semibold text-foreground/80">Gallery (slider on the project page)</p>
              <p className="text-xs text-muted">
                Add a few screenshots and visitors will see them as a swipeable slider on this
                project&apos;s page. Leave empty to just show the single screenshot above.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {(p.gallery || []).map((img: string, gi: number) => (
                  <div key={gi} className="space-y-2 rounded-xl border border-border p-3">
                    <ImageUploader
                      label={`Image ${gi + 1}`}
                      value={img}
                      onChange={(v) => {
                        const gallery = [...(p.gallery || [])];
                        gallery[gi] = v;
                        update(i, { gallery });
                      }}
                    />
                    <button
                      onClick={() => {
                        const gallery = (p.gallery || []).filter((_: any, idx: number) => idx !== gi);
                        update(i, { gallery });
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
                onClick={() => update(i, { gallery: [...(p.gallery || []), ""] })}
              />
            </div>

            <PlainInput label="Title" value={p.title} onChange={(v) => update(i, { title: v })} />
            <BilingualInput label="Short Description (shown on the card)" value={p.description} textarea onChange={(v) => update(i, { description: v })} />
            <BilingualInput
              label="Full Description (shown on the project page)"
              value={p.longDescription}
              textarea
              rows={6}
              onChange={(v) => update(i, { longDescription: v })}
            />
            <BilingualInput label="Category" value={p.category} onChange={(v) => update(i, { category: v })} />
            <TagsInput label="Tech Stack" value={p.stack} onChange={(v) => update(i, { stack: v })} />
            <div className="grid gap-3 sm:grid-cols-2">
              <PlainInput label="Live Demo URL" value={p.liveUrl} onChange={(v) => update(i, { liveUrl: v })} />
              <PlainInput label="Source Code URL" value={p.codeUrl} onChange={(v) => update(i, { codeUrl: v })} />
            </div>

            <div className="space-y-3">
              <p className="text-sm font-semibold text-foreground/80">Feature Highlights</p>
              {(p.features || []).map((f: any, fi: number) => (
                <div key={fi} className="space-y-3 rounded-xl border border-border p-4">
                  <PlainInput label="Feature Title (with emoji)" value={f.title} onChange={(v) => updateFeature(i, fi, { title: v })} />
                  <BilingualInput label="Feature Description" value={f.description} onChange={(v) => updateFeature(i, fi, { description: v })} />
                  <button
                    onClick={() => {
                      const next = [...form];
                      next[i] = { ...next[i], features: next[i].features.filter((_: any, idx: number) => idx !== fi) };
                      setForm(next);
                    }}
                    className="text-xs font-semibold text-red-400 hover:text-red-300"
                  >
                    Remove Feature
                  </button>
                </div>
              ))}
              <AddItemButton
                label="Add Feature"
                onClick={() => {
                  const next = [...form];
                  next[i] = { ...next[i], features: [...(next[i].features || []), { title: "", description: { en: "", bn: "" } }] };
                  setForm(next);
                }}
              />
            </div>
          </ItemCard>
        </AdminCard>
      ))}

      <AddItemButton label="Add Project" onClick={() => setForm([...form, newProject()])} />
      <SaveButton saving={saving} onClick={save} />
    </div>
  );
}
