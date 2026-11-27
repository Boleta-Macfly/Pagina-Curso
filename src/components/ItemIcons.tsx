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

/** Grupo privado (personas con candado) */
export const IconPrivateGroup = ({ className }: P) => (
  <svg {...base} className={className}>
    <circle cx="8" cy="8" r="2.8" />
    <path d="M2.5 19c0-3.2 2.5-5.5 5.5-5.5s5.5 2.3 5.5 5.5" />
    <circle cx="15.5" cy="7" r="2.2" />
    <path d="M15.5 11.5c1 0 2 .3 2.8.8" />
    <rect x="15" y="15" width="6.5" height="5.5" rx="1" />
    <path d="M16.5 15v-1.3a1.75 1.75 0 0 1 3.5 0V15" />
  </svg>
);

/** Caja de regalo (kit) */
export const IconGiftBox = ({ className }: P) => (
  <svg {...base} className={className}>
    <rect x="3.5" y="9" width="17" height="11.5" rx="1.5" />
    <path d="M2.5 9h19V6.5h-19z" />
    <path d="M12 6.5v14" />
    <path d="M12 6.5C10.5 3 7 3 7 5s3 1.5 5 1.5ZM12 6.5C13.5 3 17 3 17 5s-3 1.5-5 1.5Z" />
  </svg>
);

/** Kit cerámico: caja de regalo con frasco */
export const IconKitCeramic = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M3 10.5h12v10H3z" />
    <path d="M2 10.5h14V8H2z" />
    <path d="M9 8v12.5" />
    <path d="M18.5 4.5h2v2h-2z" />
    <path d="M18 6.5h3l.5 1.5v8.5a1 1 0 0 1-1 1H18.5a1 1 0 0 1-1-1V8Z" />
  </svg>
);

/** Kit PPF: caja de regalo con rollo de lámina */
export const IconKitPPF = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M3 10.5h11v10H3z" />
    <path d="M2 10.5h13V8H2z" />
    <path d="M8.5 8v12.5" />
    <ellipse cx="18.5" cy="7" rx="1.7" ry="3" />
    <path d="M18.5 4h2.2c.9 0 1.6 1.3 1.6 3s-.7 3-1.6 3h-2.2" />
    <path d="M19.5 10v8.5" />
  </svg>
);

/** Etiqueta de descuento (%) */
export const IconDiscount = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M3.5 12.2V4.5a1 1 0 0 1 1-1h7.7l8.3 8.3a1.5 1.5 0 0 1 0 2.1l-6.6 6.6a1.5 1.5 0 0 1-2.1 0Z" />
    <path d="m9.5 14.5 5-5" />
    <circle cx="9.7" cy="9.7" r="1" />
    <circle cx="14.3" cy="14.3" r="1" />
  </svg>
);

/** Reloj (duración) */
export const IconTime = ({ className }: P) => (
  <svg {...base} className={className}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </svg>
);

/** Documento impreso */
export const IconPrinted = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M6 3.5h8l4 4v13H6z" />
    <path d="M14 3.5v4h4" />
    <path d="M9 12h6M9 15h6M9 18h4" />
  </svg>
);

/** Caja de materiales */
export const IconMaterials = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M3 8 12 4l9 4-9 4z" />
    <path d="M3 8v8.5l9 4 9-4V8" />
    <path d="M12 12v8.5" />
    <path d="m7.5 6 9 4" />
  </svg>
);

/** Herramientas (llave) */
export const IconWrench = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M14.5 6.5a4 4 0 0 0 5.2 5.2L12 19.4a2.1 2.1 0 0 1-3-3L16.7 8.7" />
    <path d="M14.5 6.5 17 4l3 3-2.5 2.5" />
    <path d="M3.5 20.5 7 17" />
  </svg>
);

/** Refrigerio (taza) */
export const IconCoffee = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M4 9h12v6a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5Z" />
    <path d="M16 11h1.5a2.5 2.5 0 0 1 0 5H16" />
    <path d="M8 3.5c-.8 1 .8 1.8 0 3M12 3.5c-.8 1 .8 1.8 0 3" />
  </svg>
);

/** Ambiente equipado (taller con luces) */
export const IconWorkshop = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M3 20.5V9l9-5.5L21 9v11.5" />
    <path d="M7 20.5v-6h10v6" />
    <path d="M9 10.5h6" />
    <path d="M2 20.5h20" />
  </svg>
);

const rules: [RegExp, React.ComponentType<P>[]][] = [
  [/descuento|%\s*de\s*desc/i, [IconDiscount]],
  [/asesor[ií]a grupal|grupo privado|comunidad/i, [IconPrivateGroup]],
  [/kit.*cer[aá]mico/i, [IconKitCeramic]],
  [/kit.*ppf/i, [IconKitPPF]],
  [/^kit\b/i, [IconGiftBox]],
  [/d[ií]as|teor[ií]a/i, [IconTime]],
  [/impreso/i, [IconPrinted]],
  [/herramient/i, [IconWrench]],
  [/refrigerio|desayuno/i, [IconCoffee]],
  [/ambiente/i, [IconWorkshop]],
  [/^material/i, [IconMaterials]],
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
