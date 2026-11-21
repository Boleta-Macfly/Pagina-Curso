/**
 * CONFIGURACIÓN CENTRAL DE LA ACADEMIA
 * ------------------------------------------------------------
 * Edita aquí los datos generales. Todo lo que esté marcado como
 * PENDIENTE debe completarse con información real del coach.
 */

export const site = {
  name: "AF Academy",
  shortName: "AF Academy",
  /** Empresa del coach (dato de su biografía de TikTok). */
  company: "AF Detailing",
  tagline: "Cursos profesionales de PPF y tratamiento cerámico",
  description:
    "Academia de detailing profesional dirigida por Alex, CEO de AF Detailing y Trainer Oficial Feynlab Perú. Cursos prácticos de PPF y tratamiento cerámico.",
  /** URL de producción (cámbiala cuando tengas dominio propio). */
  url: "https://afacademy.example",
  locale: "es_PE",

  coach: {
    /** PENDIENTE: nombre completo del coach. */
    name: "Alex",
    handle: "@alexaf___",
    /** Títulos tal como aparecen en su biografía de TikTok. */
    roles: ["CEO de AF Detailing", "Trainer Oficial Feynlab Perú"],
    /** PENDIENTE: biografía real del coach. */
    bio: "",
    /** PENDIENTE: mensaje personal del coach. */
    message: "",
  },

  /**
   * WhatsApp en formato internacional, SOLO dígitos, sin "+" ni espacios.
   * Ejemplo para Perú: "51987654321".
   * PENDIENTE: mientras esté vacío, los botones abren WhatsApp con el
   * mensaje listo pero sin destinatario.
   */
  whatsappNumber: "",

  /** PENDIENTE: correo de contacto. */
  email: "",
  /** PENDIENTE: ciudad / dirección del taller, si corresponde. */
  location: "Perú",
  /** PENDIENTE: horarios de atención. */
  hours: "",

  social: {
    tiktok: "https://www.tiktok.com/@alexaf___",
    instagram: "",
    facebook: "",
    youtube: "",
  },

  /** Cifras públicas verificables (TikTok, 21/11/2026). */
  stats: [
    { value: "13.9K", label: "Seguidores en TikTok" },
    { value: "102.2K", label: "Me gusta en sus videos" },
    { value: "2.6M", label: "Vistas en un solo tutorial de PPF" },
  ],

  /** Mensaje por defecto para WhatsApp. */
  defaultWhatsappMessage:
    "Hola Alex, quisiera recibir información sobre los cursos de AF Academy y conocer las próximas fechas.",
} as const;

export type Site = typeof site;
