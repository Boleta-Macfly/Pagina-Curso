/**
 * CATÁLOGO DE CURSOS
 * ------------------------------------------------------------
 * Para agregar un curso, copia un bloque y cambia sus datos.
 * Para quitarlo, bórralo. La página se actualiza sola
 * (menú, tarjetas, anuncio de próximos cursos y página propia).
 *
 * Campos con `null`, "" o [] se ocultan automáticamente.
 */

export type Modality = "Presencial" | "Online" | "Híbrido";
export type CourseStatus = "abierto" | "proximamente" | "lleno";

export type Kit = {
  title: string;
  /** Marca que provee el kit (debe existir en content/media.ts → brands). */
  brand: string;
  items: string[];
  /** Beneficios extra destacados (descuentos, regalos). */
  perks: string[];
};

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
  location: string;
  /** Precio normal en soles. null = "Consultar". */
  price: number | null;
  /** Precio de preventa en soles (opcional). */
  presalePrice: number | null;
  audience: string;
  /** Lo que aprenderás (temario). */
  modules: string[];
  /** Lo que incluye el curso además de las clases. */
  includes: string[];
  /** Porcentaje de teoría y práctica. null = no se muestra. */
  split: { theory: number; practice: number } | null;
  kit: Kit | null;
  /** Imágenes en /public. "" = sin imagen. */
  images: { hero: string; kit: string; flyer: string };
  /** Mostrar en el anuncio de próximos cursos. */
  featured: boolean;
  seo?: { title?: string; description?: string };
};

const commonIncludes = ["Certificación", "Video de tus prácticas", "Soporte técnico", "Merch"];

export const courses: Course[] = [
  {
    slug: "curso-tratamiento-ceramico",
    title: "Tratamiento Cerámico",
    short: "Descontaminación, pulido en 3 etapas y recubrimiento cerámico",
    description:
      "Curso intensivo de detailing: aprende el proceso completo, desde la descontaminación y el pulido hasta la aplicación del recubrimiento cerámico, y amplía tus servicios.",
    modality: "Presencial",
    status: "abierto",
    dateLabel: "9 y 10 de diciembre",
    startDate: "2026-12-09", // CONFIRMAR año
    duration: "2 días",
    location: "San Miguel",
    price: 1500,
    presalePrice: 1300,
    audience: "",
    modules: [
      "Distinguir los distintos pH de shampoos",
      "Prelavado acorde a cada superficie",
      "Descontaminación química y manual",
      "Eliminación de imperfecciones de la pintura",
      "Pulido en 3 etapas",
      "Preparación de la superficie",
      "Aplicación de recubrimiento cerámico",
    ],
    includes: commonIncludes,
    split: { theory: 20, practice: 80 },
    kit: {
      title: "Kit Alcance Pro para tus primeros servicios",
      brand: "Alcance Pro",
      items: [
        "Aquo Alcalino 500 ml",
        "Aquo Neutro 500 ml",
        "Ziox 500 ml",
        "Lae36 500 ml",
        "Claybar 75 g",
        "VX45 20 ml × 2",
      ],
      perks: [],
    },
    images: {
      hero: "/cursos/ceramico-portada.jpg",
      kit: "/cursos/ceramico-kit.jpg",
      flyer: "/flyers/flyer-curso-tratamiento-ceramico.jpg",
    },
    featured: true,
    seo: {
      title: "Curso de Tratamiento Cerámico presencial",
      description:
        "Curso intensivo de tratamiento cerámico con AlexAF: descontaminación, pulido en 3 etapas y aplicación de recubrimiento cerámico. Incluye kit Alcance Pro y certificación.",
    },
  },
  {
    slug: "curso-ppf",
    title: "Instalación de PPF",
    short: "Precortes manuales y con plotter, piezas complejas e interior",
    description:
      "Curso intensivo de instalación de Paint Protection Film: precortes a mano y con plotter, manejo del software e instalación en piezas complejas, interior y exterior.",
    modality: "Presencial",
    status: "abierto",
    dateLabel: "11 y 12 de diciembre",
    startDate: "2026-12-11", // CONFIRMAR año
    duration: "2 días",
    location: "San Miguel",
    price: 3300,
    presalePrice: 2800,
    audience: "",
    modules: [
      "Precortes de manera manual",
      "Precortes utilizando plotter",
      "Capacitación en el uso del software y el plotter",
      "Instalación de PPF en piezas complejas",
      "Instalación de PPF interior y exterior",
    ],
    includes: commonIncludes,
    split: { theory: 20, practice: 80 },
    kit: {
      title: "Kit PPF para tus primeros servicios",
      brand: "Película Da Vida",
      items: ["2.5 metros lineales de PPF de regalo", "Magic Gel 1 L", "Magic Activator 1 L", "Kit de paletas", "Cuchilla"],
      perks: ["10% de descuento en PPF", "20% de descuento en gel + activador"],
    },
    images: {
      hero: "/cursos/ppf-portada.jpg",
      kit: "/cursos/ppf-kit.jpg",
      flyer: "/flyers/flyer-curso-ppf.jpg",
    },
    featured: true,
    seo: {
      title: "Curso de Instalación de PPF presencial",
      description:
        "Curso intensivo de instalación de PPF con AlexAF: precortes manuales y con plotter, piezas complejas, interior y exterior. Incluye kit PPF y certificación.",
    },
  },
  {
    slug: "academia-online",
    title: "AF Academy Online",
    short: "Aprende desde casa a tu ritmo",
    description:
      "Muy pronto: cursos online con lecciones en video, módulos y acompañamiento.",
    modality: "Online",
    status: "proximamente",
    dateLabel: "",
    startDate: null,
    duration: "",
    location: "",
    price: null,
    presalePrice: null,
    audience: "",
    modules: [],
    includes: [],
    split: null,
    kit: null,
    images: { hero: "", kit: "", flyer: "" },
    featured: false,
  },
];

/** Promoción por llevar ambos cursos presenciales. */
export const bundle = {
  enabled: true,
  title: "Lleva ambos cursos",
  courses: ["curso-tratamiento-ceramico", "curso-ppf"],
  price: 3900,
  savings: 200,
};

export const getCourse = (slug: string) => courses.find((c) => c.slug === slug);

export const statusLabel: Record<CourseStatus, string> = {
  abierto: "Inscripciones abiertas",
  proximamente: "Próximamente",
  lleno: "Cupos agotados",
};

export const soles = (n: number) => `S/ ${n.toLocaleString("es-PE")}`;
