import { Container } from '@/components/ui/Container';
import { LogoMark } from '@/components/ui/Logo';
import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

export const SimOne = () => {
  return (
    <section className="relative py-24 md:py-32 border-t border-[#E5E5E8] bg-white">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <div className="max-w-xl">
            <h2 className="font-display text-[44px] sm:text-[52px] md:text-[60px] font-semibold tracking-tight leading-[1.05] text-[#0F0F11]">
              Introducing{' '}
              <span className="text-[#6E56CF]">Sim-1</span>
            </h2>
            <p className="mt-4 font-display text-[24px] sm:text-[28px] font-semibold tracking-tight leading-[1.15] text-[#0F0F11]">
              Our smartest models capable of simulating how code runs
            </p>
            <p className="mt-6 text-[16px] leading-relaxed text-[#4A4A52] font-normal max-w-md">
              A new category of models built to understand and predict how large
              codebases behave in complex, real-world scenarios.
            </p>
            <a
              href="/blog"
              className="mt-8 inline-flex items-center gap-3 rounded-[2px] bg-[#0F0F11] px-6 py-3 min-h-[44px] text-[15px] font-semibold text-white hover:bg-[#6E56CF] transition-colors shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6E56CF] focus-visible:ring-offset-2"
            >
              <LogoMark tone="dark" className="!h-5 !w-5 !rounded-[2px] !border-0 !bg-white/15 !text-white" />
              <span>Read More</span>
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

const DotCityscape = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to('.sim-dot', {
        y: '-=4',
        stagger: {
          amount: 1.5,
          repeat: -1,
          yoyo: true,
        },
        ease: 'sine.inOut',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const W = 60;
  const H = 32;
  const dots: { cx: number; cy: number; r: number; o: number }[] = [];

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const col = Math.sin(x * 0.3) * 4 + Math.sin(x * 0.13 + 1) * 6;
      const baseline = H - 6 - Math.floor(col + ((x * 7) % 5));
      if (y > baseline) continue;
      const distFromTop = (H - y) / H;
      const o = 0.15 + distFromTop * 0.7;
      const r = 0.9 + distFromTop * 0.6;
      dots.push({ cx: x, cy: y, r, o });
    }
  }

  return (
    <div ref={containerRef} className="p-6 bg-[#FAFAFC] rounded-[2px] border border-[#E5E5E8]">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        {dots.map((d, i) => (
          <circle
            key={i}
            className="sim-dot"
            cx={d.cx + 0.5}
            cy={d.cy + 0.5}
            r={d.r * 0.7}
            fill="#6E56CF"
            opacity={d.o}
          />
        ))}
      </svg>
    </div>
  );
};