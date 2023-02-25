import { Shadow } from './Shadow';
import { Highlight } from './Highlight';
import type { TablerIconsProps } from '@tabler/icons-react';
import Link from 'next/link';

export interface SectionProps {
  title: string;
  description: string;
  label: string;
  icon: (props: TablerIconsProps) => JSX.Element;
  tryItOut: string;
}

export function Section({ title, description, icon: Icon, tryItOut }: SectionProps) {
  return (
    <section className="relative px-6">
      <div className="mx-auto flex max-w-md flex-col items-center justify-between gap-4 sm:max-w-4xl odd:lg:flex-row-reverse even:lg:flex-row">
        <Link className="group relative w-full border-b border-gray-700" href={tryItOut}>
          <Highlight
            as="h2"
            className="mt-5 flex items-center text-left text-3xl font-semibold leading-[1.15] text-transparent sm:text-5xl sm:leading-[1.15]"
          >
            <span>
              <Icon className="mr-2 stroke-primary-4" size={48} />
            </span>
            {title}
          </Highlight>
          <div className="mt-6 pb-8 text-left text-lg text-neutral-300">
            <p>{description}</p>
          </div>
          <span className="absolute -bottom-[1px] left-0 h-[4px] w-[0px] bg-white duration-300 ease-out group-hover:w-full" />
        </Link>
      </div>
      <Shadow />
    </section>
  );
}
