"use client";

import { useEffect, useState } from "react";
import { useSite } from "@/context/SiteContext";
import { AdminCard, SaveButton, AddItemButton, ItemCard } from "@/components/admin/AdminUI";
import { BilingualInput, PlainInput } from "@/components/admin/BilingualInput";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { toast } from "sonner";

function newBlog() {
  return {
    id: `blog-${Date.now()}`,
    title: { en: "", bn: "" },
    description: { en: "", bn: "" },
    content: { en: "", bn: "" },
    date: new Date().toISOString().slice(0, 10),
    category: "",
    image: "",
  };
}

export default function BlogAdminPage() {
  const { content, updateSection } = useSite();
  const [form, setForm] = useState<any[] | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (content?.blogs) setForm(JSON.parse(JSON.stringify(content.blogs)));
  }, [content]);

  if (!form) return <p className="text-muted">Loading...</p>;

  const save = async () => {
    setSaving(true);
    try {
      await updateSection("blogs", form);
      toast.success("Blog posts updated!");
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
      <h1 className="text-3xl font-bold">Blog Posts</h1>
      <p className="text-sm text-muted">
        Each post gets its own page at <code>/blog/[id]</code> — clicking "Read More" on the
        site takes visitors there automatically.
      </p>

      {form.map((b, i) => (
        <AdminCard key={b.id || i} title={b.title?.en || `Post ${i + 1}`}>
          <ItemCard onRemove={() => setForm(form.filter((_, idx) => idx !== i))}>
            <ImageUploader label="Cover Image" value={b.image} onChange={(v) => update(i, { image: v })} />
            <BilingualInput label="Title" value={b.title} onChange={(v) => update(i, { title: v })} />
            <BilingualInput
              label="Short Description (shown on the card)"
              value={b.description}
              textarea
              onChange={(v) => update(i, { description: v })}
            />
            <BilingualInput
              label="Full Content (shown on the post page)"
              value={b.content}
              textarea
              rows={8}
              onChange={(v) => update(i, { content: v })}
            />
            <div className="grid gap-3 sm:grid-cols-2">
              <PlainInput label="Date" value={b.date} onChange={(v) => update(i, { date: v })} />
              <PlainInput label="Category" value={b.category} onChange={(v) => update(i, { category: v })} />
            </div>
          </ItemCard>
        </AdminCard>
      ))}

      <AddItemButton label="Add Blog Post" onClick={() => setForm([newBlog(), ...form])} />
      <SaveButton saving={saving} onClick={save} />
    </div>
  );
}
