import fr from './fr.json';
import en from './en.json';

export type Lang = 'fr' | 'en';

const translations = { fr, en } as const;

type Translations = typeof fr;

// Flatten nested keys: "nav.home" → value
function flattenKeys(obj: Record<string, unknown>, prefix = ''): Record<string, string> {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'object' && value !== null) {
      Object.assign(acc, flattenKeys(value as Record<string, unknown>, fullKey));
    } else {
      acc[fullKey] = String(value);
    }
    return acc;
  }, {} as Record<string, string>);
}

const flatFr = flattenKeys(fr as unknown as Record<string, unknown>);
const flatEn = flattenKeys(en as unknown as Record<string, unknown>);

const flat = { fr: flatFr, en: flatEn };

export function t(lang: Lang, key: string): string {
  return flat[lang][key] ?? flat['fr'][key] ?? key;
}

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang === 'en') return 'en';
  return 'fr';
}

export function getAlternateLang(lang: Lang): Lang {
  return lang === 'fr' ? 'en' : 'fr';
}

export function getLocalePath(lang: Lang, path: string): string {
  return `/${lang}${path}`;
}

// Map FR page slugs to EN equivalents
export const pageSlugMap: Record<string, Record<Lang, string>> = {
  home:       { fr: '/',                       en: '/' },
  services:   { fr: '/services',               en: '/services' },
  howitworks: { fr: '/comment-ca-marche',      en: '/how-it-works' },
  portfolio:  { fr: '/decoration-interieure',  en: '/interior-design' },
  contact:    { fr: '/contact',                en: '/contact' },
  faq:        { fr: '/faq',                    en: '/faq' },
  blog:       { fr: '/blog',                   en: '/blog' },
};
