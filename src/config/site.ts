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
  /**
   * URL pública de la web. Se toma de NEXT_PUBLIC_SITE_URL o, si no existe,
   * del dominio que asigna automáticamente Netlify (URL) o Vercel.
   * Cuando tengan dominio propio, configúrenlo en NEXT_PUBLIC_SITE_URL.
   */
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    // Netlify define URL con el dominio principal del sitio durante el build.
    process.env.URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
  locale: "es_PE",

  coach: {
    /** PENDIENTE: nombre completo del coach. */
    name: "Alex",
    handle: "@alexaf___",
    /** Foto del coach en /public/coach/. */
    photo: "/coach/alex.jpg",
    /** Títulos tal como aparecen en su biografía de TikTok. */
    roles: ["9 años en el rubro", "CEO de AF Detailing", "Trainer Oficial Feynlab Perú", "Certificaciones internacionales en Brasil y Argentina"],
    /** Biografía (cada elemento es un párrafo). */
    bio: [
      "Con 9 años de experiencia en el rubro, Alex es CEO de AF Detailing y Trainer Oficial de Feynlab en Perú. Cuenta con certificaciones internacionales en Brasil y Argentina y se especializa en la instalación de Paint Protection Film (PPF) y en la aplicación de recubrimientos cerámicos.",
      "Su método combina técnica profesional y práctica real en taller. En AF Academy forma a detailers y emprendedores para que dominen cada proceso con estándares de alto nivel y puedan ofrecerlo como un servicio profesional. Además, comparte su trabajo en redes con una comunidad de más de 13 mil seguidores.",
    ],
    /** PENDIENTE: mensaje personal del coach. */
    message: "",
  },

  /**
   * ASESORES DE VENTAS (WhatsApp)
   * Número en formato internacional, SOLO dígitos (51 = Perú).
   * Al tocar un botón de WhatsApp, la persona elige con qué asesor hablar.
   * El primero de la lista se usa si el navegador no puede mostrar la elección.
   * En los mensajes, {asesor} se reemplaza por el nombre del asesor elegido.
   */
  advisors: [
    {
      channel: "Canal 1",
      name: "Rafael",
      role: "Asesor de Cursos",
      phone: "51967586506",
      display: "967 586 506",
      greeting: "¡Hola, {asesor}! Vengo de la página de AF Academy y deseo asesoría acerca de los cursos.",
    },
    {
      channel: "Canal 2",
      name: "Julio",
      role: "Asesor de Cursos",
      phone: "51915048343",
      display: "915 048 343",
      greeting:
        "¡Hola, {asesor}! Vi los cursos en la página de AF Academy y quisiera información sobre fechas, precios y cupos disponibles.",
    },
  ],

  /** PENDIENTE: correo de contacto. */
  email: "",
  /** Distrito (se muestra en tarjetas y fechas de cursos). */
  location: "San Miguel",
  /** Dirección del taller donde se dictan los cursos. */
  address: {
    street: "Av. Rafael Escardó 385",
    district: "San Miguel",
    city: "Lima",
    lat: -12.07906,
    lng: -77.094337,
    mapsUrl: "https://maps.google.com/?q=-12.079060,-77.094337",
  },
  /** PENDIENTE: horarios de atención. */
  hours: "",

  /** Video destacado del inicio ("Mira a Alex en acción"). ID = número del enlace de TikTok. */
  heroVideo: {
    tiktokId: "7711468828307311890",
    title: "¡Así se vivió nuestro curso de Tratamiento Cerámico!",
    cover: "/videos/curso-ceramico-vivencia.jpg",
  },

  /** Medios de pago aceptados. */
  paymentMethods: ["Yape", "Plin", "Transferencia bancaria", "Pago con tarjeta"],

  social: {
    tiktok: "https://www.tiktok.com/@alexaf___",
    instagram: "https://www.instagram.com/alexaf_______",
    facebook: "",
    youtube: "",
  },

  /** Cifras públicas verificables (TikTok, 21/11/2026). */
  stats: [
    { value: "9", label: "Años de experiencia en el rubro" },
    { value: "13.9K", label: "Seguidores en TikTok" },
    { value: "102.2K", label: "Me gusta en sus videos" },
    { value: "2.6M", label: "Vistas en un solo tutorial de PPF" },
  ],

} as const;

export type Site = typeof site;
