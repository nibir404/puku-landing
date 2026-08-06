/**
 * Dot-matrix constellation visual — an abstract dot pattern reminiscent of a
 * networked codebase: dense lower half with a sparse halo above, drawn from a
 * single SVG <pattern> for crispness at any size.
 */
export const DotConstellation = () => {
  const W = 70;
  const H = 40;
  const dots: { cx: number; cy: number; r: number; o: number }[] = [];

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const nx = x / W - 0.5;
      const ny = y / H - 0.5;
      // Two overlapping radial clusters (one dense lower-left, one upper-right)
      const d1 = Math.sqrt(nx * nx + (ny - 0.15) * (ny - 0.15));
      const d2 = Math.sqrt((nx - 0.18) * (nx - 0.18) + (ny + 0.18) * (ny + 0.18));
      const v = Math.max(0, 0.45 - d1) * 1.6 + Math.max(0, 0.32 - d2) * 1.4;
      if (v < 0.05) continue;
      dots.push({
        cx: x,
        cy: y,
        r: 0.4 + v * 0.8,
        o: Math.min(0.92, v * 0.9),
      });
    }
  }

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full h-auto"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      {dots.map((d, i) => (
        <circle
          key={i}
          cx={d.cx + 0.5}
          cy={d.cy + 0.5}
          r={d.r * 0.75}
          fill="#0B0B0B"
          opacity={d.o}
        />
      ))}
    </svg>
  );
};