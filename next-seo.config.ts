import type { NextSeoProps } from 'next-seo';

export const defaultSeo: NextSeoProps = {
  title: 'Free Online Image Converter',
  titleTemplate: '%s - Image Tools',
  description:
    'Free Online Image Converter. Edit and convert image files online from your browser. Select from several image editing tools the one you are looking for.',
  defaultTitle: 'Free Online Image Converter',
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.png',
    },
  ],
  twitter: {
    handle: '@iswilljr',
    site: '@iswilljr',
    cardType: 'summary_large_image',
  },
};
