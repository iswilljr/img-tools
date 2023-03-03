import type { NextSeoProps } from 'next-seo';

const title = 'Free Online Image Converter';
const description =
  'Free Online Image Converter. Edit and convert image files online from your browser. Select from several image editing tools the one you are looking for.';

export const defaultSeo = {
  title,
  titleTemplate: '%s - Image Tools',
  description,
  defaultTitle: 'Free Online Image Converter',
  canonical: 'https://img-tools.vercel.app',
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.png',
    },
  ],
  openGraph: {
    title,
    description,
    site_name: 'Image Tools',
    url: 'https://img-tools.vercel.app',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: 'https://img-tools.vercel.app/home.png',
        width: 1920,
        height: 960,
        type: 'image/png',
      },
    ],
  },
  twitter: {
    handle: '@iswilljr',
    site: '@iswilljr',
    cardType: 'summary_large_image',
  },
} satisfies NextSeoProps;
