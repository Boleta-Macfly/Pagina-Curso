/**
 * VIDEOS, MARCAS, PREGUNTAS FRECUENTES Y TESTIMONIOS
 * ------------------------------------------------------------
 * Todo el contenido editable de la página en un solo lugar.
 */

export type VideoCategory = "PPF" | "Cerámico" | "Corrección" | "Cursos";

export type Video = {
  title: string;
  category: VideoCategory;
  /** ID del video de TikTok (el número al final del enlace). */
  tiktokId: string;
  /** Portada opcional en /public/videos/ ("" = fondo de marca). */
  thumbnail: string;
  /** Encuadre de la portada (CSS object-position). Por defecto "center bottom". */
  focus?: string;
};

/** Enlace público del video en TikTok. */
export const tiktokUrl = (v: Video) => `https://www.tiktok.com/@alexaf___/video/${v.tiktokId}`;

/**
 * GALERÍA DE VIDEOS
 * Para agregar uno: copia el enlace en TikTok (Compartir → Copiar enlace)
 * y pega aquí el número que aparece después de /video/.
 * El primero de la lista es el destacado.
 */
export const videos: Video[] = [
  { title: "PPF en espejos · Parte 1", category: "PPF", tiktokId: "7699244885051772168", thumbnail: "/videos/ppf-espejos-1.jpg" },
  { title: "PPF en espejos · Parte 2", category: "PPF", tiktokId: "7701106528320883989", thumbnail: "/videos/ppf-espejos-2.jpg" },
  { title: "Aprende a instalar PPF en capó", category: "PPF", tiktokId: "7701838186544188690", thumbnail: "/videos/ppf-capo.jpg" },
  { title: "Aprende a instalar PPF en parachoque", category: "PPF", tiktokId: "7704412155294125320", thumbnail: "/videos/ppf-parachoque.jpg" },
  { title: "Aplicación de recubrimiento cerámico regenerativo", category: "Cerámico", tiktokId: "7691416555317464327", thumbnail: "/videos/ceramico-regenerativo.jpg", focus: "right top" },
  { title: "Cómo instalar PPF mate", category: "PPF", tiktokId: "7676968261228973319", thumbnail: "/videos/ppf-mate.jpg" },
];

export type Brand = {
  name: string;
  /** Logos en /public/brands/: versión blanca (fondo oscuro) y negra (fondo claro). */
  logo: { light: string; dark: string; width: number; height: number };
  url: string;
  note: string;
};

/** Marcas con las que trabaja la academia. Logos PENDIENTES en /public/brands/. */
export const brands: Brand[] = [
  {
    name: "Feynlab",
    logo: { light: "/brands/feynlab-blanco.png", dark: "/brands/feynlab-negro.png", width: 468, height: 400 },
    url: "",
    note: "Alex es Trainer Oficial Feynlab Perú",
  },
  {
    name: "Alcance Pro",
    logo: { light: "/brands/alcance-pro-blanco.png", dark: "/brands/alcance-pro-negro.png", width: 900, height: 335 },
    url: "",
    note: "Kit del curso de Tratamiento Cerámico",
  },
  {
    name: "Película Da Vida",
    logo: { light: "/brands/pelicula-da-vida-blanco.png", dark: "/brands/pelicula-da-vida-negro.png", width: 808, height: 86 },
    url: "",
    note: "Kit del curso de Instalación de PPF",
  },
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
    a: "Los cursos actuales son presenciales, en San Miguel, y duran 2 días. Muy pronto lanzaremos AF Academy Online.",
  },
  {
    q: "¿Cuánto cuestan los cursos?",
    a: "En preventa, Tratamiento Cerámico cuesta S/ 1,300 (precio normal S/ 1,500) e Instalación de PPF S/ 2,800 (precio normal S/ 3,300). Si llevas ambos cursos pagas S/ 3,900 y ahorras S/ 200.",
  },
  {
    q: "¿Las clases son teóricas o prácticas?",
    a: "Ambos cursos son 20% teóricos y 80% prácticos.",
  },
  {
    q: "¿Cómo separo mi cupo?",
    a: "Comunícate con un asesor para la separación de tu cupo, según el curso. Tu cupo queda confirmado cuando se valida el pago.",
  },
  {
    q: "¿Qué pasa si no puedo asistir?",
    a: "Si nos avisas con al menos 7 días de anticipación, puedes pasar tu separación a la siguiente edición del mismo curso, una sola vez. La separación no es reembolsable. Revisa los términos y condiciones para más detalles.",
  },
  {
    q: "¿Necesito experiencia previa?",
    a: "No es necesario. Los cursos están diseñados tanto para quienes empiezan desde cero como para quienes ya trabajan en el rubro. Si eres principiante, aprenderás las técnicas paso a paso desde la base; si ya tienes experiencia, perfeccionarás tu método e incorporarás nuevas técnicas profesionales para elevar la calidad de tus servicios.",
  },
  {
    q: "¿Qué medios de pago aceptan?",
    a: "Aceptamos Yape, Plin, transferencia bancaria y pago con tarjeta. Tu asesor te indicará los datos para realizar el pago de la separación y del saldo.",
  },
  { q: "¿Entregan certificado?", a: "Sí. Ambos cursos incluyen certificación, el video de tus prácticas, soporte técnico y merch." },
  {
    q: "¿Qué incluye cada curso?",
    a: "Tratamiento Cerámico incluye un kit Alcance Pro para tus primeros servicios (Aquo Alcalino, Aquo Neutro, Ziox, Lae36, Claybar y 2 VX45 de 20 ml), además de 20% de descuento en tu primera compra de productos Alcance Pro. Instalación de PPF incluye 2.5 metros lineales de PPF Película Da Vida de regalo, Magic Gel, Magic Activator, kit de paletas y cuchilla, además de 10% de descuento en PPF y 20% en gel + activador.",
  },
];

export type Testimonial = { name: string; text: string; course: string; photo: string };

/** Solo testimonios reales. Si la lista está vacía, la sección se oculta. */
export const testimonials: Testimonial[] = [];
