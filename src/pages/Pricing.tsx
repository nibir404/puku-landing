import { useState } from 'react';
import { SEO } from '@/components/layout/SEO';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ButtonLink } from '@/components/ui/Button';
import { CtaBanner } from '@/components/layout/CtaBanner';
import { cn } from '@/lib/cn';
import {
  AlertTriangle, ChevronDown, Check, HelpCircle,
  Zap, Users, Crown, Star, Rocket, Shield
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const individualPlans = [
  {
    id: 'test',
    name: 'Test',
    icon: Zap,
    price: '৳100',
    period: '/mo',
    desc: 'Perfect for testing and personal validation.',
    cta: 'Get Started Free',
    href: '/download',
    color: 'from-slate-500/20 to-slate-600/5',
    features: [
      'Inline code completions',
      'Puku context engine',
      'Community support',
      '1.5K chat requests / month',
      '200K context window',
    ],
  },
  {
    id: 'student',
    name: 'Student',
    icon: Star,
    price: '৳500',
    period: '/mo',
    desc: 'A complete package for coding students.',
    cta: 'Get Student Plan',
    href: '/download',
    color: 'from-blue-500/20 to-blue-600/5',
    features: [
      'Inline code completions',
      'Puku context engine',
      'Community support',
      '8K chat requests / month',
      '200K context window',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    icon: Rocket,
    price: '৳2,000',
    period: '/mo',
    desc: 'Recommended for professional engineers.',
    cta: 'Get Pro Today',
    href: '/download',
    featured: true,
    color: 'from-violet-500/30 to-purple-600/10',
    features: [
      'Puku-ai coding agent',
      'Agent mode & Puku-ai chats',
      'Priority support',
      '20K chat requests / month',
      '200K context window',
      'Advanced model routers (Opus 4.8)',
    ],
  },
  {
    id: 'power',
    name: 'Power',
    icon: Shield,
    price: '৳4,000',
    period: '/mo',
    desc: 'For power users needing higher execution rates.',
    cta: 'Get Power Plan',
    href: '/contact',
    color: 'from-orange-500/20 to-orange-600/5',
    features: [
      'Everything in Pro',
      'Early access to new features',
      'Dedicated support',
      '40K chat requests / month',
      '200K context window',
      'Advanced model routers (Opus 4.8)',
    ],
  },
  {
    id: 'max',
    name: 'Max',
    icon: Crown,
    price: '৳10,000',
    period: '/mo',
    desc: 'Maximum capabilities and custom allocation.',
    cta: 'Get Max Plan',
    href: '/contact',
    color: 'from-amber-500/20 to-yellow-600/5',
    features: [
      'Everything in Power',
      'Highest request limits',
      'Dedicated support',
      '120K chat requests / month',
      '200K context window',
      'Puku AI 2.8 + GLM 5.2 fine-tuned',
      'Puku AI 2.8 (80K) & Opus 4.8 (40K)',
    ],
  },
];

const teamPlans = [
  {
    id: 'team-pro',
    name: 'Team Pro',
    icon: Users,
    price: '৳2,000',
    period: '/seat/mo',
    tagline: 'Predictable per-seat pricing for teams getting organized.',
    cta: 'Configure Team Pro',
    href: '/contact',
    featured: true,
    capacity: 'Standard',
    ticks: 2,
    color: 'from-violet-500/30 to-purple-600/10',
    features: [
      'All Pro features',
      'Centralized billing',
      'Workspace management',
      'Team usage analytics',
      'Priority support',
    ],
  },
  {
    id: 'team-power',
    name: 'Team Power',
    icon: Rocket,
    price: '৳4,000',
    period: '/seat/mo',
    tagline: 'Higher limits and early access for teams pushing volume.',
    cta: 'Configure Team Power',
    href: '/contact',
    capacity: '5× standard',
    ticks: 4,
    color: 'from-orange-500/20 to-orange-600/5',
    features: [
      'All Team Pro features',
      '5× higher usage limits',
      'Early access to new features',
      'Dedicated Customer Success Manager',
    ],
  },
  {
    id: 'team-max',
    name: 'Team Max',
    icon: Crown,
    price: '৳10,000',
    period: '/seat/mo',
    tagline: 'Flexible pooled usage for large teams with varied workloads.',
    cta: 'Configure Team Max',
    href: '/contact',
    capacity: 'Highest pooled',
    ticks: 5,
    color: 'from-amber-500/20 to-yellow-600/5',
    features: [
      'All Team Power features',
      'Highest pooled usage limits',
      'Dedicated infrastructure',
      'Reserved request capacity',
      'Puku AI 2.8 (80K) & Opus 4.8 (40K)',
      'Advanced model routing',
      'Audit logs & compliance APIs',
    ],
  },
];

const compareRows = [
  {
    name: 'Monthly requests',
    test: '1.5K',
    student: '8K',
    pro: '20K',
    power: '40K',
    max: '120K',
  },
  {
    name: 'Context window',
    test: '200K',
    student: '200K',
    pro: '200K',
    power: '200K',
    max: '200K',
  },
  {
    name: 'Puku-ai agent',
    test: false,
    student: false,
    pro: true,
    power: true,
    max: true,
  },
  {
    name: 'Early access',
    test: false,
    student: false,
    pro: false,
    power: true,
    max: true,
  },
  {
    name: 'Support tier',
    test: 'Community',
    student: 'Community',
    pro: 'Priority',
    power: 'Dedicated',
    max: 'Dedicated',
  },
  {
    name: 'Opus 4.8 routing',
    test: false,
    student: false,
    pro: true,
    power: true,
    max: true,
  },
];

const faqs = [
  {
    q: 'Can I switch plans at any time?',
    a: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect on your next billing cycle.',
  },
  {
    q: 'What payment methods are accepted?',
    a: 'We accept bKash, Nagad, Rocket, and major international credit/debit cards.',
  },
  {
    q: 'What happens when I hit my request limit?',
    a: 'Requests are queued and resumed the next hour window. You can also upgrade your plan instantly to increase limits.',
  },
  {
    q: 'Is there a free trial?',
    a: 'The Test Package at ৳100/month is essentially our entry-level trial. You can cancel anytime within the first 7 days for a full refund.',
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border/60 last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left focus:outline-none group"
        aria-expanded={open}
      >
        <span className="font-semibold text-ink text-[15px] group-hover:text-accent transition-colors">{q}</span>
        <ChevronDown
          className={cn(
            'h-4 w-4 text-ink-muted flex-shrink-0 transition-transform duration-300',
            open && 'rotate-180'
          )}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-[14px] leading-relaxed text-ink-muted">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Pricing() {
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'individual' | 'team'>('individual');

  const plans = activeTab === 'individual' ? individualPlans : teamPlans;

  return (
    <>
      <SEO title="Pricing — Puku" description="Simple, predictable pricing for AI-native engineering." />

      {/* Hero */}
      <section className="relative pt-28 pb-12 md:pt-40 md:pb-16 overflow-hidden bg-white border-b border-[#E5E5E8]">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow className="justify-center">Pricing</Eyebrow>
            <h1 className="mt-5 font-sans text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-[#0F0F11] leading-[1.08]">
              Plans Built for{' '}
              <span className="text-[#6E56CF]">Every Engineer.</span>
            </h1>
            <p className="mt-5 text-[16px] sm:text-lg leading-relaxed text-[#4A4A52] font-normal max-w-lg mx-auto">
              From testing side projects to running a full engineering team — pick the plan that fits.
            </p>
          </div>
        </Container>
      </section>

      {/* Important Notice */}
      <section className="pb-10 pt-10">
        <Container>
          <div className="mx-auto max-w-3xl rounded-[2px] border border-amber-500/30 bg-amber-500/5 overflow-hidden">
            <button
              onClick={() => setIsNoticeOpen(!isNoticeOpen)}
              className="flex w-full items-center justify-between gap-3 p-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6E56CF]"
              aria-expanded={isNoticeOpen}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-[2px] bg-amber-500/15 flex-shrink-0">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                </div>
                <span className="text-[14px] font-semibold text-[#0F0F11]">
                  Important Notice — Please read before payment
                </span>
              </div>
              <ChevronDown
                className={cn(
                  'h-4 w-4 text-[#4A4A52] transition-transform duration-200 flex-shrink-0',
                  isNoticeOpen && 'rotate-180'
                )}
              />
            </button>
            <AnimatePresence>
              {isNoticeOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 pt-1 border-t border-amber-500/10 space-y-2.5 text-[14px] font-normal leading-relaxed text-[#4A4A52]">
                    <p>Puku uses its own automatic request classification system to help protect platform reliability. Requests involving hacking attempts, jailbreak techniques, or unsafe activities may be automatically routed to the Minimax model.</p>
                    <p>Our Opus 4.8 service runs through third-party infrastructure in Hong Kong. Certain requests pass through our protection system to reduce upstream account restrictions.</p>
                    <p>Multiple safety layers are applied across our infrastructure for stability. Some requests may take slightly longer to process as a result.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Container>
      </section>

      {/* Tab Toggle */}
      <section className="pb-10 text-center">
        <div className="inline-flex rounded-[2px] border border-[#E5E5E8] bg-[#FAFAFC] p-1 shadow-none">
          {(['individual', 'team'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                'relative px-6 py-2.5 min-h-[44px] text-[15px] font-semibold rounded-[2px] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6E56CF]',
                activeTab === tab
                  ? 'bg-[#6E56CF] text-white shadow-none'
                  : 'text-[#4A4A52] hover:text-[#0F0F11]'
              )}
            >
              {tab === 'individual' ? 'Individual' : 'Team & Enterprise'}
            </button>
          ))}
        </div>
      </section>

      {/* Plan Cards */}
      <section className="pb-20">
        <Container>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className={cn(
                'flex overflow-x-auto snap-x snap-mandatory gap-4 pb-6 -mx-4 px-4 hide-scrollbar',
                'md:mx-0 md:px-0 md:overflow-visible md:pb-0',
                activeTab === 'individual'
                  ? 'md:grid md:grid-cols-3 lg:grid-cols-5'
                  : 'md:grid md:grid-cols-3 md:max-w-4xl md:mx-auto'
              )}
            >
              {plans.map((plan, i) => {
                const Icon = plan.icon;
                const isTeam = activeTab === 'team';
                const teamPlan = isTeam ? (plan as typeof teamPlans[0]) : null;

                return (
                  <motion.div
                    key={plan.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.06 }}
                    className={cn(
                      'relative flex flex-col rounded-[2px] border bg-white overflow-hidden transition-all duration-300 shadow-none',
                      'min-w-[82vw] sm:min-w-[55vw] snap-center md:min-w-0',
                      plan.featured
                        ? 'border-[#6E56CF]'
                        : 'border-[#E5E5E8] hover:border-[#6E56CF]'
                    )}
                  >
                    {/* Gradient top strip */}
                    <div className={cn('h-1.5 w-full bg-gradient-to-r', plan.color.replace('from-', 'from-').replace('/20', '/80').replace('/5', '/40').replace('/10', '/30').replace('/30', '/80'))} />

                    {plan.featured && (
                      <div className="absolute top-3.5 right-3.5">
                        <span className="rounded-[2px] bg-[#6E56CF] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                          Recommended
                        </span>
                      </div>
                    )}

                    <div className="flex flex-col flex-1 p-5 sm:p-6">
                      {/* Icon + Name */}
                      <div className="flex items-center gap-2.5 mb-4">
                        <div className={cn('flex h-8 w-8 items-center justify-center rounded-[2px] bg-gradient-to-br', plan.color)}>
                          <Icon className="h-4 w-4 text-[#6E56CF]" />
                        </div>
                        <h3 className="font-semibold text-[16px] text-[#0F0F11]">{plan.name}</h3>
                      </div>

                      {/* Price */}
                      <div className="flex items-baseline gap-1 mb-1">
                        <span className="text-3xl font-semibold tracking-tight text-[#0F0F11]">{plan.price}</span>
                        <span className="text-[12px] text-[#4A4A52] font-semibold">{plan.period}</span>
                      </div>
                      <p className="text-[14px] text-[#4A4A52] font-normal leading-relaxed mb-4">
                        {isTeam && teamPlan ? teamPlan.tagline : (plan as typeof individualPlans[0]).desc}
                      </p>

                      {/* Team capacity meter */}
                      {isTeam && teamPlan && (
                        <div className="mb-4 rounded-[2px] bg-[#FAFAFC] border border-[#E5E5E8] p-3">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-[10px] font-mono font-semibold uppercase text-[#4A4A52]">Usage Capacity</span>
                            <span className="text-[10px] font-mono font-bold text-[#6E56CF]">{teamPlan.capacity}</span>
                          </div>
                          <div className="flex gap-1">
                            {Array.from({ length: 5 }).map((_, idx) => (
                              <div
                                key={idx}
                                className={cn(
                                  'h-1.5 flex-1 rounded-[2px] transition-colors duration-300',
                                  idx < teamPlan.ticks ? 'bg-[#6E56CF]' : 'bg-[#E5E5E8]'
                                )}
                              />
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Divider */}
                      <div className="h-px bg-[#E5E5E8] mb-4" />

                      {/* Features */}
                      <ul className="space-y-2.5 flex-1 mb-6">
                        {plan.features.map((feat, fi) => (
                          <li key={fi} className="flex items-start gap-2">
                            <div className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-[#F4F2FF]">
                              <Check className="h-2.5 w-2.5 text-[#6E56CF]" strokeWidth={2.5} />
                            </div>
                            <span className="text-[13.5px] leading-relaxed text-[#4A4A52] font-medium">{feat}</span>
                          </li>
                        ))}
                      </ul>

                      {/* CTA */}
                      <ButtonLink
                        to={plan.href}
                        variant={plan.featured ? 'primary' : 'secondary'}
                        size="sm"
                        className="w-full justify-center font-semibold text-[14px] min-h-[44px] rounded-[2px]"
                        arrow="none"
                      >
                        {plan.cta}
                      </ButtonLink>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </Container>
      </section>

      {/* Comparison Table */}
      <section className="py-16 border-t border-[#E5E5E8] bg-[#FAFAFC]">
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-10">
            <Eyebrow className="justify-center">Compare</Eyebrow>
            <h2 className="mt-4 font-semibold text-2xl sm:text-3xl tracking-tight text-[#0F0F11]">
              Full plan comparison
            </h2>
          </div>

          <div className="mx-auto max-w-5xl overflow-hidden rounded-[2px] border border-[#E5E5E8] bg-white shadow-none">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-[13px]">
                <thead>
                  <tr className="border-b border-[#E5E5E8] bg-[#FAFAFC]">
                    <th className="px-5 py-4 font-semibold text-[11px] uppercase tracking-wider text-[#4A4A52] w-[200px]">Feature</th>
                    {['Test', 'Student', 'Pro', 'Power', 'Max'].map((h, i) => (
                      <th
                        key={h}
                        className={cn(
                          'px-4 py-4 font-semibold text-[11px] uppercase tracking-wider text-center',
                          i === 2 ? 'text-[#6E56CF] bg-[#F4F2FF]' : 'text-[#0F0F11]'
                        )}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E5E8]">
                  {compareRows.map((row, ri) => (
                    <tr key={ri} className="hover:bg-[#FAFAFC] transition-colors">
                      <td className="px-5 py-3.5 font-semibold text-[#0F0F11] text-[13.5px]">{row.name}</td>
                      {(['test', 'student', 'pro', 'power', 'max'] as const).map((key, ki) => {
                        const val = row[key];
                        return (
                          <td
                            key={key}
                            className={cn(
                              'px-4 py-3.5 text-center',
                              ki === 2 ? 'bg-[#F4F2FF]/40' : ''
                            )}
                          >
                            {typeof val === 'boolean' ? (
                              val ? (
                                <div className="flex justify-center">
                                  <div className="h-5 w-5 rounded-full bg-[#F4F2FF] flex items-center justify-center">
                                    <Check className="h-3 w-3 text-[#6E56CF]" strokeWidth={2.5} />
                                  </div>
                                </div>
                              ) : (
                                <span className="text-[#4A4A52]/40 text-lg leading-none">—</span>
                              )
                            ) : (
                              <span className={cn('text-[13px]', ki === 2 ? 'text-[#0F0F11] font-semibold' : 'text-[#4A4A52]')}>
                                {val}
                              </span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <Container>
          <div className="mx-auto max-w-2xl">
            <div className="text-center mb-10">
              <Eyebrow className="justify-center">FAQ</Eyebrow>
              <h2 className="mt-4 font-bold text-2xl sm:text-3xl tracking-tight text-ink">
                Common questions
              </h2>
            </div>
            <div className="rounded-2xl border border-border bg-surface shadow-soft px-6 divide-y divide-border/60">
              {faqs.map((faq, i) => (
                <FAQItem key={i} q={faq.q} a={faq.a} />
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Banner */}
      <CtaBanner primaryCtaText="Talk to support" secondaryCtaText="Enterprise terms" secondaryCtaHref="/enterprise" />
    </>
  );
}