import { site } from "@/lib/site";

export type SubmitPayload = Record<string, string | number | undefined>;

/** Build a nicely formatted WhatsApp message from a submission payload. */
export function buildWhatsAppMessage(subject: string, data: SubmitPayload) {
  const lines = [`*${subject}*`, "", ...Object.entries(data)
    .filter(([, v]) => v !== undefined && v !== "" && v !== null)
    .map(([k, v]) => `*${prettyKey(k)}:* ${v}`)];
  return lines.join("\n");
}

function prettyKey(k: string) {
  return k.replace(/[_-]/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
}

export function whatsappUrl(subject: string, data: SubmitPayload) {
  const text = encodeURIComponent(buildWhatsAppMessage(subject, data));
  return `https://wa.me/${site.whatsapp}?text=${text}`;
}

/** Submit to Formspree, then open WhatsApp with the same content prefilled. */
export async function submitLead(subject: string, data: SubmitPayload) {
  const body = { _subject: subject, ...data };
  const res = await fetch(site.formspree, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error("Form submission failed");
  // Open WhatsApp in a new tab so the user can confirm instantly.
  try {
    window.open(whatsappUrl(subject, data), "_blank", "noopener");
  } catch {
    /* ignore popup block */
  }
  return true;
}
