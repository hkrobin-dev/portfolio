"use client";

import { useEffect, useState } from "react";
import { useSite } from "@/context/SiteContext";
import { AdminCard, SaveButton } from "@/components/admin/AdminUI";
import { BilingualInput, PlainInput } from "@/components/admin/BilingualInput";
import { toast } from "sonner";

export default function ContactAdminPage() {
  const { content, updateSection } = useSite();
  const [contactForm, setContactForm] = useState<any>(null);
  const [footerForm, setFooterForm] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (content?.contact) setContactForm(JSON.parse(JSON.stringify(content.contact)));
    if (content?.footer) setFooterForm(JSON.parse(JSON.stringify(content.footer)));
  }, [content]);

  if (!contactForm || !footerForm) return <p className="text-muted">Loading...</p>;

  const save = async () => {
    setSaving(true);
    try {
      await updateSection("contact", contactForm);
      await updateSection("footer", footerForm);
      toast.success("Contact info updated!");
    } catch (e: any) {
      toast.error(e?.message || "Failed to save.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Contact Info</h1>

      <AdminCard title="Contact Section">
        <BilingualInput label="Badge" value={contactForm.badge} onChange={(v) => setContactForm({ ...contactForm, badge: v })} />
        <BilingualInput label="Heading" value={contactForm.heading} onChange={(v) => setContactForm({ ...contactForm, heading: v })} />
        <BilingualInput
          label="Subheading"
          value={contactForm.subheading}
          onChange={(v) => setContactForm({ ...contactForm, subheading: v })}
        />
        <PlainInput label="Email" value={contactForm.email} onChange={(v) => setContactForm({ ...contactForm, email: v })} />
        <PlainInput label="Phone" value={contactForm.phone} onChange={(v) => setContactForm({ ...contactForm, phone: v })} />
        <PlainInput
          label="WhatsApp Link"
          value={contactForm.whatsapp}
          onChange={(v) => setContactForm({ ...contactForm, whatsapp: v })}
        />
        <BilingualInput label="Location" value={contactForm.location} onChange={(v) => setContactForm({ ...contactForm, location: v })} />
      </AdminCard>

      <AdminCard title="Footer">
        <PlainInput label="Display Name" value={footerForm.name} onChange={(v) => setFooterForm({ ...footerForm, name: v })} />
        <BilingualInput label="Tagline" value={footerForm.tagline} onChange={(v) => setFooterForm({ ...footerForm, tagline: v })} />
        <PlainInput
          label="GitHub"
          value={footerForm.socials.github}
          onChange={(v) => setFooterForm({ ...footerForm, socials: { ...footerForm.socials, github: v } })}
        />
        <PlainInput
          label="LinkedIn"
          value={footerForm.socials.linkedin}
          onChange={(v) => setFooterForm({ ...footerForm, socials: { ...footerForm.socials, linkedin: v } })}
        />
        <PlainInput
          label="Twitter / X"
          value={footerForm.socials.twitter}
          onChange={(v) => setFooterForm({ ...footerForm, socials: { ...footerForm.socials, twitter: v } })}
        />
      </AdminCard>

      <SaveButton saving={saving} onClick={save} />
    </div>
  );
}
