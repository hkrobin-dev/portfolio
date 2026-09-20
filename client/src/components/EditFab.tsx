"use client";

import Link from "next/link";
import { Pencil } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";

export default function EditFab({
  href,
  className = "right-4 top-4 sm:right-8 sm:top-8",
}: {
  href: string;
  className?: string;
}) {
  const { isAdmin } = useAuth();
  const { ui } = useLanguage();

  if (!isAdmin) return null;

  return (
    <Link
      href={href}
      className={`absolute z-20 flex items-center gap-1.5 rounded-full border border-primary/40 bg-background/80 px-3 py-1.5 text-xs font-semibold text-primary shadow-lg backdrop-blur transition hover:bg-primary hover:text-white ${className}`}
    >
      <Pencil size={13} />
      {ui.edit}
    </Link>
  );
}
