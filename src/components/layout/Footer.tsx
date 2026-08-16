import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const columns = [
  {
    title: 'Products',
    links: [
      { label: 'Puku Web Chat', href: '/chat' },
      { label: 'Puku Editor', href: '/products/editor' },
      { label: 'Puku CLI', href: '/products/cli' },
      { label: 'Puku Cloud', href: '/products/cloud' },
      { label: 'Puku Design', href: '/products/design' },
      { label: 'Puku Co-work', href: '/products/cowork' },
      { label: 'Puku App', href: '/products/app' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { label: 'Enterprise', href: '/enterprise' },
      { label: 'Security & Compliance', href: '/solutions/security' },
      { label: 'Case Studies', href: '/enterprise' },
      { label: 'Pricing', href: '/pricing' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: '/docs' },
      { label: 'SWE-bench Benchmark', href: '/blog' },
      { label: 'Changelog', href: '/changelog' },
      { label: 'About Puku', href: '/about' },
    ],
  },
  {
    title: 'Account',
    links: [
      { label: 'Log In', href: '/login' },
      { label: 'Create Account', href: '/signup' },
      { label: 'Privacy Policy', href: '/about' },
      { label: 'Terms of Service', href: '/about' },
    ],
  },
];

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-[#E5E5E8] text-[#4A4A52]">
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-12">
          {/* Brand col */}
          <div className="col-span-2 md:col-span-4 pr-4">
            {/* Actual Puku Logo */}
            <Link to="/" className="inline-flex items-center gap-2.5 mb-5" aria-label="Puku AI">
              <img src="/puku-mark.svg" alt="Puku Logo" className="h-7 w-auto object-contain" />
              <span className="text-[18px] font-extrabold text-[#0F0F11] font-display">Puku</span>
            </Link>

            <p className="text-[14px] leading-relaxed text-[#4A4A52] max-w-[280px]">
              The autonomous AI software engineer. Building, testing, and shipping code alongside engineering teams worldwide.
            </p>

            {/* Socials */}
            <div className="mt-6 flex items-center gap-2.5">
              {[
                { label: 'X', href: 'https://twitter.com', icon: <path d="M17.5 3h3.2l-7 8 8.2 10h-6.5l-5-6.5L4.5 21H1.3l7.5-8.6L1 3h6.6l4.5 6L17.5 3zm-1.1 16h1.8L7.7 4.8H5.8l10.6 14.2z" /> },
                { label: 'GitHub', href: 'https://github.com', icon: <path d="M12 .5C5.7.5.7 5.5.7 11.8c0 5 3.2 9.2 7.7 10.7.6.1.8-.2.8-.6v-2c-3.1.7-3.8-1.5-3.8-1.5-.5-1.3-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.5-.3-5.1-1.2-5.1-5.5 0-1.2.4-2.2 1.2-3-.1-.3-.5-1.5.1-3 0 0 1-.3 3.2 1.1.9-.3 1.9-.4 3-.4s2 .1 3 .4c2.2-1.5 3.2-1.1 3.2-1.1.6 1.6.2 2.8.1 3 .8.8 1.2 1.8 1.2 3 0 4.3-2.6 5.2-5.1 5.5.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.5-1.5 7.7-5.7 7.7-10.7C23.3 5.5 18.3.5 12 .5z" /> },
                { label: 'LinkedIn', href: 'https://linkedin.com', icon: <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3V9zm6 0h3.8v1.7h.06c.53-1 1.84-2.06 3.78-2.06 4.04 0 4.79 2.66 4.79 6.12V21h-4v-5.4c0-1.3-.03-2.97-1.81-2.97-1.81 0-2.09 1.41-2.09 2.87V21H9V9z" /> },
              ].map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-[2px] bg-[#FAFAFC] border border-[#E5E5E8] text-[#0F0F11] hover:text-[#6E56CF] hover:border-[#6E56CF] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6E56CF]"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-[#0F0F11]">
                    {icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Nav cols */}
          <div className="col-span-2 md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {columns.map((col) => (
              <div key={col.title}>
                <div className="mb-3.5 text-[12px] font-mono font-bold uppercase tracking-wider text-[#6E56CF]">
                  {col.title}
                </div>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.href}
                        className="text-[14px] font-medium text-[#1A1A1E] hover:text-[#6E56CF] transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 flex flex-col gap-4 border-t border-[#E5E5E8] pt-6 text-[13px] font-medium text-[#1A1A1E] md:flex-row md:items-center md:justify-between">
          <div>© 2026 Puku AI, Inc. All rights reserved.</div>
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-2 font-mono text-[12px] text-[#6E56CF] bg-[#F4F2FF] px-3 py-1 rounded-[2px] border border-[#E4DDFE] font-bold">
              <span className="h-2 w-2 rounded-full bg-[#6E56CF] animate-pulse" />
              All Systems Operational
            </span>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-[#0F0F11] hover:text-[#6E56CF] transition-colors"
            >
              GitHub <ArrowUpRight className="h-3.5 w-3.5 text-[#0F0F11]" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};