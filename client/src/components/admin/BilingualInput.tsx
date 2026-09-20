"use client";

import { Bilingual } from "@/context/LanguageContext";

export function BilingualInput({
  label,
  value,
  onChange,
  textarea = false,
  rows = 3,
}: {
  label: string;
  value: Bilingual;
  onChange: (next: Bilingual) => void;
  textarea?: boolean;
  rows?: number;
}) {
  const Field = textarea ? "textarea" : "input";

  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold text-foreground/80">{label}</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <span className="mb-1 block text-xs uppercase tracking-wide text-muted">English</span>
          <Field
            rows={textarea ? rows : undefined}
            value={value?.en || ""}
            onChange={(e) => onChange({ ...value, en: e.target.value })}
            className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-foreground outline-none transition focus:border-primary"
          />
        </div>
        <div>
          <span className="mb-1 block text-xs uppercase tracking-wide text-muted">বাংলা</span>
          <Field
            rows={textarea ? rows : undefined}
            value={value?.bn || ""}
            onChange={(e) => onChange({ ...value, bn: e.target.value })}
            className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-foreground outline-none transition focus:border-primary"
          />
        </div>
      </div>
    </div>
  );
}

export function PlainInput({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (next: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-semibold text-foreground/80">{label}</label>
      <input
        value={value || ""}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-foreground outline-none transition focus:border-primary"
      />
    </div>
  );
}

// Editable list of plain strings (e.g. tech stack tags), comma separated.
export function TagsInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string[];
  onChange: (next: string[]) => void;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-semibold text-foreground/80">{label}</label>
      <input
        value={(value || []).join(", ")}
        onChange={(e) =>
          onChange(
            e.target.value
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
          )
        }
        placeholder="Comma separated, e.g. React, Next.js, Node.js"
        className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-foreground outline-none transition focus:border-primary"
      />
    </div>
  );
}

// Editable bilingual list stored as arrays of {en, bn}. Edited as two
// newline-separated textareas that get zipped back together on change.
export function BilingualListInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: Bilingual[];
  onChange: (next: Bilingual[]) => void;
}) {
  const enText = (value || []).map((v) => v.en).join("\n");
  const bnText = (value || []).map((v) => v.bn).join("\n");

  const update = (enT: string, bnT: string) => {
    const enLines = enT.split("\n");
    const bnLines = bnT.split("\n");
    const len = Math.max(enLines.length, bnLines.length);
    const next: Bilingual[] = [];
    for (let i = 0; i < len; i++) {
      if ((enLines[i] || "").trim() === "" && (bnLines[i] || "").trim() === "") continue;
      next.push({ en: enLines[i] || "", bn: bnLines[i] || "" });
    }
    onChange(next);
  };

  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold text-foreground/80">{label}</p>
      <p className="text-xs text-muted">One line = one item. Keep English and Bangla lines in the same order.</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <textarea
          rows={5}
          value={enText}
          onChange={(e) => update(e.target.value, bnText)}
          className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-foreground outline-none transition focus:border-primary"
        />
        <textarea
          rows={5}
          value={bnText}
          onChange={(e) => update(enText, e.target.value)}
          className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-foreground outline-none transition focus:border-primary"
        />
      </div>
    </div>
  );
}
