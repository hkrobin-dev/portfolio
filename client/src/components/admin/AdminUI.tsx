"use client";

import { ReactNode } from "react";
import { Loader2, Save, Plus, Trash2 } from "lucide-react";

export function AdminCard({ title, description, children }: { title: string; description?: string; children: ReactNode }) {
  return (
    <div className="rounded-3xl border border-border bg-surface/60 p-6 sm:p-8">
      <h2 className="text-xl font-bold">{title}</h2>
      {description && <p className="mt-1 text-sm text-muted">{description}</p>}
      <div className="mt-6 space-y-6">{children}</div>
    </div>
  );
}

export function SaveButton({ saving, onClick }: { saving: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      disabled={saving}
      className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-secondary px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
      {saving ? "Saving..." : "Save Changes"}
    </button>
  );
}

export function AddItemButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-xl border border-dashed border-primary/50 px-4 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary/10"
    >
      <Plus size={16} /> {label}
    </button>
  );
}

export function RemoveItemButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="Remove"
      className="inline-flex items-center gap-1 rounded-lg border border-red-500/30 px-3 py-1.5 text-xs font-semibold text-red-400 transition hover:bg-red-500/10"
    >
      <Trash2 size={13} /> Remove
    </button>
  );
}

export function ItemCard({ children, onRemove }: { children: ReactNode; onRemove: () => void }) {
  return (
    <div className="space-y-4 rounded-2xl border border-border bg-background/40 p-5">
      {children}
      <div className="flex justify-end border-t border-border pt-4">
        <RemoveItemButton onClick={onRemove} />
      </div>
    </div>
  );
}
