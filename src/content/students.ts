/**
 * FOTOS DE ALUMNOS (reales)
 * ------------------------------------------------------------
 * Para agregar fotos: guárdalas en /public/alumnos/ y añade una entrada.
 * `course` es el slug del curso (ver content/courses.ts).
 * Solo publicar fotos de alumnos que aceptaron aparecer en la web.
 */

export type StudentPhoto = {
  src: string;
  alt: string;
  width: number;
  height: number;
  kind: "grupo" | "certificado" | "clase";
};

export type StudentEdition = {
  course: string;
  label: string;
  photos: StudentPhoto[];
};

export const studentEditions: StudentEdition[] = [
  {
    course: "curso-tratamiento-ceramico",
    label: "Edición octubre 2026",
    photos: [
      { src: "/alumnos/grupo.jpg", alt: "Alumnos de la edición de octubre con sus certificados en el taller", width: 1600, height: 1200, kind: "grupo" },
      { src: "/alumnos/certificado-2.jpg", alt: "Alumno recibiendo su certificado junto a Alex", width: 900, height: 1600, kind: "certificado" },
      { src: "/alumnos/practica-capo.jpg", alt: "Alumno trabajando sobre el capó bajo las luces hexagonales", width: 1200, height: 1600, kind: "clase" },
      { src: "/alumnos/certificado-4.jpg", alt: "Alumno con su certificado y kit junto a Alex", width: 900, height: 1600, kind: "certificado" },
      { src: "/alumnos/clase-explicacion.jpg", alt: "Alex explicando el proceso a los alumnos", width: 1500, height: 1125, kind: "clase" },
      { src: "/alumnos/practica-techo.jpg", alt: "Alumno puliendo el techo de un auto", width: 900, height: 1600, kind: "clase" },
      { src: "/alumnos/certificado-1.jpg", alt: "Alumno con su certificado junto a Alex", width: 900, height: 1600, kind: "certificado" },
      { src: "/alumnos/clase-dilucion.jpg", alt: "Alumno revisando la dilución de un producto con Alex", width: 1200, height: 1600, kind: "clase" },
      { src: "/alumnos/certificado-3.jpg", alt: "Alumno con su certificado y la bolsa del curso junto a Alex", width: 900, height: 1600, kind: "certificado" },
      { src: "/alumnos/practica-pulidora.jpg", alt: "Alumno preparando la pulidora", width: 1200, height: 1600, kind: "clase" },
      { src: "/alumnos/clase-atentos.jpg", alt: "Alumnos atentos a una demostración", width: 1200, height: 1600, kind: "clase" },
    ],
  },
];

export const editionsFor = (course: string) => studentEditions.filter((e) => e.course === course);
