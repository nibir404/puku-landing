import { ReactNode } from 'react';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ButtonLink } from '@/components/ui/Button';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { easeOut } from '@/lib/motion';
import { cn } from '@/lib/cn';

type ShowcaseProps = {
  id: string;
  product: string;
  eyebrow: string;
  title: ReactNode;
  description: string;
  bullets: string[];
  cta: { label: string; href: string };
  visual: ReactNode;
  reverse?: boolean;
  dark?: boolean;
};

export const ProductShowcase = (p: ShowcaseProps) => {
  return (
    <section id={p.id} className={cn("relative py-24 md:py-32 border-b border-border/50", p.dark ? "bg-[#09090b] text-white border-y border-zinc-800" : "bg-bg")}>
      <Container>
        <div className={`grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center`}>
          <motion.div
            className={`lg:col-span-6 ${p.reverse ? 'lg:order-2' : ''}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease: easeOut }}
          >
            <Eyebrow>{p.product}</Eyebrow>
            <h2 className={cn("mt-5 font-sans text-display-lg font-bold tracking-tight", p.dark ? "text-white" : "text-ink")}>
              {p.title}
            </h2>
            <p className={cn("mt-6 text-base md:text-lg leading-relaxed", p.dark ? "text-zinc-400" : "text-ink-muted")}>
              {p.description}
            </p>
            <ul className="mt-7 space-y-2.5">
              {p.bullets.map((b) => (
                <li key={b} className={cn("flex items-start gap-3 text-[14.5px]", p.dark ? "text-zinc-300" : "text-ink")}>
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" />
                  {b}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex items-center gap-3">
              <ButtonLink to={p.cta.href} variant="primary" size="md" arrow="right">
                {p.cta.label}
              </ButtonLink>
              <Link
                to={p.cta.href}
                className={cn("inline-flex items-center gap-1 text-[14px] transition-colors", p.dark ? "text-zinc-400 hover:text-white" : "text-ink-muted hover:text-ink")}
              >
                Learn more <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            className={`lg:col-span-6 ${p.reverse ? 'lg:order-1' : ''}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease: easeOut, delay: 0.1 }}
          >
            {p.visual}
          </motion.div>
        </div>
      </Container>
    </section>
  );
};