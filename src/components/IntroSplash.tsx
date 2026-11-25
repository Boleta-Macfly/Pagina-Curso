"use client";

import { useEffect, useState } from "react";

export const INTRO_KEY = "afa-intro-vista";
/** Duración total de la intro en ms (debe coincidir con la animación CSS). */
export const INTRO_MS = 2600;

const wingsLeft = [
  "M22 0H38.5L47 19.5H35C28 19.5 23.5 14.5 22 8Z",
  "M11 26H49.5L57 44.5H24C17 44.5 12.5 39 11 32Z",
  "M0 50H59.5L67 69H19C9 69 2 62 0 53Z",
];
const wingsRight = [
  "M107 0H165.5V5C165.5 13.5 160 19.5 151 19.5H98Z",
  "M96 26H137.5V31C137.5 38.5 132.5 44.5 124.5 44.5H88Z",
  "M86 50H103.5V54C103.5 62.5 98 69 89.5 69H78Z",
];
const letters = "AF ACADEMY".split("");

/**
 * Animación de bienvenida: las alas del logo se ensamblan, las letras
 * "AF ACADEMY" se juntan y la pantalla se desvanece. Se muestra una vez por
 * sesión y se omite con "reducir movimiento". Se renderiza en el servidor
 * para que aparezca desde el primer instante; un script en <head> la oculta
 * si ya se vio.
 */
export function IntroSplash() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Si ya se vio, el CSS (.no-intro) la oculta; solo se desmonta al terminar.
    const skip = document.documentElement.classList.contains("no-intro");
    if (!skip) {
      try {
        sessionStorage.setItem(INTRO_KEY, "1");
      } catch {}
    }
    const t = setTimeout(() => setDone(true), skip ? 0 : INTRO_MS);
    return () => clearTimeout(t);
  }, []);

  if (done) return null;

  return (
    <div className="intro" aria-hidden="true" onClick={() => setDone(true)}>
      <div className="intro-inner">
        <svg viewBox="0 0 166 69" className="intro-mark" fill="currentColor">
          {wingsLeft.map((d, i) => (
            <path key={d} d={d} className="intro-wing intro-wing-l" style={{ animationDelay: `${120 + i * 110}ms` }} />
          ))}
          {wingsRight.map((d, i) => (
            <path key={d} d={d} className="intro-wing intro-wing-r" style={{ animationDelay: `${120 + i * 110}ms` }} />
          ))}
        </svg>
        <p className="intro-word font-display">
          {letters.map((ch, i) => {
            const fromCenter = i - (letters.length - 1) / 2;
            return (
              <span
                key={i}
                className="intro-letter"
                style={
                  {
                    "--x": `${fromCenter * 0.9}em`,
                    animationDelay: `${650 + Math.abs(fromCenter) * 40}ms`,
                  } as React.CSSProperties
                }
              >
                {ch === " " ? " " : ch}
              </span>
            );
          })}
        </p>
        <span className="intro-line" />
      </div>
    </div>
  );
}
