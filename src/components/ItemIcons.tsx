/**
 * Iconos de lo que se entrega en cada curso (incluye y kit).
 * Se eligen solos según el texto del ítem: ver `itemIcons()`.
 */

type P = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

/** Diploma con sello */
export const IconCertificate = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M14.5 19H5a1.5 1.5 0 0 1-1.5-1.5v-12A1.5 1.5 0 0 1 5 4h14a1.5 1.5 0 0 1 1.5 1.5V11" />
    <path d="M7 8h10M7 11.5h6" />
    <circle cx="18" cy="15" r="2.6" />
    <path d="m16.6 17.2-.8 3.8 2.2-1.2 2.2 1.2-.8-3.8" />
  </svg>
);

/** Cámara de video */
export const IconVideoCam = ({ className }: P) => (
  <svg {...base} className={className}>
    <rect x="2.5" y="6.5" width="13" height="11" rx="2" />
    <path d="m15.5 10.5 6-3.5v10l-6-3.5" />
    <circle cx="6.5" cy="10" r="1" fill="currentColor" stroke="none" />
  </svg>
);

/** Audífonos con micrófono */
export const IconHeadset = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
    <rect x="3" y="13" width="4" height="6" rx="1.5" />
    <rect x="17" y="13" width="4" height="6" rx="1.5" />
    <path d="M19 19c0 1.5-1.5 2.5-4 2.5h-2" />
  </svg>
);

/** Gorra */
export const IconBaseballCap = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M3.5 15.5c0-5 3.5-9 8-9s7.5 3.5 7.5 8" />
    <path d="M3.5 15.5h15.5c1.7 0 2.5.8 2.5 1.6 0 .7-.6 1.2-1.6 1.2H7.5c-2.2 0-4-1.2-4-2.8Z" />
    <path d="M11.5 6.5c-1.5 2.5-2 5.5-1.8 9" />
    <circle cx="11.5" cy="6" r=".6" fill="currentColor" stroke="none" />
  </svg>
);

/** Polo */
export const IconPolo = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M9 3.5 4 5.5 2.5 10l3 1.2L7 9.5V20.5h10V9.5l1.5 1.7 3-1.2L20 5.5l-5-2" />
    <path d="M9 3.5 12 7l3-3.5" />
    <path d="M12 7v4" />
    <circle cx="12" cy="9" r=".5" fill="currentColor" stroke="none" />
  </svg>
);

/** Botella de producto */
export const IconBottle = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M10 2.5h4v3h-4z" />
    <path d="M10 5.5 8 8.5v11.5a1.5 1.5 0 0 0 1.5 1.5h5A1.5 1.5 0 0 0 16 20V8.5l-2-3" />
    <path d="M8 12h8v5H8" />
  </svg>
);

/** Atomizador */
export const IconSpray = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M8 6h6l3 2-1.5 1.5H11" />
    <path d="M10 6V9.5l-2 2.5v8a1.5 1.5 0 0 0 1.5 1.5h4A1.5 1.5 0 0 0 15 20v-8l-2-2.5" />
    <path d="M19 4.5h1.5M19 7.5h2M19 10.5h1.5" />
  </svg>
);

/** Frasco gotero (coating) */
export const IconDropper = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M11 2.5h2v4h-2z" />
    <rect x="9.5" y="6.5" width="5" height="2.5" rx=".6" />
    <path d="M9 9h6l1 2.5v8.5a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 8 20v-8.5Z" />
    <path d="M8.5 14.5h7" />
  </svg>
);

/** Barra de arcilla (claybar) */
export const IconClay = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M4 9.5 12 5.5l8 4-8 4z" />
    <path d="M4 9.5v5l8 4 8-4v-5" />
    <path d="M12 13.5v5" />
  </svg>
);

/** Rollo de lámina PPF */
export const IconFilmRoll = ({ className }: P) => (
  <svg {...base} className={className}>
    <ellipse cx="6" cy="9" rx="2.5" ry="4" />
    <path d="M6 5h11c1.4 0 2.5 1.8 2.5 4s-1.1 4-2.5 4H6" />
    <path d="M17 13l3.5 6.5H9.5L6 13" />
    <ellipse cx="6" cy="9" rx=".8" ry="1.3" />
  </svg>
);

/** Paletas / espátulas de instalación */
export const IconSqueegee = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M4 16.5 6.5 7h11l2.5 9.5Z" />
    <path d="M4 16.5h16v2.5H4z" />
    <path d="M9 10.5h6" />
  </svg>
);

/** Cuchilla / cúter */
export const IconCutter = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M3 17.5 15 7.5l3.5 3.5-10 9.5H5a2 2 0 0 1-2-2Z" />
    <path d="m15 7.5 2.5-3 4 4-3 2.5" />
    <path d="M7 16.5l2.5-2" />
  </svg>
);

const rules: [RegExp, React.ComponentType<P>[]][] = [
  [/certific/i, [IconCertificate]],
  [/video/i, [IconVideoCam]],
  [/soporte/i, [IconHeadset]],
  [/merch|polo|gorra/i, [IconBaseballCap, IconPolo]],
  [/vx45|coat/i, [IconDropper]],
  [/lae36|spray/i, [IconSpray]],
  [/clay/i, [IconClay]],
  [/ppf|película|metros/i, [IconFilmRoll]],
  [/paleta/i, [IconSqueegee]],
  [/cuchilla|cúter|cutter/i, [IconCutter]],
  [/aquo|ziox|gel|activator|ml|l$/i, [IconBottle]],
];

/** Devuelve los iconos que corresponden a un ítem según su texto. */
export function itemIcons(text: string): React.ComponentType<P>[] {
  for (const [re, icons] of rules) if (re.test(text)) return icons;
  return [IconBottle];
}

export function ItemIcon({ text, className = "size-6" }: { text: string; className?: string }) {
  const icons = itemIcons(text);
  return (
    <span className="flex shrink-0 items-center gap-0.5">
      {icons.map((I, i) => (
        <I key={i} className={className} />
      ))}
    </span>
  );
}
