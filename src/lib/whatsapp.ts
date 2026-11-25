import { site } from "@/config/site";

export type Advisor = (typeof site.advisors)[number];

/** Marca que indica "usar el saludo propio de cada asesor". */
export const GREETING = "{saludo}";

/** Reemplaza {asesor} y {saludo} por los datos del asesor elegido. */
export function fillMessage(template: string, advisor: Advisor) {
  const base = template === GREETING ? advisor.greeting : template;
  return base.replaceAll("{asesor}", advisor.name);
}

export function advisorLink(advisor: Advisor, template: string = GREETING) {
  return `https://wa.me/${advisor.phone}?text=${encodeURIComponent(fillMessage(template, advisor))}`;
}

/**
 * Enlace de WhatsApp a un asesor. El `href` apunta al primer asesor
 * (funciona sin JavaScript); el selector de asesor intercepta el clic
 * usando `data-wa` con la plantilla del mensaje.
 */
export function whatsappLink(template: string = GREETING) {
  return advisorLink(site.advisors[0], template);
}

/** Atributos para cualquier botón de WhatsApp: <a {...waProps(msg)}>. */
export function waProps(template: string = GREETING) {
  return {
    href: whatsappLink(template),
    target: "_blank",
    rel: "noopener noreferrer",
    "data-wa": template,
  } as const;
}

/** Abre el selector de asesor desde código (por ejemplo, un formulario). */
export function openAdvisorChooser(template: string) {
  window.dispatchEvent(new CustomEvent("wa:elegir", { detail: template }));
}

export function courseMessage(courseTitle: string, dateLabel?: string) {
  const when = dateLabel ? ` (${dateLabel})` : "";
  return `¡Hola, {asesor}! Vengo de la página de AF Academy y me interesa el curso de ${courseTitle}${when}. ¿Me puedes asesorar?`;
}

/** Enlace para compartir con amigos (sin destinatario, no va a los asesores). */
export function shareLink(text: string) {
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}
