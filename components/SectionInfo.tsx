import { Highlight } from './Highlight';
import { Shadow } from './Shadow';

export interface SectionInfoProps {
  title: string;
  description: string;
  highlight: string;
}

function getTokens(title: string, highlight: string) {
  const regexp = new RegExp(`(${highlight})`, 'gi');

  return title.split(regexp).map(str => ({ str, highlighted: regexp.test(str) }));
}

export function SectionInfo({ title, description, highlight }: SectionInfoProps) {
  const tokens = getTokens(title, highlight);

  return (
    <section className="relative mx-auto my-10 w-fit px-6 text-center">
      <h1 className="mx-auto text-4xl font-bold">
        {tokens.map((value, i) => (value.highlighted ? <Highlight key={i}>{value.str}</Highlight> : value.str))}
      </h1>
      <p className="mx-auto mt-2 max-w-md text-lg text-primary-1/70 sm:max-w-xl">{description}</p>
      <Shadow />
    </section>
  );
}
