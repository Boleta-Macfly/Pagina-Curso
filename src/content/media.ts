/**
 * VIDEOS, MARCAS, PREGUNTAS FRECUENTES Y TESTIMONIOS
 * ------------------------------------------------------------
 * Todo el contenido editable de la página en un solo lugar.
 */

export type VideoCategory = "PPF" | "Cerámico" | "Corrección" | "Cursos";

export type Video = {
  title: string;
  category: VideoCategory;
  /** Reproducciones visibles en TikTok (21/11/2026). */
  views: string;
  /** Enlace directo al video. PENDIENTE: pegar el enlace de cada uno. */
  url: string;
  /** Imagen de portada en /public/videos/. PENDIENTE. */
  thumbnail: string;
};

// Títulos y reproducciones tomados del perfil de TikTok del coach.
export const videos: Video[] = [
  { title: "Aprende a instalar PPF", category: "PPF", views: "2.6M", url: "", thumbnail: "" },
  { title: "Corrigiendo un auto de gama alta", category: "Corrección", views: "24.4K", url: "", thumbnail: "" },
  { title: "PPF en faro · Parte 1", category: "PPF", views: "9377", url: "", thumbnail: "" },
  { title: "Tratamiento cerámico: brillo y protección PRO", category: "Cerámico", views: "354", url: "", thumbnail: "" },
  { title: "¡Así se instala el PPF en una maletera! · Parte 1", category: "PPF", views: "1563", url: "", thumbnail: "" },
  { title: "PPF en faros · Parte 2", category: "PPF", views: "1332", url: "", thumbnail: "" },
  { title: "Curso de PPF · 11 y 12 de diciembre", category: "Cursos", views: "1183", url: "", thumbnail: "" },
  { title: "Aprende a instalar PPF en parachoque", category: "PPF", views: "1421", url: "", thumbnail: "" },
];

export type Brand = { name: string; logo: string; url: string; note: string };

/** Marcas con las que trabaja la academia. Logos PENDIENTES en /public/brands/. */
export const brands: Brand[] = [
  { name: "Feynlab", logo: "", url: "", note: "Alex es Trainer Oficial Feynlab Perú" },
  { name: "Alcance Pro", logo: "", url: "", note: "" },
  { name: "Película Da Vida", logo: "", url: "", note: "" },
];

export type Faq = { q: string; a: string };

/** Las preguntas sin respuesta (a: "") no se muestran. */
export const faqs: Faq[] = [
  {
    q: "¿Cómo me inscribo a un curso?",
    a: "Elige el curso y escríbenos por WhatsApp desde el botón de inscripción. Te asesoramos, confirmamos tu cupo y te enviamos los detalles.",
  },
  {
    q: "¿Los cursos son presenciales u online?",
    a: "Los cursos actuales son presenciales y prácticos en taller. Estamos preparando AF Academy Online; únete a la lista de espera para enterarte primero.",
  },
  { q: "¿Necesito experiencia previa?", a: "" }, // PENDIENTE
  { q: "¿Qué medios de pago aceptan?", a: "" }, // PENDIENTE
  { q: "¿Entregan certificado?", a: "" }, // PENDIENTE
  { q: "¿Incluye materiales y herramientas?", a: "" }, // PENDIENTE
];

export type Testimonial = { name: string; text: string; course: string; photo: string };

/** Solo testimonios reales. Si la lista está vacía, la sección se oculta. */
export const testimonials: Testimonial[] = [];
