"use client";

import { useState } from "react";
import { api, resolveMediaUrl } from "@/lib/api";
import { Upload, Loader2 } from "lucide-react";
import { toast } from "sonner";

export function ImageUploader({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
}) {
  const [uploading, setUploading] = useState(false);

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setUploading(true);
    try {
      const { url } = await api.uploadImage(file);
      onChange(url);
      toast.success("Image uploaded.");
    } catch (e: any) {
      toast.error(e?.message || "Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-foreground/80">{label}</label>
      <div className="flex items-center gap-4">
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={resolveMediaUrl(value)}
            alt=""
            className="h-20 w-20 rounded-xl border border-border object-cover"
          />
        ) : (
          <div className="flex h-20 w-20 items-center justify-center rounded-xl border border-dashed border-border text-xs text-muted">
            No image
          </div>
        )}

        <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-medium text-foreground transition hover:border-primary">
          {uploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
          {uploading ? "Uploading..." : "Upload Image"}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
        </label>
      </div>
      <input
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder="or paste an image URL"
        className="w-full rounded-xl border border-border bg-surface px-4 py-2 text-xs text-foreground outline-none transition focus:border-primary"
      />
    </div>
  );
}
