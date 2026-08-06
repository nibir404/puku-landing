import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { SEO } from '@/components/layout/SEO';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';

type JobDetail = {
  title: string;
  department: string;
  location: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
};

const jobRoles: Record<string, JobDetail> = {
  'senior-engineer-puku-editor': {
    title: 'Senior Engineer, Puku Editor',
    department: 'Engineering',
    location: 'Remote · UTC ± 3',
    description: 'Help construct a high-performance developer workspace. Work directly with low-latency syntax indexing buffers, code overlays, and local multi-agent communication layers.',
    responsibilities: [
      'Optimize WebGL and GPU canvas editing buffer code to maintain a sub-12ms input latency.',
      'Refine Fill-in-the-Middle ghost text predictions integration with offline indexing loops.',
      'Extend VS Code plugin import synchronization pipelines.'
    ],
    requirements: [
      '5+ years experience building complex desktop or web-based text editor environments.',
      'Deep fluency in Rust, TypeScript, and Canvas rendering pipelines.',
      'Familiarity with the internal architecture of VS Code or similar open systems.'
    ]
  },
  'staff-engineer-puku-cloud': {
    title: 'Staff Engineer, Puku Cloud',
    department: 'Engineering',
    location: 'San Francisco · Remote',
    description: 'Design the infrastructure supporting distributed container executions. Help manage edge execution networks and close-coupled model caching endpoints.',
    responsibilities: [
      'Scale distributed container clusters across 12 primary routing edge regions.',
      'Implement routing networks that resolve request contexts in under 2 seconds globally.',
      'Improve queue persistence and SQLite workspace states persistence layers.'
    ],
    requirements: [
      '8+ years experience managing Kubernetes clusters or distributed database services.',
      'Strong architecture expertise in Go, C++, or Rust.',
      'Familiarity with Cloudflare Workers or serverless edge technologies.'
    ]
  },
  'engineer-ai-agents': {
    title: 'Engineer, AI Agents',
    department: 'Engineering',
    location: 'Remote · Global',
    description: 'Develop coordinate frameworks that orchestrate parallel sub-agents safely. Work on agent memory caching, prompt triggers, and execution safety scopes.',
    responsibilities: [
      'Design parallel agent task scheduler configurations inside local and remote runtime states.',
      'Build verification dialogs that intercept agent actions (e.g. bash runs, git commits) for confirmations.',
      'Improve model fine-tuning and routing based on developer acceptance loops.'
    ],
    requirements: [
      '3+ years experience building LLM pipelines, RAG, or autonomous systems.',
      'Fluency with Python, TypeScript, and AST code parse systems.',
      'Familiarity with prompt token optimizing and context compaction logic.'
    ]
  },
  'engineer-puku-cli': {
    title: 'Engineer, Puku CLI',
    department: 'Engineering',
    location: 'Remote · Global',
    description: 'Implement the command line utility interface connecting terminal loops to agent contexts.',
    responsibilities: [
      'Maintain CLI script performance and cross-platform command compatibility (macOS, Windows, Linux).',
      'Optimize local repository AST index generation runs.',
      'Support Model Context Protocol (MCP) server bindings directly inside terminal sessions.'
    ],
    requirements: [
      '3+ years experience building developer tools or terminal utilities.',
      'Deep knowledge of Node.js, TypeScript, and compiler diagnostics.',
      'Experience with git integrations and shell parsing scripts.'
    ]
  },
  'senior-product-designer-puku-design': {
    title: 'Senior Product Designer, Puku Design',
    department: 'Design',
    location: 'New York · Remote',
    description: 'Bridge the gap between design tokens and code variables. Design Figma synchronization canvas tools.',
    responsibilities: [
      'Design token mapping views that sync layout changes to CSS/Tailwind definitions.',
      'Maintain a unified premium design system template across both Editor and Web views.',
      'Prototype dynamic UI micro-animations and layouts for multi-agent trace logs.'
    ],
    requirements: [
      '5+ years designing developer tools, code editors, or token management platforms.',
      'Mastery of Figma plugin APIs, token sync systems, and HTML/CSS styling structures.',
      'Outstanding portfolio displaying clean, high-contrast, minimalist aesthetics.'
    ]
  },
  'brand-designer': {
    title: 'Brand Designer',
    department: 'Design',
    location: 'Remote · Global',
    description: 'Define the global visual aesthetic of the Puku brand across websites, documentations, and assets.',
    responsibilities: [
      'Create high-fidelity graphic assets, release artwork covers, and marketing materials.',
      'Coordinate visual guidelines across social platforms, documentation sites, and editor themes.',
      'Design typography styles and premium landing elements.'
    ],
    requirements: [
      '3+ years experience at a technology company or branding studio.',
      'Strong expertise in vector art, typography, and motion design.',
      'High attention to detail in layouts, colors, and clean minimalist branding.'
    ]
  },
  'research-engineer-on-device-ai': {
    title: 'Research Engineer, On-device AI',
    department: 'Research',
    location: 'Remote · Global',
    description: 'Train and optimize lightweight local compiler models to enable offline completions in under 12ms.',
    responsibilities: [
      'Quantize and prune neural network code models to fit consumer laptop GPU parameters.',
      'Optimize token inference loops directly on Apple Silicon (Metal) and Windows (DirectML).',
      'Refine Fill-in-the-Middle autocomplete weights based on user code acceptance rates.'
    ],
    requirements: [
      '3+ years experience in model compression, quantization (llama.cpp / ONNX), or local inference systems.',
      'Familiarity with C++, CUDA, PyTorch, and compiler optimization layers.',
      'Strong academic or industrial research history in code models.'
    ]
  },
  'group-product-manager-puku-cloud': {
    title: 'Group Product Manager, Puku Cloud',
    department: 'Product',
    location: 'San Francisco · Remote',
    description: 'Define the roadmap, pricing tiers, and developer UX parameters for the global cloud edge hosting platform.',
    responsibilities: [
      'Gather requirements from developers and enterprises to scale container deployments.',
      'Define billing layers, edge routing models, and cloud metrics monitoring dashboards.',
      'Collaborate with designers and engineers to deliver clean, fast setup paths.'
    ],
    requirements: [
      '5+ years experience managing cloud platforms, SaaS, or developer-facing products.',
      'Strong technical background in distributed infrastructure, networking, and APIs.',
      'Data-driven approach to product metrics and user onboarding.'
    ]
  },
  'solutions-engineer-enterprise': {
    title: 'Solutions Engineer, Enterprise',
    department: 'GTM',
    location: 'New York · Remote',
    description: 'Consult with enterprise engineering organizations to deploy Puku safely inside custom VPC networks.',
    responsibilities: [
      'Design custom deployment diagrams for private host installations.',
      'Assist enterprise security teams with audit logs integration, SSO, and compliance.',
      'Provide developer onboarding guides for large code repos.'
    ],
    requirements: [
      '3+ years experience in customer-facing technical support, solutions engineering, or architecture consulting.',
      'Familiarity with AWS, GCP, Azure, and network configurations.',
      'Strong communications and troubleshooting skills.'
    ]
  },
  'account-executive-enterprise': {
    title: 'Account Executive, Enterprise',
    department: 'GTM',
    location: 'Remote · US',
    description: 'Scale business operations by introducing Puku Team and Enterprise packages to technology leaders.',
    responsibilities: [
      'Manage sales cycles from initial discovery to contract negotiation and closing.',
      'Collaborate with product and engineering teams to align roadmap priorities with enterprise feedback.',
      'Deliver premium demos of Editor, CLI, and Cloud integrations.'
    ],
    requirements: [
      '5+ years experience in B2B SaaS enterprise sales, preferably selling to developers or CTOs.',
      'Strong track record of hitting and exceeding sales quotas.',
      'Outstanding communication, presentation, and negotiation skills.'
    ]
  }
};

export default function CareersDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [formData, setFormData] = useState({ name: '', email: '', portfolio: '', coverLetter: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Match the slug with the jobRoles keys
  const matchedRoleKey = slug ? slug.toLowerCase().trim() : '';
  const job = jobRoles[matchedRoleKey];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  if (!job) {
    return (
      <>
        <SEO title="Role Not Found — Puku" description="The job listing you requested could not be found." />
        <section className="pt-32 pb-24 text-center">
          <Container>
            <h1 className="text-2xl font-bold text-ink">Role not found</h1>
            <p className="mt-4 text-ink-muted text-sm">The job listing does not exist or has been closed.</p>
            <div className="mt-8">
              <Link to="/careers" className="text-accent hover:underline text-sm font-semibold">
                ← Back to open roles
              </Link>
            </div>
          </Container>
        </section>
      </>
    );
  }

  return (
    <>
      <SEO title={`${job.title} — Careers at Puku`} description={job.description} />
      
      <div className="min-h-screen pt-24 bg-[#f5f5f7]">
        <Container>
          <div className="max-w-4xl mx-auto py-12">
            
            {/* Header info */}
            <div className="border-b border-border/60 pb-8">
              <Link to="/careers" className="text-xs font-mono uppercase tracking-wider text-accent hover:text-accent-deep transition-colors">
                ← Open Positions
              </Link>
              <h1 className="mt-4 font-sans text-3xl sm:text-4xl font-bold text-ink tracking-tight">
                {job.title}
              </h1>
              <div className="mt-3 flex items-center gap-4 text-xs font-mono uppercase tracking-wider text-ink-muted">
                <span>{job.department}</span>
                <span>•</span>
                <span>{job.location}</span>
              </div>
            </div>

            {/* Description & Requirements grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-10">
              
              {/* Job description section */}
              <div className="lg:col-span-7 space-y-8">
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-wider text-ink font-semibold border-b border-border/60 pb-2">
                    Overview
                  </h3>
                  <p className="mt-4 text-[15px] leading-relaxed text-ink-muted">
                    {job.description}
                  </p>
                </div>

                <div>
                  <h3 className="font-mono text-xs uppercase tracking-wider text-ink font-semibold border-b border-border/60 pb-2">
                    Responsibilities
                  </h3>
                  <ul className="mt-4 list-disc pl-5 space-y-2.5 text-[14px] leading-relaxed text-ink-muted">
                    {job.responsibilities.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-mono text-xs uppercase tracking-wider text-ink font-semibold border-b border-border/60 pb-2">
                    Requirements
                  </h3>
                  <ul className="mt-4 list-disc pl-5 space-y-2.5 text-[14px] leading-relaxed text-ink-muted">
                    {job.requirements.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Apply Form Card */}
              <div className="lg:col-span-5 self-start bg-bg border border-border/80 rounded-2xl p-6 shadow-sm">
                <h3 className="font-mono text-xs uppercase tracking-wider text-ink font-bold mb-4">
                  Apply for this role
                </h3>

                {submitted ? (
                  <div className="text-center py-8">
                    <div className="h-10 w-10 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-100">
                      ✓
                    </div>
                    <h4 className="font-semibold text-ink text-sm">Application submitted</h4>
                    <p className="mt-2 text-xs text-ink-muted leading-relaxed">
                      Thank you for applying. Our recruiting team will review your application and contact you shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wide text-ink mb-1.5" htmlFor="name">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full h-9 rounded-lg border border-border bg-bg px-3 text-[13px] text-ink focus:outline-none focus:border-accent transition-colors"
                        placeholder="Daniel Reyes"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wide text-ink mb-1.5" htmlFor="email">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full h-9 rounded-lg border border-border bg-bg px-3 text-[13px] text-ink focus:outline-none focus:border-accent transition-colors"
                        placeholder="daniel@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wide text-ink mb-1.5" htmlFor="portfolio">
                        Portfolio / GitHub URL
                      </label>
                      <input
                        type="url"
                        id="portfolio"
                        value={formData.portfolio}
                        onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                        className="w-full h-9 rounded-lg border border-border bg-bg px-3 text-[13px] text-ink focus:outline-none focus:border-accent transition-colors"
                        placeholder="https://github.com/example"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wide text-ink mb-1.5" htmlFor="coverLetter">
                        Brief Note / Cover Letter
                      </label>
                      <textarea
                        id="coverLetter"
                        rows={4}
                        value={formData.coverLetter}
                        onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                        className="w-full rounded-lg border border-border bg-bg p-3 text-[13px] text-ink focus:outline-none focus:border-accent transition-colors resize-none"
                        placeholder="Tell us about yourself and why you want to build Puku..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full h-10 rounded-[4px] bg-accent hover:bg-accent/90 text-white border border-accent/20 font-bold uppercase tracking-wider text-[11px] disabled:opacity-50 transition-all shadow-sm flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <span className="h-3.5 w-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <span>Submit Application</span>
                      )}
                    </button>
                  </form>
                )}
              </div>

            </div>

          </div>
        </Container>
      </div>
    </>
  );
}
