import { useParams, Link } from 'react-router-dom';
import { SEO } from '@/components/layout/SEO';
import { Container } from '@/components/ui/Container';
import { ButtonLink } from '@/components/ui/Button';
import { ArrowLeft } from 'lucide-react';

const BLOG_ARTICLES: Record<string, {
  category: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  content: React.ReactNode;
}> = {
  'agent-native-ide': {
    category: 'Engineering',
    title: 'Designing the agent-native IDE',
    excerpt: 'How we rebuilt the editor from scratch so it feels native to engineers and AI agents alike.',
    author: 'Avery Chen',
    date: 'Jan 12, 2026',
    readTime: '8 min',
    content: (
      <div className="space-y-6">
        <p>
          Integrated Development Environments (IDEs) were built for humans. They arrange tabs, panels, consoles, and buttons around a central buffer designed for human eyes and keystrokes. But as autonomous AI agents begin working side-by-side with developers, this traditional design reaches its limits.
        </p>
        <h2 className="text-xl font-mono uppercase font-semibold text-ink tracking-wider mt-8">Rebuilding the buffer</h2>
        <p>
          An AI agent doesn't "see" code in terms of scrolled viewports or tabs. It reads relationships, symbol definitions, history, and test outputs. When an agent edits a file, it shouldn't just run a search-and-replace script or dump code blocks. It needs to read and write with precise semantics.
        </p>
        <p>
          In Puku Editor, we introduced the <strong>Agent Context Hub</strong>. This interface separates user interface details from model inputs, translating high-speed agent file actions into discrete, reviewable diffs while keeping input latencies under 12ms for the human engineer.
        </p>
        <pre className="bg-ink text-zinc-200 p-5 rounded-lg font-mono text-[13px] overflow-x-auto leading-relaxed border border-zinc-800">
{`interface AgentMutation {
  id: string;
  filepath: string;
  hunk: {
    startLine: number;
    endLine: number;
    originalContent: string;
    proposedContent: string;
  };
  confidence: number;
}`}
        </pre>
        <p>
          By framing agent operations as structured mutations, we make it possible for multiple agents and human engineers to edit the same file simultaneously without overlap conflicts.
        </p>
      </div>
    )
  },
  'introducing-puku-cloud': {
    category: 'Product',
    title: 'Introducing Puku Cloud',
    excerpt: 'A global edge designed for AI workloads. GPU pools, queues, and vector DBs out of the box.',
    author: 'Maya Singh',
    date: 'Jan 8, 2026',
    readTime: '5 min',
    content: (
      <div className="space-y-6">
        <p>
          Deploying software used to mean routing requests to web servers and databases. Today, deploying software means managing agent orchestration loops, scheduling LLM inferences, querying vector databases, and managing GPU allocations.
        </p>
        <h2 className="text-xl font-mono uppercase font-semibold text-ink tracking-wider mt-8">GPU Pools at the edge</h2>
        <p>
          Puku Cloud provides container hosting with built-in access to warm GPU pools. This allows developer agents deployed through the platform to call models locally, minimizing cold starts and latency.
        </p>
        <blockquote className="border-l-4 border-accent pl-4 italic text-ink-muted">
          "The future of software is not just static hosting, but active runtime environments where human engineers work synchronously with persistent, agentic services."
        </blockquote>
        <p>
          With out-of-the-box support for Vector DB routing and background scheduling, Puku Cloud ensures your applications scale globally without requiring complex cloud infrastructure configurations.
        </p>
      </div>
    )
  },
  'typescript-perf': {
    category: 'Engineering',
    title: 'How we typecheck TypeScript at 12k files/sec',
    excerpt: 'A look at the incremental type-check pipeline that powers Puku Code Intelligence.',
    author: 'Theo Park',
    date: 'Dec 30, 2025',
    readTime: '12 min',
    content: (
      <div className="space-y-6">
        <p>
          Speed is everything. Waiting for a compiler check kills the loop between thought and action. In an agent-native IDE where code changes happen in fractions of a second, compile times must be virtually instant.
        </p>
        <h2 className="text-xl font-mono uppercase font-semibold text-ink tracking-wider mt-8">Incremental Compilation Architecture</h2>
        <p>
          To achieve 12,000 files/sec, Puku builds a semantic graph of your project. We parse source files into ASTs and cache dependencies. When a change occurs, we perform incremental type checking, updating only the affected nodes in the dependency graph.
        </p>
        <pre className="bg-ink text-zinc-200 p-5 rounded-lg font-mono text-[13px] overflow-x-auto leading-relaxed border border-zinc-800">
{`// Incremental Dependency Tracker
class DependencyGraph {
  private nodes: Map<string, SourceNode> = new Map();

  public updateFile(path: string, content: string) {
    const affected = this.findAffectedSubtree(path);
    affected.forEach(node => this.retypecheck(node));
  }
}`}
        </pre>
        <p>
          This keeps typing loops local and latency at sub-15ms, making project-wide analysis fast enough to run on every keypress.
        </p>
      </div>
    )
  },
  'tokens-that-travel': {
    category: 'Design',
    title: 'Tokens that travel',
    excerpt: 'Why we chose a token-first architecture for Puku Design, and how it changed our workflow.',
    author: 'Lia Okafor',
    date: 'Dec 21, 2025',
    readTime: '6 min',
    content: (
      <div className="space-y-6">
        <p>
          Design systems fail when they get lost in translation between design mockups and frontend code. We created a design token structure where variables define styling tokens dynamically, traveling seamlessly from Figma files to code variables and active components.
        </p>
        <h2 className="text-xl font-mono uppercase font-semibold text-ink tracking-wider mt-8">Unified Design System</h2>
        <p>
          By maintaining a single JSON schema for colors, spacing, borders, and animations, our system automatically exports themes as CSS custom properties and JSON assets for Figma plugins, ensuring a pixel-perfect match.
        </p>
      </div>
    )
  },
  'on-device-agents': {
    category: 'Research',
    title: 'On-device agents in production',
    excerpt: 'A field report on running 200k on-device inference calls per day without burning laptops.',
    author: 'Ravi Patel',
    date: 'Dec 14, 2025',
    readTime: '9 min',
    content: (
      <div className="space-y-6">
        <p>
          Cloud LLM API calls are expensive and add network latency. For standard editing actions like autocomplete, syntax highlighting, and local code structure audits, running local, small models directly in the browser or developer environment is the key.
        </p>
        <h2 className="text-xl font-mono uppercase font-semibold text-ink tracking-wider mt-8">Local Inference Optimization</h2>
        <p>
          We use WebGPU and WebAssembly engines to compile and run specialized 3B parameter models. By leveraging local GPU cores, we execute inferences in under 40ms while using less than 8% CPU, saving cloud costs and preserving battery.
        </p>
      </div>
    )
  },
  'why-puku': {
    category: 'Company',
    title: 'Why we built Puku',
    excerpt: 'The story behind the platform — and the future we are building toward.',
    author: 'Daniel Reyes',
    date: 'Dec 2, 2025',
    readTime: '4 min',
    content: (
      <div className="space-y-6">
        <p>
          Software engineering is changing. In a world where AI agents can write code, the role of human engineers is moving from manual coding to designing, auditing, and orchestrating digital environments.
        </p>
        <h2 className="text-xl font-mono uppercase font-semibold text-ink tracking-wider mt-8">A New Philosophy</h2>
        <p>
          We didn't build Puku to make another incremental tool. We built Puku because the developer toolchain has become fragmented, complicated, and slow. We are building a unified, fast space where developers can think, design, and deploy in minutes.
        </p>
      </div>
    )
  },
  'multi-agent-runtime': {
    category: 'Engineering',
    title: 'Cramming 47 agents into one editor',
    excerpt: 'How we built the multi-agent runtime that lets you collaborate with AI as if it were a team.',
    author: 'Maya Singh',
    date: 'Nov 24, 2025',
    readTime: '11 min',
    content: (
      <div className="space-y-6">
        <p>
          Collaboration shouldn't be limited to human developers. Puku Editor features a multi-agent orchestration runtime that allows multiple task-specific AI agents to run simultaneously, reviewing code, writing tests, and deploying changes in parallel.
        </p>
        <h2 className="text-xl font-mono uppercase font-semibold text-ink tracking-wider mt-8">Orchestration Loop</h2>
        <p>
          Using an event-driven system, agents declare their skills and tools, subscribe to file updates, and broadcast pull requests. The human engineer acts as the supervisor, guiding and approving steps.
        </p>
      </div>
    )
  }
};

export default function BlogPostDetail() {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? BLOG_ARTICLES[slug] : null;

  if (!article) {
    return (
      <div className="flex min-h-[85vh] items-center justify-center px-6 pt-32 pb-20">
        <div className="text-center">
          <div className="font-pixel-mono text-[18px] uppercase tracking-wider text-ink-muted">404</div>
          <h1 className="mt-4 font-display text-3xl font-medium text-ink">Post Not Found</h1>
          <p className="mt-3 text-ink-muted">The blog post you are looking for doesn't exist.</p>
          <Link to="/blog" className="mt-7 inline-flex items-center justify-center rounded-[4px] bg-[#e8e8ed] border border-border/80 hover:bg-[#dcdce3] text-ink font-semibold uppercase tracking-wider text-[11px] px-5 py-2.5 shadow-sm">
            Back to blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO title={`${article.title} — Puku Blog`} description={article.excerpt} />
      
      <article className="relative min-h-screen pt-32 pb-32">
        <div className="absolute inset-0 -z-10 bg-radial-glow" />
        
        <Container>
          <div className="mx-auto max-w-3xl">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-[13px] font-medium text-ink-muted hover:text-ink transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to blog
            </Link>

            <div className="text-[11.5px] font-semibold uppercase tracking-wider text-accent mb-4">
              {article.category}
            </div>

            <h1 className="font-display text-4xl sm:text-5xl font-medium tracking-tight text-ink leading-tight">
              {article.title}
            </h1>

            <p className="mt-6 text-lg sm:text-xl leading-relaxed text-ink-muted font-normal">
              {article.excerpt}
            </p>

            <div className="mt-8 flex items-center gap-3 border-y border-border/60 py-4 text-[13px] text-ink-muted">
              <div>
                Written by <span className="font-semibold text-ink">{article.author}</span>
              </div>
              <span>·</span>
              <div>{article.date}</div>
              <span>·</span>
              <div>{article.readTime} read</div>
            </div>

            <div className="mt-10 font-sans text-[15.5px] sm:text-[16.5px] leading-relaxed text-ink/90 font-medium space-y-6">
              {article.content}
            </div>

            <div className="mt-16 border-t border-border pt-10 text-center">
              <h3 className="font-display text-lg font-medium text-ink">Read more from Puku</h3>
              <p className="mt-2 text-[14px] text-ink-muted mb-6">Get news, updates, and deep dives sent straight to your inbox.</p>
              <div className="mx-auto flex max-w-md items-center gap-2">
                <input
                  type="email"
                  placeholder="name@email.com"
                  className="h-10 w-full rounded-lg border border-border bg-surface px-3 text-[14px] focus:outline-none focus:border-accent"
                />
                <button className="h-10 rounded-[4px] bg-[#ffa372] border border-[#ff915a] hover:bg-[#ff915a] text-black px-4 text-[11px] font-bold uppercase tracking-wider transition-all shrink-0 shadow-sm">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </Container>
      </article>
    </>
  );
}
