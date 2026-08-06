import { SEO } from '@/components/layout/SEO';
import { ProductPage } from '@/components/product/ProductPage';
import { CoworkVisual } from '@/components/home/visuals/CoworkVisual';

const glyph = (
  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
    <circle cx="9" cy="9" r="3" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="17" cy="13" r="3" stroke="currentColor" strokeWidth="1.8" />
    <path d="M11 10l4 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export default function Cowork() {
  return (
    <>
      <SEO
        title="Puku Cowork — Real-time team workspace"
        description="A real-time workspace where engineers, designers, and AI work side by side."
      />
      <ProductPage
        name="Puku Cowork"
        color="from-[#A4ABFF] to-[#FF8FB1]"
        glyph={glyph}
        tagline="AI-Powered Engineering Collaboration"
        description="Collaborate more effectively with shared context and intelligent engineering assistance."
        bullets={[
          'Shared AI Memory',
          'Team Reviews',
          'Pair Programming',
          'AI Meeting Summaries',
          'Engineering Discussions',
          'Project Collaboration',
        ]}
        problem={{
          title: 'Collaboration is scattered across 14 tabs.',
          body:
            'Slack, Notion, Loom, Figma, Linear, GitHub, Google Docs — every team ends up the same way. Puku Cowork replaces the dossier with a single workspace where work happens in the open.',
        }}
        howItWorks={[
          { step: '01', title: 'Open a canvas', body: 'Everything in Puku is a canvas. Docs, designs, plans, code reviews — they all live on the same primitive.' },
          { step: '02', title: 'Invite your team', body: 'Share a link. No installs. No accounts required for guests. Engineers, designers, and PMs participate equally.' },
          { step: '03', title: 'Bring an AI agent', body: 'Puku agents join the canvas like teammates. They can edit, comment, or ask questions — and you can mute them when needed.' },
          { step: '04', title: 'Lock in decisions', body: 'Mark a block as a decision. Puku syncs it to your PM tool, your docs, and your changelog automatically.' },
        ]}
        visual={<CoworkVisual />}
        demo={
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="text-[11px] uppercase tracking-wider text-ink-dim">Avatar</div>
              <div className="mt-3 flex items-center gap-2">
                <div className="flex -space-x-2">
                  {['#A4ABFF', '#D08BFF', '#7AD8C5', '#FF8FB1'].map((c, i) => (
                    <div key={i} className="h-7 w-7 rounded-full border-2 border-card" style={{ background: c }} />
                  ))}
                </div>
                <span className="text-[12px] text-ink-muted">+ 3 agents</span>
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="text-[11px] uppercase tracking-wider text-ink-dim">Comment</div>
              <div className="mt-3 space-y-2 text-[13px]">
                <div className="rounded-md bg-surface p-2">
                  <span className="text-ink-muted">Maya</span> · <span className="text-ink">can we A/B this?</span>
                </div>
                <div className="rounded-md bg-surface p-2">
                  <span className="text-[#A4ABFF]">Puku</span> · <span className="text-ink">running variant B now</span>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="text-[11px] uppercase tracking-wider text-ink-dim">Decision</div>
              <div className="mt-3 text-[13px] text-ink">Switch to subscription billing for Q3.</div>
              <div className="mt-2 text-[11.5px] text-ink-dim">Linked to Linear · FIN-204</div>
            </div>
          </div>
        }
        workflow={[
          'Open a canvas for the project, plan, or review.',
          'Invite the team — humans or agents — to collaborate live.',
          'Mark decisions; Puku syncs them across tools.',
          'Candiate the docs from raw conversations on the canvas.',
        ]}
        performance={[
          { value: '< 50ms', label: 'Cursor sync latency' },
          { value: '100', label: 'Live cursors per doc' },
          { value: '∞', label: 'Guests per canvas' },
          { value: '0', label: 'Installs required' },
        ]}
        integrations={[
          { name: 'Linear', category: 'Tickets' },
          { name: 'GitHub', category: 'Code' },
          { name: 'Slack', category: 'Comms' },
          { name: 'Figma', category: 'Design' },
          { name: 'Notion', category: 'Docs' },
          { name: 'Loom', category: 'Video' },
          { name: 'Zoom', category: 'Video' },
          { name: 'Google Docs', category: 'Docs' },
        ]}
        faq={[
          { q: 'Do guests need an account?', a: 'No. Anyone with the link can view, comment, and edit. No installs required.' },
          { q: 'Can agents really participate?', a: 'Yes. Puku agents respond to commands, edit text, generate diagrams, and ask questions in real time.' },
          { q: 'What about offline work?', a: 'Puku Cowork works offline and syncs when you reconnect. Conflicts are resolved automatically.' },
        ]}
        cta={{ primary: 'Open a Cowork canvas', secondary: 'See a sample' }}
        crossLinks={[
          { name: 'Puku Design', href: '/products/design', desc: 'Design the canvas live with your team.' },
          { name: 'Puku Editor', href: '/products/editor', desc: 'Take Cowork into your editor.' },
          { name: 'Puku App', href: '/products/app', desc: 'Get canvas updates on the go.' },
        ]}
      />
    </>
  );
}