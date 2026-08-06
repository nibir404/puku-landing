import { Container } from '@/components/ui/Container';
import { PixelHeading } from '@/components/ui/Pixel';
import { LogoMark } from '@/components/ui/Logo';

export const SimOne = () => {
  return (
    <section className="relative py-24 md:py-32">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <div className="max-w-xl">
            <h2 className="font-display text-[44px] sm:text-[52px] md:text-[60px] font-medium tracking-tight leading-[1.05] text-ink">
              Introducing{' '}
              <span className="text-ink">Sim-1</span>
            </h2>
            <p className="mt-4 font-display text-[26px] sm:text-[30px] md:text-[34px] font-medium tracking-tight leading-[1.15] text-ink-muted">
              Our smartest models capable of simulating how code runs
            </p>
            <p className="mt-10 text-[15px] leading-relaxed text-ink-muted max-w-md">
              A new category of models built to understand and predict how large
              codebases behave in complex, real-world scenarios
            </p>
            <a
              href="/blog/sim-1"
              className="mt-7 inline-flex items-center gap-2 rounded-lg bg-ink px-4 py-2.5 text-[14px] font-medium text-white hover:bg-ink/85 transition-colors shadow-pill"
            >
              <LogoMark tone="dark" className="!h-6 !w-6 !rounded !border-0 !bg-white/15 !text-white" />
              Read More
            </a>
          </div>

          <div className="relative">
            <DotCityscape />
          </div>
        </div>
      </Container>
    </section>
  );
};

/**
 * A dot-matrix "cityscape" visual, drawn as an SVG <pattern> of dots at varying
 * densities to evoke the reference image's skyline of pixels.
 */
const DotCityscape = () => {
  // Build a grid of dots, varying radius/opacity to create skyline silhouette.
  const W = 60;
  const H = 32;
  const dots: { cx: number; cy: number; r: number; o: number }[] = [];

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      // Skyline height function: vertical columns of "buildings" of varying height.
      // Use a few overlapping rectangles + noise to look organic.
      const col = Math.sin(x * 0.3) * 4 + Math.sin(x * 0.13 + 1) * 6;
      const baseline = H - 6 - Math.floor(col + ((x * 7) % 5));
      if (y > baseline) continue;
      // Sparse higher up, denser near baseline — gives skyline depth.
      const distFromTop = (H - y) / H;
      const o = 0.15 + distFromTop * 0.7;
      const r = 0.9 + distFromTop * 0.6;
      dots.push({ cx: x, cy: y, r, o });
    }
  }

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full h-auto"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <defs>
        <pattern id="dotGrid" x="0" y="0" width="1" height="1" patternUnits="userSpaceOnUse">
          <circle cx="0.5" cy="0.5" r="0.5" fill="#0B0B0B" />
        </pattern>
      </defs>
      {dots.map((d, i) => (
        <circle
          key={i}
          cx={d.cx + 0.5}
          cy={d.cy + 0.5}
          r={d.r * 0.7}
          fill="#0B0B0B"
          opacity={d.o}
        />
      ))}
    </svg>
  );
};