import { defaultSeo } from '@/next-seo.config';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

export function CanonicalUrl() {
  const { asPath } = useRouter();

  const url = new URL(asPath, defaultSeo.canonical);

  const canonical = `${url.origin}${url.pathname}`;

  return <NextSeo canonical={canonical} />;
}
