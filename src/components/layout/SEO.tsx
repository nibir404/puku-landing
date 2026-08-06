import { ReactNode, useEffect } from 'react';

type SEOProps = {
  title: string;
  description?: string;
  image?: string;
};

const DEFAULTS = {
  description:
    'Puku is the AI-native engineering platform where modern software teams design, build, automate, deploy, and manage software — together.',
};

export const SEO = ({ title, description, image }: SEOProps) => {
  useEffect(() => {
    document.title = title.includes('Puku') ? title : `${title} — Puku`;
    const desc = description ?? DEFAULTS.description;
    setMeta('description', desc);
    setMeta('og:title', title, true);
    setMeta('og:description', desc, true);
    setMeta('og:image', image ?? '', true);
    setMeta('twitter:card', 'summary_large_image', true);
    setMeta('twitter:title', title, true);
    setMeta('twitter:description', desc, true);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [title, description, image]);
  return null;
};

const setMeta = (name: string, content: string, og = false) => {
  const selector = og ? `meta[property="${name}"]` : `meta[name="${name}"]`;
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    if (og) el.setAttribute('property', name);
    else el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

export const Wrapper = ({ children }: { children: ReactNode }) => <>{children}</>;
