import { SEO } from '@/components/layout/SEO';
import { ProductPage } from '@/components/product/ProductPage';
import { DesignVisual } from '@/components/home/visuals/DesignVisual';

const glyph = (
  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
    <path d="M4 5h16v14H4z" stroke="currentColor" strokeWidth="1.8" />
    <path d="M8 9h8M8 13h8M8 17h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export default function Design() {
  return (
    <>
      <SEO
        title="Puku Design — Design to code, in one workspace"
        description="Design systems and engineering in one connected workspace."
      />
      <ProductPage
        name="Puku Design"
        color="from-[#FF8FB1] to-[#D08BFF]"
        glyph={glyph}
        tagline="Design Meets Intelligence"
        description="Create scalable design systems and production-ready interfaces powered by AI."
        bullets={[
          'AI UI Generation',
          'Design Systems',
          'Design Tokens',
          'Component Libraries',
          'Accessibility Checks',
          'Auto Documentation',
          'Developer Handoff',
        ]}
        problem={{
          title: 'Design and code drift apart.',
          body:
            'Designers ship a Figma file. Engineers interpret it. Months later, the product has 47 shades of blue and zero shared intent. Puku Design keeps design tokens, components, and code in a single source of truth.',
        }}
        howItWorks={[
          { step: '01', title: 'Sketch with tokens', body: 'Use the design system from day one. Every component, color, and type is a token — not a screenshot.' },
          { step: '02', title: 'AI extends your system', body: 'Puku suggests layouts, components, and variants from your existing tokens. Nothing is invented in a vacuum.' },
          { step: '03', title: 'Export to code', body: 'Generate React, SwiftUI, or Compose from any frame. Tokens come with them — no manual re-styling.' },
          { step: '04', title: 'Sync continuously', body: 'When engineering changes a token, designers see it. When designers add a variant, code gets it.' },
        ]}
        visual={<DesignVisual />}
        demo={
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="text-[11px] uppercase tracking-wider text-ink-dim">Tokens</div>
              <div className="mt-3 grid grid-cols-5 gap-2">
                {['#A4ABFF', '#D08BFF', '#7AD8C5', '#FF8FB1', '#FFD18B'].map((c) => (
                  <div key={c} className="aspect-square rounded-md border border-border" style={{ background: c }} />
                ))}
              </div>
              <pre className="mt-4 overflow-x-auto font-mono text-[12.5px] leading-[1.7] text-ink">
{`export const accent = {
  50:  '#F2F2FF',
  500: '${`#A4ABFF`}',
  900: '#3D44B0',
}`}
              </pre>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="text-[11px] uppercase tracking-wider text-ink-dim">Component</div>
              <div className="mt-4 rounded-xl border border-border bg-surface p-5">
                <div className="text-sm font-medium text-ink">Primary Button</div>
                <div className="mt-3 h-9 w-32 rounded-md bg-[#A4ABFF] text-center text-[13px] font-medium leading-9 text-black">Get started</div>
                <div className="mt-4 grid grid-cols-2 gap-2 text-[11.5px] text-ink-dim">
                  <div>radius · 8</div>
                  <div>pad-x · 16</div>
                  <div>pad-y · 8</div>
                  <div>font · 500</div>
                </div>
              </div>
            </div>
          </div>
        }
        workflow={[
          'Designers draft frames with shared tokens.',
          'Puku translates frames into engineering components.',
          'Engineers consume tokens live from the codebase.',
          'Decisions and comments stay attached to every frame.',
        ]}
        performance={[
          { value: '< 100ms', label: 'Token sync latency' },
          { value: '1', label: 'Source of truth' },
          { value: '4', label: 'Export targets (Web/iOS/Android/Figma)' },
          { value: '0', label: 'Manual PNG handoffs' },
        ]}
        integrations={[
          { name: 'Figma', category: 'Design' },
          { name: 'Storybook', category: 'Docs' },
          { name: 'Notion', category: 'Docs' },
          { name: 'GitHub', category: 'Code' },
          { name: 'Linear', category: 'Tickets' },
          { name: 'Slack', category: 'Comms' },
          { name: 'Style Dictionary', category: 'Tokens' },
          { name: 'Tokens Studio', category: 'Tokens' },
        ]}
        faq={[
          { q: 'Is Puku Design a Figma replacement?', a: 'It complements Figma. You can keep designing in Figma and Puku keeps tokens, code export, and engineering in sync.' },
          { q: 'Can engineers edit designs?', a: 'Yes. Anyone on the team can edit frames, tokens, or components. Comments stay attached.' },
          { q: 'Does it work without internet?', a: 'Yes. Puku runs on-device and synchronizes when you reconnect.' },
        ]}
        cta={{ primary: 'Open Puku Design', secondary: 'See an example' }}
        crossLinks={[
          { name: 'Puku Editor', href: '/products/editor', desc: 'Consume tokens directly in your editor.' },
          { name: 'Puku Cowork', href: '/products/cowork', desc: 'Brainstorm with your whole team on one canvas.' },
          { name: 'Puku CLI', href: '/products/cli', desc: 'Sync tokens to any repo from your terminal.' },
        ]}
      />
    </>
  );
}