"use client";

import { useEffect, useState } from "react";
import { useSite } from "@/context/SiteContext";
import { AdminCard, SaveButton, AddItemButton, ItemCard, RemoveItemButton } from "@/components/admin/AdminUI";
import { BilingualInput, PlainInput } from "@/components/admin/BilingualInput";
import { toast } from "sonner";

export default function SkillsAdminPage() {
  const { content, updateSection } = useSite();
  const [form, setForm] = useState<any[] | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (content?.skills) setForm(JSON.parse(JSON.stringify(content.skills)));
  }, [content]);

  if (!form) return <p className="text-muted">Loading...</p>;

  const save = async () => {
    setSaving(true);
    try {
      await updateSection("skills", form);
      toast.success("Skills updated!");
    } catch (e: any) {
      toast.error(e?.message || "Failed to save.");
    } finally {
      setSaving(false);
    }
  };

  const updateGroup = (i: number, patch: any) => {
    const next = [...form];
    next[i] = { ...next[i], ...patch };
    setForm(next);
  };

  const updateItem = (gi: number, ii: number, patch: any) => {
    const next = [...form];
    const items = [...next[gi].items];
    items[ii] = { ...items[ii], ...patch };
    next[gi] = { ...next[gi], items };
    setForm(next);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Skills</h1>

      {form.map((group, gi) => (
        <AdminCard key={gi} title={`Category ${gi + 1}`}>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <BilingualInput label="Category Name" value={group.category} onChange={(v) => updateGroup(gi, { category: v })} />
            </div>
            <RemoveItemButton onClick={() => setForm(form.filter((_, idx) => idx !== gi))} />
          </div>

          <div className="space-y-3">
            {group.items.map((item: any, ii: number) => (
              <div key={ii} className="grid gap-3 rounded-xl border border-border p-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
                <PlainInput label="Skill Name" value={item.name} onChange={(v) => updateItem(gi, ii, { name: v })} />
                <PlainInput label="Icon URL" value={item.icon} onChange={(v) => updateItem(gi, ii, { icon: v })} />
                <button
                  onClick={() => {
                    const next = [...form];
                    next[gi] = { ...next[gi], items: next[gi].items.filter((_: any, idx: number) => idx !== ii) };
                    setForm(next);
                  }}
                  className="h-fit rounded-lg border border-red-500/30 px-3 py-2 text-xs font-semibold text-red-400 hover:bg-red-500/10"
                >
                  Remove
                </button>
              </div>
            ))}
            <AddItemButton
              label="Add Skill"
              onClick={() => {
                const next = [...form];
                next[gi] = { ...next[gi], items: [...next[gi].items, { name: "", icon: "" }] };
                setForm(next);
              }}
            />
          </div>
        </AdminCard>
      ))}

      <AddItemButton
        label="Add Category"
        onClick={() => setForm([...form, { category: { en: "", bn: "" }, items: [] }])}
      />

      <SaveButton saving={saving} onClick={save} />
    </div>
  );
}
