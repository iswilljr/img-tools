import { sections } from '@/utils/sections';
import { Section } from './Section';
import { Shadow } from './Shadow';
import { Translate } from './Translate';

interface HomeProps {
  title: React.ReactNode;
  description: React.ReactNode;
}

export function Home({ title, description }: HomeProps) {
  return (
    <div className="flex flex-col">
      <section className="relative mx-auto my-20 w-full px-6 text-center sm:max-w-4xl md:mb-36">
        <Translate>
          <h1 className="text-4xl font-bold !leading-[1.15] sm:text-6xl">{title}</h1>
          <p className="mx-auto mt-5 max-w-md text-lg sm:max-w-xl sm:text-xl">{description}</p>
        </Translate>
        <Shadow />
      </section>
      <div className="mx-auto mb-16 grid w-full gap-6 px-6 sm:max-w-4xl md:grid-cols-2">
        {sections.map((section, i) => (
          <Translate key={section.title} className="sm:last:col-span-2">
            <Section {...section} />
          </Translate>
        ))}
      </div>
    </div>
  );
}
