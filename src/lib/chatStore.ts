export type ModelId = 'sonnet-5-high' | 'opus-4.8-high' | 'fast-agent';

export type ModelOption = {
  id: ModelId;
  name: string;
  badge: string;
  description: string;
  tag: string;
};

export const MODEL_OPTIONS: ModelOption[] = [
  {
    id: 'sonnet-5-high',
    name: 'Sonnet 5 High',
    badge: 'Recommended',
    description: 'Optimal balance of deep reasoning, speed, and coding capabilities.',
    tag: 'Sonnet 5 High',
  },
  {
    id: 'opus-4.8-high',
    name: 'Opus 4.8 High',
    badge: 'Maximum Reasoning',
    description: 'Highest intelligence for complex architecture & multi-file coding.',
    tag: 'Opus 4.8 High',
  },
  {
    id: 'fast-agent',
    name: 'Fast Agent',
    badge: 'Ultra Fast',
    description: 'Lightning-fast model for quick edits and terminal scripts.',
    tag: 'Fast Agent',
  },
];

export type Artifact = {
  id: string;
  title: string;
  type: 'code' | 'component' | 'markdown' | 'document';
  language: string;
  code: string;
  previewHtml?: string;
  version?: number;
};

export type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  artifact?: Artifact;
  modelUsed?: string;
  sources?: { title: string; url: string }[];
};

export type Thread = {
  id: string;
  title: string;
  updatedAt: string;
  category: 'Chats and tasks';
  modelId: ModelId;
  messages: Message[];
  starred?: boolean;
  activeMode?: 'Chat' | 'Cowork';
};

export const INITIAL_THREADS: Thread[] = [
  {
    id: 'thread-puku-info',
    title: 'Puku information',
    updatedAt: '10 mins ago',
    category: 'Chats and tasks',
    modelId: 'sonnet-5-high',
    starred: true,
    activeMode: 'Chat',
    messages: [
      {
        id: 'msg-puku-1',
        role: 'user',
        content: 'Tell me about Puku and whatcommon uses or classifications exist for it.',
        timestamp: '11:20 AM',
      },
      {
        id: 'msg-puku-2',
        role: 'assistant',
        content: `A few common uses of the name: there's a Puku language (a minor language classification), a "Puku" entry in some animated wiki fandoms, and Puku is also the name of a Go code-generation tool used with the Please build system on GitHub. If you meant one of those instead of the antelope, let me know and I can dig into that specifically.

Sources:
• Puku - Wikipedia
• Puku - World Land Trust
• Puku - Facts, Diet, Habitat & Pictures on Animalia.bio
• Kobus vardonii (puku) - Animal Diversity Web
• Puku (Kobus vardonii) - Quick facts - Ultimate Ungulate
• GitHub - please-build/puku`,
        timestamp: '11:21 AM',
        modelUsed: 'Sonnet 5 High',
        sources: [
          { title: 'Puku - Wikipedia', url: '#' },
          { title: 'Puku - World Land Trust', url: '#' },
          { title: 'Puku - Facts, Diet, Habitat & Pictures on Animalia.bio', url: '#' },
          { title: 'Kobus vardonii (puku) - Animal Diversity Web', url: '#' },
          { title: 'Puku (Kobus vardonii) - Quick facts - Ultimate Ungulate', url: '#' },
          { title: 'GitHub - please-build/puku', url: '#' },
        ],
      },
    ],
  },
  {
    id: 'thread-medistick',
    title: 'Medistick content creation',
    updatedAt: '1 hour ago',
    category: 'Chats and tasks',
    modelId: 'opus-4.8-high',
    activeMode: 'Chat',
    messages: [
      {
        id: 'msg-med-1',
        role: 'user',
        content: 'i want a single product page where all product will be listed so i need the body and heading for this specific page',
        timestamp: '10:14 AM',
      },
      {
        id: 'msg-med-2',
        role: 'assistant',
        content: `You already have that page — it's the Products overview I built, which lists all 8 products on one page. You just need the heading and body text for it, pulled out cleanly. Here it is:

Page heading (hero)
Tag: THE MEDISTACK PLATFORM
Heading: One Platform for Your Whole Practice
Body: Prescriptions, records, scheduling, and patient care — built to work together, not scattered across separate apps.

The 8 products (heading + body for each card):
Prescription Builder — The daily workhorse, where most doctors spend their time.`,
        timestamp: '10:15 AM',
        modelUsed: 'Opus 4.8 High',
        artifact: {
          id: 'art-medistack',
          title: 'Medistack product pages final',
          type: 'document',
          language: 'markdown',
          version: 1,
          code: `# THE MEDISTACK PLATFORM\n## One Platform for Your Whole Practice\nPrescriptions, records, scheduling, and patient care — built to work together.`,
        },
      },
    ],
  },
  {
    id: 'thread-betopia-brand',
    title: 'Betopia Group brand identity separation',
    updatedAt: 'Yesterday',
    category: 'Chats and tasks',
    modelId: 'sonnet-5-high',
    messages: [],
  },
  {
    id: 'thread-no-content',
    title: 'No content provided',
    updatedAt: 'Yesterday',
    category: 'Chats and tasks',
    modelId: 'sonnet-5-high',
    messages: [],
  },
  {
    id: 'thread-design',
    title: 'Design',
    updatedAt: '2 days ago',
    category: 'Chats and tasks',
    modelId: 'sonnet-5-high',
    messages: [],
  },
];
