"use client";

import { useEffect } from "react";

/**
 * Al entrar a una página, la muestra desde arriba (salvo que el enlace
 * apunte a una sección, p. ej. #alumnos). Evita que se abra a mitad de
 * página al llegar desde el anuncio de próximos cursos.
 */
export function ScrollToTop() {
  useEffect(() => {
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, []);
  return null;
}
