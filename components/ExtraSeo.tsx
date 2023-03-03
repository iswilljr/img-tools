import { defaultSeo } from '@/next-seo.config';
import { tools, urlToImgTool } from '@/utils/tools';
import { NextSeo, type NextSeoProps } from 'next-seo';
import { useRouter } from 'next/router';

export function ExtraSeo() {
  const { asPath } = useRouter();

  const url = new URL(asPath, defaultSeo.canonical);
  const { pathname } = url;

  const canonical = `${url.origin}${url.pathname}`;

  const editorTool = pathname.split('/')[1];

  const tool = tools[editorTool as keyof typeof tools] ?? editorTool === 'url-2-img' ? urlToImgTool : null;

  const openGraph: NextSeoProps['openGraph'] = {
    title: tool?.title,
    description: tool?.description,
    site_name: 'Image Tools',
    url: canonical,
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: `${defaultSeo.canonical}/${editorTool}.png`,
        width: 1920,
        height: 960,
        type: 'image/png',
      },
    ],
  };

  return <NextSeo canonical={canonical} openGraph={tool ? openGraph : undefined} />;
}
