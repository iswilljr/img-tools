import { sections } from '@/utils/sections';
import { Shadow } from '@/components/Shadow';
import { Section } from '@/components/Section';
import { Highlight } from '@/components/Highlight';

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="relative mx-auto my-20 w-fit px-6 text-center md:mb-36">
        <h1 className="mx-auto max-w-md text-4xl font-bold !leading-[1.15] sm:max-w-4xl sm:text-6xl">
          Free Online <Highlight>Image Converter</Highlight>
        </h1>
        <p className="mx-auto mt-5 max-w-md text-lg text-primary-1/70 sm:max-w-xl sm:text-xl">
          Edit and convert image files online from your browser. You can select your image editing tool below.
        </p>
        <Shadow />
      </section>
      <div className="mx-auto w-fit [&>section]:mb-28 [&>section]:md:mb-36">
        {sections.map((section, i) => (
          <Section key={section.title} {...section} reversed={i % 2 !== 0} />
        ))}
      </div>
    </div>
  );
}
