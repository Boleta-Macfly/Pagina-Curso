/** Banderas simplificadas en SVG (se ven igual en cualquier dispositivo). */
type P = { className?: string };

export const FlagUSA = ({ className }: P) => (
  <svg viewBox="0 0 30 20" className={className} aria-hidden="true">
    {Array.from({ length: 13 }, (_, i) => (
      <rect key={i} y={(i * 20) / 13} width="30" height={20 / 13 + 0.05} fill={i % 2 ? "#fff" : "#b22234"} />
    ))}
    <rect width="13" height={(20 / 13) * 7} fill="#3c3b6e" />
    {Array.from({ length: 4 }, (_, r) =>
      Array.from({ length: 5 }, (_, c) => (
        <circle key={`${r}-${c}`} cx={1.6 + c * 2.45} cy={1.5 + r * 2.6} r="0.55" fill="#fff" />
      )),
    )}
  </svg>
);

export const FlagBrazil = ({ className }: P) => (
  <svg viewBox="0 0 30 20" className={className} aria-hidden="true">
    <rect width="30" height="20" fill="#009c3b" />
    <path d="M15 2.5 27 10 15 17.5 3 10Z" fill="#ffdf00" />
    <circle cx="15" cy="10" r="4.6" fill="#002776" />
    <path d="M10.6 9.2c3-1 6.4-.6 8.8 1" stroke="#fff" strokeWidth="0.8" fill="none" />
  </svg>
);

export const FlagArgentina = ({ className }: P) => (
  <svg viewBox="0 0 30 20" className={className} aria-hidden="true">
    <rect width="30" height="20" fill="#74acdf" />
    <rect y="6.67" width="30" height="6.66" fill="#fff" />
    <circle cx="15" cy="10" r="2" fill="#f6b40e" stroke="#85340a" strokeWidth="0.3" />
  </svg>
);
