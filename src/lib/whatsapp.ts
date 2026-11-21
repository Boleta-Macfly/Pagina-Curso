import { site } from "@/config/site";

/** Enlace de WhatsApp con mensaje predeterminado. */
export function whatsappLink(message: string = site.defaultWhatsappMessage) {
  const text = encodeURIComponent(message);
  const number = site.whatsappNumber.replace(/\D/g, "");
  return number ? `https://wa.me/${number}?text=${text}` : `https://wa.me/?text=${text}`;
}

export function courseMessage(courseTitle: string, dateLabel?: string) {
  const when = dateLabel ? ` (${dateLabel})` : "";
  return `Hola Alex, quiero inscribirme al ${courseTitle}${when} de AF Academy. ¿Me puedes dar más información sobre cupos, horarios y precio?`;
}
