/**
 * CATÁLOGO DE CURSOS
 * ------------------------------------------------------------
 * Para agregar un curso, copia un bloque y cambia sus datos.
 * Para quitarlo, bórralo. La página se actualiza sola
 * (menú, tarjetas, anuncio de próximos cursos y página propia).
 *
 * Campos con `null` o "" se ocultan automáticamente.
 */

export type Modality = "Presencial" | "Online" | "Híbrido";
export type CourseStatus = "abierto" | "proximamente" | "lleno";

export type Course = {
  slug: string;
  title: string;
  /** Texto corto para menú y tarjetas. */
  short: string;
  description: string;
  modality: Modality;
  status: CourseStatus;
  /** Fecha visible, ej. "11 y 12 de diciembre". "" = por confirmar. */
  dateLabel: string;
  /** Fecha de inicio ISO (AAAA-MM-DD) para ordenar el anuncio. */
  startDate: string | null;
  duration: string;
  /** Precio en soles. null = "Consultar". */
  price: number | null;
  audience: string;
  benefits: string[];
  modules: string[];
  /** Mostrar en el anuncio de próximos cursos. */
  featured: boolean;
  seo?: { title?: string; description?: string };
};

export const courses: Course[] = [
  {
    slug: "curso-ppf",
    title: "Curso de PPF",
    short: "Instalación profesional de Paint Protection Film",
    description:
      "Aprende a instalar lámina de protección de pintura (PPF) en las piezas más exigentes del vehículo: parachoques, faros y maletera, con práctica directa en taller.",
    modality: "Presencial",
    status: "abierto",
    // Fecha tomada de la miniatura de TikTok. CONFIRMAR año y horario.
    dateLabel: "11 y 12 de diciembre",
    startDate: "2026-12-11",
    duration: "2 días", // CONFIRMAR
    price: null,
    audience: "Detailers, emprendedores y personas que quieren iniciar en el PPF", // CONFIRMAR
    benefits: [], // PENDIENTE
    modules: [], // PENDIENTE
    featured: true,
  },
  {
    slug: "curso-tratamiento-ceramico",
    title: "Tratamiento Cerámico",
    short: "Técnicas de aplicación para brillo y protección PRO",
    description:
      "Técnicas de aplicación de recubrimiento cerámico para lograr brillo profundo y protección duradera, con el método que Alex enseña como Trainer Oficial Feynlab Perú.",
    modality: "Presencial",
    status: "proximamente",
    dateLabel: "",
    startDate: null,
    duration: "", // PENDIENTE
    price: null,
    audience: "", // PENDIENTE
    benefits: [],
    modules: [],
    featured: true,
  },
  {
    slug: "academia-online",
    title: "AF Academy Online",
    short: "Aprende desde casa a tu ritmo",
    description:
      "Muy pronto: cursos online con lecciones en video, módulos y acompañamiento. Únete a la lista de espera para enterarte primero.",
    modality: "Online",
    status: "proximamente",
    dateLabel: "",
    startDate: null,
    duration: "",
    price: null,
    audience: "",
    benefits: [],
    modules: [],
    featured: false,
  },
];

export const getCourse = (slug: string) => courses.find((c) => c.slug === slug);

export const statusLabel: Record<CourseStatus, string> = {
  abierto: "Inscripciones abiertas",
  proximamente: "Próximamente",
  lleno: "Cupos agotados",
};
