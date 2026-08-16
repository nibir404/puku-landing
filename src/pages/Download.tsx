import { SEO } from '@/components/layout/SEO';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';

const platforms = [
  {
    name: 'macOS',
    file: 'Puku-2.1.0.dmg',
    size: '212 MB',
    arch: 'Apple Silicon · Intel',
    href: '/download',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
        <path d="M16 13.5c-.03-2.6 2.2-3.85 2.3-3.9-1.25-1.8-3.2-2-3.85-2.05-1.65-.17-3.2.95-4.05.95-.85 0-2.15-.95-3.55-.9-1.8.03-3.5 1.05-4.4 2.65-1.9 3.25-.5 8.05 1.3 10.7.9 1.3 2 2.75 3.4 2.7 1.4-.05 1.9-.9 3.55-.9 1.65 0 2.1.9 3.55.9 1.45 0 2.4-1.3 3.3-2.6 1.05-1.5 1.45-2.95 1.5-3.05-.05 0-2.85-1.1-2.85-4.35Zm-2.7-8c.75-.9 1.25-2.2 1.1-3.5-1.05.05-2.35.7-3.1 1.6-.7.8-1.3 2.1-1.15 3.35 1.2.1 2.4-.6 3.15-1.45Z" fill="currentColor"/>
      </svg>
    ),
  },
  {
    name: 'Windows',
    file: 'Puku-2.1.0-win-x64.exe',
    size: '198 MB',
    arch: 'x64 · ARM64',
    href: '/download',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
        <path d="M3 5.5l8-1.1V11H3V5.5Zm9-1.2L21 3v8h-9V4.3ZM3 13h8v6.6l-8-1.1V13Zm9 0h9v8l-9-1.3V13Z" fill="currentColor"/>
      </svg>
    ),
  },
  {
    name: 'Linux',
    file: 'puku_2.1.0_amd64.AppImage',
    size: '224 MB',
    arch: 'x86_64 · ARM64 · deb · rpm',
    href: '/download',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
        <path d="M12 3c-2 0-3.5 1.5-3.5 4 0 1.3.4 2.3 1 3-.5.5-2 1.8-3 3.5-1 1.5-1.5 3.5-1.5 4.5 0 1 1 1.5 2 1.5 1.5 0 3-1 3-1 .5 1.2 1.3 2 2 2s1.5-.8 2-2c0 0 1.5 1 3 1 1 0 2-.5 2-1.5 0-1-.5-3-1.5-4.5-1-1.7-2.5-3-3-3.5.6-.7 1-1.7 1-3 0-2.5-1.5-4-3.5-4Z" fill="currentColor"/>
      </svg>
    ),
  },
];

export default function Download() {
  return (
    <>
      <SEO title="Download — Puku" description="Get Puku on your machine in under a minute." />
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-white border-b border-[#E5E5E8]">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow className="justify-center">Download</Eyebrow>
            <h1 className="mt-5 font-display text-4xl sm:text-5xl font-semibold tracking-tight text-[#0F0F11]">
              Get Puku on your <span className="text-[#6E56CF]">machine.</span>
            </h1>
            <p className="mt-6 text-[16px] leading-relaxed text-[#4A4A52] font-normal">
              Free forever for individuals. Pick your platform and you are 60 seconds away from your first agent.
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-3">
            {platforms.map((p) => (
              <a
                key={p.name}
                href={p.href}
                className="group block rounded-[2px] border border-[#E5E5E8] bg-white p-7 transition-all duration-200 hover:border-[#6E56CF] shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6E56CF]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-[2px] bg-[#F3F3F5] border border-[#E5E5E8] text-[#0F0F11] group-hover:bg-[#6E56CF] group-hover:border-[#6E56CF] group-hover:text-white transition-colors">
                  {p.icon}
                </div>
                <h3 className="mt-5 font-sans text-base font-semibold uppercase tracking-wider text-[#0F0F11]">{p.name}</h3>
                <div className="mt-2 text-[12.5px] text-[#4A4A52] font-mono">{p.arch}</div>
                <div className="mt-4 rounded-[2px] border border-[#E5E5E8] bg-[#FAFAFC] p-3 font-mono text-[12px] text-[#0F0F11]">
                  {p.file}
                </div>
                <div className="mt-3 flex items-center justify-between text-[13px] text-[#4A4A52] font-semibold">
                  <span>{p.size}</span>
                  <span className="text-[#6E56CF] transition-all group-hover:translate-x-1">Download →</span>
                </div>
              </a>
            ))}
          </div>

          <div className="mx-auto mt-16 max-w-3xl rounded-[2px] border border-[#E5E5E8] bg-[#FAFAFC] p-8 shadow-none">
            <h2 className="font-mono text-base font-semibold uppercase tracking-wider text-[#0F0F11]">Or, install with your package manager.</h2>
            <pre className="mt-4 overflow-x-auto rounded-[2px] border border-[#E5E5E8] bg-white p-4 font-mono text-[13px] text-[#0F0F11]">
{`# macOS
brew install puku

# Windows (winget)
winget install puku

# Linux (deb / rpm)
sudo apt install puku
sudo dnf install puku

# Or build from source
cargo install puku`}
            </pre>
          </div>
        </Container>
      </section>
    </>
  );
}