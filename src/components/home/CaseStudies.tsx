import { Container } from '@/components/ui/Container';
import { LogoMark } from '@/components/ui/Logo';
import { Link } from 'react-router-dom';

export const CaseStudies = () => {
  return (
    <section className="relative py-16 md:py-24">
      <Container>
        <div className="overflow-hidden rounded-3xl border border-border bg-white shadow-card">
          <div className="grid grid-cols-1 md:grid-cols-3">
            {/* Col 1 — KEYDATA wordmark + caption */}
            <Link
              to="/customers/keydata"
              className="flex flex-col gap-8 p-7 md:p-10 md:border-r border-border hover:bg-card/40 transition-all duration-200 group"
            >
              <div className="flex items-center justify-between">
                <Wordmark
                  glyph={<KeydataGlyph />}
                  text="KEYDATA"
                  superscript="*"
                />
                <span className="text-[12px] font-semibold text-accent translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 flex items-center gap-1">
                  Study →
                </span>
              </div>
              <div className="mt-auto pt-10">
                <DotTiny value={2.4} />
                <div className="mt-3 text-[14px] text-ink">
                  Faster ticket resolution time
                </div>
              </div>
            </Link>

            {/* Col 2 — Cayuse wordmark + caption */}
            <Link
              to="/customers/cayuse"
              className="flex flex-col gap-8 p-7 md:p-10 md:border-r border-border hover:bg-card/40 transition-all duration-200 group"
            >
              <div className="flex items-center justify-between">
                <Wordmark
                  glyph={<CayuseGlyph />}
                  text="cayuse"
                />
                <span className="text-[12px] font-semibold text-accent translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 flex items-center gap-1">
                  Study →
                </span>
              </div>
              <div className="mt-auto pt-10">
                <DotTiny value={3.7} />
                <div className="mt-3 text-[14px] text-ink">
                  Defects found before release
                </div>
              </div>
            </Link>

            {/* Col 3 — Sign-up CTA */}
            <div className="flex flex-col gap-6 p-7 md:p-10">
              <p className="text-[15px] leading-relaxed text-ink-muted">
                Connect your codebase. Our models fix, understand, and simulate
                across large codebases in any language.
              </p>
              <div className="mt-auto">
                <a
                  href="/signup"
                  className="inline-flex items-center gap-2 rounded-lg bg-ink px-4 py-2.5 text-[14px] font-medium text-white hover:bg-ink/85 transition-colors shadow-pill"
                >
                  <LogoMark tone="dark" className="!h-6 !w-6 !rounded !border-0 !bg-white/15 !text-white" />
                  Sign up
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

const Wordmark = ({
  glyph,
  text,
  superscript,
}: {
  glyph: React.ReactNode;
  text: string;
  superscript?: string;
}) => (
  <div className="flex items-center gap-2.5">
    <span className="inline-flex h-7 w-7 items-center justify-center">{glyph}</span>
    <span className="font-display text-[20px] font-medium tracking-tight text-ink">
      {text}
      {superscript && (
        <sup className="ml-0.5 text-[10px] font-medium text-ink-muted">{superscript}</sup>
      )}
    </span>
  </div>
);

const KeydataGlyph = () => (
  // ascending bar chart
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#0B0B0B" aria-hidden>
    <rect x="2" y="13" width="3" height="8" rx="0.6" />
    <rect x="7" y="9" width="3" height="12" rx="0.6" />
    <rect x="12" y="5" width="3" height="16" rx="0.6" />
    <rect x="17" y="1" width="3" height="20" rx="0.6" />
  </svg>
);

const CayuseGlyph = () => (
  // small horse head silhouette
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#0B0B0B" aria-hidden>
    <path d="M3 16c2-2 3-4 4-6 1-2 3-4 6-4 2 0 3 1 3 3l-1 1c-1 0-1 1 0 2 1 1 2 1 2 3 0 2-1 3-3 3-1 0-2-1-3-2-1-1-2-1-3 0-1 1-2 2-3 2-1 0-2-1-2-2z" />
  </svg>
);

/** Tiny dotted value like "2x" — used to mimic the reference's "2x" / "3.7x" pills. */
const DotTiny = ({ value }: { value: number }) => {
  // Render a 5x3 dot matrix, with the value's digit tiles selected.
  const cells = Array.from({ length: 15 }).map((_, i) => i);
  return (
    <div className="flex items-center gap-2">
      <div className="grid grid-cols-5 gap-[3px]">
        {cells.map((c) => (
          <span
            key={c}
            className="h-1.5 w-1.5 rounded-full bg-ink"
            style={{ opacity: Math.random() > 0.35 ? 1 : 0.2 }}
          />
        ))}
      </div>
      <span className="font-pixel-mono text-[18px] leading-none text-ink">
        {value}x
      </span>
    </div>
  );
};