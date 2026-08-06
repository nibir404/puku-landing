import { SEO } from '@/components/layout/SEO';
import { ProductPage } from '@/components/product/ProductPage';
import { Terminal } from '@/components/ui/Terminal';

const glyph = (
  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
    <path d="M4 7l5 5-5 5M12 17h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function CLI() {
  return (
    <>
      <SEO
        title="Puku CLI — Intelligent terminal"
        description="An intelligent terminal assistant that understands projects and automates engineering workflows."
      />
      <ProductPage
        name="Puku CLI"
        color="from-[#D08BFF] to-[#A45BFF]"
        glyph={glyph}
        tagline="AI Inside Your Terminal"
        description="Automate engineering workflows without leaving your command line."
        bullets={[
          'Natural Language Commands',
          'Repository Understanding',
          'Shell Automation',
          'Project Memory',
          'Git Integration',
          'CI/CD Assistance',
          'Environment Management',
        ]}
        problem={{
          title: 'Most CLIs are strangers to your codebase.',
          body:
            'Your terminal sees the shell — not the project. Puku reads the workspace, the repo, your environment, and your recent activity, and turns that context into commands and workflows that actually fit your work today.',
        }}
        howItWorks={[
          { step: '01', title: 'State intent', body: 'Tell Puku what you want: deploy, fix, refactor, scaffold, migrate. It understands plain English.' },
          { step: '02', title: 'Review the plan', body: 'Puku writes a plan, shows the diff, and asks for approval. You are always in control.' },
          { step: '03', title: 'Run safely', body: 'It executes in safe order, streaming output, and keeping you informed every step.' },
          { step: '04', title: 'Replay & share', body: 'Every run becomes a replay · shareable with teammates or pinned to a PR.' },
        ]}
        visual={<Terminal title="puku · zsh" typing={['$ puku plan "ship checkout to production"', '→ indexing repo · 142 files', '→ drafting 5-step plan', '· reviewed by you · ready']} />}
        demo={
          <Terminal
            title="puku · terminal"
            typing={[
              '$ puku run "migrate auth to webauthn"',
              '· reading project context · 4 packages',
              '· planning 6 steps · 3 files · 2 tests',
              '→ updating services/auth.ts',
              '→ generating webauthn.test.ts',
              '→ running suite · 28/28 passed',
              '✓ ready · review the diff with p pr',
            ]}
          />
        }
        workflow={[
          'Type a sentence about what you want to do.',
          'Puku plans the work and shows you the steps.',
          'You approve. Puku executes, streams output, and reports.',
          'Replay the run, share it, or pin it to your PR.',
        ]}
        performance={[
          { value: '18ms', label: 'Median command latency' },
          { value: '50k', label: 'Lines of context at once' },
          { value: '0', label: 'Background daemons' },
          { value: '12', label: 'Pre-installed shell integrations' },
        ]}
        integrations={[
          { name: 'bash', category: 'Shell' },
          { name: 'zsh', category: 'Shell' },
          { name: 'fish', category: 'Shell' },
          { name: 'nushell', category: 'Shell' },
          { name: 'tmux', category: 'Multiplexer' },
          { name: 'GitHub Actions', category: 'CI' },
          { name: 'GitLab CI', category: 'CI' },
          { name: 'Docker', category: 'Runtime' },
        ]}
        faq={[
          { q: 'Does Puku replace my shell?', a: 'No. It lives inside bash, zsh, or fish. It is a tool, not a replacement.' },
          { q: 'Is Puku CLI safe to run in CI?', a: 'Yes. It is deterministic, supports reproducible plans, and never auto-pushes without approval.' },
          { q: 'Can I script Puku?', a: 'Yes. Every Puku command has --json, --quiet, --plan flags for full composability.' },
        ]}
        cta={{ primary: 'Install Puku CLI', secondary: 'Browse commands' }}
        crossLinks={[
          { name: 'Puku Editor', href: '/products/editor', desc: 'The same intelligence, in your editor.' },
          { name: 'Puku Cloud', href: '/products/cloud', desc: 'Deploy from any shell, anywhere.' },
          { name: 'Puku Co-work', href: '/products/cowork', desc: 'Collaborative terminals, shared with your team.' },
        ]}
      />
    </>
  );
}