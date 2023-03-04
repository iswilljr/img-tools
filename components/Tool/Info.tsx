import { NextSeo } from 'next-seo';
import { Shadow } from '../Shadow';

export interface ToolInfoProps {
  title: string;
  description: string;
  shortDescription?: string;
  highlight: string;
}

function getTokens(title: string, highlight: string) {
  const regexp = new RegExp(`(${highlight})`, 'gi');

  return title.split(regexp).map(str => ({ str, highlighted: regexp.test(str) }));
}

export function Info({ title, description, shortDescription, highlight }: ToolInfoProps) {
  const tokens = getTokens(title, highlight);

  return (
    <section className="relative mx-auto my-10 w-fit px-6 text-center">
      <NextSeo title={title} description={description} />
      <h1 className="mx-auto text-4xl font-bold">
        {tokens.map((value, i) =>
          value.highlighted ? (
            <span key={i} className="text-primary-6">
              {value.str}
            </span>
          ) : (
            value.str
          )
        )}
      </h1>
      <p className="mx-auto mt-2 max-w-md text-lg sm:max-w-xl">{shortDescription ?? description}</p>
      <Shadow />
    </section>
  );
}
