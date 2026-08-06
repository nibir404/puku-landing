import { Terminal } from '@/components/ui/Terminal';

export const CLIVisual = () => (
  <Terminal
    title="puku · terminal"
    typing={[
      '$ puku run "deploy checkout to staging"',
      '· reading project context (12 files)',
      '· planning 4 steps',
      '→ build image · esbuild · 1.2s',
      '→ run tests · 24/24 passed',
      '→ push to puku edge · 12 regions',
      '✓ live at checkout.staging.puku.app',
      '· monitoring · 0 errors · p95 38ms',
    ]}
  />
);
