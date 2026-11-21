type Props = {
  className?: string;
  /** "stacked": emblema arriba y texto abajo (como el logo original). */
  variant?: "inline" | "stacked" | "mark";
  title?: string;
};

/** Emblema de alas AF, redibujado en vector a partir del logo de AF Detailing. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 166 69" className={className} aria-hidden="true" fill="currentColor">
      {/* ala izquierda */}
      <path d="M22 0H38.5L47 19.5H35C28 19.5 23.5 14.5 22 8Z" />
      <path d="M11 26H49.5L57 44.5H24C17 44.5 12.5 39 11 32Z" />
      <path d="M0 50H59.5L67 69H19C9 69 2 62 0 53Z" />
      {/* ala derecha / F */}
      <path d="M107 0H165.5V5C165.5 13.5 160 19.5 151 19.5H98Z" />
      <path d="M96 26H137.5V31C137.5 38.5 132.5 44.5 124.5 44.5H88Z" />
      <path d="M86 50H103.5V54C103.5 62.5 98 69 89.5 69H78Z" />
    </svg>
  );
}

export function Logo({ className = "", variant = "inline", title = "AF Academy" }: Props) {
  if (variant === "mark") return <LogoMark className={className} />;

  if (variant === "stacked") {
    return (
      <span className={`inline-flex flex-col items-center ${className}`} role="img" aria-label={title}>
        <LogoMark className="h-[0.9em] w-auto" />
        <span className="font-display mt-[0.18em] text-[1em] leading-none font-extrabold italic tracking-[0.02em]">
          AF ACADEMY
        </span>
        <span className="mt-[0.2em] text-[0.22em] tracking-[0.6em]" aria-hidden="true">
          ★ ★ ★
        </span>
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`} role="img" aria-label={title}>
      <LogoMark className="h-[1.05em] w-auto" />
      <span className="font-display text-[1em] leading-none font-extrabold italic tracking-[0.02em]">
        AF ACADEMY
      </span>
    </span>
  );
}
