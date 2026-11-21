/**
 * Techo de luces hexagonales (como las de un estudio de detailing),
 * dibujado en SVG: no pesa nada y se ve nítido en cualquier pantalla.
 */
export function HexLights({ className = "" }: { className?: string }) {
  const r = 46; // radio del hexágono
  const w = Math.sqrt(3) * r;
  const cols = 14;
  const rows = 7;
  const hexes: { x: number; y: number; on: boolean }[] = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = col * w + (row % 2 ? w / 2 : 0);
      const y = row * r * 1.5;
      // patrón determinista de tubos "encendidos"
      hexes.push({ x, y, on: (row * 7 + col * 3) % 5 !== 0 });
    }
  }
  const pts = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 180) * (60 * i - 30);
    return `${(r * Math.cos(a)).toFixed(2)},${(r * Math.sin(a)).toFixed(2)}`;
  }).join(" ");

  return (
    <svg
      viewBox={`-60 -60 ${cols * w + 60} ${rows * r * 1.5 + 60}`}
      className={className}
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <filter id="hex-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3.5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g filter="url(#hex-glow)" fill="none" stroke="#fff" strokeLinecap="round">
        {hexes.map((h, i) => (
          <polygon
            key={i}
            points={pts}
            transform={`translate(${h.x.toFixed(1)} ${h.y.toFixed(1)})`}
            strokeWidth={h.on ? 3.2 : 1}
            strokeOpacity={h.on ? 0.95 : 0.15}
          />
        ))}
      </g>
    </svg>
  );
}
