import { sections } from '@/utils/sections';
import { Shadow } from '@/components/Shadow';
import { Section } from '@/components/Section';
import { Translate } from '@/components/Translate';

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="relative mx-auto my-20 w-full px-6 text-center sm:max-w-4xl md:mb-36">
        <Translate>
          <h1 className="text-4xl font-bold !leading-[1.15] sm:text-6xl">
            Free Online <span className="text-primary-6">Image Converter</span>
          </h1>
          <p className="mx-auto mt-5 max-w-md text-lg sm:max-w-xl sm:text-xl">
            Edit and convert image files online from your browser. You can select your image editing tool below.
          </p>
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
