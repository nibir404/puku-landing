import * as React from 'react';
import {
  siGithub,
  siGitlab,
  siDocker,
  siVercel,
  siPostgresql,
  siRedis,
  siSupabase,
  siLinear,
  siJira,
  siFigma,
  siPython,
  siTypescript,
  siReact,
  siNextdotjs,
  siNodedotjs,
  siTailwindcss,
  siKubernetes,
  siTerraform,
  siDatadog,
  siSentry,
} from 'simple-icons';
import { Terminal as TerminalLucide } from 'lucide-react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

const createSimpleIconComponent = (path: string, title: string) => {
  const IconComponent = ({ className = "h-4 w-4", ...props }: IconProps) => (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-label={title}
      {...props}
    >
      <path d={path} />
    </svg>
  );
  IconComponent.displayName = title;
  return IconComponent;
};

export const GitHubIcon = createSimpleIconComponent(siGithub.path, 'GitHub');
export const GitLabIcon = createSimpleIconComponent(siGitlab.path, 'GitLab');
export const DockerIcon = createSimpleIconComponent(siDocker.path, 'Docker');
export const VercelIcon = createSimpleIconComponent(siVercel.path, 'Vercel');
export const PostgresIcon = createSimpleIconComponent(siPostgresql.path, 'Postgres');
export const RedisIcon = createSimpleIconComponent(siRedis.path, 'Redis');
export const SupabaseIcon = createSimpleIconComponent(siSupabase.path, 'Supabase');
export const LinearIcon = createSimpleIconComponent(siLinear.path, 'Linear');
export const JiraIcon = createSimpleIconComponent(siJira.path, 'Jira');
export const FigmaIcon = createSimpleIconComponent(siFigma.path, 'Figma');
export const PythonIcon = createSimpleIconComponent(siPython.path, 'Python');
export const TypeScriptIcon = createSimpleIconComponent(siTypescript.path, 'TypeScript');
export const ReactIcon = createSimpleIconComponent(siReact.path, 'React');
export const NextjsIcon = createSimpleIconComponent(siNextdotjs.path, 'Next.js');
export const NodejsIcon = createSimpleIconComponent(siNodedotjs.path, 'Node.js');
export const TailwindIcon = createSimpleIconComponent(siTailwindcss.path, 'Tailwind');
export const KubernetesIcon = createSimpleIconComponent(siKubernetes.path, 'Kubernetes');
export const TerraformIcon = createSimpleIconComponent(siTerraform.path, 'Terraform');
export const DatadogIcon = createSimpleIconComponent(siDatadog.path, 'Datadog');
export const SentryIcon = createSimpleIconComponent(siSentry.path, 'Sentry');

// Custom Vector SVGs for VS Code, AWS, Slack, and Terminal
export const VSCodeIcon = ({ className = "h-4 w-4", ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <path d="M23.15 2.587L18.21.21a1.494 1.494 0 00-1.705.29l-9.46 8.63L3.54 6.325a.997.997 0 00-1.285.088L.36 8.188a.998.998 0 000 1.455l3.96 3.65-3.96 3.65a.998.998 0 000 1.455l1.895 1.775a.997.997 0 001.285.088l3.505-2.805 9.46 8.63c.484.44 1.18.555 1.705.29l4.94-2.377a1.5 1.5 0 00.85-1.352V3.939a1.5 1.5 0 00-.85-1.352z" />
  </svg>
);

export const AWSIcon = ({ className = "h-4 w-4", ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <path d="M18.75 16.945c-2.4 1.77-5.903 2.71-8.91 2.71-4.22 0-8.026-1.55-10.84-4.14-.22-.2-.05-.47.21-.31 3.036 1.83 6.837 2.93 10.84 2.93 2.67 0 5.61-.63 8.28-1.92.41-.2.83.25.42.73zM20.25 15.655c-.32-.41-2.11-.2-2.85-.09-.23.03-.26-.17-.06-.31 1.35-.95 3.53-.67 3.8.35.09.34-.34 2.4-1.63 3.44-.2.16-.36.08-.26-.14.34-.73.68-1.92.32-2.31zM9.54 11.755c0-.98-.44-1.42-1.36-1.42-.69 0-1.47.33-2.12.75l.38 1.05c.48-.3 1.01-.54 1.39-.54.43 0 .61.19.61.54v.36c-.5.06-1.22.14-1.94.33-.94.25-1.57.88-1.57 1.84 0 .97.68 1.63 1.61 1.63.74 0 1.34-.36 1.77-.96v.83h1.23v-4.41zm-1.23.95c-.3.51-.77.85-1.27.85-.43 0-.7-.27-.7-.68 0-.47.33-.76.92-.9.46-.11.96-.16 1.05-.18v.91zm4.18-2.37h-1.25l.89 4.88 1.25-4.88h.95l1.24 4.88.91-4.88h-1.25l-.47 2.95-.89-3.41h-.44l-.91 3.41-.53-2.95zm8.91 3.19c-.48-.28-.84-.71-1.07-1.27l1.09-.45c.14.36.36.65.67.84.3.19.67.29 1.1.29.43 0 .78-.09 1.02-.27.24-.18.36-.42.36-.7 0-.25-.09-.45-.29-.6-.2-.15-.55-.28-1.05-.39l-.49-.11c-.74-.16-1.28-.39-1.61-.71-.33-.32-.5-.73-.5-1.23 0-.61.26-1.1.77-1.48.51-.38 1.18-.57 2.01-.57.73 0 1.35.16 1.87.49.52.33.87.77 1.04 1.33l-1.09.45c-.11-.34-.3-.59-.57-.75-.27-.16-.6-.24-.99-.24-.4 0-.71.08-.94.23-.23.15-.35.35-.35.6 0 .2.08.36.25.48.17.12.48.23.93.33l.49.11c.79.17 1.36.41 1.7.72.34.31.51.72.51 1.23 0 .63-.26 1.13-.78 1.51-.52.38-1.22.57-2.1.57-.8 0-1.49-.17-2.07-.48z" />
  </svg>
);

export const SlackIcon = ({ className = "h-4 w-4", ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <path d="M5.042 15.165a2.528 2.528 0 01-2.52 2.523A2.528 2.528 0 010 15.165a2.527 2.527 0 012.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 012.521-2.52 2.527 2.527 0 012.521 2.52v6.313A2.528 2.528 0 018.834 24a2.528 2.528 0 01-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 01-2.521-2.52A2.528 2.528 0 018.834 0a2.528 2.528 0 012.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 012.521 2.521 2.528 2.528 0 01-2.521 2.521H2.522A2.528 2.528 0 010 8.834a2.528 2.528 0 012.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 012.522-2.521A2.528 2.528 0 0124 8.834a2.528 2.528 0 01-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 01-2.523 2.521 2.527 2.527 0 01-2.52-2.521V2.522A2.527 2.527 0 0115.165 0a2.528 2.528 0 012.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 012.523 2.52A2.528 2.528 0 0115.165 24a2.527 2.527 0 01-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 01-2.52-2.523 2.527 2.527 0 012.52-2.52h6.313A2.528 2.528 0 0124 15.165a2.528 2.528 0 01-2.522 2.523h-6.313z" />
  </svg>
);

export const TerminalIcon = ({ className = "h-4 w-4", ...props }: IconProps) => (
  <TerminalLucide className={className} strokeWidth={2.2} {...props} />
);
